import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CountdownProgressBarProps {
  duration: number; // Total countdown duration in seconds
  onFinish?: () => void; // Callback when countdown finishes
  reset?: boolean; // Reset flag from parent component
}

const CountdownProgressBar: React.FC<CountdownProgressBarProps> = ({
  duration,
  onFinish,
  reset,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const hasFinished = useRef(false); // Track if `onFinish` has already been called

  useEffect(() => {
    if (reset) {
      setRemainingTime(duration); // Reset countdown when the reset flag changes
      hasFinished.current = false; // Reset the finish state as well
    }
  }, [reset, duration]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (!hasFinished.current && onFinish) {
            onFinish(); // Trigger onFinish only once
            hasFinished.current = true;
          }
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [duration, onFinish]);

  // Calculate progress percentage
  const progress = (remainingTime / duration) * 100;

  // Determine the color based on remaining time
  const getColor = () => {
    if (remainingTime <= 10) return "#dc3545"; // Danger (Red)
    if (remainingTime <= 20) return "#ffc107"; // Warning (Yellow)
    return "#007bff"; // Default (Blue)
  };

  // Determine emoji based on remaining time
  const getEmoji = () => {
    if (remainingTime <= 5) return "🥵";
    if (remainingTime <= 10) return "😰";
    return "😎";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "1.5rem" }}>{getEmoji()}</span>
      <div
        style={{
          flexGrow: 1,
          height: "10px",
          background: "#e0e0e0",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: getColor(),
            borderRadius: "5px",
          }}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>
      <span className="block w-[50px]">⏳ {remainingTime}s</span>
    </div>
  );
};

export default CountdownProgressBar;
