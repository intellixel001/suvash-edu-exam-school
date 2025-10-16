"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        {/* Header */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 border border-gray-400 p-4 mb-8 rounded-md bg-gray-50 dark:bg-gray-700">
          বিষয়ভিত্তিক অনুর্ত্তীর্ণের শতকরা হার(%) (সকল লাইভ পরীক্ষার জন্য) 1.
          ফুল মডেল টেস্ট (উত্তীর্ণঃ 0টি, অনুত্তীর্ণঃ 0টি)
        </h2>
      </div>

      <BottomBar />
    </div>
  );
}
