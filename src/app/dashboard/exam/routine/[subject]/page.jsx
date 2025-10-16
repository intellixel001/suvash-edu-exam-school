"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";

export default function Page() {
  const routine = {
    title: "Open_Model_Test এর মডেল টেস্টের রুটিন",
    subtitle: "পরীক্ষার দিন ২৪ ঘণ্টার যেকোনো সময় পরীক্ষা দিতে পারবেন।",
    date: "Oct 17, 2025",
    status: "UPCOMING",
    description:
      "বিসিএসের সম্পূর্ণ সিলেবাসের উপর ২০০ নাম্বারের ফুল মডেল টেস্ট। পরীক্ষার সিলেবাসঃ Live MCQ ফ্রি সাপ্তাহিক ফুল মডেল টেস্ট।",
    note: "Live MCQ - তে প্রতি শুক্রবার সবার জন্য ফ্রি একটি ফুল মডেল টেস্ট অনুষ্ঠিত হয়।",
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        {/* Header */}
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
          Open_Model_Test এর মডেল টেস্টের রুটিন
        </h2>

        <h2 className="text-center text-xl font-semiboldtext-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-700">
          পরীক্ষার দিন ২৪ ঘণ্টার যেকোনো সময় পরীক্ষা দিতে পারবেন।
        </h2>

        {/* Routine Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <FaCalendarDays className="w-5 h-5" />
              <span className="font-medium">
                <strong>পরীক্ষার তারিখঃ </strong> {routine.date}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${
                routine.status === "UPCOMING"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                  : routine.status === "ONGOING"
                  ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400"
              }`}
            >
              {routine.status === "UPCOMING" ? (
                <FaClock className="w-4 h-4" />
              ) : routine.status === "ONGOING" ? (
                <FaCheckCircle className="w-4 h-4" />
              ) : (
                <FaExclamationCircle className="w-4 h-4" />
              )}
              {routine.status}
            </div>
          </div>

          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>{routine.description}</p>
            <p className="mt-4 italic text-gray-500 dark:text-gray-400">
              {routine.note}
            </p>
          </div>
        </motion.div>
      </div>

      <BottomBar />
    </div>
  );
}
