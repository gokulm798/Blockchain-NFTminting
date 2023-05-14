import React, { useState } from "react";
import { InputField, SubmitButton } from "./AuthForm";
const PopUp = ({ handleSubmit }) => {
  const [Gender, setGender] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [Dob, setDob] = useState("");

  return (
    <div>
      <div className=" absolute justify-center items-center bg-primary/90  top-0 left-0 w-full h-screen z-20">
        <div className="flex justify-center items-center w-screen h-screen">
          <div className=" w-[300px] h-96  text-white z-30">
            <form
              action=""
              className=" bg-primary/100 w-full h-full p-5 rounded-xl border-2 border-green-400"
              onSubmit={(e) => {
                // e.preventDefault();
                handleSubmit(e, Gender, BloodGroup, Dob);
              }}
            >
              <h2 className={"my-7 px-4"}>Kindly fill these informations :</h2>
              <InputField
                label="Gender"
                type="text"
                value={Gender}
                onChange={(event) => setGender(event.target.value)}
              />
              <InputField
                label="Blood Group"
                type="text"
                value={BloodGroup}
                onChange={(event) => setBloodGroup(event.target.value)}
              />
              <InputField
                label="Date of Birth"
                type="date"
                value={Dob}
                onChange={(event) => setDob(event.target.value)}
              />
              <div className="flex justify-end p-5">
                <SubmitButton label="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
