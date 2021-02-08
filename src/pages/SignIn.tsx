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
import axios from "axios";

function SignInButton(signInProps: { signUp?: boolean | undefined }) {
  const successCallback = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const id_token = keyInObject("tokenId", response)
      ? (response as GoogleLoginResponse).getAuthResponse().id_token
      : undefined;
    
      /* Send token to server to validate
    (create account if needed)
    sign in and start session
    return user information*/
    var post_url = "http://localhost:5000/signin"
    axios.post(post_url, {id_token: id_token})
      .then(data => {
        console.log(data)
      })
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
        <h3>welcome back.</h3>
        <h1>sign in</h1>
        <SignInButton />
        <div style={{ height: 100 }} />
        <div>
          <u>
            <i>don't have an account?</i>
          </u>
        </div>
        <div><a href="/signup">sign up for free.</a></div>
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
        <div><a href="/signin">sign in for free.</a></div>
      </div>
    </div>
  );
}
