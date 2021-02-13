import React from "react";
import { titleFont, bodyFont } from "../styles/GlobalStyles";

interface TextProps {
  children: string;
  size?: "s" | "m" | "l" | string;
}

/**
 *  @description Basic component for body text.
 *  @param size medium by default.
 *  @param children text within.
 */
export function BodyText(props: TextProps) {
  const size = props.size || "m";
  let fontSize;
  if (size === "s") {
    fontSize = "1em";
  } else if (size === "m") {
    fontSize = "1.5em";
  } else if (size === "l") {
    fontSize = "2em";
  } else {
    fontSize = size;
  }
  return (
    <span
      style={{
        fontFamily: bodyFont,
        fontSize,
      }}
    >
      {props.children}
    </span>
  );
}

/**
 *  @description Basic component for title text.
 *  @param size large by default.
 *  @param children text within.
 */
export function TitleText(props: TextProps) {
  let fontSize;
  const size = props.size || "l";
  if (size === "s") {
    fontSize = "1.5em";
  } else if (size === "m") {
    fontSize = "2.5em";
  } else if (size === "l") {
    fontSize = "3.5em";
  } else {
    fontSize = size;
  }
  return (
    <span
      style={{
        fontFamily: titleFont,
        fontSize,
      }}
    >
      {props.children}
    </span>
  );
}

export function ExampleTextSwatch() {
  return (
    <div>
      <TitleText size="s">Example of small title text</TitleText>
      <TitleText size="m">Example of medium title text</TitleText>
      <TitleText size="l">Example of large title text</TitleText>
      <BodyText size="s">Example of small body text</BodyText>
      <BodyText size="m">Example of medium body text</BodyText>
      <BodyText size="l">Example of large body text</BodyText>
    </div>
  );
}
