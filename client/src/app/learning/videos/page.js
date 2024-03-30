"use client"

import Navbar from '@/components/learning/Navbar';
import { useState } from 'react';
import React from "react";
import VideoCard from "@/components/learning/VideoCard"; // Import your VideoCard component

const MyPage = () => {
  const [topic, setTopic] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ topic }).toString()
      };

      const response = await fetch("http://localhost:5000/search", requestOptions);
      const result = await response.json();
      console.log(result);
      setVideos(result);
    } catch (error) {
      console.error(error);
    }
  };


  return (
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
    <button onClick={handleSearch} className="border border-gray-300 rounded-md py-2 px-4 bg-green-200 hover:bg-green-400 ">Search</button>
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
  );
};

export default MyPage;
