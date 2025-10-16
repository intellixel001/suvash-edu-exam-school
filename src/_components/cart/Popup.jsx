"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function Popup({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
  width = "max-w-md",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-50 px-4`}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className={`relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl w-full ${width} p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              {showClose && (
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                >
                  <FaTimes className="text-lg" />
                </button>
              )}

              {/* Title */}
              {title && (
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {title}
                </h2>
              )}

              {/* Content */}
              <div className="text-sm">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
