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
// @ts-ignore
import commaNumber from "comma-number";
const roundingPrecision = 0.0001;
const axisMargin = 60;

const data = [
  { x: 0, volume: 300000 },
  { x: 1, volume: 8300000 },
  { x: 2, volume: 8800000 },
  { x: 3, volume: 9300000 },
  { x: 4, volume: 20000001 },
  { x: 5, volume: 50002058 },
  { x: 6, volume: 700050005 },
  { x: 7, volume: 120095869 },
  { x: 8, volume: 2000000000 },
  { x: 9, volume: 5020187961 },
  { x: 10, volume: 9899950545 },
];

export default function BidPriceGraph(props: {
  timepoint: number;
  setTimepoint: (newTimepoint: number) => void;
}) {
  let maxVolume = -1;
  data.forEach((datum) => {
    if (datum.volume > maxVolume) {
      maxVolume = datum.volume;
    }
  });
  const side = 1 === Math.round(props.timepoint / 10) ? "left" : "right";
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
        bid volume over time
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
                    yAxisId={"volume"}
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
                    yAxisId="volume"
                    dataKey={"volume"}
                    tickFormatter={(value) => value === 0 ? "" : commaNumber(value)}
                    mirror={true}
                    orientation={side}
                  />

                  <Tooltip
                    wrapperStyle={{
                      visibility: "visible",
                    }}
                    position={{
                      x: ((width - axisMargin) * props.timepoint) / 10,
                      y:
                        Math.round(
                          1 - data[props.timepoint].volume / maxVolume
                        ) === 1
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

                        <BodyText size="xs" color={blue}>{`${commaNumber(
                          data[props.timepoint].volume
                        )} bids`}</BodyText>
                      </div>
                    }
                  />
                  <Line
                    type="linear"
                    dataKey={"volume"}
                    stroke={blue}
                    animationDuration={500}
                    yAxisId="volume"
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
