import React, { useState } from "react";
import AnimatedButton from "react-animated-buttons";
import ReactTextTransition from "react-text-transition";

function shuffle(array: any[]) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
      <AnimatedButton color="info" animationDuration={1} animationType="pulse">
        <div
          style={{
            width: 300,
            textAlign: "center",
          }}
        >
          <ReactTextTransition text={textOptions[buttonText]} delay={1} />
        </div>
      </AnimatedButton>
    </div>
  );
}
