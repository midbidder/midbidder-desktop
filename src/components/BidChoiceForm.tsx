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
  color: number;
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

const dataStats: StatisticHighlight[] = [];

function StatFeature(feature: StatisticHighlight) {
  // dot
  if (feature.x2 === undefined && feature.y2 === undefined) {
  }
  // x line
  else if (
    feature.x !== undefined &&
    feature.x2 === undefined &&
    feature.y === undefined &&
    feature.y2 === undefined
  ) {
  }
  // y line
  else if (
    feature.x === undefined &&
    feature.x2 === undefined &&
    feature.y !== undefined &&
    feature.y2 === undefined
  ) {
  }
  // x range
  else if (
    feature.x !== undefined &&
    feature.x2 !== undefined &&
    feature.y === undefined &&
    feature.y2 === undefined
  ) {
  }
  // y range
  else if (
    feature.x === undefined &&
    feature.x2 === undefined &&
    feature.y !== undefined &&
    feature.y2 !== undefined
  ) {
  } else if (
    feature.x !== undefined &&
    feature.x2 !== undefined &&
    feature.y !== undefined &&
    feature.y2 !== undefined
  ) {
  }
  return <div></div>;
}

function BidChoiceGraph() {
  const [data, setData] = useState(dataValue);
  const [graphState, setGraphState] = useState(defaultState);

  const getAxisYDomain = (
    from: number,
    to: number,
    ref: string,
    offset: number
  ) => {
    const refData: any[] = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    // find min and max
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
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
      "median",
      1
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
                />
                <ReferenceArea
                  yAxisId="1"
                  x1={2}
                  x2={3}
                  strokeOpacity={0.2}
                  stroke={purple}
                  fill={purple}
                />
                {graphState.leftBorder && graphState.rightBorder ? (
                  <ReferenceArea
                    yAxisId="1"
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <span>Reset Zoom</span>
        <span>graph config</span>
      </div>
    </div>
  );
}
