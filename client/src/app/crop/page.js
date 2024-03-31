"use client";

import { useEffect, useState, React } from "react";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import { Empty } from "antd";

const crop = () => {
  const selectedLanguage = localStorage.getItem("selectedLanguage");

  const router = useRouter();
  const [voiceInput, setVoiceInput] = useState("");
  const [listening, setListening] = useState(false);
  const [cropName, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("");
  const [audioData, setAudioData] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [level, setLevel] = useState(1);
  const [lang, setLang] = useState("");

  useEffect(() => {
    if (audioData) {
      const byteString = atob(audioData);
      const mimeType = "audio/mpeg";
      const buffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(buffer);
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: mimeType });
      setAudioBlob(blob);
      // setIsLoading(false);
    }
  }, [audioData]);

  const play = () => {
    console.log(audioBlob);
    if (audioBlob) {
      console.log("Playing audio...");

      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    }
  };

  const startListening = (language) => {
    if (level == 1) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = language;
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceInput(transcript);
      };
      recognition.onend = () => {
        setListening(false);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          language: "marathi",
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://codeshashtra-allstackers.onrender.com/previousYearCrop",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            const byteString = atob(result.data);
            const mimeType = "audio/mpeg";
            const buffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(buffer);
            for (let i = 0; i < byteString.length; i++) {
              intArray[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([buffer], { type: mimeType });
            setLevel(2);
            const audio = new Audio(URL.createObjectURL(blob));
            audio.play();
            // setIsLoading(false);
          })
          .catch((error) => console.error(error));
      };
      recognition.start();
      play();
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = language;
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceInput(transcript);
      };
      recognition.onend = () => {
        setListening(false);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          crop: voiceInput,
          language: "marathi",
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://codeshashtra-allstackers.onrender.com/cropRecommendation",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setCropName(result.data.crop_name);
            setDescription(result.data.description);
            setPrice(result.data.current_market_price);
            setReason(result.data.reason);
            setLevel(1);
          })
          .catch((error) => console.error(error));
      };
      recognition.start();
    }
  };

  useEffect(() => {
    // Simulated fetch function
    const fetchTasks = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          "https://codeshashtra-allstackers.onrender.com/language?mobile=9137357003",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.data == "marathi") {
              setLang("mr-IN");
            }
            if (result.data == "hindi") {
              setLang("hi-IN");
            }
            if (result.data == "gujarati") {
              setLang("gu-IN");
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  });

  return (
    <>
      <div className="w-[100%] pt-[20px] h-full flex flex-col justify-center items-center">
        <div className="flex items-center w-full px-[20px]">
          <span onClick={() => router.back()} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          <h1 className="w-full text-center font-bold text-2xl">
            {selectedLanguage === "english" ? (
              <>Crop Recommendation</>
            ) : selectedLanguage === "hindi" ? (
              <>फसल की सिफारिश</>
            ) : selectedLanguage === "marathi" ? (
              <>शेतीसाठी सल्ला</>
            ) : selectedLanguage === "gujarati" ? (
              <>ફસલની સૂચના</>
            ) : selectedLanguage === "tamil" ? (
              <>பயிர் பரிந்துரை</>
            ) : (
              ""
            )}
          </h1>
        </div>

        {cropName != "" ? (
          <>
            <div className="bg-gray-100 w-[90%] mt-[20px] border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <h2 className="text-[30px] align-middle font-bold mb-4 text-gray-900">
                {selectedLanguage === "english" ? (
                  <>Crop Details</>
                ) : selectedLanguage === "hindi" ? (
                  <>फसल का विवरण</>
                ) : selectedLanguage === "marathi" ? (
                  <>शेतीचा तपशील</>
                ) : selectedLanguage === "gujarati" ? (
                  <>ફસલની વિગતો</>
                ) : selectedLanguage === "tamil" ? (
                  <>பயிரின் விவரங்கள்</>
                ) : (
                  ""
                )}
              </h2>
              <div className="mb-4">
                <p className="text-lg font-semibold mb-1 text-gray-800">
                  {selectedLanguage === "english" ? (
                    <>Crop Name:</>
                  ) : selectedLanguage === "hindi" ? (
                    <>फसल का नाम:</>
                  ) : selectedLanguage === "marathi" ? (
                    <>शेतीचं नाव:</>
                  ) : selectedLanguage === "gujarati" ? (
                    <>ફસલનું નામ:</>
                  ) : selectedLanguage === "tamil" ? (
                    <>பயிரின் பெயர்:</>
                  ) : (
                    ""
                  )}
                </p>
                <p className="text-lg font-medium text-gray-700">{cropName}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold mb-1 text-gray-800">
                  {selectedLanguage === "english" ? (
                    <>Description:</>
                  ) : selectedLanguage === "hindi" ? (
                    <>विवरण:</>
                  ) : selectedLanguage === "marathi" ? (
                    <>वर्णन:</>
                  ) : selectedLanguage === "gujarati" ? (
                    <>વર્ણન:</>
                  ) : selectedLanguage === "tamil" ? (
                    <>விளக்கம்:</>
                  ) : (
                    ""
                  )}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  {description}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold mb-1 text-gray-800">
                  {selectedLanguage === "english" ? (
                    <>Price:</>
                  ) : selectedLanguage === "hindi" ? (
                    <>मूल्य:</>
                  ) : selectedLanguage === "marathi" ? (
                    <>किंमत:</>
                  ) : selectedLanguage === "gujarati" ? (
                    <>કિંમત:</>
                  ) : selectedLanguage === "tamil" ? (
                    <>விலை:</>
                  ) : (
                    ""
                  )}
                </p>
                <p className="text-lg font-medium text-gray-700">{price}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold mb-1 text-gray-800">
                  {selectedLanguage === "english" ? (
                    <>Reason:</>
                  ) : selectedLanguage === "hindi" ? (
                    <>कारण:</>
                  ) : selectedLanguage === "marathi" ? (
                    <>कारण:</>
                  ) : selectedLanguage === "gujarati" ? (
                    <>કારણ:</>
                  ) : selectedLanguage === "tamil" ? (
                    <>காரணம்:</>
                  ) : (
                    ""
                  )}
                </p>
                <p className="text-lg font-medium text-gray-700">{reason}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-[50%]">
            <Empty />
          </div>
        )}

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
      </div>
    </>
  );
};

export default crop;
