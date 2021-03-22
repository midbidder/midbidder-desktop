import React, { useState } from "react";
import BidQuantityForm from "../components/BidQuantityForm";
import { BidChoiceForm } from "../components/BidChoiceForm";
import TimeSlider from "../components/TimeSlider";
import BidPriceGraph from "../components/BidPriceGraph";
import BidQuantityGraph from "../components/BidQuantityGraph";
import BidMedianGraph from "../components/BidMedianGraph";
import { TitleText } from "../components/Text";
import { blue } from "../styles/GlobalStyles";
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
        <div><TitleText>play</TitleText><TitleText color={blue}>!</TitleText></div>
        <BidQuantityForm />
        <BidChoiceForm />
        <TimeSlider setTimepoint={(newTimepoint: number) => setTimepoint(newTimepoint)} timepoint={timepoint}/>
        <BidMedianGraph setTimepoint={(newTimepoint: number) => setTimepoint(newTimepoint)} timepoint={timepoint}/>
        <BidPriceGraph setTimepoint={(newTimepoint: number) => setTimepoint(newTimepoint)} timepoint={timepoint}/>
        <BidQuantityGraph setTimepoint={(newTimepoint: number) => setTimepoint(newTimepoint)} timepoint={timepoint}/>
      </div>
    </div>
  );
}
