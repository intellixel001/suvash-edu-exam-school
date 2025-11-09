"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";

export default function DisplayPackage({
  filterPosition,
  filterClass,
  filterSubject,
}) {
  const [packageData, setPackageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formatDuration = (days) => {
    if (days < 30) return `${days} Day${days > 1 ? "s" : ""}`;

    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} Month${months > 1 ? "s" : ""}`;
    }

    const years = Math.floor(days / 365);
    return `${years} Year${years > 1 ? "s" : ""}`;
  };

  const fetchAllPackages = async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();

      if (filterPosition) query.append("position", filterPosition);
      if (filterClass) query.append("className", filterClass);
      if (filterSubject) query.append("subject", filterSubject);

      const res = await apiClient(
        `/student/exam/package/get?${query.toString()}`
      );

      setPackageData(res.data || []);
    } catch (err) {
      console.error("❌ fetchAllPackages error:", err);
      setPackageData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, [filterPosition, filterClass, filterSubject]);

  const handleBuyPackage = (id) => {
    router.push(`/dashboard/subcription/purchase/${id}`);
  };

  if (isLoading)
    return (
      <p className="text-center py-4 text-gray-600 animate-pulse">
        Loading packages...
      </p>
    );

  if (!packageData.length)
    return (
      <p className="text-center py-6 text-gray-500">No package found 👀</p>
    );

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {packageData.map((pkg) => {
        const durationLabel = formatDuration(pkg.duration);

        return (
          <div
            key={pkg._id}
            className="bg-white shadow-md flex justify-between rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="w-[75%]">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {pkg.name}
              </h3>

              <p className="text-sm text-gray-700 mb-1">
                <span className="font-semibold"> Duration:</span>{" "}
                <span className="text-blue-600 font-medium">
                  {durationLabel}
                </span>
              </p>

              <div className="text-sm text-gray-600 mt-2">
                <p className="text-gray-700">
                  You can access
                  {[
                    pkg.position,
                    pkg.classId ? `${pkg.classId}` : null,
                    pkg.subjectId ? `${pkg.subjectId}` : null,
                  ]
                    .filter(Boolean)
                    .join(" - ")}{" "}
                  exam
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <p className="text-xl font-extrabold text-green-600">
                ৳{pkg.price}
              </p>
              <button
                onClick={() => handleBuyPackage(pkg._id)}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Buy Subscription
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
