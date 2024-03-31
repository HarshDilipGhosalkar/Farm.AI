"use client";
import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import translate from "translate";
import axios from "axios";
import { useRouter } from "next/navigation";

const Disease = () => {
  const selectedLanguage = localStorage.getItem("selectedLanguage");
  const [language, setLanguage] = useState("en");
  const [prevLanguage, setPrevLanguage] = useState("en");
  const [engArr, setEngArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseInfo, setResponseInfo] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [modalText, setModalText] = useState(""); // State to hold modal text content
  const [level, setLevel] = useState("1");
  const [fertilizer, setFertilizer] = useState([]);
  const [treatment, setTreatment] = useState([]);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      setLoading(true);

      fetch("https://codeshashtra-allstackers.onrender.com/diseasePrediction", {
        method: "POST",
        body: formData,
        mode: "cors",
        headers: {},
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          setResponseInfo(result.data);
          setLevel(result.data.lossRating);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setLoading(false));
    } else {
      console.warn("No image selected");
    }
  };

  const openModal = async () => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        symptoms: responseInfo.plant_description,
        cropName: responseInfo.cropName,
        disease_name: responseInfo.disease_name,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://ipd-670g.onrender.com/remedies", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          console.log(result.data);
          setFertilizer(result.data.Fertilizer);
          setTreatment([]);
          setTreatment(result.data.Treatment);
          setShowModal(true);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeLang = async (lang) => {
    // Your language change logic
  };

  useEffect(() => {
    changeLang(language);
  }, [language]);

  return (
    <>
      <div className="bg-white flex flex-col min-h-screen w-full relative">
        {responseInfo ? (
          <div className="flex flex-col min-h-screen">
            <div className="h-[40%]">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Background"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="h-[65%] bg-white p-7">
              <div className="flex justify-between">
                <div
                  className={` px-3 text-[15px] font-semibold rounded-md  mb-7 w-fit ${
                    responseInfo.health_status === "yes"
                      ? "bg-[#e2f5ef] text-[#0d9e6b]"
                      : "bg-red-100 border-[1px] text-red-800"
                  }`}
                >
                  {responseInfo.health_status === "yes" ? (
                    <>
                      {selectedLanguage === "english" ? (
                        <>Healthy</>
                      ) : selectedLanguage === "hindi" ? (
                        <>स्वस्थ</>
                      ) : selectedLanguage === "marathi" ? (
                        <>आरोग्यदायी</>
                      ) : selectedLanguage === "gujarati" ? (
                        <>આરોગ્યકર</>
                      ) : selectedLanguage === "tamil" ? (
                        <>ஆரோக்கியமான</>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>
                      {selectedLanguage === "english" ? (
                        <>Not Healthy</>
                      ) : selectedLanguage === "hindi" ? (
                        <>अस्वस्थ</>
                      ) : selectedLanguage === "marathi" ? (
                        <>आरोग्यकर नाही</>
                      ) : selectedLanguage === "gujarati" ? (
                        <>અન્ય નહીં</>
                      ) : selectedLanguage === "tamil" ? (
                        <>ஆரோக்கியமான இல்லை</>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
                {responseInfo.health_status === "yes" ? (
                  <></>
                ) : (
                  <>
                    {level == "2" ? (
                      <>
                        {!loading ? (
                          <div
                            className={` cursor-pointer px-3 text-[15px] font-semibold rounded-md mb-7 w-fit bg-[#e2f5ef] text-[#0d9e6b]`}
                            onClick={openModal}
                          >
                            {selectedLanguage === "english" ? (
                              <>Get remedies</>
                            ) : selectedLanguage === "hindi" ? (
                              <>उपाय प्राप्त करें</>
                            ) : selectedLanguage === "marathi" ? (
                              <>उपचार मिळवा</>
                            ) : selectedLanguage === "gujarati" ? (
                              <>ઉપાયો મેળવો</>
                            ) : selectedLanguage === "tamil" ? (
                              <>தீர்வுகளைப் பெறவும்</>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          <ScaleLoader color="#2563eb" />
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
              <div className="text-[35px] font-bold mb-6">
                {responseInfo.cropName}
              </div>
              {responseInfo.health_status === "yes" ? (
                <></>
              ) : (
                <div className="flex flex-col mb-7">
                  <p className="text-[18px] mb-[6px] font-semibold">
                    {selectedLanguage === "english" ? (
                      <>Disease</>
                    ) : selectedLanguage === "hindi" ? (
                      <>रोग</>
                    ) : selectedLanguage === "marathi" ? (
                      <>रोग</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>રોગ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>நோய்</>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="bg-gray-200 px-3 rounded-md w-fit">
                    {responseInfo.disease_name}
                  </p>
                </div>
              )}

              <div className="flex flex-col mb-10">
                <p className="text-[18px] mb-[6px] font-semibold">
                  {selectedLanguage === "english" ? (
                    <>Description</>
                  ) : selectedLanguage === "hindi" ? (
                    <>विवरण</>
                  ) : selectedLanguage === "marathi" ? (
                    <>वर्णन</>
                  ) : selectedLanguage === "gujarati" ? (
                    <>વર્ણન</>
                  ) : selectedLanguage === "tamil" ? (
                    <>விளக்கம்</>
                  ) : (
                    ""
                  )}
                </p>
                <p className="">{responseInfo.plant_description}</p>
              </div>
            </div>
            <div
              className={`flex flex-col w-[90%] mx-auto rounded-[10px] border ${
                level == "1" && "border-[#0d9e6b]"
              } ${level == "2" && "border-[#ffb466]"} ${
                level == "3" && " border-red-500"
              }px-[5px] py-[10px] bg-[white]`}
            >
              <div className="flex flex-row items-center justify-center">
                <div className="font-semibold text-[16px]">
                  {selectedLanguage === "english" ? (
                    <>Level of Damage</>
                  ) : selectedLanguage === "hindi" ? (
                    <>नुकसान का स्तर</>
                  ) : selectedLanguage === "marathi" ? (
                    <>क्षतिप्रमाण</>
                  ) : selectedLanguage === "gujarati" ? (
                    <>ક્ષતિનો સ્તર</>
                  ) : selectedLanguage === "tamil" ? (
                    <>சேதம் அளவு</>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex flex-col w-[90%] self-center justify-between">
                {/* className={` px-3 text-[15px] font-semibold rounded-md  mb-7 w-fit ${
                  responseInfo.health_status === "yes"
                    ? "bg-[#e2f5ef] text-[#0d9e6b]"
                    : "bg-red-100 border-[1px] text-red-800"
                }`} */}
                <div
                  className={`${level == "1" && "bg-[#b3fae1]"} ${
                    level == "2" && "bg-[#ffe7cd]"
                  } ${
                    level == "3" && "bg-red-200"
                  } h-[2px] mt-[25px] mb-[15px] relative rounded-sm`}
                >
                  <div
                    className={`absolute  h-[4px] ${
                      level == "1" && "w-[20px] bg-[#0d9e6b]"
                    } ${level == "2" && "w-[50%] bg-[#ffb466]"} ${
                      level == "3" && "w-[100%] bg-red-500"
                    } mt-[-1px] flex flex-row items-center rounded-sm`}
                  >
                    <div
                      className={`rounded-full w-[10px] h-[10px] ml-auto
                    ${level == "1" && "bg-[#0d9e6b]"} ${
                        level == "2" && "bg-[#ffb466]"
                      } ${level == "3" && " bg-red-500"}`}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <div>
                    {selectedLanguage === "english" ? (
                      <>Low</>
                    ) : selectedLanguage === "hindi" ? (
                      <>कम</>
                    ) : selectedLanguage === "marathi" ? (
                      <>कमी</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>નીચું</>
                    ) : selectedLanguage === "tamil" ? (
                      <>குறைந்த</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {selectedLanguage === "english" ? (
                      <>Medium</>
                    ) : selectedLanguage === "hindi" ? (
                      <>मध्यम</>
                    ) : selectedLanguage === "marathi" ? (
                      <>मध्यम</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>મધ્યમ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>நடுத்தர</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {selectedLanguage === "english" ? (
                      <>High</>
                    ) : selectedLanguage === "hindi" ? (
                      <>उच्च</>
                    ) : selectedLanguage === "marathi" ? (
                      <>उच्च</>
                    ) : selectedLanguage === "gujarati" ? (
                      <>ઉચ્ચ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>உயர்</>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col min-h-screen w-full pt-[20px] items-center">
            <div className="p-8">
              <h2 className=" text-3xl font-bold mb-[25px] text-[#0d9e6b]">
                {selectedLanguage === "english" ? (
                  <>Upload a Photo of your Crop or Plant</>
                ) : selectedLanguage === "hindi" ? (
                  <>अपने फसल या पौधे की एक तस्वीर अपलोड करें</>
                ) : selectedLanguage === "marathi" ? (
                  <>आपल्या शेती किंवा झाडाची फोटो अपलोड करा</>
                ) : selectedLanguage === "gujarati" ? (
                  <>તમારી ફસલ અથવા વનસ્પતિની ફોટો અપલોડ કરો</>
                ) : selectedLanguage === "tamil" ? (
                  <>
                    உங்கள் பயிர் அல்லது செடியின் ஒரு புகைப்படத்தை பதிவேற்றுங்கள்
                  </>
                ) : (
                  ""
                )}
              </h2>
              <p className="mb-[15px] text-black">
                {selectedLanguage === "english" ? (
                  <>
                    Stay informed about potential threats and take proactive
                    measures to protect your harvest and maximize yields
                  </>
                ) : selectedLanguage === "hindi" ? (
                  <>
                    संभावित खतरों के बारे में सूचित रहें और अपनी फसल की सुरक्षा
                    और उत्पादकता को बढ़ाने के लिए पूर्वनिर्धारित उपाय अपनाएं
                  </>
                ) : selectedLanguage === "marathi" ? (
                  <>
                    संभाव्य धोक्यांचे सारख्या धोक्यांबद्दल सूचित राहा आणि आपल्या
                    फसलाची सुरक्षा करण्यासाठी आणि उत्पादनाची जास्तीची सुरक्षा
                    करण्यासाठी पूर्वदृष्टीतून कृती करा
                  </>
                ) : selectedLanguage === "gujarati" ? (
                  <>
                    સંભાવિત ધરાવતો વિષે જાણકારી મેળવો અને તમારી ફસલને સંરક્ષિત
                    કરવા અને ઉત્પાદન વધારવા માટે પ્રોએક્ટીવ ઉપાયો અપનાવો
                  </>
                ) : selectedLanguage === "tamil" ? (
                  <>
                    உங்கள் வாழ்க்கைத் தீர்வுகளைப் பற்றி முன்னுரிமையாக அறியுங்கள்
                    மற்றும் உங்கள் உறவுகளை காக்க மற்றும் உற்பத்தியை அதிகரிக்க
                    முன்னுரிமையாக முக்கியமான முறைகளை எடுக்கவும்
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="image"
                className="w-[300px] h-[300px]"
              />
            ) : (
              <div className="p-8 border-[3px] border-dotted border-[#0d9e6b] rounded-lg bg-[#e2f5ef] text-center flex flex-col justify-center items-center ">
                {/* <h2 className="text-xl font-semibold text-[#3f7cf5]">UPLOAD Image</h2> */}
                <label className="flex flex-col justify-center items-center mt-4 ">
                  <div className="cursor-pointer border-2 border-dotted h-[100%] w-[100%] border-[#0d9e6b] px-4 rounded-lg bg-white py-[30px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-[#0d9e6b]"
                      height="24"
                      fill="#0d9e6b"
                      viewBox="0 -960 960 960"
                      stroke="currentColor"
                    >
                      <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                    </svg>
                    <p className="text-[#0d9e6b] mt-2">
                      {selectedLanguage === "english" ? (
                        <>Choose an image or click a photo</>
                      ) : selectedLanguage === "hindi" ? (
                        <>एक छवि चुनें या फोटो क्लिक करें</>
                      ) : selectedLanguage === "marathi" ? (
                        <>एक छवि निवडा किंवा फोटो क्लिक करा</>
                      ) : selectedLanguage === "gujarati" ? (
                        <>એક ચિત્ર પસંદ કરો અથવા ફોટો ક્લિક કરો</>
                      ) : selectedLanguage === "tamil" ? (
                        <>
                          ஒரு படம் தேர்ந்தெடுக்கவும் அல்லது ஒரு புகைப்படத்தை
                          எடுத்துக்கொள்ளவும்
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                    <input
                      className=" hidden"
                      type="file"
                      accept=".jpg,.png,.jpeg,.webp"
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
              </div>
            )}
            {loading ? (
              <div className="mt-4">
                <ScaleLoader color="#2563eb" />
                {selectedLanguage === "english" ? (
                  <>Hold on!</>
                ) : selectedLanguage === "hindi" ? (
                  <>रुको!</>
                ) : selectedLanguage === "marathi" ? (
                  <>थांबा!</>
                ) : selectedLanguage === "gujarati" ? (
                  <>ધોરણ પર રહો!</>
                ) : selectedLanguage === "tamil" ? (
                  <>நிலையில் இருங்கள்!</>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <button
                className="mt-4 py-2 px-6 bg-[#0d9e6b] text-[#e2f5ef] rounded-full"
                onClick={handleUpload}
              >
                {selectedLanguage === "english" ? (
                  <>Submit Image</>
                ) : selectedLanguage === "hindi" ? (
                  <>छवि सबमिट करें</>
                ) : selectedLanguage === "marathi" ? (
                  <>फोटो सबमिट करा</>
                ) : selectedLanguage === "gujarati" ? (
                  <>ચિત્ર સબમિટ કરો</>
                ) : selectedLanguage === "tamil" ? (
                  <>புகைப்படத்தை சமர்பிக்கவும்</>
                ) : (
                  ""
                )}
              </button>
            )}
          </div>
        )}
        {/* Button to open the modal */}

        {/* Modal */}
        {showModal && (
          <div className="px-[15px] fixed top-0 left-0 w-full h-full  flex justify-center items-center bg-gray-900 bg-opacity-60">
            <div className="bg-white rounded-lg p-6 h-[450px] overflow-y-scroll">
              <h2 className="text-lg font-semibold mb-4">
                {selectedLanguage === "english" ? (
                  <>Fertilizer</>
                ) : selectedLanguage === "hindi" ? (
                  <>उर्वरक</>
                ) : selectedLanguage === "marathi" ? (
                  <>खत</>
                ) : selectedLanguage === "gujarati" ? (
                  <>ખતું</>
                ) : selectedLanguage === "tamil" ? (
                  <>உரவகம்</>
                ) : (
                  ""
                )}
              </h2>
              {fertilizer.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{item.fertilizerName}</p>
                  <p>{item.fertilizer}</p>
                </div>
              ))}
              <h2 className="text-lg font-semibold mt-4 mb-2">
                {selectedLanguage === "english" ? (
                  <>Treatment</>
                ) : selectedLanguage === "hindi" ? (
                  <>उपचार</>
                ) : selectedLanguage === "marathi" ? (
                  <>उपचार</>
                ) : selectedLanguage === "gujarati" ? (
                  <>ઉપચાર</>
                ) : selectedLanguage === "tamil" ? (
                  <>சிகிச்சை</>
                ) : (
                  ""
                )}
              </h2>
              {treatment.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{item.treatmentName}</p>
                  <p>{item.treatment}</p>
                </div>
              ))}

              {/* Close button */}
              <button
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={closeModal}
              >
                {selectedLanguage === "english" ? (
                  <>Close</>
                ) : selectedLanguage === "hindi" ? (
                  <>बंद करें</>
                ) : selectedLanguage === "marathi" ? (
                  <>बंद</>
                ) : selectedLanguage === "gujarati" ? (
                  <>બંધ કરો</>
                ) : selectedLanguage === "tamil" ? (
                  <>மூடு</>
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
        )}
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

export default Disease;
