import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";

import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { useState } from "react";

const Algorithm = (props: any) => {
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const formula = "$B(t) = \\sum_{i=0}^{n} {}_n C_i (1 - t)^{n-i} t^i P_i$";

    return (
        <motion.div {...props}>
            <AnimatePresence exitBeforeEnter>
                {!showExplanation && (
                    <motion.div
                        key="Main"
                        initial={{ opacity: 0, y: showExplanation ? 200 : -200 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: showExplanation ? 200 : -200 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                        <h1 className="mb-4 font-black">De Casteljau's Algorithm</h1>

                        <p className="text-base font-normal mb-4">
                            Bézier curves can be calculated using a recursive formula known as de Casteljau's algorithm.
                            The function takes a value <i>t</i> (between 0 and 1), and returns a point on the xy
                            coordinate plane.
                        </p>

                        <p className="mb-12">
                            <Latex>{formula}</Latex>
                        </p>

                        <h1 className="mb-4 font-black w-full">What?</h1>

                        <p
                            className="text-zinc-500 text-base font-normal underline underline-offset-[3px] mb-4 cursor-pointer hover:text-zinc-400"
                            onClick={() => setShowExplanation(true)}
                        >
                            Let's break it down a bit further. ↓
                        </p>
                    </motion.div>
                )}

                {showExplanation && (
                    <motion.div
                        key="Explanation"
                        initial={{ opacity: 0, y: !showExplanation ? -200 : 200 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: !showExplanation ? -200 : 200 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="max-h-[40rem] overflow-y-scroll overflow-x-hidden border-y-zinc-700/70 border-y-2"
                    >
                        <p
                            className="text-zinc-500 text-base font-normal underline underline-offset-[3px] mt-8 mb-12 cursor-pointer hover:text-zinc-400"
                            onClick={() => setShowExplanation(false)}
                        >
                            Care to see the original equation again? ↑
                        </p>

                        <p className="flex flex-col gap-2 text-2xl">
                            <Latex>{`$\\sum_{i=0}^{n}$`}</Latex>
                            <p className="text-base font-normal mb-6">
                                This part uses the summation operator. The bottom lists the initial condition of{" "}
                                <i>i</i>, and until <i>i</i> reaches the value on the top of the symbol (which in this
                                case, is <i>n</i>), the equation to the right will be evaluated using that value of{" "}
                                <i>i</i>, and added to the total. In this equation, <i>n</i> represents the degree of
                                the Bézier curve.
                            </p>

                            <Latex>{`$\{}_n C_i$`}</Latex>
                            <p className="text-base font-normal mb-6">
                                This C is from <b>C</b>ombinations, and it's also known as a binomial coefficient.
                                Reading this, you'd say "<i>n</i> Choose <i>i</i>", because it's essentially saying that
                                when given <i>n</i> items, return how many different ways you can choose <i>i</i> items
                                out of it. For example, given the expression <Latex>{`$\{}_4 C_2$`}</Latex>, the answer
                                would be 6, because there are 6 unique ways you can select 2 elements from a list of 4.
                            </p>

                            <Latex>{`$(1-t)^{n-i}t^i$`}</Latex>
                            <p className="text-base font-normal mb-6">
                                This is the main part that's responsible for finding the x and y values of the point at
                                the given <i>t</i> value. This formula, multiplied by the combination from above, is
                                what's known as the <b>Bernstein polynomial</b>.
                            </p>

                            <Latex>{`$P_i$`}</Latex>
                            <p className="text-base font-normal mb-6">
                                This part is relatively simple. When defining the control points of a Bézier curve, we
                                refer to them as <Latex>{`$P_n$`}</Latex>, with <i>n</i> being the <i>n</i>th point. In
                                de Casteljau's algorithm, it's assumed that point P has information about both the X
                                coordinate, and the Y coordinate of the point, so we don't need to solve for them
                                separately. It's multiplying the result of the formula by the x and y coordinates of the{" "}
                                <i>i</i>th control point.
                            </p>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Algorithm;
