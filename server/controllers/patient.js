import { v4 as uuidv4 } from "uuid";
import { db } from "../db.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const showPatientDetail = (req, res) => {
  const q = "SELECT * FROM patient_detail";

  db.query(q, (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

export const showPatientWaiting = (req, res) => {
  const q = "SELECT * FROM patient_detail WHERE patient_status = 'waiting'";

  db.query(q, (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

export const showPatientSingle = (req, res) => {
  const q = "SELECT * FROM patient_detail WHERE patient_id = ?";
  db.query(q, [req.params.id], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

export const insertPatient = (req, res) => {
  try {
   var gender = "";
   if (req.body.gender === "M") {
    gender = "M";
  } else if (req.body.gender === "FM") {
    gender = "FM";
  } else if (req.body.gender === "OT") {
    gender = "OT";
  }
    const q =
    "INSERT INTO patient_detail(patient_name, patient_lname, patient_dob, patient_id_card, patient_tel, patient_gender, patient_address, patient_weight, patient_height, patient_pressure, patient_personal_disease, patient_medic,patient_detail,patient_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'waiting')";
    db.query(
      q,
      [
        req.body.name,
        req.body.lname,
        req.body.dob,
        req.body.idcard,
        req.body.tel,
        gender,
        req.body.address,
        req.body.weight,
        req.body.height,
        req.body.pressure,
        req.body.cogdisease,
        req.body.allerdrug,
        req.body.detail
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Insert successfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const insertDoctor = (req, res) => {
  try {
 
    const q =
    "INSERT INTO docter_detail(doc_name) VALUES (?)";
    db.query(
      q,
      [
        req.body.name,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Insert successfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const addHistory = (req, res) => {
  try {
    const q =
      "INSERT INTO patient_history(his_detail, his_medicine,his_today, his_next,doctor, patient_id) VALUES (?,?,now(),?,?,?)";

    db.query(
      q,
      [
        req.body.detail,
        req.body.medicine,
        req.body.nextdate,
        req.body.docname,
        req.body.patientid,
      ],
      (err, data) => {
        console.log(err);
        if (err) return res.status(500).json(err);
        // return res.status(200).json("Insert successfully");
        const q2 =
          "UPDATE patient_detail SET patient_status='done' WHERE patient_id = ?";
        db.query(q2, [req.body.patientid], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Insert successfully");
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const updateHistory = (req, res) => {
  try {
    // const q =
    //   "INSERT INTO patient_history(his_detail, his_medicine,his_today, his_next,doctor, patient_id) VALUES (?,?,now(),?,?,?)";
    const q = "UPDATE patient_history SET his_detail = ? , his_medicine = ? , his_next = ? ,doctor = ? WHERE his_id = ?"
    db.query(
      q,
      [
        req.body.detail,
        req.body.medicine,
        req.body.nextdate,
        req.body.docname,
        req.body.hisId,
      ],
      (err, data) => {
        console.log(err);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Update successfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const updatePatient = (req, res) => {
  try {
    const q =
      "UPDATE patient_detail SET patient_name=?,patient_lname=?,patient_dob=?,patient_id_card=?,patient_tel=?,patient_gender=?,patient_address=?,patient_weight=?,patient_height=?,patient_pressure=?,patient_personal_disease=?,patient_medic=?,patient_detail=? WHERE patient_id=? ";
    let gender = "";

    if (req.body.gender === "M") {
      gender = "M";
    } else if (req.body.gender === "FM") {
      gender = "FM";
    } else if (req.body.gender === "OT") {
      gender = "OT";
    }
    db.query(
      q,
      [
        req.body.name,
        req.body.lname,
        req.body.dob,
        req.body.idcard,
        req.body.tel,
        gender,
        req.body.address,
        req.body.weight,
        req.body.height,
        req.body.pressure,
        req.body.cogdisease,
        req.body.allerdrug,
        req.body.patientid,
        req.body.detail
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        return res.status(200).json("Insert successfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deletePatient = async (req, res) => {
  try {
    const q2 = "DELETE FROM patient_history WHERE patient_id = ?";
    db.query(q2, [req.params.id], (err, data) => {
      if (err) console.log(err);

      const q = "DELETE FROM patient_detail WHERE patient_id = ?";

      db.query(q, [req.params.id], (err, data) => {
        err ? console.log(err) : res.send("delete successfully");
      });
    });
  } catch (err) {
    console.error("Error delete file: ", err);
    res.status(500).json({ message: "Error delete file." });
  }
};

export const getPatientHistory = (req, res) => {
  const q = `SELECT *
  FROM patient_detail
  LEFT JOIN patient_history
  ON patient_detail.patient_id = patient_history.patient_id
  WHERE patient_detail.patient_id = ?;
  `;
  db.query(q, [req.params.id], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

export const getDocter = (req, res) => {
  const q = `SELECT *
  FROM docter_detail
  `;
  db.query(q, (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

export const getDoctorId = (req, res) => {
  const q = `SELECT *
  FROM docter_detail WHERE doc_id = ?
  `;
  db.query(q,[req.params.id], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};

export const setWaitPatient = async (req, res) => {
  try {
    // console.log(req.params.id);
    const q =
      "SELECT * FROM patient_detail WHERE patient_id = ?";
    db.query(q, [req.params.id], (err, data) => {
     if (data[0].patient_status === "done") {
        const q =
          "UPDATE patient_detail SET patient_status ='waiting' WHERE patient_id  = ?";
        db.query(q, [req.params.id], (err, data) => {
          err ? console.log(err) : res.send("update successfully");
        });
      }
    });
  } catch (err) {
    // console.error("Error to fetch carousel file: ", err);
    res.status(500).json({ message: "Error to fetch patient." });
  }
};

export const getDepProfile = (req, res) => {
  const q = `SELECT *
  FROM patient_history WHERE his_id = ?
  `;
  db.query(q,[req.params.id], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
};
