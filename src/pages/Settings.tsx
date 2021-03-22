import React from "react";
import { TitleText } from "../components/Text";
import { blue } from "../styles/GlobalStyles";

export default function Settings() {
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
        <TitleText>sett</TitleText>
        <TitleText color={blue}>i</TitleText>
        <TitleText>ngs</TitleText>
      </div>
    </div>
  );
}
