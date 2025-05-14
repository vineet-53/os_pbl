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
      toast.error("Please upload all files before submitting.");
      return;
    }

    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("algo", selectAlgo);

    (async () => {
      const loadingId = toast.loading("Uploading files...");
      try {
        const res = await axios.post(BASE_URL + "/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!res.data.success) {
          throw new Error("Upload failed");
        }
        setResult(res.data.result);
        toast.success(res.data.message);
      } catch (err) {
        console.error("Upload error:", err);
        toast.error("Error uploading files.");
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
      className="w-full max-w-3xl bg-white border border-sky-200 shadow-xl p-6 mt-4 rounded-2xl flex flex-col items-center gap-6"
    >
      {filesList?.length !== 0 && (
        <div className="w-full max-w-xs">
          <label className="block text-sky-700 font-semibold mb-1">
            Select Scheduling Algorithm
          </label>
          <select
            value={selectAlgo}
            onChange={(e) => setSelectAlgo(e.target.value)}
            className="block w-full border border-sky-300 rounded-lg px-4 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="fcfs">FCFS</option>
            <option value="ljfs">LJFS</option>
            <option value="sjfs">SJFS</option>
          </select>
        </div>
      )}

      <div className="w-full flex flex-wrap justify-center gap-4">
        {filesList.map((_, index) => (
          <FileUploadForm setFiles={setFiles} key={index} />
        ))}
      </div>

      {filesList?.length !== 0 && (
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md transition-all duration-200"
        >
          Upload
        </button>
      )}
    </form>
  );
};

export default FileUploadFormSection;
