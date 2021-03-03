import React from "react";
import {
  titleFont,
  bodyFont,
  bodyFontWeight,
  titleFontWeight,
  blue,
} from "../styles/GlobalStyles";

/**
 * @param children text within.
 * @param italics whether text is italic
 * @param underline whether text is underlined
 * @param href link
 * @param newTab whether link opens in new tab. Ignored if link is undefined.
 */
interface TextProps {
  children: string;
  size?: "xs" | "s" | "m" | "l" | string;
  italics?: boolean;
  underline?: boolean;
  href?: string;
  newTab?: boolean;
  color?: string;
}

/**
 *  @description Basic component for body text.
 *  @param size medium by default.
 *  @see TextProps for remaining properties.
 */
export function BodyText(props: TextProps) {
  const size = props.size || "m";
  let fontSize;
  if (size === "xs") {
    fontSize = "1em";
  } else if (size === "s") {
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
        color: props.color,
      }}
    >
      {props.href ? (
        <a
          href={props.href}
          rel="noreferrer"
          target={props.newTab ? "_blank" : undefined}
          style={{ color: blue }}
        >
          {props.children}
        </a>
      ) : (
        props.children
      )}
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
        color: props.color,
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
  const hrefOptions = [undefined, "/play"];
  const newTabOptions = [false, true];
  const componentOptions = [BodyText, TitleText];
  const componentCombinations: React.ReactNode[] = [];
  componentOptions.forEach((TextComponent) => {
    const componentDescription = TextComponent === BodyText ? "Body" : "Title";
    sizeOptions.forEach((sizeOption) => {
      italicOptions.forEach((italicOption) => {
        underlineOptions.forEach((underlineOption) => {
          hrefOptions.forEach((hrefOption) => {
            newTabOptions.forEach((newTabOption) => {
              componentCombinations.push(
                <TextComponent
                  underline={underlineOption}
                  italics={italicOption}
                  size={sizeOption}
                  href={hrefOption}
                  newTab={newTabOption}
                >
                  {`${componentDescription}${italicOptions ? " italic" : ""}${
                    underlineOption ? " underline" : ""
                  } (${sizeOption})${hrefOption ? " link" : ""}${
                    newTabOption ? " newtab" : ""
                  }`}
                </TextComponent>
              );
            });
          });
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
