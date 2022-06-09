import { motion } from "framer-motion";

const Sources = (props: any) => {
    return (
        <motion.div {...props}>
            <p className="fixed top-6 right-20 text-base font-light text-indigo-400/80">
                {"This project is open source ->"}
            </p>

            <h1 className="mb-4 font-black text-gray-600">Sources Used</h1>

            <ul className="text-base font-normal mb-4">
                <li className="hover:underline underline-offset-2 text-white hover:text-indigo-500 mb-1">
                    <a href="https://www.youtube.com/watch?v=aVwxzDHniEw" target="_blank" rel="noreferrer noopener">
                        The Beauty of Bézier Curves
                    </a>
                </li>
                <li className="hover:underline underline-offset-2 text-white hover:text-indigo-500 mb-1">
                    <a
                        href="https://www.freecodecamp.org/news/nerding-out-with-bezier-curves-6e3c0bc48e2f/"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Nerding out with Bezier Curves
                    </a>
                </li>
            </ul>
        </motion.div>
    );
};

export default Sources;
