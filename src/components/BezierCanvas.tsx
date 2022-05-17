import { motion } from "framer-motion";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useEffect, useReducer, useRef, useState } from "react";

export const BezierCanvas = () => {
    const [t, setT] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);
    let timer: any = null;

    useEffect(() => {
        setT(0);
        if (!animating) {
            clearInterval(timer);
            timer = null;
        }

        timer = setInterval(
            () => {
                setT(t => t + 0.01);
                if (t >= 1) {
                    setAnimating(false);
                }
            },
            animating ? 30 : 1000000
        );

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
                className="bg-gray-900/50 border border-gray-500/20 text-white flex items-center justify-center rounded-md mt-7"
            >
                <defs xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="20" height="20" fill="none" stroke="#3d4858" strokeWidth="0.1" />
                    </pattern>
                </defs>
                <rect xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="url(#grid)" />

                <svg xmlns="http://www.w3.org/2000/svg" x={t * 300} y="169">
                    <circle r="6" fill="white" stroke="#E8C48E" strokeWidth="1" cx="20" cy="20" />
                </svg>
            </svg>
        </>
    );
};
