"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ButtonCart({
  icon: Icon,
  text,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 shadow-sm active:scale-95";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 hover:shadow-lg",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && Icon}
      {text && <span>{text}</span>}
    </motion.button>
  );
}
