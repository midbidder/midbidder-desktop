import { Slider } from "@material-ui/core";
export default function TimeSlider() {
  return (
    <div
      style={{
        width: "60%",
        height: 100,
      }}
    >
      <Slider min={0} max={10} step={1} marks value={4} />
    </div>
  );
}
