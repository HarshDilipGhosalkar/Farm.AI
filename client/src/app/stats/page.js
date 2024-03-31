"use client";
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle, Rectangle, InfoWindow } from '@react-google-maps/api';
// import ChartComponent from "./linechart";
import BarGraph from "./bar";

const mapContainerStyle = {
    height: "300px",
    width: "100%",
};

// Adjusted center slightly for better initial map positioning
const center = {
    lat: 18.5204,
    lng: 73.8567,
};

const circleOptions1 = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: "#ADD8E6",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10000, // Reduced radius for no overlap
    zIndex: 1,
};

const circleOptions2 = {
    ...circleOptions1,
    fillColor: "#90EE90", // Light Green for the second circle
};

const rectangleOptions = {
    strokeColor: "#FFC0CB",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFC0CB",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
};

// More precise bounds to fit snugly with the circles
const bounds = {
    north: 18.565,
    south: 18.515,
    east: 73.935,
    west: 73.885,
};

const MapComponent = () => {
    const [selectedShape, setSelectedShape] = useState(null);
    const [infoPosition, setInfoPosition] = useState(center);
    const weekData = [10, 20, 15, 25, 30, 35, 20];

    const onCircleClick = (color, position) => {
        setSelectedShape(color);
        setInfoPosition(position);
    };

    return (
        <>
            <div className='w-[100%] flex flex-col justify-center items-center'>
                <div className="w-[100%] bg-white rounded-[15px] p-[20px] flex flex-col justify-center items-center">
                    <h1 className="text-[#1b4788f8] font-bold mb-[40px]">
                        Yearly Sales
                    </h1>
                    <BarGraph data={weekData} />

                </div>
                <div className='w-[90%] h-[200px] p-[5px] '>
                    <div>
                        <h1 className="text-[#1b4788f8] font-bold ml-[25%] mb-[30px]">
                            SOIL HEALTH CARD
                        </h1>
                    </div>

                    <LoadScript googleMapsApiKey="AIzaSyCea8ZMfVU-wUNW7OdWq04W1EdK8PZlxhY">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={11}
                        >
                            <Circle
                                center={{ lat: 18.5204, lng: 73.8567 }}
                                options={circleOptions1}
                                onClick={() => onCircleClick(circleOptions1.fillColor, { lat: 18.5204, lng: 73.8567 })}
                            />
                            <Circle
                                center={{ lat: 18.5304, lng: 73.935 }} // Adjusted for no overlap
                                options={circleOptions2}
                                onClick={() => onCircleClick(circleOptions2.fillColor, { lat: 18.5304, lng: 73.935 })}
                            />
                            <Rectangle
                                bounds={bounds}
                                options={rectangleOptions}
                                onClick={() => {
                                    setSelectedShape(rectangleOptions.fillColor);
                                    setInfoPosition({ lat: 18.540, lng: 73.910 }); // Center of the rectangle
                                }}
                            />

                            {selectedShape && (
                                <InfoWindow
                                    position={infoPosition}
                                    onCloseClick={() => setSelectedShape(null)}
                                >
                                    <div>
                                        <h2 className='text-[14px] font-bold'>SOIL HEALTH CARD</h2>
                                        <p>N:12</p>
                                        <p>P:14</p>
                                        <p>K:11</p>
                                        <p>PH:19</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

        </>

    );
};

export default MapComponent;
