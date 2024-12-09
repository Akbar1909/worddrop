"use client";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const MotionUl = ({ children, ...computedProps }: HTMLMotionProps<"ul">) => {
  return <motion.ul {...computedProps}>{children}</motion.ul>;
};

export default MotionUl;
