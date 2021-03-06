import React from "react";
import { blue, purple, black } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import ContainerDimensions from "react-container-dimensions";

const roundingPrecision = 0.0001;
const axisMargin = 60;

const data = [
  { x: 0, median: 4.05 },
  { x: 1, median: 5.025 },
  { x: 2, median: 6.15 },
  { x: 3, median: 3.225 },
  { x: 4, median: 5.265 },
  { x: 5, median: 4.35 },
  { x: 6, median: 6.45 },
  { x: 7, median: 4.625 },
  { x: 8, median: 6.75 },
  { x: 9, median: 5.825 },
  { x: 10, median: 5.965 },
];

export default function BidMedianGraph(props: {
  timepoint: number;
  setTimepoint: (newTimepoint: number) => void;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleText underline size="s">
        bid median over time
      </TitleText>
      <div style={{ width: "100%", userSelect: "none" }}>
        <ContainerDimensions>
          {({ width, height }) => {
            return (
              <div className="highlight-bar-charts">
                <LineChart
                  data={data}
                  width={width}
                  height={300}
                  margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
                >
                  <ReferenceLine
                    x={props.timepoint}
                    yAxisId={"median"}
                    xAxisId={"timeScale"}
                    strokeWidth={3}
                    stroke={purple}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    allowDataOverflow
                    dataKey="x"
                    type="number"
                    domain={[0, 10]}
                    stroke={black}
                    tickFormatter={(value: any) => {
                      const tickValue = value as number;
                      const roundTickValue = Math.round(tickValue);
                      if (
                        Math.abs(tickValue - roundTickValue) <=
                        roundingPrecision
                      ) {
                        return `${roundTickValue}`;
                      }
                      return tickValue.toFixed(2);
                    }}
                    xAxisId="timeScale"
                  />

                  <YAxis
                    allowDataOverflow
                    domain={[0, 10]}
                    type="number"
                    stroke={black}
                    yAxisId="median"
                    dataKey={"median"}
                    mirror
                    orientation={
                      Math.round(props.timepoint / 10) === 1 ? "left" : "right"
                    }
                    tickFormatter={(value: any) => {
                      return value === 0 ? "" : (value as number).toFixed(2);
                    }}
                  />

                  <Tooltip
                    wrapperStyle={{
                      visibility: "visible",
                    }}
                    position={{
                      x: ((width - axisMargin) * props.timepoint) / 10,
                      y:
                        Math.round(1 - data[props.timepoint].median) === 1
                          ? 10
                          : 200,
                    }}
                    content={
                      <div
                        style={{
                          borderRadius: 3,
                          border: "2px black solid",
                          backgroundColor: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                      >
                        <BodyText
                          size="xs"
                          color={purple}
                        >{`${props.timepoint}`}</BodyText>

                        <BodyText size="xs" color={blue}>{`${
                          data[props.timepoint].median
                        }`}</BodyText>
                      </div>
                    }
                  />
                  <Tooltip
                    formatter={(value: any) => {
                      return `$${(value as number).toFixed(3)}`;
                    }}
                    labelFormatter={(label) => {
                      return `time point ${label}`;
                    }}
                  />
                  <Line
                    type="linear"
                    dataKey={"median"}
                    stroke={blue}
                    animationDuration={500}
                    yAxisId="median"
                    xAxisId="timeScale"
                  />
                </LineChart>
              </div>
            );
          }}
        </ContainerDimensions>
      </div>
    </div>
  );
}
