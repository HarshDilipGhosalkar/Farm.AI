"use client";

import React, { useRef, useEffect, useState } from "react";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = { video: { facingMode: "environment" } }; // Use "environment" for back camera

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          // Attach the stream to the video element
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing the camera:", error);
        });
    } else {
      console.error("getUserMedia is not supported by this browser");
    }
  }, []);

  const captureImage = () => {
    console.log("heyy");
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame on the canvas
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL
      const imageDataURL = canvas.toDataURL("image/png");
      setCapturedImage(imageDataURL);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div>
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            style={{
              position: "absolute",
              top: 10,
              left: 70,
              zIndex: 1,
              width: "50px",
              height: "50px",
            }}
          />
        ) : (
          <div>
            <video
              className="w-full h-[600px]"
              ref={videoRef}
              autoPlay
              playsInline
            />
            <canvas
              style={{ display: "none" }}
              ref={canvasRef}
              width="100%"
              height="600"
            />
            <div
              className="mx-auto  border rounded-[50%] w-[70px] h-[70px]"
              onClick={captureImage}
            ></div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />

            <div
              className="p-[20px] border rounded-[10px] shadow-lg text-gray-600 absolute top-[10px] right-[10px]"
              onClick={uploadImage}
            >
              Upload
            </div>
          </div>
        )}
      </div>
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
            Home
          </div>
          <div
            className="flex items-center justify-center bg-blue-400 mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white"
            onClick={() => router.push("/disease")}
          >
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
            Profile
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraComponent;
