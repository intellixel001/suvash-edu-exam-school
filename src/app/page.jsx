"use client";
import BigInfoCard from "@/_components/cart/BigInfoCart";
import Features from "@/_components/page/home/Features";
import Hero from "@/_components/page/home/Hero";
import PresentationSection from "@/_components/page/home/PresentationSection";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-2">
          <BigInfoCard
            onClick={() => router.push("/dashboard/position", { scroll: true })}
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
      </div>
      <Features />
      <PresentationSection />
    </>
  );
}
