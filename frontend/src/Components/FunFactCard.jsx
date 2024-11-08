"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CardStack = ({ items, offset = 10, scaleFactor = 0.06 }) => {
  const [cards, setCards] = useState(items);

  useEffect(() => {
    setCards(items); 
  }, [items]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()); 
        return newArray;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="funfacts-container">
      <AnimatePresence initial={false}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="fun-fact-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: -50 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <div className="crop-name">{card.name}</div>
            <div className="fact-item">{card.content}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
