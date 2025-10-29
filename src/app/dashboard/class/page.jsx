"use client";
import BigInfoCard from "@/_components/cart/BigInfoCart";
import BottomBar from "@/_components/cart/BottomBar";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const cardData = [
    { title: "৫০তম বিসিএস প্রস্তুতি" },
    { title: "নতুনদের বিসিএস প্রস্তুতি" },
    { title: "সাবজেক্ট ওয়্যার" },
    { title: "জব সমাধান" },
    { title: "ব্যাংক নিয়োগ প্রস্তুতি" },
    { title: "শিক্ষক নিয়োগ ও নিবন্ধন" },
    { title: "৯ম-২০তম গ্রেডের প্রস্তুতি" },
    { title: "বার কাউন্সিল ও বিজনেস" },
    { title: "স্পেশাল বিসিএস (শিক্ষা)" },
    { title: "স্পেশাল বিসিএস (স্বাস্থ্য)" },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cardData.map((item, i) => (
          <BigInfoCard
            onClick={() => router.push("/dashboard/class/" + (i + 1))}
            key={i}
            title={item.title}
            subtitle=""
            extraInfo="চলছে প্রস্তুতি"
            image=""
          />
        ))}
      </div>

      <BottomBar />
    </div>
  );
}
