import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";

const Intro = (props: any) => {
    return (
        <motion.div {...props}>
            <img
                src={"/images/mainbanner.jpg"}
                alt="A 2d render of a Bézier curve"
                className="mb-16 rounded-xl h-56 mx-auto"
            />

            <h1 className="mb-4 font-black">What are Bézier curves, and why should I care?</h1>

            <p className="text-base font-normal mb-4">
                Bézier curves are used for a lot of things in computer graphics: smooth transitions, scalable shapes,
                and can be used to outline movement in animation. However, they're used in the real world as well, in
                things like railway route or highway modeling, robotics, and more. In fact, the Bézier curve is named
                after a French engineer, <b>Pierre Bézier</b>, who used it in the 1960s for designing curves for the
                bodywork of Renault cars.
            </p>

            <p className="text-base font-normal">
                They're also quite cool, when you really get to understand how they work.
            </p>
        </motion.div>
    );
};

export default Intro;
