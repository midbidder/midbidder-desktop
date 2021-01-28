import React from "react";

/**
 * @interface
 * @param signedIn - boolean flag
 * @param signOut - callback to sign out
 * @param signIn - callback to sign  in
 * @param user - user information
 */
export interface AuthSchema {
  signedIn: boolean;
  signOut?: () => void;
  signIn?: () => void;
  user?: any;
}

/** Signed out by default. */
export const AuthContextSignedOut: AuthSchema = {
  signedIn: false,
};

export const AuthContextSignedIn: AuthSchema = {
  signedIn: true,
}

export const AuthContext = React.createContext(AuthContextSignedOut);
