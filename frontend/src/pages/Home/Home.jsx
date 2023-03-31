import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [flip, setFlip] = useState(false);
  const flipCard = () => {
    setFlip(!flip);
    console.log(flip);
  };
  return (
    <div>
      <div className="welcomeWrap">
        <div className="bgPattern">
          <div className={`card${flip ? "is-flipped" : ""}`}>
            <div className="card-front">
              <Login flipCard={flipCard} />
            </div>
            <div className="card-back">
              <Signup flipCard={flipCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
