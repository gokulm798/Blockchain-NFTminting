import React, { useState } from "react";
import { FiTag } from "react-icons/fi";
const RecordContainer = (props) => {
  const { records, recordView, licenseNft, getTime, expanded } = props;
  const [time, setTime] = useState("");

  // const [licBtnVal, setLicBtnVal] = useState(new Date());
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [expandedRecord, setExpandedRecord] = useState(-1);
  // const [cid, setCid] = useState("");

  const handleLicense = (e) => {
    e.preventDefault();
  };
  if (records.length === 0) {
    return <div className="text-2xl text-red-700">No records found</div>;
  }
  // const handleLicenseButton = (e) => {
  //   setLicBtnVal(e.target.value);
  //   const now = new Date();
  //   const future = new Date(licBtnVal);
  //   const difference = future.getTime() - now.getTime();
  //   const seconds = Math.floor(difference / 1000);
  //   console.log(seconds);
  //   setRemainingSeconds(seconds);
  // };

  const calculateAge = (birthdate) => {
    const birthdateObj = new Date(birthdate);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - birthdateObj;
    const ageDate = new Date(diffInMilliseconds);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge;
  };

  const handleTime = (e) => {
    e.preventDefault();
    // const time = ;
    //
    // const [hours, minutes] = time.split(":").map(Number);
    const hours = parseInt(time);
    const seconds = hours * 3600;

    console.log(seconds);
    getTime(e, seconds);
    // setTime("00:00");
    // Use the totalSeconds value as needed
  };

  return (
    <div className="flex flex-col mt-1 overflow-y-auto h-[calc(100vh-110px)] scrollbar-hide sm:w-[60%] gap-2  w-[390px] md:w-[450px]  lg:w-[37%] items-start">
      {records.map((record, index) => (
        <div
          key={index}
          className=" bg-green-200/60 max-h-[200px]  text-xl text-white font-mono w-full p-4 rounded-md border-2 border-green-400"
          onClick={() => {
            // setCid(record.cid);
            console.log(record.token_id);

            let cid = record.cid;
            let pid = record.patient_username;
            let token = record.token_id;
            recordView(token, cid, pid);
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
            <form className=" flex justify-between items-center bg-transparent px-4 rounded-md  border-green-400">
              <input
                type="number"
                placeholder="Enter time in hours"
                className=" bg-primary/20 px-3 h-7 rounded-md text-white outline-none
                "
                // onChange={handleTime}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <button
                className=" border-none"
                type="submit"
                onClick={handleTime}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecordContainer;
