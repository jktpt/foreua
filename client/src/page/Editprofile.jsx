import React from "react";
import "./record.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Editprofile = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState("");
  const [medicine, setMedicine] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [docter_name, setDocter] = useState([]);
  const [docname, setDocName] = useState([]);
  const [dataDocName, setDataDocName] = useState("");
  const [history, setHistory] = useState([]);

  const location = useLocation();
  const patientId = location.pathname.split("/")[2];
  const hisId = location.pathname.split("/")[3];

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("detail", detail);
    formData.append("medicine", medicine);
    formData.append("nextdate", nextDate);
    formData.append("patientid", patientId);
    formData.append("docname", docname);
    formData.append("hisId", hisId);
    if (detail || medicine || nextDate || patientId) {
      await axios
        .post(`http://localhost:3001/api/patient/updatehistory`, formData)
        .then((res) => {
          console.log(res);
        
        });
        window.location.href = `/profile/${patientId}`;
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (patientId) {
          await axios
            .get(`http://localhost:3001/api/patient/getpatient/${patientId}`)
            .then((res) => {
              setData(res.data[0]);
            });
        }
        await axios
          .get(`http://localhost:3001/api/patient/getdocter`)
          .then((res) => {
            setDocter(res.data);
          });

        await axios
          .get(`http://localhost:3001/api/patient/getprofiledep/${hisId}`)
          .then((res) => {
            setHistory(res.data[0]);
          });
      };
      fetchData();
    } catch (err) {
      console.error("Failed to fetch data: " + err);
    }
  }, []);

  useEffect(() => {
    if (history && Object.keys(history).length > 0) {
      setDetail(history.his_detail || "");
      setMedicine(history.his_medicine || "");
      setNextDate(history.his_next || "");
      setDataDocName(history.doctor || "");
    }
  }, [history]);

  return (
    <div className="container-bg1">
      <div className="container1">
        <Link to="/">
          <button className="button-89">
            <span className="btnText1">ย้อนกลับ</span>
            <i className="uil uil-navigator1"></i>
          </button>
        </Link>
        <header>บันทึกประวัติการรักษาของผู้ป่วย</header>

        <form action="#">
          <div className="form first1">
            <div className="details1 personal1">
              <p className="title1">
                <b>ชื่อ</b> {data.patient_name} {data.patient_lname}
              </p>
              <p className="title1">
                <b>รหัสประจำตัวประชาชน</b> {data.patient_id_card}
              </p>
              <p className="title1">
                <b>น้ำหนัก</b> {data.patient_weight} <b>ส่วนสูง</b>{" "}
                {data.patient_height}
              </p>
              <p className="title1">
                <b>เพศ</b>{" "}
                {data.patient_gender === "M"
                  ? "ชาย"
                  : data.patient_gender === "FM"
                  ? "หญิง"
                  : "ไม่ระบุ"}
              </p>
              <p className="title1">
                <b>โรคประจำตัว</b> {data.patient_personal_disease}
              </p>
              <p className="title1">
                <b>ยาที่แพ้</b> {data.patient_medic}
              </p>
              <p className="title1">
                <b>อาการเบื้องต้น</b> {data.patient_detail}
              </p>

              <div className="fields1">
                <div className="input-field1">
                  <label>บันทึกการรักษา</label>
                  <textarea
                    type="text"
                    placeholder="บันทึกการรักษา"
                    required
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                  />
                </div>

                <div className="input-field1">
                  <label>ยาที่ได้รับ</label>
                  <textarea
                    type="text"
                    placeholder="ยาที่ได้รับ"
                    required
                    onChange={(e) => setMedicine(e.target.value)}
                    value={medicine}
                  />
                </div>

                <div className="input-field1">
                  <label>วันนัดครั้งต่อไป</label>
                  <input
                    type="date"
                    placeholder="วันนัดครั้งต่อไป"
                    required
                    onChange={(e) => setNextDate(e.target.value)}
                    value={nextDate.split("T")[0]}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="input-field1">
                  <label>แพทย์เจ้าของไข้</label>
                  <select onChange={(e) => setDocName(e.target.value)}>
                    {docter_name.map((k) => {
                      return (
                        <option
                          value={k.doc_name}
                          selected={k.doc_name === dataDocName}
                        >
                          {k.doc_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <button className="nextBtn1">
                <span className="btnText1" onClick={handleClick}>
                  บันทึกการรักษา
                </span>
                <i className="uil uil-navigator1"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
