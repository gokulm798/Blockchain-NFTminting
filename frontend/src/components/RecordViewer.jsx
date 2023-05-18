import React from "react";

const RecordViewer = ({ base64String }) => {
  console.log(base64String);

  return (
    <div id="pdf-container" className="sm:w-[95%] md:w-[60%]">
      <iframe
        src={`data:application/pdf;base64,${base64String}`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        className=" relative p-0 w-full"
      />
      {/* <div className="absolute inset-0 flex items-center h-14 bg-gray-200"></div> */}
    </div>
  );
};

export default RecordViewer;
