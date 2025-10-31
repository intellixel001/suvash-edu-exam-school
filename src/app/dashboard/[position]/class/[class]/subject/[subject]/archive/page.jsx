"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarDays } from "react-icons/fa6";

export default function Page() {
  const archives = [
    {
      date: "Oct 03, 2025",
      content: [
        `Live MCQ ফ্রি সাপ্তাহিক ফুল মডেল টেস্টঃ 
        বিসিএসের সম্পূর্ণ সিলেবাসের উপর ২০০ নাম্বারের ফুল মডেল টেস্ট।`,
        `[Live MCQ - তে প্রতি শুক্রবার সবার জন্য ফ্রি একটি ফুল মডেল টেস্ট অনুষ্ঠিত হয়।]`,
      ],
    },
    {
      date: "Sep 12, 2025",
      content: [
        `"Award Mania: Season - 14" এর জন্য প্রযোজ্য`,
        `--------------------------------------------`,
        `৪৭৩তম বিসিএস ফাইনাল মডেল টেস্ট–১০`,
        `[ফ্রি সাপ্তাহিক মডেল টেস্ট]`,
      ],
    },
    {
      date: "Sep 05, 2025",
      content: [
        `"Award Mania: Season - 14" এর জন্য প্রযোজ্য`,
        `--------------------------------------------`,
        `৪৭৩তম বিসিএস ফাইনাল মডেল টেস্ট–৯`,
        `[ফ্রি সাপ্তাহিক মডেল টেস্ট]`,
      ],
    },
    {
      date: "Aug 29, 2025",
      content: [
        `"Award Mania: Season - 14" এর জন্য প্রযোজ্য`,
        `--------------------------------------------`,
        `Live MCQ ফ্রি সাপ্তাহিক ফুল মডেল টেস্টঃ 
        বিসিএসের সম্পূর্ণ সিলেবাসের উপর ২০০ নাম্বারের ফুল মডেল টেস্ট।`,
        `[Live MCQ - তে প্রতি শুক্রবার সবার জন্য ফ্রি একটি ফুল মডেল টেস্ট অনুষ্ঠিত হয়।]`,
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        {/* Header */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 border border-gray-400 p-4 mb-8 rounded-md bg-gray-50 dark:bg-gray-700">
          পূর্ববর্তী পরীক্ষাসমূহের প্রশ্নপত্র
        </h2>

        {/* Archive Cards */}
        <div className="mx-auto space-y-6">
          {archives.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-400 rounded-md overflow-hidden shadow-sm"
            >
              {/* Date header */}
              <div className="bg-green-600 text-white text-center py-2 font-semibold flex items-center justify-center gap-2">
                <FaCalendarDays className="w-5 h-5" />
                {item.date}
              </div>

              {/* Content */}
              <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 text-center leading-relaxed">
                {item.content.map((line, i) => (
                  <p key={i} className="mb-2 whitespace-pre-line">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
