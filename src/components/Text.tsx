import React from "react";
import {
  titleFont,
  bodyFont,
  bodyFontWeight,
  titleFontWeight,
} from "../styles/GlobalStyles";

interface TextProps {
  children: string;
  size?: "s" | "m" | "l" | string;
  italics?: boolean;
  underline?: boolean;
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
    fontSize = "1.3em";
  } else if (size === "m") {
    fontSize = "1.6em";
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
        fontStyle: props.italics ? "italic" : undefined,
        fontWeight: bodyFontWeight,
        textDecoration: props.underline ? "underline" : undefined,
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
        fontStyle: props.italics ? "italic" : undefined,
        fontWeight: titleFontWeight,
        textDecoration: props.underline ? "underline" : undefined,
      }}
    >
      {props.children}
    </span>
  );
}

export function ExampleTextSwatch() {
  const sizeOptions = ["s", "m", "l"];
  const italicOptions = [false, true];
  const underlineOptions = [false, true];
  const componentOptions = [BodyText, TitleText];
  const componentCombinations: React.ReactNode[] = [];
  componentOptions.forEach((TextComponent) => {
    const componentDescription = TextComponent === BodyText ? "Body" : "Title";
    sizeOptions.forEach((sizeOption) => {
      italicOptions.forEach((italicOption) => {
        underlineOptions.forEach((underlineOption) => {
          componentCombinations.push(
            <TextComponent
              underline={underlineOption}
              italics={italicOption}
              size={sizeOption}
            >
              {`${componentDescription}${(italicOptions ? " italic" : "")}${(underlineOption ? " underline" : "")} (${sizeOption})`}
            </TextComponent>
          );
        });
      });
    });
  });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {componentCombinations}
    </div>
  );
}
