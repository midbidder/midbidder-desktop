import { useState } from "react";
import AnimatedButton from "react-animated-buttons";
import ReactTextTransition from "react-text-transition";
import { shuffle } from "../util/Sorting";
import { purple } from "../styles/GlobalStyles";

const defaultTextOptions = "Play!";
let textOptions = [
  "Looking mean!",
  "Be the center of attention.",
  "Be the middle man.",
  "Hi, Malcolm!",
];
textOptions = shuffle(textOptions);
textOptions.unshift(defaultTextOptions);

export default function PlayButton() {
  const [buttonText, setButtonText] = useState(0);
  const [hoveredOver, setHoveredOver] = useState(false);
  let timeOutHandle: NodeJS.Timeout | null = null;
  const resetButtonText = () => {
    if (timeOutHandle !== null) {
      clearTimeout(timeOutHandle);
    }
    setButtonText(0);
  };
  const animateButtonText = () => {
    timeOutHandle = setTimeout(() => {
      console.log("a");
      setButtonText((buttonText + 1) % textOptions.length);
    }, 1000);
  };
  if (hoveredOver) {
    animateButtonText();
  } else if (buttonText !== 0) {
    resetButtonText();
  }

  return (
    <div
      onMouseOver={() => {
        setHoveredOver(true);
      }}
      onMouseLeave={() => {
        setHoveredOver(false);
      }}
    >
      <AnimatedButton
        color={purple}
        animationDuration={1}
        animationType="pulse"
      >
        <div
          style={{
            width: 250,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactTextTransition text={textOptions[buttonText]} delay={1} />
        </div>
      </AnimatedButton>
    </div>
  );
}
