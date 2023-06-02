import React, { useEffect, useState } from "react";

const RequestContainer = (props) => {
  const {
    requests,
    aColour,
    rColour,
    aBtn,
    rBtn,
    acptF,
    rejtF,
    RecordDetails,
    filter,
  } = props;
  const [LicMsg, setLicMsg] = useState(false);
  const [MintMsg, setMintMsg] = useState(false);
  const [Accepted, setAccepted] = useState(false);
  const [ResMsg, setResMsg] = useState(false);
  let filteredRequests = requests;
  useEffect(() => {
    console.log(filter);
    if (filter == "accepted") {
      filteredRequests = requests.filter((request) => request.isAccept);
      console.log(filteredRequests);
      setAccepted(true);
    } else if (filter == "License") {
      setLicMsg(true);
      setMintMsg(false);
      console.log(LicMsg);
    } else if (filter == "Mint") {
      setMintMsg(true);
      setLicMsg(false);
      console.log(MintMsg);
    } else {
      setResMsg(true);
    }
  }, [filter]);

  if (filteredRequests.length === 0) {
    return <div className="text-2xl text-red-700">No requests found</div>;
  }
  console.log(requests);
  return (
    <div className="flex flex-col mt-1 overflow-y-auto h-[calc(100vh-95px)] scrollbar-hide  w-[390px] md:w-[450px]  lg:w-[37%] ">
      {filteredRequests.map((request, index) => (
        <div
          key={index}
          className="bg-green-200/60   text-white text-xl text-primary p-4 rounded-md mt-1 border-2 border-green-400 "
          onClick={(e) => {
            RecordDetails(request);
          }}
        >
          {/* Display request details */}
          {/* {request.Content} */}
          {Accepted && request.isAccept && (
            <span>
              {request.request_to} has accepted the request for minting{" "}
              {request.diagnosis_disease} treatment records under{" "}
              {request.doc_name} as Nfts.
            </span>
          )}
          {LicMsg && (
            <span>
              {request.sender_name} has a request to license your records of{" "}
              {request.diagnosis_disease}
            </span>
          )}
          {MintMsg && (
            <span>
              {request.sender_name} has requested to mint your medical records
              for {request.diagnosis_disease} Dr.{request.doc_name} as Nfts.
            </span>
          )}

          {ResMsg && (
            <span>
              {request.sender_username} has licensed you medical records on
              Fracture
            </span>
          )}
          {aBtn && (
            <div className="flex justify-end">
              <Button colour={aColour} btn={aBtn} func={() => acptF(request)} />
              {rBtn && (
                <Button
                  colour={rColour}
                  btn={rBtn}
                  func={() => rejtF(request)}
                />
              )}
            </div>
          )}
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default RequestContainer;

const Button = (props) => {
  const clr = props.colour || "green-400";
  const func = props.func;
  const Btn = props.btn;
  return (
    <div
      className={`flex justify-end gap-4 transition-all duration-700 text-white text-sm`}
    >
      <button
        className={`bg-primary/80 border-none brightness-125 hover:brightness-150 hover:bg-primary/100 duration-300 py-[2px] px-2 rounded-[5px] mt-2 ml-2 ${clr}`}
        onClick={func}
      >
        {Btn}
      </button>
    </div>
  );
};
