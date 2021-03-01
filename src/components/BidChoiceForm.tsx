import React, { useState } from "react";
import { blue, purple } from "../styles/GlobalStyles";
import { ResponsiveBar } from "@nivo/bar";
import { Datum } from "@nivo/line";
const data = [
  { x: 1, value: 100 },
  { x: 2, value: 200 },
  { x: 3, value: 640 },
  { x: 4, value: 102 },
  { x: 5, value: 110 },
  { x: 6, value: 300 },
  { x: 7, value: 200 },
  { x: 8, value: 400 },
  { x: 9, value: 200 },
  { x: 10, value: 120 },
];
function BidChoiceGraph() {
  const [hoverIndex, setHoverIndex] = useState(-1);
  let totalBidVolume = 0;
  data.forEach((datum) => {
    totalBidVolume += datum.value;
  });
  return (
    <div style={{ height: 250, width: "100%" }}>
      <ResponsiveBar
        data={data}
        indexBy="x"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(datum: Datum) => {
          return datum.index === hoverIndex ? blue : purple;
        }}
        axisTop={null}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "bid volume (#)",
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "bid choice",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "bid volume (%)",
          legendPosition: "middle",
          legendOffset: -50,
          format: (value) => {
            const percent = (100 * (value as number)) / totalBidVolume;
            return percent.toFixed(1);
          },
        }}
        onMouseEnter={(hoveredBar) => setHoverIndex(hoveredBar.index)}
        onMouseLeave={() => setHoverIndex(-1)}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

export default function BidChoiceForm() {
  return (
    <div style={{ width: "60%" }}>
      <BidChoiceGraph />
    </div>
  );
}
