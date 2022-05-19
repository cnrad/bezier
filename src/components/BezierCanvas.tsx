import { motion } from "framer-motion";
import { BsFillPlayFill, BsFillPauseFill, BsPlus, BsSubtract } from "react-icons/bs";
import { useEffect, useReducer, useRef, useState } from "react";

type Point = {
    x: number;
    y: number;
};

export const BezierCanvas = () => {
    const [t, setT] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);
    let timer: any = null;

    let points: any[] = [];
    let pointsIn = [0, 0, 0.5, 0.8, 1, 0];

    let box = { left: 10, top: 10, right: 390, bottom: 390 };

    for (let i = 0; i < pointsIn.length; i++) {
        points.push({
            x: box.left + (box.right - box.left) * pointsIn[i],
            y: box.bottom + (box.top - box.bottom) * pointsIn[++i],
        });
    }

    function setPointCoords(point: any, i: number) {
        point.setAttribute("x", points[i].x - 20);
        point.setAttribute("y", points[i].y - 20);
    }

    const movePoint = (point: any, i: number) => {
        console.log(point);

        document.onmousemove = function (e) {
            let x = e.offsetX,
                y = e.offsetY;

            // Constraints within the box
            if (x < box.left) x = box.left;
            if (x > box.right) x = box.right;
            if (y > box.bottom) y = box.bottom;
            if (y < box.top) y = box.top;

            points[i].x = x;
            points[i].y = y;
            setPointCoords(point, i);

            drawLines();
            drawControlPath();
        };
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    };

    const drawControlPath = () => {
        let controlPath = document.getElementById("control-path")!;
        let controlPathD = "M" + points[0].x + "," + points[0].y + " L";

        for (let i = 1; i < points.length; i++) {
            controlPathD += points[i].x + "," + points[i].y + " ";
        }
        controlPath.setAttribute("d", controlPathD);
    };

    const drawLines = () => {
        for (let i = 0; i < points.length - 2; i++) {
            let path = document.getElementById(`path${i}`)!;
            let curPoint = {
                x: points[i].x + t * (points[i + 1].x - points[i].x),
                y: points[i].y + t * (points[i + 1].y - points[i].y),
            };

            let nextPoint = {
                x: points[i + 1].x + t * (points[i + 2].x - points[i + 1].x),
                y: points[i + 1].y + t * (points[i + 2].y - points[i + 1].y),
            };

            let pathD = "M" + curPoint.x + "," + curPoint.y + " L" + nextPoint.x + "," + nextPoint.y + " ";
            path.setAttribute("d", pathD);
        }
    };

    const differenceOfPoints = (x1: number, y1: number, x2: number, y2: number) => {
        let changeX = x2 - x1;
        let changeY = y2 - y1;

        return changeY / changeX;
    };

    useEffect(() => {
        setT(0);

        timer = setInterval(() => {
            setT(t => t + 0.01);

            drawLines();

            if (t >= 1) {
                setT(0);
                setAnimating(false);
            }
        }, 30);

        if (!animating) {
            clearInterval(timer);
            timer = null;
        }

        return () => clearInterval(timer);
    }, [animating]);

    useEffect(() => {
        console.log(points);
        drawLines();
    }, [t]);

    useEffect(() => {
        drawLines();
        drawControlPath();
    }, []);

    const addPoint = () => {
        points.push({
            x: 50,
            y: 50,
        });
    };

    const removePoint = () => {
        points.pop();
    };

    return (
        <>
            <p>t = {t.toFixed(2)}</p>

            <div className="flex flex-row items-center justify-center gap-4 my-4">
                <motion.button
                    onClick={() => setAnimating(animating => !animating)}
                    className="bg-gray-800 p-2 rounded-md"
                >
                    {!animating && <BsFillPlayFill />}
                    {animating && <BsFillPauseFill />}
                </motion.button>

                <motion.button onClick={addPoint} className="bg-gray-800 p-2 rounded-md">
                    <BsPlus />
                </motion.button>

                <motion.button onClick={removePoint} className="bg-gray-800 p-2 rounded-md">
                    <BsSubtract />
                </motion.button>
            </div>

            <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                className="bg-gray-900/50 border border-gray-500/20 text-white flex items-center justify-center rounded-md"
            >
                <>
                    <defs xmlns="http://www.w3.org/2000/svg">
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect width="20" height="20" fill="none" stroke="#3d4858" strokeWidth="0.1" />
                        </pattern>
                    </defs>
                    <rect xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="url(#grid)" />

                    {/* <svg xmlns="http://www.w3.org/2000/svg" x={t * 300} y="169">
                    <text x="15" y="12" style={{ fill: "#fff", fontSize: "0.9rem", userSelect: "none" }}>
                        3
                    </text>
                    <motion.circle
                        r="6"
                        fill="white"
                        stroke="#E8C48E"
                        strokeWidth="1"
                        cx="20"
                        cy="20"
                        style={{ cursor: "pointer" }}
                    />
                </svg> */}

                    {/* <path
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="red"
                    fill="none"
                    id="bezier-path"
                    strokeWidth="1.2"
                    d="M20,350 Q159,50 320,350 "
                /> */}

                    {points.map((coords: Point, i: number) => {
                        console.log(coords.x, coords.y);
                        return (
                            <motion.svg
                                key={`point${i}`}
                                xmlns="http://www.w3.org/2000/svg"
                                x={coords.x - 20}
                                y={coords.y - 20}
                                onMouseDown={(e: any) => movePoint(e.currentTarget, i)}
                            >
                                <text x="15" y="12" style={{ fill: "#fff", fontSize: "0.9rem", userSelect: "none" }}>
                                    {i}
                                </text>
                                <circle
                                    r="6"
                                    fill="white"
                                    stroke="#00ff11"
                                    strokeWidth="1"
                                    cx={20}
                                    cy={20}
                                    style={{ cursor: "pointer" }}
                                />
                            </motion.svg>
                        );
                    })}

                    <path xmlns="http://www.w3.org/2000/svg" fill="none" id="control-path" stroke="#36426c" />

                    {points.map((_, i) => {
                        return <path xmlns="http://www.w3.org/2000/svg" fill="none" id={`path${i}`} stroke="#15a17e" />;
                    })}
                </>
            </svg>
        </>
    );
};
