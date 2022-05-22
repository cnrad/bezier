import { motion } from "framer-motion";
import type { NextPage } from "next";
import { BezierCanvas } from "../BezierCanvas";

const Demonstration: NextPage = () => {
    return (
        <motion.div
            key="Demonstration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <BezierCanvas />
        </motion.div>
    );
};

export default Demonstration;
