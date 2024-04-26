import React, { useState, useEffect } from "react";
import axios from "axios";

const MarsRover = () => {
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2023-04-23"); // Initial date
  const [selectedRover, setSelectedRover] = useState("curiosity"); // Initial rover

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos`,
          {
            params: {
              earth_date: selectedDate,
              api_key: "cALUbdZKtzoANRO5P3xF1NSPVBbzFsXZXK0QxpBW",
            },
          }
        );

        setRoverPhotos(response.data.photos);
      } catch (err) {
        setError("Error fetching rover photos");
      } finally {
        setLoading(false);
      }
    };

    fetchRoverPhotos();
  }, [selectedDate, selectedRover]);

  return (
    <div>
      {/* Date selection */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Rover selection (optional) */}
      <select
        value={selectedRover}
        onChange={(e) => setSelectedRover(e.target.value)}
      >
        <option value="curiosity">Curiosity</option>
        {/* Add other rover options here */}
      </select>

      {/* Display rover photos */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {roverPhotos.map((photo) => (
          <img key={photo.id} src={photo.img_src} alt="Mars Rover" />
        ))}
      </div>
    </div>
  );
};

export default MarsRover;
