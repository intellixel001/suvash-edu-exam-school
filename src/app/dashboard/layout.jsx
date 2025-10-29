"use client";
import DashboardTopBar from "@/_components/shared/DashboardTopBar";
import Sidebar from "@/_components/shared/Sidebar ";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [slider_toggle_bar, set_slider_toggle_bar] = useState(false);
  return (
    <>
      <Sidebar
        slider_toggle_bar={slider_toggle_bar}
        set_slider_toggle_bar={set_slider_toggle_bar}
      />

      <div className="bg-[#e1dfd6] container mx-auto px-4 dark:bg-slate-950">
        <DashboardTopBar set_slider_toggle_bar={set_slider_toggle_bar} />
        {children}
      </div>
    </>
  );
}
