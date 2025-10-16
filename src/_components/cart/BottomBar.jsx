"use c;lient";
import React from "react";
import ButtonCart from "./ButtonCart";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";

export default function BottomBar() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center my-10 gap-5">
      <ButtonCart size="lg" onClick={() => router.back()} text={"Back"} />
      <ButtonCart
        size="lg"
        icon={<FaFacebook />}
        text="মেসেজ দিন"
        variant="secondary"
      />{" "}
    </div>
  );
}
