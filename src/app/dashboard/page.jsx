"use client";
import BigInfoCard from "@/_components/cart/BigInfoCart";
import ButtonCart from "@/_components/cart/ButtonCart";
import Popup from "@/_components/cart/Popup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";

export default function page() {
  const [openNotice, setOpenNotice] = useState(false);
  const router = useRouter();

  return (
    <>
      <div>
        <div className="p-6 min-h-screen transition-colors duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <BigInfoCard
              onClick={() => router.push("/dashboard/class", { scroll: true })}
              image="https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/exam_icon.png"
              title="Exam Section"
              subtitle="Live Exam, Archive, Routine, Syllabus, Merit list etc."
              extraInfo="লাইভ পরীক্ষা চলছে"
            />

            <BigInfoCard
              image="https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/premium_icon.png"
              title="Premium Section"
              subtitle="Dynamic Panel, Confusion Series etc."
            />

            <BigInfoCard
              image="https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/videolecture.png"
              title="Video Section"
              subtitle="Video Lectures"
            />

            <BigInfoCard
              image="https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/sheet_icon.png"
              title="PDF Section"
              subtitle="Monthly Current News, Lecture Sheets, Routine PDFs etc."
            />

            <BigInfoCard
              image="https://elasticbeanstalk-ap-southeast-1-051040323559.s3.amazonaws.com/livemcq-files/public/img/group_study.png"
              title="Study Group Section"
              subtitle="Group Study and Report"
            />
          </div>

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
