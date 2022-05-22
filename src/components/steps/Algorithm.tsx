import { motion } from "framer-motion";
import type { NextPage } from "next";

import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const Algorithm = (props: any) => {
    const formula = "$B(t) = \\sum_{i=0}^{n} {}_n C_i (1 - t)^{n-i} t^i P_i$";

    return (
        <motion.div {...props}>
            <h1 className="mb-4 font-black">De Casteljau's Algorithm</h1>

            <p className="text-base font-normal mb-4">
                Bézier curves can be calculated using de Casteljau's algorithm:
            </p>

            <p>
                <Latex>{formula}</Latex>
            </p>
        </motion.div>
    );
};

export default Algorithm;
