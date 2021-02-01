import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { keyInObject } from "../util/TypeComparison";
import { Button } from "react-bootstrap";
import {
  styleLoginButton,
  styleLoginButtonHover,
} from "../styles/SignInStyles";

function SignInButton(signInProps: { signUp?: boolean | undefined }) {
  const successCallback = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokenId = keyInObject("tokenId", response)
      ? (response as GoogleLoginResponse).tokenId
      : undefined;
    console.log(tokenId);
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

export default function SignIn() {
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
        <h3>join the action.</h3>
        <h1>sign in / up</h1>
        <SignInButton />
        <div style={{ height: 100 }} />
        <div>
          <u>
            <i>don't have an account?</i>
          </u>{" "}
          sign up for free.
        </div>
        <SignInButton signUp={true}/>
      </div>
    </div>
  );
}
