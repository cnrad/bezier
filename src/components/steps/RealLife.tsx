import { motion } from "framer-motion";

const RealLife = (props: any) => {
    return (
        <motion.div {...props}>
            <h1 className="mb-4 font-black">Real Life Application of Bézier Curves</h1>

            <div className="flex flex-row items-center justify-center gap-4">
                <p className="text-base font-normal mb-4">
                    Let's say you're a civil engineer, and you've been tasked with designing a new road for cars, and it
                    needs to twist around two large trees. However, you need to make sure that cars can turn on it and
                    that the curves are not too sharp. You can use a Bézier curve to design the road!
                    <br />
                    <br />
                    The red line is the road you have designed. You can now check to see if cars will be able to make
                    the turns, by taking the derivative of the Bézier curve and finding the tangent line to the
                    derivative at a certain point, you can see what the car's front wheels will need to align to in
                    order to make the turn. If this angle is too great (or sharp), it's fair to say that the car will
                    not be able to make that turn while going the speed limit.
                </p>

                <img src="/images/RoadBezier.png" alt="Bezier Curve in a road" className="rounded-md h-72" />
            </div>
        </motion.div>
    );
};

export default RealLife;
