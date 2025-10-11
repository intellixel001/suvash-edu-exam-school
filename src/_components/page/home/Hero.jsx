"use client";

import { FaBookOpen, FaGraduationCap } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative lg:min-h-[90vh] lg:pt-5 pt-[100px] flex bg-gray-100 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-10 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            Learn <span className="text-blue-500">Anytime</span>, Anywhere!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
            Join EduLearn today and unlock your potential with hundreds of
            courses and exams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
            <a
              href="/signup"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-lg"
            >
              <FaGraduationCap /> Get Started
            </a>
            <a
              href="/courses"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition shadow-lg"
            >
              <FaBookOpen /> Explore Courses
            </a>
          </div>
        </div>

        {/* Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img
            src="/img/hero.png"
            alt="Students Learning"
            className="w-80 sm:w-96 lg:w-full animate-fade-in"
          />
        </div>
      </div>

      {/* Floating Gradient Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-green-400 to-teal-500 rounded-full opacity-20 blur-3xl animate-pulse-slow pointer-events-none"></div>
    </section>
  );
}
