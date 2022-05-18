import { motion } from "framer-motion";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
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

            // constrain withing the box
            if (x < box.left) x = box.left;
            if (x > box.right) x = box.right;
            if (y > box.bottom) y = box.bottom;
            if (y < box.top) y = box.top;

            points[i].x = x;
            points[i].y = y;
            setPointCoords(point, i);
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

    useEffect(() => {
        setT(0);

        timer = setInterval(() => {
            setT(t => t + 0.01);
            if (t >= 1) {
                setAnimating(false);
            }
        }, 30);

        if (!animating) {
            clearInterval(timer);
            timer = null;
        }

        return () => clearInterval(timer);
    }, [animating]);

    return (
        <>
            <motion.button onClick={() => setAnimating(animating => !animating)} className="bg-gray-800 p-2 rounded-md">
                {!animating && <BsFillPlayFill />}
                {animating && <BsFillPauseFill />}
            </motion.button>

            <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                className="bg-gray-900/50 border border-gray-500/20 text-white flex items-center justify-center rounded-md"
            >
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

                <path
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="red"
                    fill="none"
                    id="bezier-path"
                    strokeWidth="1.2"
                    d="M20,350 Q159,50 320,350 "
                />

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
            </svg>
        </>
    );
};
