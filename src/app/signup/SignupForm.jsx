"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup logic here
    alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="relative w-full max-w-md p-10 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Create Account
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Join EduLearn and start learning today
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-lg">
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500 hover:underline font-semibold"
        >
          Login
        </a>
      </p>
    </div>
  );
}
