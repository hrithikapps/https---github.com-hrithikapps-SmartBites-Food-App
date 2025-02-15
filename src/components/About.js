import React from "react";
import Logo from "../assets/img/Logo.png";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 mt-0">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl text-center">
        <img src={Logo} alt="Logo" className="w-30 h-20 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800">About Us</h1>
        <p className="text-gray-600 mt-2">
          Welcome to our food application! We are dedicated to providing the
          best culinary experiences in Bengaluru.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            Our Location
          </h2>
          <iframe
            title="Google Maps Bengaluru"
            className="w-full h-64 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.38137974787!2d77.56116305!3d12.9715986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167f6b238e6f%3A0x1b2f1f4b6c45aeb5!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1647119832854!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
