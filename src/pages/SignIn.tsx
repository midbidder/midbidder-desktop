import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { keyInObject } from "../util/General";
import { styleLoginButton } from "../styles/SignInStyles";
import { BodyText, TitleText } from "../components/Text";
import Button from "@material-ui/core/Button";
import { blue } from "../styles/GlobalStyles";

function SignInButton(signInProps: { signUp?: boolean | undefined }) {
  const successCallback = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokenId = keyInObject("tokenId", response)
      ? (response as GoogleLoginResponse).tokenId
      : undefined;
    // TODO: database stuff here. Check if account exists. If not, create account.
  };
  const failureCallback = (response: GoogleLoginResponse) => {
  };
  return (
    <div>
      <GoogleLogin
        // For custom login, make a render attribute
        render={(buttonProps: {
          onClick: () => void;
          disabled?: boolean | undefined;
        }) => {
          return (
            <Button
              onClick={buttonProps.onClick}
              disabled={buttonProps.disabled}
              style={styleLoginButton}
            >
              {signInProps.signUp ? "sign up" : "sign in"} with google
            </Button>
          );
        }}
        onSuccess={successCallback}
        onFailure={failureCallback}
        cookiePolicy={"single_host_origin"}
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID!}
      />
    </div>
  );
}

export function SignIn() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ height: 100 }} />
        <BodyText>welcome back.</BodyText>
        <span>
          <TitleText size="m">s</TitleText>
          <TitleText color={blue} size="m">
            i
          </TitleText>
          <TitleText size="m">gn </TitleText>
          <TitleText color={blue} size="m">
            i
          </TitleText>
          <TitleText size="m">n</TitleText>
        </span>
        <SignInButton />
        <div style={{ height: 50 }} />
        <div>
          <BodyText italics size="s" underline>
            don't have an account?
          </BodyText>
        </div>
        <div>
          <BodyText href="/signup" size="s">
            sign up for free.
          </BodyText>
        </div>
      </div>
    </div>
  );
}

export function SignUp() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ height: 100 }} />
        <BodyText>join the action.</BodyText>
        <span>
          {" "}
          <TitleText size="m">s</TitleText>
          <TitleText color={blue} size="m">
            i
          </TitleText>
          <TitleText size="m">gn up</TitleText>
        </span>
        <SignInButton signUp={true} />
        <div style={{ height: 50 }} />
        <div>
          <BodyText italics size="s" underline>
            already have an account?
          </BodyText>
        </div>
        <div>
          <BodyText href="/signin" size="s">
            sign in for free.
          </BodyText>
        </div>
      </div>
    </div>
  );
}
