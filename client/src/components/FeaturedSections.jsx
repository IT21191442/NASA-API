import React from "react";
import { Link } from "react-router-dom";

const FeaturedSections = () => {
  
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
          <Link to="/apod">
            <button
              className="mt-4 bg-dark-hover text-white py-2 px-4 rounded"
              style={{
                backgroundColor: "#262144",
              }}
            >
              Explore APOD
            </button>
          </Link>
         
        </div>

        {/* DONKI */}
        <div
          className="bg-dark p-8 rounded"
          style={{
            backgroundColor: "#0d0829",
            "--dark-hover": "#0a0620", // Darker color for hover state
          }}
        >
          <h3 className="text-2xl font-semibold mb-4">CME Data</h3>
          <p className="text-lg">
            Space Weather Database Of Notifications, Knowledge, Information.
          </p>
          <Link to="/cme">
            <button
              className="mt-4 bg-dark-hover text-white py-2 px-4 rounded"
              style={{
                backgroundColor: "#262144",
              }}
            >
              Learn More
            </button>
          </Link>
          
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
          <Link to="/marseRover">
            <button
              className="mt-4 bg-dark-hover text-white py-2 px-4 rounded"
              style={{
                backgroundColor: "#262144",
              }}
            >
              View Photos
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
