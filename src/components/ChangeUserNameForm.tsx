import { FormControl } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import {
  black,
  blue,
  bodyFont,
  bodyFontWeight,
} from "../styles/GlobalStyles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const NameTextField = withStyles({
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

export default function ChangeUserNameForm() {
  const [username, setUsername] = useState("");
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
      onClick={() => setUsername("")}
    />
  );
  const invalid = true;
  const done = true;
  const currentIcon = invalid ? invalidIcon : done ? doneIcon : notDoneIcon;
  return (
    <div>
      <FormControl className={usernameClasses.root}>
        <NameTextField
          label="change username"
          helperText={invalid ? "that username is taken or invalid" : done ? "username changed!" : "enter a username"}
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
          placeholder={"old name"}
          className={usernameClasses.margin}
          onChange={(event) => {
            //console.log(event);
            setUsername(event.target.value);
          }}
          value={username}
        />
      </FormControl>
    </div>
  );
}
