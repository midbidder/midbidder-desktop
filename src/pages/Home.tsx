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
        <TitleText color={blue} opacity="spring">
          ~
        </TitleText>
        <TitleText>home</TitleText>
        <TitleText color={blue} opacity="spring">
          ~
        </TitleText>
      </div>
      <div>
        <PlayButton />
      </div>
    </div>
  );
}
