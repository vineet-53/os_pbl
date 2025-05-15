import { useRef, useState } from "react";
import FileUploadFormSection from "./FileUploadFormSection";
import ProcessScheduler from "../ProcessScheduler";

const FileUploadPage = () => {
  const [fileUploadFormList, setFileUploadFormList] = useState([]);
  const [result, setResult] = useState([]);

  const inputRef = useRef(null);
  if (result.length != 0) {
    return <ProcessScheduler processes={result} />;
  }

  return (
    <div className="bg-gray py-20 px-4 flex flex-col items-center min-h-screen font-poppins text-purple">
      {result.length === 0 && (
        <>
          <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl flex flex-col gap-4 border-3 border-lav">
            <h2 className="text-2xl font-semibold text-purple">
              How many files are there?
            </h2>
            <input
              className="border border-lav rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:purple transition-all"
              type="number"
              placeholder="Enter number of files"
              ref={inputRef}
              onChange={() => {
                if (inputRef.current.value === "") setFileUploadFormList([]);
                else if (parseInt(inputRef.current.value) > 10) return;
                else {
                  setFileUploadFormList(
                    new Array(parseInt(inputRef.current.value)).fill(1)
                  );
                }
              }}
            />
            <p className="text-sm text-gray-500">
              (Limit: Max 10 files at a time)
            </p>
          </div>

          {fileUploadFormList.length != 0 && (
            <div className="mt-8 w-full max-w-2xl">
              <FileUploadFormSection
                setResult={setResult}
                filesList={fileUploadFormList}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileUploadPage;
