"use client"

import React, { useState, useRef } from "react";
import Navbar from "@/components/learning/Navbar";
import videos from "@/utils/workoutVideos";
import VideoCard from "@/components/learning/VideoCard";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

const AILearning = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [askAi, setAskAi] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const aiResponseRef = useRef(null);

  const onAskAIhandler = async () => {
    setLoadingAI(true);
    if (aiResponseRef.current) {
      console.log(aiResponseRef.current);
      aiResponseRef.current.scrollIntoView({ behavior: "smooth" });
    }


    try {
      const response = await axios.get('https://allstackers3.onrender.com/workout',
      {
          "headers": {
              "content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
      }
      )
          const data = response.data
          setAiResponse(data.data)
      }
      catch (error) {
          console.log(error)
      }
      finally {
          setLoadingAI(false)
          // setAiResponse('')
      }


  };
  return (
    <div className="">
      <Navbar link={"aiLearning"} />
      <div className="w-full flex flex-col px-[20px] ">
        <h1 className="text-3xl font-bold">AI Learning Bot</h1>

        {/* <div className="flex overflow-x-auto space-x-2 py-[10px]">
          {videos.map((item) => (
            <VideoCard
              title={item.title}
              link={item.url}
              description={item.desc}
            />
          ))}
        </div> */}
        <div
          onClick={() => {
            onAskAIhandler();
            setAskAi(true);
          }}
          className="px-5 py-2 my-5 bg-orange-400 rounded-full w-fit flex mx-auto"
        >
          Get AI Recommended Excersise
        </div>
        {askAi ? (
          <div
            ref={aiResponseRef}
            className=" my-[20px] text-[18px] p-3 rounded-lg bg-purple-100"
          >
            <h1 className="text-xl font-medium"> AI Response :- </h1>
            {loadingAI ? (
              <div className="flex justify-center items-center ml-[30px] mt-[30px]">
                <ScaleLoader className="mr-[10px]" color="#7C3AED" />
                Loading AI Solution...
              </div>
            ) : null}

            <p className="text-gray-700">{aiResponse}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AILearning;
