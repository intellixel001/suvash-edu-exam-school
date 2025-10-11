import React from "react";
import SignupForm from "./SignupForm";

export const metadata = {
  title: "Sign Up - EduLearn",
  description: "Create your EduLearn account to access courses and exams",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center lg:py-[100px] py-[50px] justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <SignupForm />
    </main>
  );
}
