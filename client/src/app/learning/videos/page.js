"use client";

import Navbar from "@/components/learning/Navbar";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/learning/VideoCard"; // Import your VideoCard component
import { ScaleLoader } from "react-spinners";

const MyPage = () => {
  const selectedLanguage = localStorage.getItem("selectedLanguage");
  const [topic, setTopic] = useState("");
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  const [voiceInput, setVoiceInput] = useState("");
  const [listening, setListening] = useState(false);
  
  const startListening = (language) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.onstart = () => {
      setListening(true);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      console.log(transcript);
      getRoute(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.start();
  };

  const handleSearch = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ topic }).toString(),
      };

      const response = await fetch(
        "https://ipd-670g.onrender.com/search",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setVideos(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="">
        <Navbar link={"videos"} />
        <div>
          <div className="flex gap-4 px-8">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
              className="border border-gray-300 rounded-md py-2 px-4"
            />
            <button
              onClick={handleSearch}
              className="border border-gray-300 rounded-md py-2 px-4 bg-green-200 hover:bg-green-400 "
            >
              Search
            </button>
          </div>
          <div className="pt-6 ">
            {videos.map((video, index) => (
              <VideoCard
                key={index}
                title={video.title}
                link={video.link} // Assuming your backend provides description
              />
            ))}
          </div>
        </div>
      </div>
      <>
        {voiceInput.length > 3 && (
          <div className="fixed bottom-[80px] w-full px-[20px] py-[10px] pb-[25px]">
            <div className="px-[20px] py-[10px] border w-full bg-gray-100 rounded-[10px] text-black">
              {voiceInput}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 w-full bg-white border shadow-lg bottom-navbar">
          <div className="flex justify-around gap-x-[5px] px-[30px] py-[10px] text-gray-400">
            <div
              className={`flex flex-col items-center hover:text-green-400 `}
              onClick={() => router.push("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-[35px] h-[35px]"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              {selectedLanguage === "english" ? (
                <>Home</>
              ) : selectedLanguage === "hindi" ? (
                <>होम</>
              ) : selectedLanguage === "marathi" ? (
                <>होम</>
              ) : selectedLanguage === "gujarati" ? (
                <>હોમ</>
              ) : selectedLanguage === "tamil" ? (
                <>ஹோம்</>
              ) : (
                ""
              )}
            </div>
            <div
              className={`flex items-center justify-center ${
                listening ? "bg-green-400" : "bg-blue-400"
              }  mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white`}
              onClick={() => startListening("en-US")}
            >
              {!listening ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[35px] h-[35px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              ) : (
                <ScaleLoader color="#ffffff" />
              )}
            </div>
            <div className="flex flex-col items-center hover:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-[35px] h-[35px]"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clip-rule="evenodd"
                />
              </svg>
              {selectedLanguage === "english" ? (
                <>Profile</>
              ) : selectedLanguage === "hindi" ? (
                <>प्रोफाइल</>
              ) : selectedLanguage === "marathi" ? (
                <>प्रोफाईल</>
              ) : selectedLanguage === "gujarati" ? (
                <>પ્રોફાઈલ</>
              ) : selectedLanguage === "tamil" ? (
                <>ப்ரோஃபைல்</>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default MyPage;
