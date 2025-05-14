import axios from "axios";
import React, { useEffect, useState } from "react";
import FileUploadForm from "./FileUploadForm";
import { BASE_URL } from "../../constant/api";
import toast from "react-hot-toast";

const FileUploadFormSection = ({ filesList, setResult }) => {
  const [files, setFiles] = useState([]);
  const [selectAlgo, setSelectAlgo] = useState("fcfs");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (filesList.length !== files.length) {
      console.log("please upload all files");
      return;
    }

    // inserting the files data
    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("algo", selectAlgo);

    (async () => {
      const loadingId = toast.loading("uploading files...");
      try {
        const res = await axios.post(BASE_URL + "/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        if (!res.data.success) {
          throw new Error("error uploading file");
        }
        setResult(res.data.result);
        toast.success(res.data.message);
      } catch (err) {
        console.log("error uploading backend");
        toast.error("Error upload files");
      } finally {
        toast.dismiss(loadingId);
      }
    })();
  };
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center flex-col gap-3 h-40 "
    >
      {filesList?.length !== 0 && (
        <select
          onChange={(e) => {
            setSelectAlgo(e.target.value);
          }}
          className="bg-gray-50 w-[200px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue value="fcfs">
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
          className="w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Upload
        </button>
      )}
    </form>
  );
};

export default FileUploadFormSection;
