"use client";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const MotionLi = ({ children, ...computedProps }: HTMLMotionProps<"li">) => {
  return <motion.li {...computedProps}>{children}</motion.li>;
};

export default MotionLi;
