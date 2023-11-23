import React, { useState } from "react";

export default function Accordion({ dataOut, dataUnder }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-md">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={toggleAccordion}
        >
          <h2 className="text-lg font-semibold">{dataOut}</h2>
        </div>
        {isOpen && (
          <div className="p-4 transition-transform">
            <p>{dataUnder}</p>
          </div>
        )}
      </div>
    </div>
  );
}
