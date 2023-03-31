import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hospStyle.css";
import ".//MintPage";
const Hospital = () => {
  const nav = useNavigate();
  const navMint = () => {
    try {
      nav("/Hospital/Mint");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <div><button>connect</button></div> */}
      <div className="hosp">
        <form className="hospForm">
          <div className="container">
            <label>Patient's Name: </label>
            <input id="patName" type={"text"} />
            <label>Patient ID:</label>
            <input />
            <label>Diagnosis code: </label>
            <input id="diaCode" type={"text"} />
            <label>Doctors's Name: </label>
            <input id="docName" type={"text"} />
            <label>Date of admission: </label>
            <input id="doa" type={"date"} />
            <br />
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <button type="reset">Clear</button>
              <button>Submit</button>
            </div>
          </div>
          <button onClick={navMint} id="mNft">
            Mint as NFT
          </button>
        </form>
      </div>
    </>
  );
};

export default Hospital;
