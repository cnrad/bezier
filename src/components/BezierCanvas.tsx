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
    const [showCurve, setShowCurve] = useState(true);

    let pointsIn = [0, 0, 0.5, 0.9, 1, 0];
    let box = { left: 10, top: 10, right: 390, bottom: 390 };

    let tempArr: Point[] = [];
    for (let i = 0; i < pointsIn.length; i++) {
        tempArr.push({
            x: box.left + (box.right - box.left) * pointsIn[i],
            y: box.bottom + (box.top - box.bottom) * pointsIn[++i],
        });
    }

    let [points, setPoints] = useState<Point[]>(tempArr);

    function setPointCoords(point: SVGElement, i: number) {
        point.setAttribute("x", `${points[i].x - 20}`);
        point.setAttribute("y", `${points[i].y - 20}`);
    }

    const movePoint = (point: SVGElement, i: number) => {
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
            drawBezierPath();
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

    const drawBezierPath = () => {
        let letter;
        switch (points.length) {
            case 4:
                letter = "C";
                break;
            case 3:
                letter = "Q";
                break;
            case 2:
                letter = "L";
                break;
            default:
                letter = "C";
        }
        let bezierPathD = "M" + points[0].x + "," + points[0].y + " " + letter;

        for (let i = 1; i < points.length; i++) {
            if (i > 3 && i % 4 === 0) bezierPathD += "C";
            bezierPathD += points[i].x + "," + points[i].y + " ";
        }

        let bezierPath = document.getElementById(`bezier-path`)!;
        bezierPath.setAttribute("d", bezierPathD);
    };

    const drawLine = (pointArr: any) => {
        let subPoints = [];

        let x = pointArr[0].x + (pointArr[1].x - pointArr[0].x) * t;
        let y = pointArr[0].y + (pointArr[1].y - pointArr[0].y) * t;

        let subpathLine = "M" + x + "," + y + " L";
        subPoints.push({ x, y });

        for (let i = 1; i < pointArr.length - 1; i++) {
            let x = pointArr[i].x + (pointArr[i + 1].x - pointArr[i].x) * t;
            let y = pointArr[i].y + (pointArr[i + 1].y - pointArr[i].y) * t;
            subPoints.push({ x: x, y: y });

            subpathLine += x + "," + y + " ";
        }

        if (pointArr.length <= 3) {
            let marker = document.getElementById("marker")!;
            let mx, my;
            if (t == 1) {
                (mx = -10), (my = -10);
            } else {
                mx = subPoints[0].x + (subPoints[1].x - subPoints[0].x) * t;
                my = subPoints[0].y + (subPoints[1].y - subPoints[0].y) * t;
            }
            marker.setAttribute("cx", mx);
            marker.setAttribute("cy", my);
        }

        let path = document.getElementById(`path${pointArr.length}`)!;
        path.setAttribute("d", subpathLine);

        if (subPoints.length > 2) {
            drawLine(subPoints);
        }
    };

    useEffect(() => {
        drawBezierPath();
        drawLine(points);
    }, [t]);

    useEffect(() => {
        if (points.length > 4) setShowCurve(false);

        drawLine(points);
        drawBezierPath();
        drawControlPath();
    }, [points]);

    const addPoint = () => {
        setPoints(points => [
            ...points,
            {
                x: 200,
                y: 200,
            },
        ]);

        drawLine(points);
        drawControlPath();
    };

    const removePoint = () => {
        if (points.length > 3) {
            let poppedArr = [...points];
            poppedArr.pop();
            setPoints([...poppedArr]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-between my-4 w-[400px]">
                <div className="flex flex-col items-center">
                    <p className="text-xl">t = {t.toFixed(2)}</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="any"
                        className="w-64"
                        value={t}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setT(+e.target.value)}
                    />
                    <div className="mt-2 flex flex-row gap-2 items-center justify-center">
                        <input
                            type="checkbox"
                            name="toggleCurve"
                            checked={showCurve}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                points.length < 5 ? setShowCurve(e.target.checked) : null
                            }
                        />
                        <label htmlFor="toggleCurve" className="text-sm font-medium">
                            Show Curve
                        </label>
                    </div>
                </div>

                <div className="flex flex-row gap-3">
                    <motion.button onClick={addPoint} className="bg-gray-800 p-2 rounded-md hover:bg-gray-700">
                        <FiPlus className="w-5 h-5" />
                    </motion.button>

                    <motion.button onClick={removePoint} className="bg-gray-800 p-2 rounded-md hover:bg-gray-700">
                        <FiMinus className="w-5 h-5" />
                    </motion.button>
                </div>
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

                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        id="bezier-path"
                        stroke="#ff4545"
                        style={{ filter: "drop-shadow(0 0 2px #ff4545)", visibility: showCurve ? "visible" : "hidden" }}
                    />

                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        id="control-path"
                        stroke="#36426c"
                        style={{ filter: "drop-shadow(0 0 2px #3f5abc)" }}
                    />

                    {points.map((_, i) => {
                        return (
                            <path
                                key={`path${points.length - i}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                id={`path${points.length - i}`}
                                stroke={["#488a6f", "#8c4b9c", "#afbe6c", "#a16f4d"][i % 4]}
                                style={{
                                    filter: `drop-shadow(0 0 4px ${
                                        ["#488a6f", "#8c4b9c", "#afbe6c", "#a16f4d"][i % 4]
                                    })`,
                                }}
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
                                onMouseDown={(e: React.MouseEvent<SVGElement>) => movePoint(e.currentTarget, i)}
                            >
                                <text x="15" y="12" style={{ fill: "#fff", fontSize: "0.9rem", userSelect: "none" }}>
                                    {i}
                                </text>
                                <circle
                                    r="6"
                                    fill="#242f3d"
                                    stroke="#404356"
                                    strokeWidth="1"
                                    cx={20}
                                    cy={20}
                                    style={{ cursor: "pointer" }}
                                />
                            </motion.svg>
                        );
                    })}

                    <circle
                        xmlns="http://www.w3.org/2000/svg"
                        id="marker"
                        fill="#f00"
                        stroke="#fff"
                        r="6"
                        style={{ filter: "drop-shadow(0 0 7px #f00)" }}
                    />
                </>
            </svg>
            {points.length > 4 && (
                <p className="mt-4 text-sm text-gray-500 font-medium">
                    Curve will not be shown if the number of points is above 4.
                </p>
            )}
        </div>
    );
};
