import React from "react";
import BidQuantityForm from "../components/BidQuantityForm";
import BidChoiceForm from "../components/BidChoiceForm";
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
    </div>
  );
}
