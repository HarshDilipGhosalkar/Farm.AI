"use client"

import React from "react";
import Navbar from "@/components/learning/Navbar";
import healthModules from "@/utils/healthModule";
import HealthCard from "@/components/learning/HealthCard";

const HealthCare = () => {
  return (
    <div class="">
      <Navbar link={"learning"} />
      <div className="w-full flex flex-col px-[20px] ">
        <div className="flex flex-row ">
          <div className="grid grid-cols-1 gap-y-8">
            {healthModules.map((module) => (
              <HealthCard
                number={module.number}
                title={module.title}
                content={module.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCare;
