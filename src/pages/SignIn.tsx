import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { keyInObject } from "../util/TypeComparison";

export default function SignIn() {
  const successCallback = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const tokenId = keyInObject['tokenId'] ? (response as GoogleLoginResponse).tokenId : undefined;
    console.log(tokenId);
  };
  const failureCallback = (response: GoogleLoginResponse) => {
    console.log(response);
  };
  return (
    <div>
      <h1>sign in</h1>
      <div>
        <GoogleLogin
          // For custom login, make a render attribute
          onSuccess={successCallback}
          onFailure={failureCallback}
          buttonText="login with google"
          cookiePolicy={"single_host_origin"}
          clientId={process.env.GOOGLE_AUTH_CLIENT_ID!}
        />
      </div>
    </div>
  );
}
