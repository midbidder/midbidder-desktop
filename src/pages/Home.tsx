import React from "react";
import PlayButton from "../components/PlayButton";
import { TitleText } from "../components/Text";
import { blue } from "../styles/GlobalStyles";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <TitleText underline>home</TitleText>
      </div>
      <div>
        <PlayButton />
      </div>
    </div>
  );
}
