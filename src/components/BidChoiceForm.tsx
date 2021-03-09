import React, { useState } from "react";
import { blue, bodyFont, purple } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";
import { cloneDeep, floor } from "lodash";
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

type BidChoiceDistribution = {
  x: number;
  median: number;
};

interface BidChoiceState {
  left: number | string;
  right: number | string;
  bottom: number | string;
  top: number | string;
  leftBorder: number | string;
  rightBorder: number | string;
}

interface StatisticHighlight {
  x?: number;
  x2?: number;
  y?: number;
  y2?: number;
  stroke: string;
  strokeWidth?: number;
  fill: string;
  r?: number;
}

const defaultState: BidChoiceState = {
  left: "dataMin",
  right: "dataMax",
  bottom: "dataMin",
  top: "dataMax",
  leftBorder: "",
  rightBorder: "",
};

const roundingPrecision = 0.00001;

const dataValue: BidChoiceDistribution[] = [];
for (let i = 1; i <= 10; i += 0.1) {
  dataValue.push({ x: i, median: Math.random() });
}

const dataStats: StatisticHighlight[] = [
  // vertical line
  {
    x: 3,
    fill: "#D09",
    stroke: "#000",
    strokeWidth: 3,
  },
  // horzinotal line
  {
    y: 3,
    fill: "#DA9",
    stroke: "#000",
    strokeWidth: 3,
  },
  // vertical area
  {
    y: 0.2,
    y2: 0.4,
    fill: "#AC9",
    stroke: "#000",
    strokeWidth: 3,
  },
  // horizontal area
  {
    x: 2,
    x2: 4,
    fill: "#3C9",
    stroke: "#000",
    strokeWidth: 3,
  },
  // 2d area
  {
    x: 3,
    x2: 4,
    y: 0.1,
    y2: 0.4,
    fill: "#8f0",
    stroke: "#000",
    strokeWidth: 3,
  },
  // dot
  {
    x: 6,
    y: 0.2,
    fill: "#506",
    stroke: "#000",
    strokeWidth: 3,
  },
];

