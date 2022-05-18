import { motion } from "framer-motion";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useEffect, useReducer, useRef, useState } from "react";

export const BezierCanvas = () => {
    const [t, setT] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);
    let timer: any = null;

    const point1ref = useRef(null);

    let points: any = [];
    let pointsIn = [0, 0, 0.5, 0.8, 1, 0];

    let box = { left: 0, top: 0, right: 400, bottom: 400 };

    // read points from array.
    for (let i = 0; i < pointsIn.length; i++) {
        let x = box.left + (box.right - box.left) * pointsIn[i];
        let y = box.bottom + (box.top - box.bottom) * pointsIn[++i];
        points.push({ x: x, y: y });
    }

    function setPointCoords(point: any, i: number) {
        point.setAttribute("cx", points[i].x);
        point.setAttribute("cy", points[i].y);
    }

    const movePoint = (point: any, i: number) => {
        document.onmousemove = function (e) {
            console.log(e.pageX, e.pageY, e.offsetX, e.offsetY);
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
            // drawPath();
        };
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
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

                <svg xmlns="http://www.w3.org/2000/svg" x={t * 300} y="169">
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
                </svg>

                <path
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="red"
                    fill="none"
                    id="bezier-path"
                    stroke-width="1.2"
                    d="M20,350 Q159,50 320,350 "
                />

                {/* <motion.svg xmlns="http://www.w3.org/2000/svg" x="-15" y="-15"> */}
                <motion.circle
                    r="6"
                    fill="white"
                    stroke="#E8C48E"
                    strokeWidth="1"
                    cx="20"
                    cy="20"
                    style={{ cursor: "pointer" }}
                    ref={point1ref}
                    onMouseDown={(e: any) => movePoint(e.target, 1)}
                />
                {/* </motion.svg> */}
            </svg>
        </>
    );
};
