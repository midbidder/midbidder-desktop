import { FormControl } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { black, blue, bodyFont, bodyFontWeight } from "../styles/GlobalStyles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { BodyText } from "./Text";

const PasswordTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: black,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: blue,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: black,
      },
      "&:hover fieldset": {
        borderColor: black,
      },
      "&.Mui-focused fieldset": {
        borderColor: blue,
      },
    },
  },
})(TextField);

export default function ChangePasswordForm() {
  // old password
  const [oldPassword, setOldPassword] = useState("");
  // new password
  const [newPassword, setNewPassword] = useState("");
  // confirm new password
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const useUserNameStyle = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));
  const usernameClasses = useUserNameStyle();
  const doneIcon = (
    <CheckCircleIcon
      style={{
        cursor: "pointer",
        color: blue,
      }}
    />
  );
  const notDoneIcon = (
    <CheckCircleOutlineIcon
      style={{
        cursor: "pointer",
        color: blue,
      }}
    />
  );
  const invalidIcon = (
    <CancelIcon
      style={{
        cursor: "pointer",
        color: "red",
      }}
      onClick={() => setOldPassword("")}
    />
  );
  const invalid = false;
  const done = false;
  const currentIcon = invalid ? invalidIcon : done ? doneIcon : notDoneIcon;
  return (
    <div>
      <BodyText size='xs'>it must be at least length 10, contain numbers, and symbols.</BodyText>
      <FormControl className={usernameClasses.root}>
        <PasswordTextField
          label="enter old password"
          helperText={
            invalid
              ? "that's not your old password.'"
              : done
              ? "check!"
              : "enter your old password"
          }
          InputLabelProps={{
            style: {
              fontFamily: bodyFont,
              fontWeight: bodyFontWeight,
            },
          }}
          FormHelperTextProps={{
            style: {
              fontFamily: bodyFont,
              fontWeight: bodyFontWeight,
              color: invalid ? "red" : blue,
            },
          }}
          InputProps={{
            endAdornment: currentIcon,
          }}
          variant="outlined"
          placeholder={"old password"}
          className={usernameClasses.margin}
          onChange={(event) => {
            //console.log(event);
            setOldPassword(event.target.value);
          }}
          value={oldPassword}
        />
        <PasswordTextField
          label="enter your new password."
          helperText={
            invalid
              ? "that password is invalid"
              : done
              ? "pasword changed!"
              : "enter your new password."
          }
          InputLabelProps={{
            style: {
              fontFamily: bodyFont,
              fontWeight: bodyFontWeight,
            },
          }}
          FormHelperTextProps={{
            style: {
              fontFamily: bodyFont,
              fontWeight: bodyFontWeight,
              color: invalid ? "red" : blue,
            },
          }}
          InputProps={{
            endAdornment: currentIcon,
          }}
          variant="outlined"
          placeholder={"New_Passw0rd!"}
          className={usernameClasses.margin}
          onChange={(event) => {
            //console.log(event);
            setNewPassword(event.target.value);
          }}
          value={newPassword}
        />
        <PasswordTextField
          label="repeat your new password."
          helperText={
            invalid
              ? "that username is taken or invalid"
              : done
              ? "pasword changed!"
              : "repeat new password"
          }
          InputLabelProps={{
            style: {
              fontFamily: bodyFont,
              fontWeight: bodyFontWeight,
            },
          }}
          FormHelperTextProps={{
            style: {
              fontFamily: bodyFont,
              fontWeight: bodyFontWeight,
              color: invalid ? "red" : blue,
            },
          }}
          InputProps={{
            endAdornment: currentIcon,
          }}
          variant="outlined"
          placeholder={"New_Passw0rd!"}
          className={usernameClasses.margin}
          onChange={(event) => {
            //console.log(event);
            setConfirmNewPassword(event.target.value);
          }}
          value={confirmNewPassword}
        />
      </FormControl>
    </div>
  );
}
