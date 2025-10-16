"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaRegEdit,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const user = {
    name: "Shamin Ahmed",
    email: "shamin@email.com",
    phone: "+8801XXXXXXXXX",
    joined: "March 12, 2024",
    avatar: "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
      >
        <div className="flex flex-col items-center mb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
            />
          ) : (
            <FaUserCircle className="text-7xl text-gray-400 dark:text-gray-500" />
          )}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-3">
            {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Joined: {user.joined}
          </p>
        </div>

        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/40">
            <FaEnvelope className="text-green-500" />
            <span className="text-gray-700 dark:text-gray-200">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/40">
            <FaPhoneAlt className="text-green-500" />
            <span className="text-gray-700 dark:text-gray-200">
              {user.phone}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/profile/edit")}
          className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all"
        >
          <FaRegEdit /> Edit Profile
        </button>
      </motion.div>
    </div>
  );
}
