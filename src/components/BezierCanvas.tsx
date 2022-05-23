import { motion } from "framer-motion";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FiPlus, FiMinus } from "react-icons/fi";
import React, { useEffect, useReducer, useRef, useState } from "react";

type Point = {
    x: number;
    y: number;
};

export const BezierCanvas = () => {
    const [t, setT] = useState<number>(0);

    let pointsIn = [0, 0, 0.5, 0.9, 1, 0];
    let box = { left: 10, top: 10, right: 390, bottom: 390 };

    let tempArr: any[] = [];
    for (let i = 0; i < pointsIn.length; i++) {
        tempArr.push({
            x: box.left + (box.right - box.left) * pointsIn[i],
            y: box.bottom + (box.top - box.bottom) * pointsIn[++i],
        });
    }

    let [points, setPoints] = useState<Point[]>(tempArr);

    function setPointCoords(point: any, i: number) {
        point.setAttribute("x", points[i].x - 20);
        point.setAttribute("y", points[i].y - 20);
    }

    const movePoint = (point: any, i: number) => {
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

            drawLine(points);
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

    const drawLine = (pointArr: any) => {
        console.log("AJJDIOIJOSAD", pointArr);

        let subPoints = [];

        let x = pointArr[0].x + (pointArr[1].x - pointArr[0].x) * t;
        let y = pointArr[0].y + (pointArr[1].y - pointArr[0].y) * t;

        let subpathLine = "M" + x + "," + y + " L";
        subPoints.push({ x, y });

        for (let i = 1; i < pointArr.length - 1; i++) {
            let x = pointArr[i].x + (pointArr[i + 1].x - pointArr[i].x) * t;
            let y = pointArr[i].y + (pointArr[i + 1].y - pointArr[i].y) * t;
            subPoints.push({ x: x, y: y });
            console.log(subPoints);

            subpathLine += x + "," + y + " ";
        }

        let path = document.getElementById(`path${pointArr.length}`)!;
        path.setAttribute("d", subpathLine);

        if (subPoints.length > 2) {
            drawLine(subPoints);
        }
    };

    useEffect(() => {
        drawLine(points);
    }, [t]);

    useEffect(() => {
        drawLine(points);
        drawControlPath();
    }, [points]);

    const addPoint = () => {
        setPoints(points => [
            ...points,
            {
                x: 50,
                y: 50,
            },
        ]);

        drawLine(points);
        drawControlPath();
    };

    const removePoint = () => {
        if (points.length < 2) return;

        let poppedArr = [...points];
        poppedArr.pop();
        setPoints([...poppedArr]);
    };

    return (
        <>
            <p>t = {t.toFixed(2)}</p>
            <input
                type="range"
                min="0"
                max="1"
                step="any"
                value={t}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setT(+e.target.value)}
            />

            <div className="flex flex-row items-center justify-center gap-4 my-4">
                <motion.button onClick={addPoint} className="bg-gray-800 p-2 rounded-md">
                    <FiPlus />
                </motion.button>

                <motion.button onClick={removePoint} className="bg-gray-800 p-2 rounded-md">
                    <FiMinus />
                </motion.button>
            </div>

            <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                className="bg-gray-900/50 border border-gray-500/20 text-white flex items-center justify-center rounded-md select-none"
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

                    <path xmlns="http://www.w3.org/2000/svg" fill="none" id="control-path" stroke="#36426c" />

                    {points.map((_, i) => {
                        return (
                            <path
                                key={`path${points.length - i}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                id={`path${points.length - i}`}
                                stroke={["#488a6f", "#8c4b9c", "#afbe6c"][i % 3]}
                            />
                        );
                    })}

                    {points.map((coords: Point, i: number) => {
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
                </>
            </svg>
        </>
    );
};
