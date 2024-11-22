import React from "react";
import { motion } from "framer-motion";

export const Card = ({ rotate, scale, translate, children }) => {
  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow-md"
      style={{ rotate, scale, translateY: translate }}
    >
      {children}
    </motion.div>
  );
};
