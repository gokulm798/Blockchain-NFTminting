import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import "../Hospital";
import "../Patient";
const Login = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nav(`/${selectedOption}`);
    console.log(selectedOption);
  };
  const handleSignupLink = (e) => {
    e.preventDefault();
    props.flipCard();
  };

  return (
    <div className="login-box">
      <p>Login</p>
      <div className="login-options">
        <button
          value={"Patient"}
          onClick={handleOptionChange}
          className={selectedOption === "Patient" ? "optBtn" : ""}
        >
          Patient
        </button>
        <button
          value={"Hospital"}
          onClick={handleOptionChange}
          className={selectedOption === "Hospital" ? "optBtn" : ""}
        >
          Hospital
        </button>
        <button
          value={"Researcher"}
          onClick={handleOptionChange}
          className={selectedOption === "Researcher" ? "optBtn" : ""}
        >
          Researcher
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            required=""
            name=""
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            required=""
            name=""
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label>Password</label>
        </div>
        <button className="btn" type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="" className="a2" onClick={handleSignupLink}>
          Sign up!
        </a>
      </p>
    </div>
  );
};

export default Login;
