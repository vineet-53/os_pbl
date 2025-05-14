import { useRef, useState } from "react";

const FileUploadForm = ({ setFiles }) => {
  const [file, setFile] = useState(null);
  const fileUploadRef = useRef(null);
  const handleFileUploadChange = (e) => {
    setFile(e.target.files[0]);
    setFiles((prev) => [e.target.files[0], ...prev]);
    console.log(e.target.files);
  };
  return (
    <div
      onClick={() => {
        fileUploadRef.current.click();
      }}
      className="h-[100px] p-4 flex justify-center items-center  bg-gray-400 rounded-xl w-80 relative"
    >
      {file == null && (
        <button
          type="button"
          onClick={() => {
            fileUploadRef.current.click();
          }}
          class=" cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
        >
          Upload File
        </button>
      )}

      {file != null && (
        <button
          type="button"
          onClick={() => {
            fileUploadRef.current.click();
          }}
          class="text-wrap"
        >
          {file?.name?.length < 20
            ? file?.name
            : file?.name?.slice(0, 20) + " ..."}
        </button>
      )}
      <input
        type="file"
        ref={fileUploadRef}
        onChange={handleFileUploadChange}
        className="hidden"
      />
    </div>
  );
};
export default FileUploadForm;
