import express from "express";
import {addHistory, deletePatient, getPatientHistory, insertPatient, setWaitPatient, showPatientDetail, showPatientSingle, showPatientWaiting, updatePatient } from "../controllers/patient.js";

const router = express.Router();

router.get("/getpatient",showPatientDetail);
router.get("/getpatientwaiting",showPatientWaiting);
router.get("/getpatient/:id",showPatientSingle);
router.put("/updatepatient",updatePatient)

router.post("/insertpatient",insertPatient);
router.post("/addhistory",addHistory);

router.get("/getpatienthistory/:id",getPatientHistory);
router.put("/waitpatient/:id",setWaitPatient)


router.delete("/deletepatient/:id",deletePatient);

export { router as patientRoutes };
