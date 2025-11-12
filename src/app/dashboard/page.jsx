"use client";
import BigInfoCard from "@/_components/cart/BigInfoCart";
import ButtonCart from "@/_components/cart/ButtonCart";
import Popup from "@/_components/cart/Popup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFacebook, FaShoppingBag } from "react-icons/fa";
import MainExamSection from "./component/MainExamSection";

export default function page() {
  const [openNotice, setOpenNotice] = useState(false);
  const router = useRouter();

  return (
    <>
      <div>
        <div className="lg:p-6 p-2 min-h-screen transition-colors duration-300">
          <div className="flex flex-col mb-2 sm:flex-row items-center justify-between w-full max-w-2xl mx-auto p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition">
            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 text-center sm:text-left mb-3 sm:mb-0">
              You don’t have any active package.
            </p>

            <Link href="/dashboard/subcription">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition">
                <FaShoppingBag className="text-lg" />
                <span>Buy Package</span>
              </button>
            </Link>
          </div>

          <MainExamSection />

          <div className="flex items-center justify-center my-10 gap-5">
            <ButtonCart
              size="lg"
              onClick={() => setOpenNotice(true)}
              text={"নোটিশ"}
            />
            <ButtonCart
              size="lg"
              icon={<FaFacebook />}
              text="মেসেজ দিন"
              variant="secondary"
            />
          </div>

          <Popup
            isOpen={openNotice}
            onClose={() => setOpenNotice(false)}
            title="Our Notice!"
          >
            <p className="mb-4 text-center">
              This is a reusable popup modal you can use anywhere in your app.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setOpenNotice(false)}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Got it!
              </button>
            </div>
          </Popup>
        </div>
      </div>
    </>
  );
}
