import { Slider, Tooltip, withStyles } from "@material-ui/core";
import { blue, bodyFont, bodyFontWeight, purple } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";

const StyledSlider = withStyles({
  root: {
    color: blue,
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "3px solid currentColor",
    marginTop: -8,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 3px 3px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#c0c0c0 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#000",
    opacity: 0.3,
    height: 3,
  },
  valueLabel: {
    left: "calc(-50%)",
    top: 30,
    "& *": {
      background: "transparent",
      color: "#000",
    },
    fontFamily: bodyFont,
    fontWeight: bodyFontWeight,
  },
})(Slider);

export default function TimeSlider() {
  return (
    <div
      style={{
        width: "60%",
        height: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleText size="s" underline>
        time slider
      </TitleText>
      <StyledSlider
        valueLabelDisplay={"auto"}
        min={0}
        max={10}
        step={1}
        marks
        defaultValue={10}
        style={{ marginBottom: 20 }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BodyText underline size="xs">
          game start
        </BodyText>
        <BodyText underline size="xs">
          now
        </BodyText>
      </div>
    </div>
  );
}
