import { motion } from "framer-motion";
import type { NextPage } from "next";
import { BezierCanvas } from "../BezierCanvas";

const Demonstration = (props: any) => {
    return (
        <motion.div {...props}>
            <BezierCanvas />
        </motion.div>
    );
};

export default Demonstration;
