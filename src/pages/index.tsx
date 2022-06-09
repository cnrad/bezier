import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsChevronRight, BsChevronLeft, BsGithub } from "react-icons/bs";

import Demonstration from "../components/steps/Demonstration";
import Algorithm from "../components/steps/Algorithm";
import Intro from "../components/steps/Intro";
import RealLife from "../components/steps/RealLife";
import Sources from "../components/steps/Sources";

const Index: NextPage<any> = ({ slide }: { slide: number }) => {
    const [step, setStep] = useState<number>(+slide ?? 0);
    const router = useRouter();

    useEffect(() => {
        router.push(`/?s=${step}`);
    }, [step]);

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

                <div className="flex items-center justify-center w-64 md:w-[45rem]">
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
                        {step === 3 && (
                            <RealLife
                                key="RealLife"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            />
                        )}
                        {step === 4 && (
                            <Sources
                                key="Sources"
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
                    style={{ cursor: step < 4 ? "pointer" : "not-allowed" }}
                    onClick={() => (step < 4 ? setStep(step => step + 1) : null)}
                >
                    <BsChevronRight />
                </div>
            </div>

            <a
                href="https://github.com/cnrad/bezier"
                target="_blank"
                rel="noreferrer noopener"
                className="fixed right-4 top-4 flex flex-row items-center justify-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-gray-400 transition-colors"
            >
                <BsGithub className="w-8 h-8" />
            </a>
        </>
    );
};

export async function getServerSideProps({ query }: { query: Record<string, any> }) {
    return {
        props: {
            slide: query["s"] ?? null,
        },
    };
}

export default Index;
