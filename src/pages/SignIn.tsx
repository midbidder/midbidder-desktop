import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { keyInObject } from "../util/TypeComparison";
import AnimatedButton from "react-animated-buttons";
import {
  styleLoginButton,
  styleLoginButtonHover,
} from "../styles/SignInStyles";
import { purple } from "../styles/GlobalStyles";

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
            <AnimatedButton
              color={purple}
              animationDuration={1}
              animationType="pulse"
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
            </AnimatedButton>
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
        <h3>welcome back.</h3>
        <h1>sign in</h1>
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
        <h3>join the action.</h3>
        <h1>sign up</h1>
        <SignInButton signUp={true} />
        <div style={{ height: 100 }} />
        <div>
          <u>
            <i>already have an account?</i>
          </u>
        </div>
        <div>
          <a href="/signin">sign in for free.</a>
        </div>
      </div>
    </div>
  );
}
