import React, { useState } from "react";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`max-w-md mx-auto mt-8 ${isOpen ? "expanded-bg" : ""}`}>
      <div
        className={`bg-white shadow-md rounded-md ${isOpen ? "expanded" : ""}`}
      >
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={toggleAccordion}
        >
          <h2 className="text-lg font-semibold">wesfrtafsefeswd</h2>
          <svg
            className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="p-4">
            <p>jwoirghykijrgokjkiol</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GoogleForm = () => {
  return (
    <div className="flex-shrink-0">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdnNK-18zAdW1NQXKqA2fzezO4pc6gL0WlX1ElEhVvMHnyUAg/viewform?embedded=true"
        width="640"
        height="700"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      ></iframe>
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex inline-block">
      <GoogleForm />
      <Accordion />
    </div>
  );
};

export default App;
