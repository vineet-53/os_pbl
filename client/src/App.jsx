import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploadPage from "./components/FileUploadPage/FileUploadPage";
import InputDataPage from "./components/InputDataPage/InputDataPage"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FileUploadPage />} />
          <Route path="/process" element={<InputDataPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
