import React from "react";
import { NavData } from "../../Consone/Data";

export default function NavBar() {
  return (
    <div className="flex justify-around items-center flex-wrap bg-white dark:bg-gray-800 mt-16 mx-auto w-[98.5%] rounded-xl shadow-md p-4">
      {NavData.map((data, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer p-2 transition-transform transform hover:scale-105 hover:shadow-md rounded-lg"
        >
          <img
            src={data.url}
            alt={data.text}
            className="w-12 h-12 object-contain mb-1"
          />
          <p className="text-xs font-medium font-sans text-gray-700 dark:text-gray-200">
            {data.text}
          </p>
        </div>
      ))}
    </div>
  );
}
