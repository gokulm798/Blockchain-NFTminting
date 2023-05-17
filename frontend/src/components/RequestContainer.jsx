import React, { useState } from "react";

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
  } = props;
  if (requests.length === 0) {
    return <div className="text-2xl text-red-700">No requests found</div>;
  }
  console.log(requests);
  return (
    <div className="flex flex-col mt-1 overflow-y-auto h-[calc(100vh-95px)] scrollbar-hide  w-[390px] md:w-[450px]  lg:w-[37%] ">
      {requests.map(
        (request, index) =>
          request.isAccept && (
            <div
              key={index}
              className="bg-green-200/60   text-white text-xl text-primary p-4 rounded-md mt-1 border-2 border-green-400 "
              onClick={(e) => {
                RecordDetails(request);
              }}
            >
              {/* Display request details */}
              {request.Content}
              {aBtn && (
                <div className="flex justify-end">
                  <Button
                    colour={aColour}
                    btn={aBtn}
                    func={() => acptF(request)}
                  />
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
          )
      )}
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
