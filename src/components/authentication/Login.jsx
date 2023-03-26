import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "./firebase";
import classes from "./Login.module.css";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    // const [value,setValue] = useState('')
  const signIn = (e) => {
      signInWithPopup(auth, provider).then((data) => {
        //   setValue(data.user.email)
          localStorage.setItem("Email",data.user.email)
    })
  };
  return (
    <div className={classes.login}>
      <div className={classes[`login__logo`]}>
        <img
          src="https://1000logos.net/wp-content/uploads/2020/10/Discord-logo.png"
          alt="discord logo"
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
