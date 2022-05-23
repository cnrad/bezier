import { motion } from "framer-motion";
import type { NextPage } from "next";
import { BezierCanvas } from "../BezierCanvas";

const Demonstration = (props: any) => {
    return (
        <motion.div {...props} className="flex flex-row items-center justify-center">
            <div className="mr-4">
                <h1 className="mb-2 font-black">A Demonstration</h1>
                <p className="text-base font-normal mb-4">
                    Change the <i>t</i> value, and watch what happens. Use the + and - buttons to add or remove points
                    from the curve, and drag the control points on the graph below to change the curve.
                </p>
            </div>

            <BezierCanvas />
        </motion.div>
    );
};

export default Demonstration;
