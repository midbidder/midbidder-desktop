import React, { useState } from "react";
import { blue, purple } from "../styles/GlobalStyles";
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
import { Button, Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

/**
 * @interface BidChoiceDistribution
 * @description Represents the distribution of each choice.
 * @property x: Any given floating point bid on.
 * @property freq: Relative distribution of choice [0, 1]
 */
interface BidChoiceDistribution {
  x: number;
  freq: number;
}

/**
 * @type StatisticCalculation
 * @description Can be used in the future for users to self-program new statistical annotations.
 * @todo Implement this feature. Likely to deprecate, but screw it.
 */
type StatisticCalculation = (inputData: BidChoiceDistribution[]) => number;

/**
 * @interface StatisticHighlight
 * @description Carries necessary information to highlight a statistically relevant area on the graph.
 * @summary
 * Only defined x -> vertical line
 * Only defined y -> horizontal line
 * Only defined x, x2 -> Horizontal slice
 * Only defined y, y2 -> Vertical slice
 * Defined x, x2, y, y2 -> 2D slice
 * else no component will be generated
 * @property label - describes statistic
 * @property enable - whether statistic is shown
 * @property x - x position.
 *
 */
interface StatisticHighlight {
  label: string;
  enable?: boolean;
  x?: number | StatisticCalculation;
  x2?: number | StatisticCalculation;
  y?: number | StatisticCalculation;
  y2?: number | StatisticCalculation;
  stroke: string;
  strokeWidth?: number;
  fill: string;
  r?: number;
}

/**
 * @interface BidChoiceState
 * @description Represents the state of the graph.
 * @property left - left view of the graph
 * @property right - right view of the graph
 * @property top - top view of the graph
 * @property bottom - bottom view of the graph
 * @property leftBorder - left border of the graph selector
 * @property rightBorder - right border of the graph selector
 * On left/right/bottom/top, the below are arguments are also possible
 * @argument dataMin - minimum of data on dimension
 * @argument dataMax - maximum of data on dimension
 */
interface BidChoiceState {
  left: number | string;
  right: number | string;
  bottom: number | string;
  top: number | string;
  leftBorder: number | string;
  rightBorder: number | string;
}

/**
 * ------------------ Constants and Defaults ------------------
 */

/**
 * @description default state of the graph
 * @todo Eventually scrape user preferences from the database.
 */
const defaultState: BidChoiceState = {
  left: "dataMin",
  right: "dataMax",
  bottom: 0,
  top: 1,
  leftBorder: "",
  rightBorder: "",
};

/**
 * @description precision to round with to in order to avoid floating point rounding errors.
 * @todo Eventually eliminate once backend is connected and rounding errors are not present.
 */
const roundingPrecision = 0.00001;

/**
 * @description the default settings for the highlighted statistics
 * @todo Replace coordinates with values recieved from the server.
 * @todo Eventually replace user preferences from database.
 */
const defaultGraphStatistics: StatisticHighlight[] = [
  { label: "median", stroke: purple, fill: blue, x: Math.random() * 10 },
  { label: "mean", stroke: purple, fill: blue, x: Math.random() * 10 },
  { label: "25%", stroke: purple, fill: blue, x: Math.random() * 10 },
  { label: "75%", stroke: purple, fill: blue, x: Math.random() * 10 },
];

/**
 * @description Generates mock data
 * @todo eventually get from server
 */
const dataValue: BidChoiceDistribution[] = [];
for (let i = 1; i <= 10; i += 0.1) {
  dataValue.push({ x: i, freq: Math.random() });
}

/**
 * @description Disambiguates a given statistic
 * @param input undefined, a number, or an algoritm to create a statistics.
 * @param dist Array representing bid choice representation
 * @returns a number or undefined
 */
function processStat(
  input: undefined | StatisticCalculation | number,
  dist: BidChoiceDistribution[]
) {
  return input === undefined
    ? undefined
    : typeof input === "number"
    ? (input as number)
    : (input as StatisticCalculation)(dist);
}

/**
 *
 * @param feature a given statistic to be highlighted
 * @param leftBorder left border of graph
 * @param rightBorder right border of graph
 * @param dist array representing bid choice representation
 * @returns a graph element highlighting an area of a graph
 */
function StatFeature(
  feature: StatisticHighlight,
  leftBorder: number | string,
  rightBorder: number | string,
  dist: BidChoiceDistribution[]
) {
  // left border for graph
  const left =
    typeof leftBorder === "number" ? (leftBorder as number) : undefined;
  // right border for graph
  const right =
    typeof rightBorder === "number" ? (rightBorder as number) : undefined;

  // Calculate all coordinates
  const x = processStat(feature.x, dist);
  const x2 = processStat(feature.y, dist);
  const y = processStat(feature.y, dist);
  const y2 = processStat(feature.y2, dist);

  // produces a dot
  if (
    x !== undefined &&
    y !== undefined &&
    x2 === undefined &&
    y2 === undefined
  ) {
    return (
      <ReferenceDot
        yAxisId="1"
        xAxisId="choiceScale"
        x={x}
        y={y}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
        r={feature.r || 5}
      />
    );
  }
  // produces a vertical line
  else if (
    x !== undefined &&
    x2 === undefined &&
    y === undefined &&
    y2 === undefined
  ) {
    return (
      <ReferenceLine
        yAxisId="1"
        xAxisId="choiceScale"
        x={x}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth || 3}
      />
    );
  }
  // produces a horizontal line
  else if (
    x === undefined &&
    x2 === undefined &&
    y !== undefined &&
    y2 === undefined
  ) {
    return (
      <ReferenceLine
        y={y}
        strokeOpacity={0.7}
        strokeWidth={feature.strokeWidth || 3}
        fill={feature.fill}
        stroke={feature.stroke}
        yAxisId="1"
        xAxisId="choiceScale"
      />
    );
  }
  // produces a horizontal slice
  else if (
    x !== undefined &&
    x2 !== undefined &&
    y === undefined &&
    y2 === undefined
  ) {
    return (
      <ReferenceArea
        yAxisId="1"
        xAxisId="choiceScale"
        x1={left ? Math.max(left, x) : x}
        x2={right ? Math.min(right, x2) : x2}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  }
  // produces a vertical slice
  else if (
    x === undefined &&
    x2 === undefined &&
    y !== undefined &&
    y2 !== undefined
  ) {
    return (
      <ReferenceArea
        yAxisId="1"
        xAxisId="choiceScale"
        y1={y}
        y2={y2}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  }
  // produces a 2D slice
  else if (
    x !== undefined &&
    x2 !== undefined &&
    y !== undefined &&
    y2 !== undefined
  ) {
    return (
      <ReferenceArea
        yAxisId="1"
        xAxisId="choiceScale"
        x1={left ? Math.max(left, x) : x}
        x2={right ? Math.min(right, x2) : x2}
        y1={y}
        y2={y2}
        strokeOpacity={0.7}
        fill={feature.fill}
        stroke={feature.stroke}
        strokeWidth={feature.strokeWidth}
      />
    );
  }
  return undefined;
}

/**
 * @returns a graph with configuration buttons
 */
function BidChoiceGraph() {
  // TODO: will get this from server
  const [data, setData] = useState(dataValue);
  // TODO: will get this from the server
  const [graphStatistics, setGraphStatistics] = useState(
    defaultGraphStatistics
  );
  // whether the configuration panel is expanded
  const [configExpanded, setConfigExpanded] = useState(false);
  // represents the graph's states
  const [graphState, setGraphState] = useState(defaultState);
  // zooms out to default zoom parameters
  const zoomOut = () => {
    setGraphState(defaultState);
  };
  // zooms to a given interval on [leftBorder, rightBorder]
  const zoom = () => {
    let leftBorder = graphState.leftBorder;
    let rightBorder = graphState.rightBorder;
    const newState = cloneDeep(graphState);
    newState.leftBorder = "";
    newState.rightBorder = "";
    // 0 width slice clears selection and does nothing else.
    if (leftBorder === rightBorder || rightBorder === "") {
      setGraphState(newState);
      return;
    }
    // ensure x selection is not flipped
    if (leftBorder && leftBorder > rightBorder!)
      [leftBorder, rightBorder] = [rightBorder, leftBorder];
    // sets border to selected region. TODO: Possibly adjust bottom/top
    setGraphState({
      leftBorder: "",
      rightBorder: "",
      left: leftBorder,
      right: rightBorder,
      bottom: 0,
      top: 1,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        userSelect: "none",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%" }}>
        <ContainerDimensions>
          {({ width, height }) => {
            return (
              <div className="highlight-bar-charts">
                <LineChart
                  data={data}
                  width={width}
                  height={300}
                  onMouseDown={(e: any) => {
                    if (!e) return;
                    const newState = cloneDeep(graphState);
                    newState.leftBorder = e.activeLabel;
                    setGraphState(newState);
                  }}
                  onMouseMove={(e: any) => {
                    if (!e) return;
                    if (graphState.leftBorder) {
                      const newState = cloneDeep(graphState);
                      newState.rightBorder = e.activeLabel;
                      setGraphState(newState);
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
                    xAxisId="choiceScale"
                  />

                  <YAxis
                    allowDataOverflow
                    type="number"
                    domain={[graphState.bottom, graphState.top]}
                    stroke={"#0"}
                    yAxisId="1"
                    dataKey={"freq"}
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
                    dataKey={"freq"}
                    stroke={blue}
                    animationDuration={500}
                    yAxisId="1"
                    xAxisId="choiceScale"
                  />
                  {graphStatistics.map((dataStat: StatisticHighlight) => {
                    return dataStat.enable
                      ? StatFeature(
                          dataStat,
                          graphState.left,
                          graphState.right,
                          data
                        )
                      : undefined;
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
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={{
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: blue,
            textTransform: "none",
            flexGrow: 1,
          }}
          onClick={() => zoomOut()}
        >
          <BodyText color="white" size="s">
            reset zoom
          </BodyText>
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button
          style={{
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: blue,
            textTransform: "none",
            flexGrow: 1,
          }}
          onClick={() => setConfigExpanded(!configExpanded)}
        >
          <BodyText color="white" size="s">
            graph config
          </BodyText>
        </Button>
      </div>
      <div
        style={{
          maxHeight: configExpanded ? 200 : 0,
          overflow: "hidden",
          transition: "0.5s",
        }}
      >
        <BodyText>graph configuration</BodyText>
        <div style={{ width: "100%", overflow: "auto" }}>
          {graphStatistics.map(
            (graphStatistic: StatisticHighlight, settingIndex: number) => (
              <Chip
                label={<BodyText size="xs">{graphStatistic.label}</BodyText>}
                onClick={() => {
                  const newGraphStatistics = cloneDeep(graphStatistics);
                  newGraphStatistics[
                    settingIndex
                  ].enable = !graphStatistic.enable;
                  setGraphStatistics(newGraphStatistics);
                }}
                clickable
                style={{
                  backgroundColor: graphStatistic.enable ? purple : undefined,
                  color: graphStatistic.enable ? "white" : undefined,
                  marginRight: 10,
                }}
                variant="outlined"
                icon={
                  graphStatistic.enable ? (
                    <VisibilityIcon style={{ color: "#fff" }} />
                  ) : (
                    <VisibilityOffIcon />
                  )
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * @returns a form to submit a bid choice
 */
export function BidChoiceForm() {
  return (
    <div
      style={{
        width: "60%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TitleText size="s" underline>
        select bid choice
      </TitleText>
      <BidChoiceGraph />
    </div>
  );
}
