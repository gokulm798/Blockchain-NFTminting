import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OTPInput from "react-otp-input";
import "../../styles/Login.css";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [select, setSelect] = useState("");
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
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOTPChange = (otp) => {
    setOTP(otp);
  };
  const handleSelectChange = () => {
    // setSelect();
  };

  const handleSendOTP = () => {
    // Send OTP to email and phone using API call
    axios
      .post("/api/sendotp", { email, phone })
      .then(() => setIsOTPVerified(true))
      .catch((error) => console.log(error));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    props.flipCard();
    // Create user account using API call
    // axios
    //   .post("/api/signup", { email, phone })
    //   .then(() => nav("/login"))
    //   .catch((error) => console.log(error));
  };

  const isEmailValid = () => {
    // Email validation logic using regular expression
  };

  const isPhoneValid = () => {
    // Phone number validation logic using regular expression
  };

  return (
    <div className="login-box">
      <p>Signup</p>
      <form onSubmit={handleSignup}>
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
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            required=""
            name=""
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
          />
          <label>Phone:</label>
        </div>
        <div className="user-box">
          <select
            required=""
            name=""
            // value={select}
            onChange={handleSelectChange}
          >
            <option value={"Hospital/Clinic"}>Hospital/Clinic</option>
            <option value={"Patient"}>Patient</option>
            <option value={"Researcher"}>Researcher</option>
          </select>
        </div>
        {isOTPVerified ? (
          <div>
            <label>OTP:</label>
            <OTPInput value={otp} onChange={handleOTPChange} numInputs={6} />
          </div>
        ) : (
          <div>
            <button
              onClick={handleSendOTP}
              disabled={!isEmailValid() || !isPhoneValid()}
              className="otpbtn"
            >
              Send OTP
            </button>
          </div>
        )}
        <div>
          <button className="btn" type="submit" disabled={isOTPVerified}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
