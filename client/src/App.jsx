import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploadPage from "./components/FileUploadPage/FileUploadPage";
import InputDataPage from "./components/InputDataPage/InputDataPage";
import HomePage from "../src/Pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/file-upload" element={<FileUploadPage />} />
          <Route path="/cpu-scheduling" element={<InputDataPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
