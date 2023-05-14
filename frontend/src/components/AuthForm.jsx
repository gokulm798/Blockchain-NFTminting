import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthForm = ({ children, onSubmit }) => {
  return (
    <form className="py-7 px-6 " onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className=" px-4 text-md text-white  transition-500">
      <label className="absolute">{label}</label>
      <input
        className=" mb-3 border-b-[1px] border-solid w-full border-white bg-transparent focus:outline-none my-6"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const SubmitButton = ({ label }) => {
  return (
    <>
      <button
        className="relative inline-block overflow-hidden px-10 bg-transparent border-none text-white rounded-none hover:bg-white hover:text-violet-800 hover:rounded"
        type="submit"
      >
        <span className="absolute top-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 animate-lineR bg-transparent "></span>
        <span className="absolute  right-0 h-full w-0.5 bg-gradient-to-b from-violet-500 to-blue-500 animate-lineB bg-transparent [animation-delay:375ms]"></span>
        <span className="absolute bottom-0 w-full h-0.5 bg-gradient-to-l from-violet-500 to-blue-500 animate-lineL bg-transparent [animation-delay:750ms]"></span>
        <span className="absolute  left-0 h-full w-0.5 bg-gradient-to-t from-violet-500 to-blue-500 animate-lineT bg-transparent [animation-delay:1225ms]"></span>
        {label}
      </button>
    </>
  );
};

const Login = (props, { onSubmit }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [Page, setPage] = useState();
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstChar = userId.charAt(0);
    let pg;
    if (firstChar === "P" || firstChar === "p") {
      pg = "Patient";
    } else if (firstChar === "H" || firstChar === "h") {
      pg = "Hospital";
    } else if (firstChar === "R" || firstChar === "r") {
      pg = "Researcher";
    }
    console.log(pg);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const username = userId;
      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        { username, password },
        config
      );
      // console.log("Auth");
      // console.log(pg);
      // console.log(data);
      // console.log(data.data.status);

      if (data) {
        console.log(data.status);
        if (data.status !== 401) {
          const tk = data.token;
          const nm = data.name;
          // console.log(nm);
          // console.log(tk);
          // console.warn("moonji");
          const un = data.username;
          sessionStorage.setItem("tk", tk);
          nav(`/Patient`, {
            state: {
              nm,
              un,
              tk,
            },
          });
        }

        console.log(JSON.stringify(data));

        // onSubmit({ email, password, confirmPassword });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const flipCard = (e) => {
    e.preventDefault();
    props.flipCard();
  };
  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <InputField
          type=""
          placeholder="Enter UserID"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <InputField
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="mt-7"></div>
        <SubmitButton label="Login" />
      </AuthForm>{" "}
      <div className=" text-white text-sm mt-5 ml-6 ">
        <p className=" brightness-50">Don't have an account? </p>
        <p>
          <a
            href=""
            className="text-[16px] brightness-110 text-white"
            onClick={flipCard}
          >
            Sign up!
          </a>
        </p>
      </div>
    </>
  );
};
const Signup = (props, { onSubmit }) => {
  const [Username, setUsername] = useState("");
  const [Prefix, setPrefix] = useState();
  // const [Option, setOption] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [userIDs, setUserIDs] = useState({
    patient: "",
    hospital: "",
    researcher: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // ...

  const handleSelectChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);

    let prefix;
    if (option === "Patient") {
      prefix = "P";
    } else if (option === "Hospital") {
      prefix = "H";
    } else if (option === "Researcher") {
      prefix = "R";
    }
    setPrefix(prefix);
    let UserID;
    if (userIDs[option] == null && option !== "select") {
      UserID = generateUserID(prefix, Username);
      setUserIDs((prevState) => ({
        ...prevState,
        [option]: UserID,
      }));
    }
  };

  const generateUserID = (prefix, Username) => {
    const cleanUsername = Username.toUpperCase().trim();
    const randomDigits = Math.floor(Math.random() * 9000) + 1000;
    const userID = `${prefix}${cleanUsername.substring(0, 3)}${randomDigits}`;
    // console.log(userID);
    return userID;
  };

  // ...

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = userIDs[selectedOption];
    const name = Username;

    console.log(username, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/user/",
        { username, name, password },
        config
      );
      if (data) {
        if (data.status !== 401) {
          const tk = data.token;
          const nm = data.name;
          console.log(nm);
          const un = data.username;
          // Set data in session storage
          sessionStorage.setItem("tk", tk);

          navigate(`/${selectedOption}`, {
            state: {
              nm,
              un,
              tk,
            },
          });
        }

        console.log(JSON.stringify(data));

        // onSubmit({ email, password, confirmPassword });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // onSubmit({ userId, password });

  return (
    <AuthForm onSubmit={handleSubmit}>
      <InputField
        type=""
        placeholder="User Name"
        value={Username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <div className="flex justify-between px-3 mt-2">
        <select
          className=" bg-primary text-white border-none outline-none"
          onChange={handleSelectChange}
        >
          {/* <option>Select</option> */}
          <option value="select">Select</option>
          <option value="Hospital">Hospital/Clinic</option>
          <option value="Patient">Patient</option>
          <option value="Researcher">Researcher</option>
        </select>
        {selectedOption && (
          <div className="mt-2">User ID : {userIDs[selectedOption]}</div>
        )}
      </div>

      <InputField
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <InputField
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <SubmitButton label="Signup" />
    </AuthForm>
  );
};

export { AuthForm, Login, Signup, SubmitButton, InputField };
