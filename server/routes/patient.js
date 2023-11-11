import express from "express";
import {addHistory, deletePatient, getDepProfile, getDocter, getDoctorId, getPatientHistory, insertDoctor, insertPatient, setWaitPatient, showPatientDetail, showPatientSingle, showPatientWaiting, updateHistory, updatePatient } from "../controllers/patient.js";

const router = express.Router();

router.get("/getpatient",showPatientDetail);
router.get("/getpatientwaiting",showPatientWaiting);
router.get("/getpatient/:id",showPatientSingle);
router.put("/updatepatient",updatePatient)

router.post("/insertpatient",insertPatient);
router.post("/addhistory",addHistory);
router.post("/updatehistory",updateHistory);


router.get("/getpatienthistory/:id",getPatientHistory);
router.put("/waitpatient/:id",setWaitPatient)

router.delete("/deletepatient/:id",deletePatient);

router.get("/getdocter",getDocter);
router.get("/getdocter/:id",getDoctorId);


router.post("/insertdoctor",insertDoctor);
router.get("/getprofiledep/:id",getDepProfile);

export { router as patientRoutes };
