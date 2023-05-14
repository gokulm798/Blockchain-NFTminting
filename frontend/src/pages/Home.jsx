import React, { useState } from "react";
import { AuthForm, Login, Signup } from "../components/AuthForm";
const Home = () => {
  const [flip, setFlip] = useState(false);
  const flipCard = () => {
    setFlip(!flip);
    console.log(flip);
  };
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-center items-center w-full h-screen pb-16 overflow-hidden">
        <div className="  relative w-[360px] h-[420px] text-white [transform-style:preserve-3d] transition-all duration-300 group]">
          <div
            className={` bg-primary absolute justify-center items-center w-full h-full rounded-xl backface-visible [backface-visibility:hidden] z-10 transition-transform duration-700 ${
              flip ? "[transform:rotateY(180deg)]" : ""
            }`}
            //  group-hover:
          >
            <h2 className=" text-center text-2xl my-6">Login</h2>
            <Login flipCard={flipCard} />
          </div>
          <div
            className={` bg-primary absolute w-full h-full rounded-xl backface-visible [backface-visibility:hidden]   transition-all  duration-700 ${
              flip
                ? "[transform:rotateY(0deg)]"
                : "[transform:rotateY(180deg)] "
            }`}
            // group-hover:[transform:rotateY(0deg)]
          >
            <h2 className=" text-center text-2xl mt-8">Signup!</h2>
            <Signup flipCard={flipCard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
