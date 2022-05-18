import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import "../component/Spinner.css";

export default function Spinner() {
  return (
    <div className="container col-6 mx-auto">
      <div className="spinner-container">
        <div className="spinner">
        <InfinitySpin color="#ba1111" width="150px" />
        </div>
      </div>
    </div>
  );
}
