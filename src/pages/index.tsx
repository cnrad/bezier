import type { NextPage } from "next";
import Head from "next/head";
import { BezierCanvas } from "../components/BezierCanvas";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Bezier Curves</title>
            </Head>
            <div className="w-full h-[100vh] flex flex-col items-center justify-center text-white text-3xl font-semibold">
                calc final
                <BezierCanvas />
            </div>
        </>
    );
};

export default Home;
