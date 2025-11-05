"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import BigInfoCard from "@/_components/cart/BigInfoCart";
import BottomBar from "@/_components/cart/BottomBar";
import ButtonCart from "@/_components/cart/ButtonCart";
import apiClient from "@/api/apiClient";

export default function Page() {
  const router = useRouter();
  const currentPathName = usePathname();
  const searchParams = useParams();

  const classParam = searchParams?.class || "";
  const subject = searchParams?.subject || "";

  const idParam2 = searchParams.position;

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        const response = await apiClient.get(
          `/student/exam/get/${idParam2}/${classParam}/${subject}`
        );
        setExam(response.data || null);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong.";
        setErrorMsg(message);
      } finally {
        setLoading(false);
      }
    };

    if (classParam && subject) fetchExam();
  }, [classParam, subject]);

  const [cardData] = useState([
    {
      link: "/routine",
      title: "রুটিন",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/routine_icon.png",
    },
    {
      link: "/result",
      title: "ফলাফল",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/result_icon.png",
    },
    {
      link: "/archive",
      title: "আর্কাইভ",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/archive_icon.png",
    },
    {
      link: "/graph-view",
      title: "পরিসংখ্যান",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/graph_icon.png",
    },
    {
      link: "/favorite",
      title: "ফেভারিট",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/fovirite_icon.png",
    },
    {
      link: "/merit",
      title: "মেধাতালিকা",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/merit_icon.png",
    },
    {
      link: "/syllabus",
      title: "সিলেবাস",
      image:
        "https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/syllabus_icon.png",
    },
  ]);

  const handleCardClick = (link) => {
    if (link === "/merit") {
      router.push(`/dashboard/merit/${exam?._id}`, { scroll: true });
    } else {
      router.push(`${currentPathName}${link}`, { scroll: true });
    }
  };

  // 👉 Calculate whether exam is active within 24h window
  const canEnterExam = (() => {
    if (!exam?.startDate) return false;
    const start = new Date(exam.startDate);
    const now = new Date();
    const diffHours = (now - start) / (1000 * 60 * 60);
    return diffHours >= 0 && diffHours <= 24;
  })();

  const formattedStartDate = exam?.startDate
    ? new Date(exam.startDate).toLocaleString("bn-BD", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : null;

  return (
    <div className="min-h-screen">
      <div className="w-full py-6">
        {/* ✅ Top Info Text */}
        {new Date(exam?.startDate).getTime() + +24 * 60 * 60 * 1000 >
        Date.now() ? (
          <h2 className="text-center text-base font-medium text-gray-800 dark:text-gray-200 border border-gray-300 p-3 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
            {canEnterExam
              ? "আপনি এখন পরীক্ষায় অংশগ্রহণ করতে পারবেন (পরবর্তী ২৪ ঘন্টার মধ্যে)।"
              : `পরীক্ষা শুরু হবে ${formattedStartDate} তারিখে।`}
          </h2>
        ) : (
          <h2 className="text-center text-base font-medium text-gray-800 dark:text-gray-200 border border-gray-300 p-3 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
            {errorMsg || "📄 No Exam Available Now"}
          </h2>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error / No Exam */}
        {/* {!loading && (errorMsg || !exam) && (
          <div className="text-center text-base font-medium text-gray-800 dark:text-gray-200 border border-gray-300 p-3 mb-6 rounded-md bg-gray-50 dark:bg-gray-700">
            {errorMsg || "📄 No Exam Available Now"}
          </div>
        )} */}

        {/* Exam Data Loaded */}
        {!loading && (
          <>
            {exam && canEnterExam && (
              <div className="flex items-center justify-center mb-5 gap-5">
                <ButtonCart
                  onClick={() =>
                    router.push("/dashboard/examplace/" + exam?._id, {
                      scroll: true,
                    })
                  }
                  size="lg"
                  className="w-full p-5"
                  text={"Enter Exam"}
                />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {cardData.map((item, i) => (
                <BigInfoCard
                  key={i}
                  onClick={() => handleCardClick(item.link)}
                  title={item.title}
                  subtitle=""
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom Bar */}
        <BottomBar />
      </div>
    </div>
  );
}
