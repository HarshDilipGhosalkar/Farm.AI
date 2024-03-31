"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = ({ link }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row min-h-[60px] items-center justify-center relative">
        <div className=" absolute left-[20px]" onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>

        <div className=" font-semibold text-[20px]">Learning Modules</div>
      </div>
      <div className="text-[18px]">
        <div className="h-[80px] flex flex-row items-center">
          <div className="flex flex-row box-border mx-auto gap-x-[40px] px-[20px]">
            <div onClick={() => router.push("/learning/learning")}>
              {link == "learning" ? (
                <p className="text-blue-500">Learning</p>
              ) : (
                <p className="">Learning</p>
              )}
            </div>
            <div onClick={() => router.push("/learning/videos")}>
              {link == "videos" ? (
                <p className="text-blue-500">Videos</p>
              ) : (
                <p className="">Videos</p>
              )}
            </div>
            <div onClick={() => router.push("/learning/aiLearning")}>
              {link == "aiLearning" ? (
                <p className="text-blue-500">AI Learning</p>
              ) : (
                <p className="">AI Learning</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
