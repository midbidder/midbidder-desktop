import React from "react";
import BidQuantityForm from "../components/BidQuantityForm";
import { BidChoiceForm } from "../components/BidChoiceForm";
import TimeSlider from "../components/TimeSlider";
export default function Play() {
  return (
    // TODO: Responsive Masonry...
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BidQuantityForm />
      <BidChoiceForm />
      <TimeSlider />
    </div>
  );
}
