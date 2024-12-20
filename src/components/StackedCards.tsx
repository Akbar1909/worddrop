import React from "react";
import { render } from "react-dom";
import { motion } from "framer-motion";
import move from "lodash-move";

const CARD_IMAGES = [
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/1.jpeg",
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/2.jpeg",
  " https://letter-so.s3.amazonaws.com/blogs/affirmation/3.jpeg",
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/4.jpeg",
  "https://letter-so.s3.amazonaws.com/blogs/affirmation/ad.jpeg"
];
const CARD_OFFSET = 8;
const SCALE_FACTOR = 0.06;

const wrapperStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#fff9ed"
  };
  
  const cardWrapStyle = {
    paddingLeft: "0",
    position: "relative",
    width: "500px",
    height: "320px"
  };
  
  const cardStyle = {
    position: "absolute",
    width: "500px",
    height: "320px",
    borderRadius: "8px",
    transformOrigin: "top center",
    listStyle: "none"
  };

const StackedCards = () => {
  const [cards, setCards] = React.useState(CARD_IMAGES);
  const moveToEnd = (from) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <div style={wrapperStyle}>
      <ul style={cardWrapStyle}>
        {cards.map((image, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={image}
              style={{
                ...cardStyle,
                // backgroundColor: color,
                cursor: canDrag ? "grab" : "auto"
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARD_IMAGES.length - index
              }}
              drag={canDrag ? "y" : false}
              dragConstraints={{
                top: 0,
                bottom: 0
              }}
              onDragEnd={() => moveToEnd(index)}
            >
              <img
                alt=""
                draggable="false"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  objectFit: "cover"
                }}
                src={image}
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};


export default StackedCards
