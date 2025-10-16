"use client";
import BottomBar from "@/_components/cart/BottomBar";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full py-10 px-4">
        {/* Header */}
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
          Open_Model_Test এর মডেল টেস্টের রুটিন
        </h2>
      </div>

      <BottomBar />
    </div>
  );
}
