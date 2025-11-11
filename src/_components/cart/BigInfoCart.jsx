"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BigInfoCard({
  image,
  title,
  subtitle,
  description,
  extraInfo,
  onClick,
}) {
  const hasContent = title || subtitle || description || extraInfo;

  return (
    <motion.div
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-auto flex relative items-center justify-center rounded-[10px] overflow-hidden shadow-xl hover:shadow-2xl 
           bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 
           transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Wrapper */}
      <div
        className={`flex flex-col lg:flex-row ${
          image && hasContent ? "" : "items-center justify-center"
        }`}
      >
        {/* Image Section */}
        {image && (
          <div className="relative w-full lg:w-[35%] p-3 h-auto flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <img
              src={image}
              alt={title || "Card Image"}
              className="w-[40%] lg:w-[60%] h-auto object-contain"
            />
          </div>
        )}

        {/* Content Section */}
        {hasContent ? (
          <div
            className={`flex flex-col justify-center p-2 px-3 md:p-2 w-full ${
              image ? "lg:w-[65%]" : "text-center"
            }`}
          >
            {title && (
              <h2 className="text-[16px] md:text-[20px] font-bold text-gray-900 dark:text-gray-100 mb-2">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="lg:text-[14px] text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-3">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        ) : !image ? (
          <div className="w-full p-10 text-center text-gray-500 dark:text-gray-400">
            <p>No information available</p>
          </div>
        ) : null}

        {extraInfo && (
          <div
            className="absolute top-[-1] left-[-1] px-3 py-1 rounded-[6px] text-[8px] font-medium 
             text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             shadow-lg animate-pulse"
            style={{
              animationIterationCount: "infinite",
            }}
          >
            {extraInfo}
          </div>
        )}
      </div>
    </motion.div>
  );
}
