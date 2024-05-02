import React from "react";
import Earth from "../Images/2qR2.gif";

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white py-20 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Earth})`}}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Explore the Universe</h2>
        <p className="text-lg mb-8">
          Discover the mysteries of space and beyond.
        </p>
        <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
