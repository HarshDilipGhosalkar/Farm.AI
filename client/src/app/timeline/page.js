"use client";
import { useEffect, useState, React } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { useRouter } from "next/navigation";
import { Empty } from 'antd';

const timeline = () => {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [voiceInput, setVoiceInput] = useState("");
    const [listening, setListening] = useState(false);
    const [lang, setLang] = useState("");

    const startListening = (language) => {

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = language;
        recognition.onstart = () => {
            setListening(true);
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceInput(transcript);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "text": transcript,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://codeshashtra-allstackers.onrender.com/timeline", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    setTasks(result.data);
                    console.log(result.data);
                })
                .catch((error) => console.error(error));
        };
        recognition.onend = () => {
            setListening(false);

        };
        recognition.start();


    };

    useEffect(() => {
        // Simulated fetch function
        const fetchTasks = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                fetch("https://codeshashtra-allstackers.onrender.com/language?mobile=9137357003", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result)
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
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    });

    return (
        <>
            <div className='w-full h-[100%] flex flex-col justify-center items-center px-[40px]'>
                {tasks.length != 0 ? (<>
                    <p className='text-green-600 text-[30px] font-semibold my-[55px]'>CROP PLANNING</p>

                    <Timeline>
                        {tasks.map((task, index) => (
                            <Timeline.Item key={index} color="green">
                                <p className="text-[19px] font-semibold">{task.task_title}</p>
                                <p className="text-[17px]">{task.description}</p>
                                <p className="text-[15px]">Days Required: {task.days_required}</p>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </>) : <div className="mt-[50%]"><Empty /></div>}

            </div>

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
                        Home
                    </div>
                    <div
                        className="flex items-center justify-center bg-blue-400 mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white"
                        onClick={() => startListening(lang)}
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

}

export default timeline;
