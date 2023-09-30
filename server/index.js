import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { patientRoutes } from "./routes/patient.js";
import { fileURLToPath } from "url";
import path from "path";

const port = 3001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(fileUpload({
  limits: { fileSize: 16 * 1024 * 1024,fieldSize: 16*1024*1024 },
}));
app.use("/api/patient", patientRoutes);


app.listen(port, () => {
  console.log("server is running on port " + port);
});
