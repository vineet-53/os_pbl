import React, { useEffect, useState } from "react";
import FileUploadForm from "./FileUploadForm";

const FileUploadFormSection = ({ filesList }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    console.log(files);
  }, [files]);
  return (
    <form className="flex items-center flex-col gap-3 h-40 ">
      {filesList?.length !== 0 && (
        <select
          name=""
          id=""
          class="bg-gray-50 w-[200px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="fcfs">
            FCFS
          </option>
          <option value="ljfs">LJFS</option>
          <option value="sjfs">SJFS</option>
        </select>
      )}

      <div className="w-[70%] justify-center  mx-auto flex gap-3 flex-wrap">
        {filesList.map((value, index) => {
          return <FileUploadForm setFiles={setFiles} key={index} />;
        })}
      </div>

      {filesList?.length != 0 && (
        <button
          type="submit"
          class="w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Upload
        </button>
      )}
    </form>
  );
};

export default FileUploadFormSection;
