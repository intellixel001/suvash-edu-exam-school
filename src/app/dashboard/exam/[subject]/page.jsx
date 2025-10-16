"use client";
import BigInfoCard from "@/_components/cart/BigInfoCart";
import BottomBar from "@/_components/cart/BottomBar";
import ButtonCart from "@/_components/cart/ButtonCart";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const [cardData, set_cardData] = useState([]);

  useEffect(() => {
    set_cardData([
      {
        link: "/dashboard/exam/routine/123",
        title: "রুটিন",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/routine_icon.png",
      },
      {
        link: "/dashboard/exam/result/123",
        title: "ফলাফল",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/result_icon.png",
      },
      {
        link: "/dashboard/exam/archive/123",
        title: "আর্কাইভ",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/archive_icon.png",
      },
      {
        link: "/dashboard/exam/graph-view/123",
        title: "পরিসংখ্যান",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/graph_icon.png",
      },
      {
        link: "/dashboard/exam/favorite/123",
        title: "ফেভারিট",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/fovirite_icon.png",
      },
      {
        link: "/dashboard/exam/merit/123",
        title: "মেধাতালিকা",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/merit_icon.png",
      },
      {
        link: "/dashboard/exam/syllabus/123",
        title: "সিলেবাস",
        image:
          "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/syllabus_icon.png",
      },
    ]);
  }, []);

  // Get the id from URL
  const idParam = params.subject;
  console.log({ idParam });
  return (
    <div>
      <div className="min-h-screen">
        <div className="w-full py-6">
          <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 border border-gray-400 p-4 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
            Friday, 17 Oct 2025 আপনি ২৪ ঘন্টার যেকোনো সময় পরীক্ষা দিতে পারবেন। -
            পরীক্ষার টপিক/সিলেবাস জানতে "রুটিন" বাটন চাপুন। - আগের সকল পরীক্ষার
            প্রশ্ন দেখতে "আর্কাইভ" বাটন চাপুন।
          </h2>

          <div className="flex items-center justify-center mb-5 gap-5">
            <ButtonCart size="lg" className="w-full p-5" text={"Enter Exam"} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {cardData.map((item, i) => (
              <BigInfoCard
                onClick={() => router.push(item.link || "")}
                key={i}
                title={item.title}
                subtitle=""
                image={item.image}
              />
            ))}
          </div>

          <BottomBar />
        </div>
      </div>
    </div>
  );
}
