import React, { useState } from "react";
import { FiTag } from "react-icons/fi";
const RecordContainer = (props) => {
  const { records, recordView, licenseNft, expanded } = props;
  const [licBtnVal, setLicBtnVal] = useState(new Date());
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [expandedRecord, setExpandedRecord] = useState(-1);
  // const [cid, setCid] = useState("");
  let cid = "";
  const handleLicense = (e) => {
    e.preventDefault();
  };
  if (records.length === 0) {
    return <div className="text-2xl text-red-700">No records found</div>;
  }
  const handleLicenseButton = (e) => {
    setLicBtnVal(e.target.value);
    const now = new Date();
    const future = new Date(licBtnVal);
    const difference = future.getTime() - now.getTime();
    const seconds = Math.floor(difference / 1000);
    console.log(seconds);
    setRemainingSeconds(seconds);
  };

  const calculateAge = (birthdate) => {
    const birthdateObj = new Date(birthdate);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - birthdateObj;
    const ageDate = new Date(diffInMilliseconds);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge;
  };

  return (
    <div className="flex flex-wrap mt-1 overflow-y-auto gap-2 h-[calc(100vh-110px)] scrollbar-hide sm:w-[60%]  md:w-[50%] lg:w-[40%]">
      {records.map((record, index) => (
        <div
          key={index}
          className=" bg-green-200/60 m-h-[200px]  text-xl text-white font-mono w-full p-4 rounded-md border-2 border-green-400"
          onClick={() => {
            // setCid(record.cid);
            console.log(record.cid);

            cid = record.cid;
            recordView(cid);
            // console.log(cid);
            setExpandedRecord(index);
          }}
        >
          <div className="w-full" onClick={licenseNft}>
            <div className="flex justify-between items-center px-2">
              <h2 className="px-4 text-2xl">{record.diagnosis_disease}</h2>
              <FiTag />
            </div>
            <div className="grid justify-items-start px-8 py-2">
              {/* <p>Diagnosis:</p> */}
              <p>Gender:{record.gender}</p>
              <p>Age: {calculateAge(record.dateOfBirth)}</p>
              <p>Blood Group:{record.bloodGroup}</p>
            </div>
          </div>
          {expanded && expandedRecord === index && (
            <div className=" flex justify-between bg-transparent px-7 rounded-md  border-green-400">
              <input
                type="date"
                placeholder="Enter value"
                className=" bg-transparent text-white outline-none
                "
                // value={inputValue}
                // onChange={handleInput}
              />
              <button
                value={licBtnVal}
                className=" border-none"
                onClick={handleLicenseButton}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecordContainer;
