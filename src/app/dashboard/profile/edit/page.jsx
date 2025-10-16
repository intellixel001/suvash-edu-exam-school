"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Shamin Ahmed",
    email: "shamin@email.com",
    phone: "+8801XXXXXXXXX",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", form);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Edit Profile
        </h2>

        {/* Name */}
        <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700/40">
          <FaUser className="text-green-500" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
            placeholder="Full Name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700/40">
          <FaEnvelope className="text-green-500" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
            placeholder="Email"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700/40">
          <FaPhoneAlt className="text-green-500" />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
            placeholder="Phone Number"
          />
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <FaArrowLeft /> Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition-all"
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
}
