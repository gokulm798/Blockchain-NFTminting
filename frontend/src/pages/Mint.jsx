import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Mint = ({ handleSubmit }) => {
  // const location = useLocation();

  const [Pid, setPid] = useState("");
  const [Doc, setDoc] = useState("");
  const [DiaCode, setDiaCode] = useState("");
  const [Error, setError] = useState(false);
  const suggestions = ["Apple", "Apricot"];
  const tk = sessionStorage.getItem("tk");

  return (
    <div className="flex justify-center items-center h-[100vh] w-screen gap-2 ">
      <form
        className="bg-primary text-white w-[600px] p-7 border-green-500 border-2 rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          if (Pid !== "" && Doc !== "" && DiaCode !== "") {
            handleSubmit(e, Pid, Doc, DiaCode);
          } else setError(true);
        }}
      >
        <InputBox
          type={"text"}
          list={"suggestions"}
          label="Patient Name/Id"
          value={Pid}
          onChange={(event) => setPid(event.target.value)}
        />
        {/* <datalist id="suggestions" className="bg-white">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}

          </datalist> */}

        <InputBox
          label="Docter's Name"
          value={Doc}
          onChange={(event) => setDoc(event.target.value)}
        ></InputBox>
        <InputBox
          label="Diagnosis Code"
          value={DiaCode}
          onChange={(event) => setDiaCode(event.target.value)}
        ></InputBox>
        <div className="h-8">
          {Error && (
            <p className="text-sm text-red-600">Please fill in all details</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-700/40 border-none w-2/3 mx-3 hover:brightness-150 duration-500"
        >
          Submit
        </button>
        <button
          type="reset"
          className=" bg-red-700/40 text-white w-1/4 border-none hover:brightness-150 duration-500"
          onClick={() => {
            setPid("");
            setDoc("");
            setDiaCode("");
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Mint;

const InputBox = ({ label, list, type, placeholder, value, onChange }) => {
  return (
    <>
      <div className=" grid grid-cols-3 items-center ">
        <label className="relative col-span-1">{label}</label>
        <input
          className=" mb-3 border-b-[1px] border-solid w-full border-white/40 bg-transparent focus:outline-none my-5 col-span-2"
          type={type}
          list={list}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};
