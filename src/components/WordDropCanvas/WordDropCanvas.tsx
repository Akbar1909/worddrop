"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, Textbox, Rect, FabricImage, Group } from "fabric";
import json from "./mock.json";

const words = json.words;

const CARD_SIZE = 150;

const WordDropCanvas = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (fabricCanvas) {
      return;
    }

    // Initialize Fabric.js canvas
    const fabricInstance = new Canvas("word-drop", {
      backgroundColor: "#e0f7fa",
    });

    setFabricCanvas(fabricInstance);

    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) {
      return;
    }

    // Function to create and animate a word (rectangle)
    const createWord = async () => {
      const word = new Rect({
        width: CARD_SIZE,
        height: CARD_SIZE,
      });

      const image = await FabricImage.fromURL(
        "https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=",
        {},
        {
          selectable: false,
          centeredScaling: true,
        }
      );

      image.scaleToHeight(CARD_SIZE);
      image.scaleToWidth(CARD_SIZE);

      const group = new Group([word, image], {
        top: -100,
        left: Math.random() * (window.innerWidth - 100),
        width: CARD_SIZE,
        height: CARD_SIZE,
      });

      fabricCanvas.add(group);

      // Store the initial top value
      let currentTop = group.top;

      // Function to animate the rectangle down 1px per frame
      const animate = () => {
        // Update the top position by 1px
        currentTop += 1;
        group.set({ top: currentTop });

        // Re-render the canvas
        fabricCanvas.renderAll();

        // Get the existing objects on the canvas
        const objects = fabricCanvas.getObjects();

        // Check if the word collides with any other placed block
        const collision = objects.some(
          (block) =>
            block !== group && // Ignore the current falling block
            block.left < group.left + group.width &&
            block.left + block.width > group.left &&
            block.top < currentTop + group.height &&
            block.top + block.height > currentTop
        );

        // If there's no collision and it hasn't reached the bottom, keep animating
        if (
          !collision &&
          currentTop < fabricCanvas.getHeight() - group.height
        ) {
          requestAnimationFrame(animate);
        } else {
          // If collision occurs or it reaches the bottom, place the word and stop the animation
          if (collision) {
            // Move the word up to stack it above the last one
            // currentTop -= word.height;
            group.set({ top: currentTop });
          }
          console.log("Animation complete!");
        }
      };

      // Start the animation
      requestAnimationFrame(animate);
    };

    // Create a new word every 4 seconds
    setInterval(() => createWord(), 4000);

    // Cleanup when the component unmounts
    return () => {
      fabricCanvas.dispose();
    };
  }, [fabricCanvas]);
  return (
    <canvas
      id="word-drop"
      height={window.innerHeight}
      width={window.innerWidth}
      ref={canvasRef}
    ></canvas>
  );
};

export default WordDropCanvas;
