import React from "react";
import Navbar from "@/components/learning/Navbar";
import { useRouter } from "next/router";
import nutritionModules from "@/utils/nutritionModules";
import Link from "next/link";

const Module = () => {
  const router = useRouter();
  const id = parseInt(router.query.id);
  const module = nutritionModules[id - 1];
  return (
    <div className="mb-[20px]">
      <Navbar />
      {module ? (
        <div className="mx-5 mt-[40px] pb-[20px]">
          <div className="flex flex-row">
            <h1 className="text-4xl font-san font-black ">{module.number}</h1>
            <span
              className={`w-[200px] h-[5px] mx-[10px] mt-[30px] bg-green-500`}
            ></span>
          </div>
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <p className="text-base mt-[30px] mb-[20px] tracking-wide text-[#1669C9] cursor-pointer">
            Translate in हिंदी
          </p>
          <hr className="mb-[20px]" />
          {module.content}
        </div>
      ) : null}
    </div>
  );
};

export default Module;
