"use client";
import { useEffect, useState } from "react";

import { getCity } from "@/utils/ApiService";
import { fetchWeatherData } from "@/utils/ApiService";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import getLanguage from "@/utils/language";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [lang, setLang] = useState("");

  const [voiceInput, setVoiceInput] = useState("");
  const [listening, setListening] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    getLanguage().then((language) => {
      setSelectedLanguage(language);
    });
  }, []);

  const getRoute = (text) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      text: text,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://codeshashtra-allstackers.onrender.com/routing", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.push(result.data.slice(1));
      })
      .catch((error) => console.error(error));
  };

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

  useEffect(() => {
    fetchWeatherBasedOnLocation();
  }, []);

  const fetchWeatherBasedOnLocation = async () => {
    setIsLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const city = await getCity(latitude, longitude);
        const [todayWeatherResponse, weekForecastResponse] =
          await fetchWeatherData(latitude, longitude);
        console.log(todayWeatherResponse);
        setWeatherData(todayWeatherResponse);

        setIsLoading(false);
      });
    } catch (error) {
      setError(true);
      setIsLoading(false);
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
            if (result.data == "gujrati") {
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
      {isLoading ? (
        <div className="flex flex-col h-[500px] w-full justify-center items-center">
          <ScaleLoader color="#2563eb" />
          {selectedLanguage === "english" ? (
            <>Hold on!</>
          ) : selectedLanguage === "hindi" ? (
            <>रुको!</>
          ) : selectedLanguage === "marathi" ? (
            <>थांबा!</>
          ) : selectedLanguage === "gujrati" ? (
            <>થામો!</>
          ) : selectedLanguage === "tamil" ? (
            <>நிறுத்தவும்!</>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center p-[20px]">
            <img
              className="w-[45px] h-[45px]"
              src="/assets/images/location-icon.png"
            />
            <h1 className="font-semibold text-xl">Mumbai, Maharastra</h1>
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                  fill="#000000"
                />
                <path
                  d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                  fill="#000000"
                />
                <path
                  d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
          <div className="px-[20px]">
            {weatherData && (
              <div
                className="my-[10px]"
                onClick={() => router.push("/weather")}
              >
                <div className="flex px-[20px] justify-center gap-x-[20px]">
                  <div>
                    <h1 className="font-semibold text-2xl">
                      {selectedLanguage === "english" ? (
                        <>
                          <b>Mumbai,</b> India
                        </>
                      ) : selectedLanguage === "hindi" ? (
                        <>
                          <b>मुंबई,</b> भारत
                        </>
                      ) : selectedLanguage === "marathi" ? (
                        <>
                          <b>मुंबई,</b> भारत
                        </>
                      ) : selectedLanguage === "gujrati" ? (
                        <>
                          <b>મુંબઈ,</b> ભારત
                        </>
                      ) : selectedLanguage === "tamil" ? (
                        <>
                          <b>மும்பை,</b> இந்தியா
                        </>
                      ) : (
                        ""
                      )}
                    </h1>
                    <h1 className="font-black text-5xl text-[#1F2E4B]">
                      {Math.round(weatherData.main.temp)}
                      <span className="font-light">&deg;</span>
                    </h1>
                    <p className="text-[#1F2E4B] font-semibold text-xl">
                      {weatherData.weather[0].main}
                    </p>
                  </div>

                  <img
                    className="w-[130px] h-fit"
                    src="/assets/images/partly-cloudy.png"
                  />
                </div>

                <div className="flex justify-around p-[10px] bg-[#F4F6FF] rounded-[15px] mt-[15px] ">
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-x-[5px] text-blue-400">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M15 4H20M15 8H20M17 12H20M8 15.9998C7.44772 15.9998 7 16.4475 7 16.9998C7 17.5521 7.44772 17.9998 8 17.9998C8.55228 17.9998 9 17.5521 9 16.9998C9 16.4475 8.55228 15.9998 8 15.9998ZM8 15.9998V9M8 16.9998L8.00707 17.0069M12 16.9998C12 19.209 10.2091 20.9998 8 20.9998C5.79086 20.9998 4 19.209 4 16.9998C4 15.9854 4.37764 15.0591 5 14.354L5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V14.354C11.6224 15.0591 12 15.9854 12 16.9998Z"
                            stroke="#00caff"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </p>
                    <p className="font-light text-[#00caff]">
                      {Math.round(weatherData.main.feels_like)} &deg;C
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-x-[5px] text-gray-400">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z"
                            fill="#ff73d9"
                          ></path>
                        </g>
                      </svg>
                    </p>
                    <p className="font-light text-[#ff73d9]">
                      {Math.round(weatherData.wind.speed)} km/h
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-x-[5px] text-gray-400">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"
                            fill="#a855f7"
                          ></path>
                          <path
                            d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"
                            fill="#a855f7"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                            fill="#a855f7"
                          ></path>
                          <path
                            d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"
                            fill="#a855f7"
                          ></path>
                        </g>
                      </svg>
                    </p>
                    <p className="font-light text-purple-500">
                      {weatherData.main.humidity}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-x-[5px] text-gray-400">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M22 14.3529C22 17.4717 19.4416 20 16.2857 20H11M14.381 9.02721C14.9767 8.81911 15.6178 8.70588 16.2857 8.70588C16.9404 8.70588 17.5693 8.81468 18.1551 9.01498M7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H7M7.11616 11.6089C6.88706 10.9978 6.7619 10.3369 6.7619 9.64706C6.7619 6.52827 9.32028 4 12.4762 4C15.4159 4 17.8371 6.19371 18.1551 9.01498M7.11616 11.6089C7.68059 11.7184 8.20528 11.9374 8.66667 12.2426M18.1551 9.01498C18.8381 9.24853 19.4623 9.60648 20 10.0614"
                            stroke="#3b82f6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>
                        </g>
                      </svg>
                    </p>
                    <p className="font-light text-blue-500">
                      {weatherData.clouds.all}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#FBF5F0] mt-[20px] min-h-[400px] p-[20px] pt-[10px] rounded-t-[40px]">
            <div className="flex-col flex items-center w-full py-[5px]">
              <span className="h-[4px] bg-[#DED1BF] rounded-full min-w-[80px]"></span>
              <h1 className="mt-[15px] text-[#321F03] text-[22px] font-semibold">
                {selectedLanguage === "english" ? (
                  <>Manage your field</>
                ) : selectedLanguage === "hindi" ? (
                  <>अपनी खेती का प्रबंधन करें</>
                ) : selectedLanguage === "marathi" ? (
                  <>आपले शेत कायम करा</>
                ) : selectedLanguage === "gujrati" ? (
                  <>તમારું ક્ષેત્ર સંચાલિત કરો</>
                ) : selectedLanguage === "tamil" ? (
                  <>உங்கள் பண்டிகையை நிர்வகிக்கவும்</>
                ) : (
                  ""
                )}
              </h1>
            </div>
            <div class="mt-[30px] grid grid-cols-3 gap-4">
              <div class="col" onClick={() => router.push("/disease")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img className="w-[50px]" src="/assets/images/disease.png" />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Disease</>
                    ) : selectedLanguage === "hindi" ? (
                      <>रोग</>
                    ) : selectedLanguage === "marathi" ? (
                      <>रोग</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>રોગ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>நோய்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div class="col" onClick={() => router.push("/crop")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/crop.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Crop</>
                    ) : selectedLanguage === "hindi" ? (
                      <>फसल</>
                    ) : selectedLanguage === "marathi" ? (
                      <>शेती</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>બિયાન</>
                    ) : selectedLanguage === "tamil" ? (
                      <>விவசாயம்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div class="col" onClick={() => router.push("/timeline")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/routine.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Routine</>
                    ) : selectedLanguage === "hindi" ? (
                      <>रूटीन</>
                    ) : selectedLanguage === "marathi" ? (
                      <>दिवसनियम</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>દરરોજનું કાર્યક્રમ</>
                    ) : selectedLanguage === "tamil" ? (
                      <>தினசரி</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div class="col" onClick={() => router.push("/budgeting")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/finance.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Finance</>
                    ) : selectedLanguage === "hindi" ? (
                      <>वित्त</>
                    ) : selectedLanguage === "marathi" ? (
                      <>वित्त</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>વિત્ત</>
                    ) : selectedLanguage === "tamil" ? (
                      <>நிதி</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div class="col" onClick={() => router.push("/market")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/market.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Market</>
                    ) : selectedLanguage === "hindi" ? (
                      <>बाजार</>
                    ) : selectedLanguage === "marathi" ? (
                      <>बाजार</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>બજાર</>
                    ) : selectedLanguage === "tamil" ? (
                      <>சந்தை</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div
                class="col"
                onClick={() => router.push("/learning/learning")}
              >
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/book.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Learning</>
                    ) : selectedLanguage === "hindi" ? (
                      <>सीखना</>
                    ) : selectedLanguage === "marathi" ? (
                      <>शिकणे</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>શીખવાનું</>
                    ) : selectedLanguage === "tamil" ? (
                      <>கற்றுக்கொள்ளுதல்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div class="col" onClick={() => router.push("/marketplace/maps")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/fertilizer.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Retailer</>
                    ) : selectedLanguage === "hindi" ? (
                      <>विपणनकर्ता</>
                    ) : selectedLanguage === "marathi" ? (
                      <>खरेदीदार</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>વેચાણકર્તા</>
                    ) : selectedLanguage === "tamil" ? (
                      <>விற்பனையாளர்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div class="col" onClick={() => router.push("/social")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/community.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Community</>
                    ) : selectedLanguage === "hindi" ? (
                      <>समुदाय</>
                    ) : selectedLanguage === "marathi" ? (
                      <>समुदाय</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>સમુદાય</>
                    ) : selectedLanguage === "tamil" ? (
                      <>சமூகம்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              {/* <div class="col" onClick={() => router.push("/supply-chain")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/supplychain.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>SupplyChain</>
                    ) : selectedLanguage === "hindi" ? (
                      <>आपूर्ति श्रृंखला</>
                    ) : selectedLanguage === "marathi" ? (
                      <>पुरवठा श्रेणी</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>સપ્લાય ચેન</>
                    ) : selectedLanguage === "tamil" ? (
                      <>சப்ளை சேன்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div> */}

              <div class="col" onClick={() => router.push("/stats")}>
                <div class="flex flex-col gap-y-[10px] items-center rounded-lg p-[10px] bg-white">
                  <img
                    className="w-[50px] rounded-lg"
                    src="/assets/images/statistics.png"
                  />
                  <p className="font-semibold text-[#321F03]">
                    {selectedLanguage === "english" ? (
                      <>Statistics</>
                    ) : selectedLanguage === "hindi" ? (
                      <>आँकड़े</>
                    ) : selectedLanguage === "marathi" ? (
                      <>अंकगणित</>
                    ) : selectedLanguage === "gujrati" ? (
                      <>આંકડાશાસ્ત્ર</>
                    ) : selectedLanguage === "tamil" ? (
                      <>புள்ளிவிவரம்</>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                </div>
            </div>
          </div>
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
              ) : selectedLanguage === "gujrati" ? (
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
              ) : selectedLanguage === "gujrati" ? (
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
}
