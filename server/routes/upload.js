const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { processFilesFCFS } = require("../schedulingAlgo");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file?.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

async function removeJunkFiles(files) {
  files?.map((file) => {
    if (file?.path) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log("Error deleting file");
        }
      });
    }
  });
  console.log("removed junk files");
}

// No limit on file count here
router.post("/", upload.array("files"), async (req, res) => {
  try {
    const { files } = req;
    const { algo } = req.body;
    if (files.length == 0) {
      return res.json({
        success: false,
        message: "no files recieved",
      });
    }

    const uploadedFiles = req.files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    }));

    let result = [];

    if (algo === "fcfs") {
      let fileQueue = [];
      for (const file of files) {
        fileQueue.push({
          file,
          arrivalTime: Date.now(),
        });
      }
      result = await processFilesFCFS(fileQueue);
    }

    await removeJunkFiles(files);

    return res.json({
      message: "Files uploaded successfully",
      success: true,
      result,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "File upload failed." });
  }
});

module.exports = router;
