import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Hospital = () => {
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState([]);
  const [Pid, setPid] = useState("");
  const [Doc, setDoc] = useState("");
  const [DiaCode, setDiaCode] = useState("");

  const suggestions = ["Apple", "Apricot"];

  const data = location.state;
  const tk = data.tk;

  const [fileBase64String, setFileBase64String] = useState("");
  const nav = useNavigate();
  const dataSubmit = async (e) => {
    e.preventDefault();
    console.log(fileBase64String);
    const tokenId = uuidv4();
    const response = await fetch("http://localhost:8000/api/nft/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({
        token_id: tokenId,
        patient_username: Pid,
        hash: fileBase64String,
        diagnosis_code: DiaCode,
        doc_name: Doc,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setCnt(cnt + 1);
      nav("/Hospital/Mint", { state: { tk } });
      // console.log(cnt);
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
    console.log(e.target.files[0]);
  };
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64.substring(Base64.indexOf(",") + 1));
        // console.log(Base64);
        setFileBase64String(Base64.substring(Base64.indexOf(",") + 1));
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };
  useEffect(() => {
    encodeFileBase64(selectedFile[0]);
  }, [selectedFile]);

  return (
    <div className="flex justify-center items-center h-[100vh] w-screen gap-2 ">
      <form
        className="bg-primary text-white w-[600px] p-7 border-green-500 border-2 rounded-md"
        onSubmit={dataSubmit}
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
        <InputBox type={"file"} onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-green-700/40 border-none w-2/3 mx-3 hover:brightness-150 duration-500"
        >
          Submit
        </button>
        <button
          type=""
          className=" bg-red-700/40 text-white w-1/4 border-none hover:brightness-150 duration-500"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Hospital;

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
