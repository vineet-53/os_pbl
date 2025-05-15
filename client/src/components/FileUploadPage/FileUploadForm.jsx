import { useRef, useState } from "react";

const FileUploadForm = ({ setFiles }) => {
  const [file, setFile] = useState(null);
  const fileUploadRef = useRef(null);

  const handleFileUploadChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFiles((prev) => [uploadedFile, ...prev]);
  };

  return (
    <div className="w-72 h-24 bg-white border-3 border-lav shadow-md rounded-xl flex justify-center items-center p-4 transition-all">
      <button
        type="button"
        onClick={() => fileUploadRef.current.click()}
        className="text-sm text-white cursor-pointer font-medium px-4 py-2 rounded-lg bg-lav transition-all duration-200"
      >
        {file == null
          ? "Upload File"
          : file.name.length < 20
            ? file.name
            : file.name.slice(0, 20) + " ..."}
      </button>

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
