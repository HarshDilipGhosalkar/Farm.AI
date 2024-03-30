"use client"
import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

const InfoWindowContent = ({ placeDetails }) => {
  return (
    <div className="w-[200px] h-[120px]">
      <h3>{placeDetails.name}</h3>
      <p>{placeDetails.vicinity}</p>
      <div className="mt-[15px] w-[100px]"></div>
      <a
        href={`maps/${placeDetails.name}/${placeDetails.vicinity}`}
        className="px-[10px] rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px]"
      >
        Navigate Store
      </a>
    </div>
  );
};

const Map = ({ productType }) => {
  const mapRef = useRef(null);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.07283, lng: 72.88261 },
        zoom: 13,
      });

      const placesService = new window.google.maps.places.PlacesService(map);
      const infowindow = new window.google.maps.InfoWindow({});
      setInfoWindow(infowindow);

      const searchNearby = () => {
        const request = {
          location: map.getCenter(),
          radius: 10000,
          type: "retailors", // Changed to grocery_or_supermarket
          keyword: "farming products", // Use productType instead of foodItem
        };

        placesService.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });

              marker.addListener("click", () => {
                placesService.getDetails(
                  { placeId: place.place_id },
                  (placeDetails, status) => {
                    if (
                      status ===
                      window.google.maps.places.PlacesServiceStatus.OK
                    ) {
                      const contentString = ReactDOMServer.renderToString(
                        <InfoWindowContent placeDetails={placeDetails} />
                      );

                      infowindow.setContent(contentString);
                      infowindow.open(map, marker);
                    }
                  }
                );
              });
            });
          }
        });
      };

      searchNearby();
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      const api = "AIzaSyCea8ZMfVU-wUNW7OdWq04W1EdK8PZlxhY"; // Replace with your actual API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=${api}&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [productType]);

  return <div ref={mapRef} style={{ height: 'calc(100vh - 64px)' }} />;
};

export default Map;
