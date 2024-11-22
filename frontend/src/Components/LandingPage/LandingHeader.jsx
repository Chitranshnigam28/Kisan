import React from "react";
import { motion } from "framer-motion";

export const LandingHeader = ({ translate, titleComponent }) => {
  return (
    <motion.header
      className="sticky top-0 z-10 bg-white shadow-md"
      style={{ y: translate }}
    >
      <div className="p-4 text-center">{titleComponent}</div>
    </motion.header>
  );
};
