import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";

const Derivative = (props: any) => {
    return (
        <motion.div {...props}>
            <h1 className="mb-4 font-black">Derivative of a Bézier curve</h1>

            <p className="text-base font-normal mb-4">
                The graph of the derivative of a Bézier curve is usually referred to as the <b>hodograph</b> of the
                original curve. The derivative always has one less control point then the original, making the degree{" "}
                <i>n-1</i> from the original. So, the derivative of a cubic Bézier is in itself a quadratic Bézier.
            </p>
        </motion.div>
    );
};

export default Derivative;
