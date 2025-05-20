// middlewares/multer.js
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".pdf", ".docx"];

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and document files are allowed"), false);
  }
};

const singleUpload = multer({ storage, fileFilter }).single("file"); // Default field
const multiUpload = multer({ storage, fileFilter }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]);

// ✅ Export both
export { singleUpload, multiUpload };
