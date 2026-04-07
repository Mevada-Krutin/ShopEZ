import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

export const upload = multer({ storage });


// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const tempDir = "uploads/temp";
// if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, tempDir),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 100 * 1024 * 1024 } // 100 MB max for large uploads
// });
