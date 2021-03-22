import React from "react";
import ChangeUserNameForm from "../components/ChangeUserNameForm";
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
        <TitleText color={blue} opacity={"spring"}>
          i
        </TitleText>
        <TitleText>ngs</TitleText>
      </div>
      <TitleText size="m" underline>
        username
      </TitleText>
      <div>
        <ChangeUserNameForm />
      </div>
      <TitleText size="m" underline>
        password
      </TitleText>
      <div>
        <div>old password</div>
        <div>new password</div>
        <div>new password (x2)</div>
      </div>

      <TitleText size="m" underline>
        bio
      </TitleText>
      <div>change bio</div>
      <TitleText size="m" underline>
        billing
      </TitleText>
      <div>change payment method</div>
      <TitleText size="m" underline>
        notifications
      </TitleText>
      <div>change email notifications</div>
    </div>
  );
}
