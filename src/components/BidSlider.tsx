import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { blue } from "../styles/GlobalStyles";

export const BidSlider = withStyles({
  root: {
    color: blue,
    height: 10,
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    border: "3px solid currentColor",
    marginTop: -10,
    marginLeft: -15,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  track: {
    height: 10,
    borderRadius: 4,
  },
  rail: {
    height: 10,
    borderRadius: 4,
  },
})(Slider);
