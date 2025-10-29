"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen">
      <div className="w-full py-6">
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
          Friday, 17 Oct 2025 আপনি ২৪ ঘন্টার যেকোনো সময় পরীক্ষা দিতে পারবেন। -
          পরীক্ষার টপিক/সিলেবাস জানতে "রুটিন" বাটন চাপুন। - আগের সকল পরীক্ষার
          প্রশ্ন দেখতে "আর্কাইভ" বাটন চাপুন।
        </h2>

        <BottomBar />
      </div>
    </div>
  );
}
