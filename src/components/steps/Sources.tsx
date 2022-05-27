import { motion } from "framer-motion";

const Sources = (props: any) => {
    return (
        <motion.div {...props}>
            <h1 className="mb-4 font-black text-gray-600">Sources Used</h1>

            <ul className="text-base font-normal mb-4">
                <li>
                    <a href="https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html">
                        Derivates of a Bezier Curve
                    </a>
                </li>
                <li>
                    <a href="https://www.freecodecamp.org/news/nerding-out-with-bezier-curves-6e3c0bc48e2f/">
                        Nerding out with Bezier Curves
                    </a>
                </li>
            </ul>
        </motion.div>
    );
};

export default Sources;
