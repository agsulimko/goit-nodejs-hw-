const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
//  Обробник помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// ============================

// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// require("dotenv").config();
// const authRouter = require("./routes/api/auth");
// const contactsRouter = require("./routes/api/contacts");
// const app = express();

// const path = require("path");
// const multer = require("multer");
// const { nanoid } = require("nanoid");
// const fs = require("fs/promises");

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRouter);
// app.use("/api/contacts", contactsRouter);

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Not found" });
// });
// //  Обробник помилок
// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

// const tempDir = path.join(__dirname, "temp");
// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: multerConfig });
// const contactsDir = path.join(__dirname, "public", "contacts");
// app.post("/api/contacts", upload.single("cover"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(contactsDir, originalname);
//   await fs.rename(tempUpload, resultUpload);
//   const cover = path.join("books", originalname);
//   const newContact = {
//     id: nanoid(),
//     ...req.body,
//     cover,
//   };
//   contacts.push(newContact);
//   res.status(201).json(newContact);
// });

// module.exports = app;
