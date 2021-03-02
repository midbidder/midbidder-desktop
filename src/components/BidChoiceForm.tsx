import React, { useMemo, useCallback } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { Grid } from "@visx/grid";
import { scaleLinear } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { max } from "d3-array";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { blue, purple } from "../styles/GlobalStyles";

type BidChoiceDistribution = {
  x: number;
  y: number;
};

const dataValue: BidChoiceDistribution[] = [
  { x: 1, y: 10 },
  { x: 2, y: 90 },
  { x: 3, y: 40 },
  { x: 4, y: 10 },
  { x: 5, y: 30 },
  { x: 6, y: 50 },
  { x: 1.6, y: 110 },
  { x: 1.9, y: 100 },
  { x: 6.1, y: 190 },
  { x: 100, y: 10 },
  { x: 23, y: 90 },
  { x: 67, y: 40 },
  { x: 104, y: 10 },
  { x: 159, y: 30 },
  { x: 6, y: 50 },
  { x: 1.6, y: 110 },
  { x: 1.9, y: 100 },
  { x: 6.1, y: 190 },
  { x: 1, y: 10 },
  { x: 2, y: 90 },
  { x: 3, y: 40 },
  { x: 4, y: 10 },
  { x: 5, y: 30 },
  { x: 6, y: 50 },
  { x: 1.6, y: 110 },
  { x: 1.9, y: 100 },
  { x: 6.1, y: 190 },
];
export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid white",
  color: "white",
};

// accessors
const getChoice = (d: BidChoiceDistribution) => d.x;
const getVolume = (d: BidChoiceDistribution) => d.y;

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
          domain: [0, max(dataValue, getChoice) || 0],
          nice: true,
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
        console.log(xPosition);
        // if (d1 && getDate(d1)) {
        //   d =
        //     x0.valueOf() - getDate(d0).valueOf() >
        //     getDate(d1).valueOf() - x0.valueOf()
        //       ? d1
        //       : d0;
        // }
        // showTooltip({
        //   tooltipData: d,
        //   tooltipLeft: x,
        //   tooltipTop: stockValueScale(getStockValue(d)),
        // });
      },
      [] //[showTooltip, stockValueScale, dateScale]
    );

    return (
      <div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinearGradient
            id="area-background-gradient"
            from={"#0"}
            to={purple}
          />
          <LinearGradient
            id="area-gradient"
            from={"#fff"}
            to={blue}
            toOpacity={0.1}
          />
          <Grid
            top={margin.top}
            yScale={volumeScale}
            left={margin.left}
            xScale={choiceScale}
            width={innerWidth}
            height={innerHeight}
            strokeDasharray="2,5"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
            numTicksRows={10}
            numTicksColumns={10}
          />
          <AreaClosed<BidChoiceDistribution>
            data={dataValue}
            x={(d) => getChoice(d)}
            y={(d) => getVolume(d)}
            yScale={choiceScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
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
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
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
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`$${getVolume(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {getVolume(tooltipData)}
            </Tooltip>
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
