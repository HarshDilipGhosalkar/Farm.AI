"use client";
import React, { useState, useEffect } from "react";

const LanguageSideBar = () => {
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://codeshashtra-allstackers.onrender.com/language?mobile=9137357003", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          console
          setSelectedLanguage(result.data);
          localStorage.setItem("selectedLanguage", result.data); // Save to localStorage
        } else {
          console.error("Error retrieving language data");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
    localStorage.setItem("selectedLanguage", selectedValue); // Save to localStorage

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: "9137357003",
        language: selectedValue,
      }),
      redirect: "follow",
    };

    fetch("https://codeshashtra-allstackers.onrender.com/language", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="fixed bottom-[160px] left-0 bg-gray-300 rounded-r-[30px] py-[30px] px-[10px]">
        {show ? (
          <div className="text-black flex gap-x-[10px] items-center">
            <select
              className="border rounded p-[5px]"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="gujrati">Gujarati</option>
              <option value="tamil">Tamil</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setShow(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[20px] h-[20px]"
            onClick={() => setShow(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default LanguageSideBar;
