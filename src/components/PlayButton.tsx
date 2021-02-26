import { useState } from "react";
import ReactTextTransition from "react-text-transition";
import { shuffle } from "../util/Sorting";
import { purple, titleFont } from "../styles/GlobalStyles";
import { Button } from "react-bootstrap";

const defaultTextOptions = "Play!";
let textOptions = [
  "Looking mean!",
  "Be the center of attention.",
  "Be the middle man.",
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
      setButtonText((buttonText + 1) % textOptions.length);
    }, 1000);
  };
  if (hoveredOver) {
    animateButtonText();
  } else if (buttonText !== 0) {
    resetButtonText();
  }

  return (
    <a
      onMouseOver={() => {
        setHoveredOver(true);
      }}
      onMouseLeave={() => {
        setHoveredOver(false);
      }}
      href="/play"
    >
      <Button>
        <div
          style={{
            width: 250,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactTextTransition style={{ fontFamily: titleFont, fontSize: "1em"}} text={textOptions[buttonText]} delay={1} />
        </div>
      </Button>
    </a>
  );
}
