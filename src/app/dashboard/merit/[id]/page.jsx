"use client";
import BottomBar from "@/_components/cart/BottomBar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const { id } = useParams();

  return (
    <div>
      <div className="min-h-screen">
        <div className="w-full py-6">
          <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
            Open_Model_Test এর গত মডেল টেস্টের মেধাতালিকা
          </h2>

          <BottomBar />
        </div>
      </div>
    </div>
  );
}
