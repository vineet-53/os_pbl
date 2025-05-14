import React, { useRef, useState } from "react";
import FileUploadFormSection from "./FileUploadFormSection";

const FileUploadPage = () => {
  const [fileUploadFormList, setFileUploadFormList] = useState([]);
  const inputRef = useRef(null);
  return (
    <div className=" bg-gray-500 py-40 text-white flex flex-col gap-10 items-center h-screen ">
      <div className="w-[400px] flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-900">
          How many files are there
        </h2>
        <input
          className="border-2 border-black px-2 py-1"
          type="number"
          ref={inputRef}
          onChange={() => {
            if (inputRef.current.value == "") setFileUploadFormList([]);
            else if (parseInt(inputRef.current.value) > 10) return;
            else {
              setFileUploadFormList(
                new Array(parseInt(inputRef.current.value)).fill(1),
              );
            }
          }}
        />
      </div>
      <FileUploadFormSection filesList={fileUploadFormList} />
    </div>
  );
};

export default FileUploadPage;
