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
    console.log("heyy")
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
  );
};

export default CameraComponent;