function StatFeature(
  feature: StatisticHighlight,
  leftBorder: number | string,
  rightBorder: number | string
) {
  const left =
    typeof leftBorder === "number" ? (leftBorder as number) : undefined;
  const right =
    typeof rightBorder === "number" ? (rightBorder as number) : undefined;

  // dot
  if (
    feature.x !== undefined &&
    feature.y !== undefined &&
    feature.x2 === undefined &&
    feature.y2 === undefined
  ) {
    return (
      <ReferenceDot
        yAxisId="1"
        xAxisId="choiceScale"
        x={feature.x}
        y={feature.y}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
        r={feature.r || 5}
      />
    );
  }
  // x line
  else if (
    feature.x !== undefined &&
    feature.x2 === undefined &&
    feature.y === undefined &&
    feature.y2 === undefined
  ) {
    return (
      <ReferenceLine
        yAxisId="1"
        xAxisId="choiceScale"
        x={feature.x}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  }
  // y line
  else if (
    feature.x === undefined &&
    feature.x2 === undefined &&
    feature.y !== undefined &&
    feature.y2 === undefined
  ) {
    return (
      <ReferenceLine
        y={feature.y}
        strokeOpacity={0.7}
        strokeWidth={feature.strokeWidth}
        fill={feature.fill}
        stroke={feature.stroke}
        yAxisId="1"
        xAxisId="choiceScale"
      />
    );
  }
  // x range
  else if (
    feature.x !== undefined &&
    feature.x2 !== undefined &&
    feature.y === undefined &&
    feature.y2 === undefined
  ) {
    return (
      <ReferenceArea
        yAxisId="1"
        xAxisId="choiceScale"
        x1={left ? Math.max(left, feature.x) : feature.x}
        x2={right ? Math.min(right, feature.x2) : feature.x2}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  }
  // y range
  else if (
    feature.x === undefined &&
    feature.x2 === undefined &&
    feature.y !== undefined &&
    feature.y2 !== undefined
  ) {
    return (
      <ReferenceArea
        yAxisId="1"
        xAxisId="choiceScale"
        y1={feature.y}
        y2={feature.y2}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  } else if (
    feature.x !== undefined &&
    feature.x2 !== undefined &&
    feature.y !== undefined &&
    feature.y2 !== undefined
  ) {
    return (
      <ReferenceArea
        yAxisId="1"
        xAxisId="choiceScale"
        x1={left ? Math.max(left, feature.x) : feature.x}
        x2={right ? Math.min(right, feature.x2) : feature.x2}
        y1={feature.y}
        y2={feature.y2}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  }
  return undefined;
}

function BidChoiceGraph() {
  const [data, setData] = useState(dataValue);
  const [graphState, setGraphState] = useState(defaultState);

  const getAxisYDomain = (from: number, to: number, ref: string) => {
    const refData: any[] = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    // find min and max
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [bottom | 0, (top | 0) + 1];
  };

  const zoomOut = () => {
    setGraphState(defaultState);
  };

  const zoom = () => {
    let leftBorder = graphState.leftBorder;
    let rightBorder = graphState.rightBorder;
    const oldState = cloneDeep(graphState);
    oldState.leftBorder = "";
    oldState.rightBorder = "";
    // 0 width slice clears selection and does nothing else.
    if (leftBorder === rightBorder || rightBorder === "") {
      setGraphState(oldState);
      return;
    }
    // ensure x selection is not flipped
    if (leftBorder && leftBorder > rightBorder!)
      [leftBorder, rightBorder] = [rightBorder, leftBorder];

    // get the bottom & top (adjusted for min & max of selection)
    const [bottom, top] = getAxisYDomain(
      leftBorder === "" ? 0 : (leftBorder as number),
      rightBorder === "" ? 0 : (rightBorder as number),
      "median"
    );
    setGraphState({
      leftBorder: "",
      rightBorder: "",
      left: leftBorder,
      right: rightBorder,
      bottom,
      top,
    });
  };
  return (
    <div style={{ width: "100%", height: "100%", userSelect: "none" }}>
      <ContainerDimensions>
        {({ width, height }) => {
          return (
            <div className="highlight-bar-charts">
              <LineChart
                data={data}
                width={width}
                height={height}
                onMouseDown={(e: any) => {
                  const oldState = cloneDeep(graphState);
                  oldState.leftBorder = e.activeLabel;
                  setGraphState(oldState);
                }}
                onMouseMove={(e: any) => {
                  if (graphState.leftBorder) {
                    const oldState = cloneDeep(graphState);
                    oldState.rightBorder = e.activeLabel;
                    setGraphState(oldState);
                  }
                }}
                onMouseUp={() => {
                  zoom();
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  allowDataOverflow
                  dataKey="x"
                  type="number"
                  domain={[graphState.left, graphState.right]}
                  stroke={purple}
                  tickFormatter={(value: any) => {
                    const tickValue = value as number;
                    const roundTickValue = Math.round(tickValue);
                    if (
                      Math.abs(tickValue - roundTickValue) <= roundingPrecision
                    ) {
                      return `${roundTickValue}`;
                    }
                    return tickValue.toFixed(2);
                  }}
                  xAxisId="choiceScale"
                />

                <YAxis
                  allowDataOverflow
                  type="number"
                  domain={[graphState.bottom, graphState.top]}
                  stroke={purple}
                  yAxisId="1"
                  dataKey={"median"}
                  tickFormatter={(value: any) => {
                    return (value as number).toFixed(2);
                  }}
                />
                <Tooltip
                  formatter={(value: any) => {
                    return (value as number).toFixed(3);
                  }}
                  labelFormatter={(label) => {
                    return (label as number).toFixed(3);
                  }}
                />
                <Line
                  type="stepAfter"
                  dataKey={"median"}
                  stroke={blue}
                  animationDuration={500}
                  yAxisId="1"
                  xAxisId="choiceScale"
                />
                {dataStats.map((dataStat: StatisticHighlight) => {
                  return StatFeature(
                    dataStat,
                    graphState.left,
                    graphState.right
                  );
                })}
                {graphState.leftBorder && graphState.rightBorder ? (
                  <ReferenceArea
                    yAxisId="1"
                    xAxisId="choiceScale"
                    x1={graphState.leftBorder}
                    x2={graphState.rightBorder}
                    strokeOpacity={0.7}
                    stroke={purple}
                    fill={blue}
                  />
                ) : null}
              </LineChart>
            </div>
          );
        }}
      </ContainerDimensions>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <span onClick={() => zoomOut()}>Reset Zoom</span>
        <span>graph config</span>
      </div>
    </div>
  );
}

export function BidChoiceForm() {
  return (
    <div
      style={{
        width: "60%",
        height: 300,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TitleText size="s" underline>
          select bid choice
        </TitleText>
      </div>
      <BidChoiceGraph />
    </div>
  );
}
