"use client";

import BigInfoCard from "@/_components/cart/BigInfoCart";
import BottomBar from "@/_components/cart/BottomBar";
import apiClient from "@/api/apiClient";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const positionParam = params.position;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch classes for this position
  useEffect(() => {
    if (!positionParam) return;

    const fetchOptions = async () => {
      try {
        const data = await apiClient.get(
          `/student/exam/examoption/get/${positionParam}`
        );

        console.log(data);
        if (data.data) {
          setOptions(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [positionParam]);

  if (loading) {
    return <div className="p-6 min-h-screen">Loading...</div>;
  }

  if (!options.length) {
    return (
      <div className="p-6 min-h-screen">
        No classes found for {positionParam}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {options.map((item) => (
          <BigInfoCard
            key={item.id}
            title={item.name}
            subtitle=""
            extraInfo={item.status ? "চলছে প্রস্তুতি" : "Inactive"}
            image=""
            onClick={() =>
              router.push(`/dashboard/${positionParam}/class/${item.id}`)
            }
          />
        ))}
      </div>

      <BottomBar />
    </div>
  );
}
