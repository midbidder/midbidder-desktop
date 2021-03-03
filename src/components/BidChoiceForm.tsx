import React, { useMemo, useCallback } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { curveStepBefore } from "@visx/curve";
import { Grid } from "@visx/grid";
import { scaleLinear } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { extent, max } from "d3-array";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { blue, purple } from "../styles/GlobalStyles";

type BidChoiceDistribution = {
  x: number;
  y: number;
};

const dataValue: BidChoiceDistribution[] = [];
for (let i = 1; i <= 10; ++i) {
  dataValue.push({ x: i, y: Math.random() });
}

const tooltipStyles = {
  ...defaultStyles,
  border: "2px solid white",
  color: "white",
  minWidth: 50,
  backgroundColor: blue,
};

// padding for axis
const paddingAxis = 30;
// accessors
const getChoice = (d: BidChoiceDistribution) => (d ? d.x : 0);
const getVolume = (d: BidChoiceDistribution) => (d ? d.y : 0);

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const BidChoiceGraph = withTooltip<AreaProps, BidChoiceDistribution>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<BidChoiceDistribution>) => {
    if (width < 10) return null;
    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // memoization
    const volumeScale = useMemo(
      () =>
        scaleLinear({
          range: [margin.top + innerHeight, margin.top],
          domain: [0, max(dataValue, getVolume) || 0],
          nice: true,
        }),
      [margin.top, innerHeight] // dependencies
    );

    // memoization
    const choiceScale = useMemo(
      () =>
        scaleLinear({
          range: [margin.left, margin.left + innerWidth],
          domain: extent(dataValue, getChoice) as [number, number],
        }),
      [margin.left, innerWidth] // dependencies
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        // xPosition
        const xPosition = localPoint(event)?.x || 0;
        // TODO: find nearest neighbor.
        const xValue = Math.floor(choiceScale.invert(xPosition - paddingAxis));
        const yValue = getVolume(dataValue[xValue]) || 0;
        const yPosition = volumeScale(yValue);
        showTooltip({
          tooltipData: { x: xValue, y: yValue },
          tooltipLeft: xPosition,
          tooltipTop: yPosition,
        });
      },
      [volumeScale, choiceScale, showTooltip]
    );
    return (
      <div>
        <svg width={width + 2 * paddingAxis} height={height + 2 * paddingAxis}>
          <Group top={paddingAxis} left={paddingAxis}>
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="url(#area-background-gradient)"
            />
            <LinearGradient
              id="area-background-gradient"
              from={purple}
              fromOpacity={1}
              to={purple}
              toOpacity={0.1}
            />
            <LinearGradient
              id="area-gradient"
              from={blue}
              fromOpacity={1}
              to={purple}
              toOpacity={0}
            />
            <AreaClosed<BidChoiceDistribution>
              data={dataValue}
              x={(d) => choiceScale(getChoice(d))}
              y={(d) => volumeScale(getVolume(d))}
              yScale={volumeScale}
              strokeWidth={2}
              stroke="#000"
              fill="url(#area-gradient)"
              curve={curveStepBefore /** TODO: Determine if smoothing needed */}
            />
            <Bar
              x={margin.left}
              y={margin.top}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              rx={14}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
            <Grid
              top={margin.top}
              yScale={volumeScale}
              left={margin.left}
              xScale={choiceScale}
              width={innerWidth}
              height={innerHeight}
              strokeDasharray="3,3"
              stroke={blue}
              strokeOpacity={0.2}
              pointerEvents="none"
              numTicksRows={10}
              numTicksColumns={10}
            />
            <AxisLeft scale={volumeScale} />
            <AxisBottom top={height} scale={choiceScale} />
          </Group>
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top + paddingAxis }}
                to={{
                  x: tooltipLeft,
                  y: innerHeight + margin.top + paddingAxis,
                }}
                stroke={"#000"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="10,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1 + paddingAxis}
                r={2}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + paddingAxis}
                r={4}
                fill={purple}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={innerHeight + margin.top - 25}
              left={tooltipLeft}
              style={tooltipStyles}
            >
              <div style={{ textAlign: "center" }}>
                <div>{getVolume(tooltipData).toPrecision(2)}</div>
                <div>{getChoice(tooltipData)}</div>
              </div>
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);

export function BidChoiceForm() {
  return (
    <div style={{ width: 600, height: 300 }}>
      <ParentSize>
        {({ width, height }: { width: number; height: number }) => (
          <BidChoiceGraph width={width} height={height} />
        )}
      </ParentSize>
    </div>
  );
}
