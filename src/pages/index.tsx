import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import Demonstration from "../components/steps/Demonstration";
import Algorithm from "../components/steps/Algorithm";
import Intro from "../components/steps/Intro";

const Index: NextPage = () => {
    const [step, setStep] = useState<number>(0);

    return (
        <>
            <Head>
                <title>Bezier Curves</title>
            </Head>
            <div className="w-full h-[100vh] flex flex-row items-center justify-evenly text-white text-3xl font-semibold overflow-hidden">
                <div
                    className="flex items-center justify-center p-2 bg-slate-800 text-white cursor-pointer rounded-md ml-4 hover:text-gray-400 hover:bg-slate-800/50 transition-all"
                    style={{ cursor: step > 0 ? "pointer" : "not-allowed" }}
                    onClick={() => (step > 0 ? setStep(step => step - 1) : null)}
                >
                    <BsChevronLeft />
                </div>

                <div className="flex items-center justify-center h-96 w-64 md:w-[44rem]">
                    <AnimatePresence exitBeforeEnter>
                        {step === 0 && (
                            <Intro
                                key="Intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            />
                        )}
                        {step === 1 && (
                            <Algorithm
                                key="Algorithm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            />
                        )}
                        {step === 2 && (
                            <Demonstration
                                key="Demonstration"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div
                    className="flex items-center justify-center p-2 bg-slate-800 text-white rounded-md mr-4 hover:text-gray-400 hover:bg-slate-800/50 transition-all"
                    style={{ cursor: step <= 10 ? "pointer" : "not-allowed" }}
                    onClick={() => (step <= 10 ? setStep(step => step + 1) : null)}
                >
                    <BsChevronRight />
                </div>
            </div>
        </>
    );
};

export default Index;
