import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const FeaturedSections = () => {
  // APOD States
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNasaData, setShowNasaData] = useState(false);

  // CME States
  const [cmeData, setCmeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCmeData, setShowCmeData] = useState(false);

  // Mars Rover States
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [roverLoading, setRoverLoading] = useState(false);
  const [showRoverPhotos, setShowRoverPhotos] = useState(false);

  const API_KEY = "";
  const [selectedRover, setSelectedRover] = useState("curiosity");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const fetchRoverPhotos = async () => {
    setRoverLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos`,
        {
          params: {
            earth_date: selectedDate || "2023-04-23",
            api_key: "LNFCt0b3t2h2CxPZW5jAdYP4xUTZ82or2P6dczRD",
          },
        }
      );
      setRoverPhotos(response.data.photos);
      setShowRoverPhotos(true);
    } catch (err) {
      console.error("Error fetching rover photos:", err);
    } finally {
      setRoverLoading(false);
    }
  };

  useEffect(() => {
    fetchRoverPhotos();
  }, [selectedDate, selectedRover]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      );
      const data = await response.json();
      setNasaData(data);
      setShowNasaData(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      setLoading(false);
    }
  };

  const fetchCMEData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/DONKI/CMEAnalysis?startDate=${format(
          new Date("2016-09-01"),
          "yyyy-MM-dd"
        )}&endDate=${format(
          new Date("2016-09-30"),
          "yyyy-MM-dd"
        )}&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=${API_KEY}`
      );
      setCmeData(response.data);
      setShowCmeData(true);
    } catch (err) {
      console.error("Error fetching CME data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* APOD */}
        <div
          className="bg-dark p-8 rounded"
          style={{
            backgroundColor: "#0d0829",
            "--dark-hover": "#0a0620", // Darker color for hover state
          }}
        >
          <h3 className="text-2xl font-semibold mb-4">APOD</h3>
          <p className="text-lg">
            Explore stunning Astronomy Picture of the Day.
          </p>
          <button
            className="mt-4 bg-dark-hover text-white py-2 px-4 rounded"
            style={{
              backgroundColor: "#262144",
            }}
            onClick={fetchData}
          >
            Explore APOD
          </button>
          {loading && <p className="mt-8 text-center">Loading APOD...</p>}
          {showNasaData && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-center">
                {nasaData?.title}
              </h2>
              {nasaData?.media_type === "image" && (
                <img
                  src={nasaData?.url}
                  alt={nasaData?.title}
                  className="mt-4 mx-auto rounded-lg shadow-md"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
              <p className="mt-4">{nasaData?.explanation}</p>
              <p className="mt-2">Date: {nasaData?.date}</p>
              <p className="mt-2">Copyright: {nasaData?.copyright}</p>
            </div>
          )}
        </div>

        {/* DONKI */}
        <div
          className="bg-dark p-8 rounded"
          style={{
            backgroundColor: "#0d0829",
            "--dark-hover": "#0a0620", // Darker color for hover state
          }}
        >
          <h3 className="text-2xl font-semibold mb-4">DONKI</h3>
          <p className="text-lg">
            Space Weather Database Of Notifications, Knowledge, Information.
          </p>
          <button
            className="mt-4 bg-dark-hover text-white py-2 px-4 rounded"
            style={{
              backgroundColor: "#262144",
            }}
            onClick={fetchCMEData}
          >
            Learn More
          </button>
          {isLoading && <p className="mt-8 text-center">Loading CME data...</p>}
          {showCmeData && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-center">CME Data</h2>
              <ul className="mt-4">
                {cmeData.map((cme, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      CME ID: {cme.associatedCMEID}
                    </h3>
                    <p>
                      <strong>Date:</strong> {cme.time21_5}
                    </p>
                    <p>
                      <strong>Location:</strong> {cme.latitude}, {cme.longitude}
                    </p>
                    <p>
                      <strong>Speed:</strong> {cme.speed} km/s
                    </p>
                    <p>
                      <strong>Half Angle:</strong> {cme.halfAngle}°
                    </p>
                    <p>
                      <strong>Type:</strong> {cme.type}
                    </p>
                    <p>
                      <strong>Note:</strong> {cme.note}
                    </p>
                    <a
                      href={cme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Details
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mars Rover */}
        <div
          className="bg-dark p-8 rounded"
          style={{
            backgroundColor: "#0d0829",
            "--dark-hover": "#0a0620", // Darker color for hover state
          }}
        >
          <h3 className="text-2xl font-semibold mb-4">Mars Rover Photos</h3>
          <p className="text-lg">
            Explore the latest photos captured by the Mars rovers.
          </p>
          <button
            className="mt-4 bg-dark-hover text-white py-2 px-4 rounded"
            style={{
              backgroundColor: "#262144",
            }}
            onClick={fetchRoverPhotos}
          >
            View Photos
          </button>
          {roverLoading && (
            <p className="mt-8 text-center">Loading Mars Rover photos...</p>
          )}
          {showRoverPhotos && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roverPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.img_src}
                  alt={`Mars Rover Photo ${index + 1}`}
                  className="rounded-lg shadow-md"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
