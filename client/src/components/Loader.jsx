import Lottie from "lottie-react";
import React from "react";
import loader from "../assets/lotties/loader.json";

function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Lottie animationData={loader} className="w-64" />
    </div>
  );
}

export default Loader;
