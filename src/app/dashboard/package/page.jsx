"use client";
import BottomBar from "@/_components/cart/BottomBar";
import ButtonCart from "@/_components/cart/ButtonCart";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaLock, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";

export default function PaymentInfoPage() {
  const params = useParams();
  const idParam = params.subject;

  useEffect(() => {
    console.log("Selected Subject:", idParam);
  }, [idParam]);

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors">
      <div className="w-full py-10 px-4 mx-auto">
        {/* Header Section */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8"
        >
          💳 পেমেন্ট সংক্রান্ত তথ্য ও নির্দেশনা
        </motion.h2>

        {/* Payment Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-5 mb-10"
        >
          <ButtonCart
            size="lg"
            className="flex-1 p-5 text-lg font-semibold bg-green-600 text-white hover:bg-green-700 rounded-xl shadow-md transition-all"
            text={"প্যাকেজ কিনতে এখানে ক্লিক করুন"}
          />
          <ButtonCart
            size="lg"
            className="flex-1 p-5 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-md transition-all"
            text={
              "বিকাশ, রকেট বা অন্য কোন পেমেন্ট মাধ্যম না থাকলে এখানে ক্লিক করুন"
            }
          />
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 shadow-lg p-6 space-y-6"
        >
          <div className="flex items-center gap-3">
            <FaLock className="text-green-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              পেমেন্টে নিরাপত্তার নিশ্চয়তা
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            আমাদের প্ল্যাটফর্মে পেমেন্টের জন্য যে মাধ্যমগুলো রয়েছে, সেগুলো
            প্রত্যেকটি সংশ্লিষ্ট ব্যাংকের অফিসিয়াল গেটওয়ে। এর ফলে আপনার
            প্রতিটি লেনদেন সম্পূর্ণ নিরাপদ ও সুরক্ষিত থাকে।
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            আমরা কখনোই আপনার ব্যাংক বা পেমেন্ট সংক্রান্ত তথ্য সংরক্ষণ করি না।
            সকল পেমেন্ট সরাসরি ব্যাংক ও পেমেন্ট সিস্টেমের নিরাপদ গেটওয়ে ব্যবহার
            করে সম্পন্ন হয়।
          </p>

          <div className="flex items-center gap-3 mt-6">
            <FaMoneyBillWave className="text-blue-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              গ্রহণযোগ্য পেমেন্ট মাধ্যম
            </h3>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-5">
            <li>বিকাশ (bKash)</li>
            <li>রকেট (Rocket)</li>
            <li>নগদ (Nagad)</li>
            <li>কার্ড পেমেন্ট (Visa / Mastercard / Amex)</li>
          </ul>

          <div className="flex items-center gap-3 mt-6">
            <FaInfoCircle className="text-yellow-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              গুরুত্বপূর্ণ তথ্য
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            পেমেন্ট করার পর স্বয়ংক্রিয়ভাবে আপনার অ্যাকাউন্টে কোর্স বা
            প্যাকেজটি সক্রিয় হয়ে যাবে। কোন সমস্যা হলে সাপোর্ট টিমের সাথে
            যোগাযোগ করুন।
          </p>
        </motion.div>
      </div>

      <BottomBar />
    </div>
  );
}
