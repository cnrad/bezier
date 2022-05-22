import { motion } from "framer-motion";
import type { NextPage } from "next";

const Intro: NextPage = () => {
    return (
        <motion.div
            key="Intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <h1 className="mb-4 font-black">What are Bézier curves, and why do I care?</h1>

            <p className="text-base font-normal">
                Bézier curves are used for a lot of things in computer graphics: smooth transitions, scalable shapes,
                and can be used to outline movement in animation. However, they're used in the real world as well, in
                things like railway route or highway modeling, robotics, and more.
            </p>
        </motion.div>
    );
};

export default Intro;
