import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useCookies } from 'react-cookie';

export default function Login(){
  let navigate = useNavigate();
  const { setLoginToTrue, reassignUserInfo, login, isLogin, reassignUserName, userInfo } = useContext(Context);

  const [enteredUserName, setEnteredUserName] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);
  const [accountCheck, setAccountCheck] = useState("");
  const [emptyCheck, setEmptyCheck] = useState("");

  useEffect(() => {
    document.title = "Login - Trivial Trivia";
  }, []);

  const logInAndNavigate = async (enteredUserName, enteredPassword) => {
    setEmptyCheck("");
    if (
      (enteredUserName === null || enteredUserName === "") &&
      (enteredPassword === null || enteredPassword === "")
    ) {
      setEmptyCheck("Please enter a username and password");
      return;
    }
    if (enteredUserName === null || enteredUserName === "") {
      setEmptyCheck("Please enter a username");
      return;
    }
    if (enteredPassword === null || enteredPassword === "") {
      setEmptyCheck("Please enter a password");
      return;
    }

    setAccountCheck(await login(enteredUserName, enteredPassword));
  };

  useEffect(() => {
    if (isLogin) {
      reassignUserName(enteredUserName);
      navigate("/category");
    }
  }, [isLogin]);

  return (
    <div className="login">
      <h1 className="sign-in-header">Sign In</h1>
      <div className="username-form">
            <label className="user-label">Username</label>
            <input
            type="text"
            placeholder="Please enter your username"
            className="user-input-box"
            onChange={(event) => {
                setEnteredUserName(event.target.value);
            }}
            />
        </div>
        <div className="password-form">
            <label className="password-label">Password</label>
            <input
            type="password"
            placeholder="Please enter your password"
            className="password-input-box"
            onChange={(event) => {
                setEnteredPassword(event.target.value);
            }}
            />
      </div>
      <div>
        <button
          className="login-button"
          onClick={() => logInAndNavigate(enteredUserName, enteredPassword)}
        >
          Login
        </button>
        <button
          className="register-button"
          onClick={() => navigate("/Register")}
        >
          Register
        </button>
      </div>
      {accountCheck === "Invalid username" && <h1 className="error-message">Invalid username</h1>}
      {accountCheck === "Incorrect password" && <h1 className="error-message">Incorrect password</h1>}
      {emptyCheck === "Please enter a password" && (
        <h1 className="error-message">Please enter a password</h1>
      )}
      {emptyCheck === "Please enter a username" && (
        <h1 className="error-message">Please enter a username</h1>
      )}
      {emptyCheck === "Please enter a username and password" && (
        <h1 className="error-message">Please enter a username and password</h1>
      )}{" "}
    </div>
  );
}
