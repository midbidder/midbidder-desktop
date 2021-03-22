import { Title } from "@material-ui/icons";
import React from "react";
import { TitleText } from "../components/Text";
import { blue } from "../styles/GlobalStyles";

export default function Tutorial() {
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
        <TitleText>tutor</TitleText>
        <TitleText color={blue} opacity={"spring"}>i</TitleText>
        <TitleText>al</TitleText>
      </div>
    </div>
  );
}
