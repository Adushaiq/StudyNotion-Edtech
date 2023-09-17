import Lottie from "lottie-react";
import errorAnimation from "../assets/animations/Animation - 1694936762854.json"

import { useRef } from "react";
import { useInView } from "framer-motion";

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}

function Error() {
  return (
    <Section>
      <div className="flex flex-col h-[90vh] items-center justify-center px-4 ">
        <div className="max-w-[300px]">
          <Lottie animationData={errorAnimation} />
        </div>
        <p className="lg:text-3xl text-xl font-bold text-center text-white">
          The page you are looking for is currently under development, Come back later.
        </p>
      </div>
    </Section>
  )
}

export default Error
