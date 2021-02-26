import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { keyInObject } from "../util/TypeComparison";
import {
  styleLoginButton,
  styleLoginButtonHover,
} from "../styles/SignInStyles"
import { BodyText, TitleText } from "../components/Text";
import { Button } from "react-bootstrap";

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
    console.log("c--------------");
  };
  const [buttonHover, setButtonHover] = useState(false);
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
              onMouseOver={() => {
                setButtonHover(true);
              }}
              onMouseLeave={() => {
                setButtonHover(false);
              }}
              style={buttonHover ? styleLoginButtonHover : styleLoginButton}
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
        <TitleText size="m">sign in</TitleText>
        <SignInButton />
        <div style={{ height: 100 }} />
        <div>
          <u>
            <i>don't have an account?</i>
          </u>
        </div>
        <div>
          <a href="/signup">sign up for free.</a>
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
        <TitleText size="m">sign up</TitleText>
        <SignInButton signUp={true} />
        <div style={{ height: 100 }} />
        <div>
          <u>
            <BodyText italics size="s">already have an account?</BodyText>
          </u>
        </div>
        <div>
          <a href="/signin">sign in for free.</a>
        </div>
      </div>
    </div>
  );
}
