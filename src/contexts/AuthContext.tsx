import React from "react";

export interface AuthSchema {
  signedIn: boolean;
};

export const DefaultAuthContext: AuthSchema = { signedIn: false };

export const AuthContext = React.createContext(DefaultAuthContext);