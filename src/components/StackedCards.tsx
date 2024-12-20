'use client'
import { returnArray } from "@/utils/common";
import { motion } from "framer-motion";
import move from "lodash-move";
import { useEffect, useState } from 'react';
import Image from "next/image";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { TypingEffect } from "./TypingEffect";



const CARD_IMAGES = [
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/1.jpeg",
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/2.jpeg",
  " https://letter-so.s3.amazonaws.com/blogs/affirmation/3.jpeg",
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/4.jpeg",
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/ad.jpeg"
];
const CARD_OFFSET = 8;
const SCALE_FACTOR = 0.06;

const smoothColors: string[] = [
  "#A8DADC", // Light Aqua
  "#457B9D", // Seafoam
  "#1D3557", // Deep Ocean
  "#F1FAEE", // Pale Sky
  "#E63946", // Sandy Beach
  "#E5D9B6", // Warm Sand
  "#6A994E", // Olive Green
  "#A56C42", // Earthy Brown
  "#D4A373", // Soft Terracotta
  "#FAF3DD", // Pale Cream
  "#FFB4A2", // Peach Pink
  "#E5989B", // Coral
  "#FFCDB2", // Blush
  "#F4A261", // Warm Yellow
  "#6D597A", // Soft Lavender
  "#F9F5EB", // Off White
  "#D9D9D9", // Soft Gray
  "#9AA5B1", // Slate Gray
  "#37474F", // Charcoal
  "#B0BEC5", // Misty Blue
  "#B2DFDB", // Mint
  "#BBDEFB", // Powder Blue
  "#CE93D8", // Lilac
  "#FFF9C4", // Pale Yellow
  "#FFCCBC"  // Peach
];








const StackedCards = ({ words }: { words: any }) => {

  const [animatedTexts,setAnimatedTexts] = useState<Record<number,boolean>>({})

  const [cards, setCards] = useState([]);
  const moveToEnd = (from) => {
    setCards(move(cards, from, cards.length - 1));

    setAnimatedTexts({})
  };

  useEffect(() => setCards(returnArray(words)), [words])

  console.log(words)

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <ul className="pl-0 relative w-[85vw] h-[60vh] max-w-[400px] max-h-[500px]">
        {cards.map((word, index) => {
          const canDrag = index === 0;



          return (
            <motion.li
              key={word?.definitionId}
              className="absolute w-full h-full origin-top list-none border-black border-[2px] rounded-[24px] bg-[#FAF3DD] p-4 py-8"
              style={{

                // backgroundColor: color,
                cursor: canDrag ? "grab" : "auto",

              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: returnArray(words).length - index
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{
                top: 0,
                bottom: 0
              }}
              onDragEnd={() => moveToEnd(index)}
            >
              <FaRegLightbulb size={24} className='ml-auto' onClick={()=>{
                setAnimatedTexts(prev=>({...prev,[word?.definitionId]:!prev[word?.definitionId]}))
              }} />
              {returnArray(word?.definition?.files).map((image, imageIndex) => (
                <motion.div
                  key={imageIndex}
               
                  className="relative w-[260px] m-auto h-[260px] mb-2 aspect-square rounded-[24px] overflow-hidden duration-300"
                >
                  <Image
                    alt={`Illustration for`}
                    layout="fill"
                    objectFit="cover"
                    src={`${process.env.SERVER_URL}/upload/serve/${image.originalName}`}
                  />
                </motion.div>
              ))}
               <p className="mb-2">{word?.definition?.uz}</p>
              {
                animatedTexts?.[word?.definitionId] && <TypingEffect text={word?.definition?.word?.word} />
              }
             
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};


export default StackedCards