import React, { useState } from "react";
import { blue, bodyFont, purple } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";
import { cloneDeep } from "lodash";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ReferenceArea,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import ContainerDimensions from "react-container-dimensions";
import { propTypes } from "react-bootstrap/esm/Image";

const roundingPrecision = 0.0001;
const axisMargin = 60;

const data = [
  { x: 0, price: 0.05 },
  { x: 1, price: 0.025 },
  { x: 2, price: 0.15 },
  { x: 3, price: 0.225 },
  { x: 4, price: 0.265 },
  { x: 5, price: 0.35 },
  { x: 6, price: 0.45 },
  { x: 7, price: 0.625 },
  { x: 8, price: 0.75 },
  { x: 9, price: 0.825 },
  { x: 10, price: 0.965 },
];

export default function BidPriceGraph(props: {
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
        time vs bid price
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
                    yAxisId={"price"}
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
                    stroke={"#0"}
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
                    type="number"
                    stroke={"#0"}
                    yAxisId="price"
                    dataKey={"price"}
                    tickFormatter={(value: any) => {
                      return (value as number).toFixed(2);
                    }}
                  />

                  <Tooltip
                    wrapperStyle={{
                      visibility: "visible",
                    }}
                    position={{
                      x:
                        ((width - axisMargin) * props.timepoint) / 10 +
                        (Math.round(props.timepoint / 10) === 1 ? 0 : axisMargin),
                      y:
                        Math.round(1 - data[props.timepoint].price) === 1
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
                          data[props.timepoint].price
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
                    dataKey={"price"}
                    stroke={blue}
                    animationDuration={500}
                    yAxisId="price"
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
