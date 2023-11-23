import React, { useState } from "react";
import GoogleForm from "./component/GoogleForm";
import Accordion from "./component/foldable";

const App = () => {
  return (
    <div className="w-10/12 m-auto bg-gray-100 min-h-screen flex">
      <div className="w-1/2 mx-auto my-8">
        <GoogleForm />
      </div>
      <div className="w-5/12 mx-auto my-12">
        <Accordion dataOut="이걸로" dataUnder="복제생산" />
      </div>
    </div>
  );
};

export default App;
