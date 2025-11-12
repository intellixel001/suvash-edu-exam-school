"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function CookieSync() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshAccessToken = searchParams.get("refreshAccessToken");

    let needReload = false;

    if (accessToken && !localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", accessToken);
      needReload = true;
    }

    if (refreshAccessToken && !localStorage.getItem("refreshToken")) {
      localStorage.setItem("refreshToken", refreshAccessToken);

      needReload = true;
    }

    if (needReload) {
      // Remove query params to avoid setting cookies again
      const cleanUrl = window.location.origin + pathname;
      window.location.replace(cleanUrl);
    }
  }, [searchParams, pathname]);

  return <></>;
}
