"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        {/* Header */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 border border-gray-400 p-4 mb-8 rounded-md bg-gray-50 dark:bg-gray-700">
          ফ্রি সাপ্তাহিক মডেল টেস্ট
        </h2>
      </div>

      <BottomBar />
    </div>
  );
}
