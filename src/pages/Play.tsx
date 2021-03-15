import React, { useState } from "react";
import BidQuantityForm from "../components/BidQuantityForm";
import { BidChoiceForm } from "../components/BidChoiceForm";
import TimeSlider from "../components/TimeSlider";
import BidPriceGraph from "../components/BidPriceGraph";
export default function Play() {
  const [ timepoint, setTimepoint] = useState(10);

  return (
    // TODO: Responsive Masonry...
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <BidQuantityForm />
        <BidChoiceForm />
        <TimeSlider setTimepoint={(newTimepoint: number) => setTimepoint(newTimepoint)} timepoint={timepoint}/>
        <BidPriceGraph setTimepoint={(newTimepoint: number) => setTimepoint(newTimepoint)} timepoint={timepoint}/>
      </div>
    </div>
  );
}
