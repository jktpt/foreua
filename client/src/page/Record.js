import React from "react";
import "./record.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Record = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState("");
  const [medicine, setMedicine] = useState("");
  const [nextDate, setNextDate] = useState("");

  const location = useLocation();
  const patientId = location.pathname.split("/")[2];

  const handleClick = async () => {
    const formData = new FormData();
    console.log("click");
    formData.append("detail", detail);
    formData.append("medicine", medicine);
    formData.append("nextdate", nextDate);
    formData.append("patientid", patientId);
    if (detail || medicine || nextDate || patientId) {
      await axios
        .post(`http://localhost:3001/api/patient/addhistory`, formData)
        .then((res) => {
          console.log(res);
        });
      window.location.href = "/";
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
      };
      fetchData();
    } catch (err) {
      console.error("Failed to fetch data: " + err);
    }
  }, []);

  return (
    <div className="container-bg1">
      <div className="container1">
        <Link to="/doctor">
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
                <b>เพศ</b> {data.patient_gender}
              </p>
              <p className="title1">
                <b>โรคประจำตัว</b> {data.patient_personal_disease}
              </p>
              <p className="title1">
                <b>ยาที่แพ้</b> {data.patient_medic}
              </p>

              <div className="fields1">
                <div className="input-field1">
                  <label>บันทึกการรักษา</label>
                  <textarea
                    type="text"
                    placeholder="บันทึกการรักษา"
                    required
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>

                <div className="input-field1">
                  <label>ยาที่ได้รับ</label>
                  <textarea
                    type="text"
                    placeholder="ยาที่ได้รับ"
                    required
                    onChange={(e) => setMedicine(e.target.value)}
                  />
                </div>

                <div className="input-field1">
                  <label>วันนัดครั้งต่อไป</label>
                  <input
                    type="date"
                    placeholder="วันนัดครั้งต่อไป"
                    required
                    onChange={(e) => setNextDate(e.target.value)}
                  />
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
