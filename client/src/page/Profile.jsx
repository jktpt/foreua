import React from "react";
import axios from "axios";
import "./doctor.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Profile = () => {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get(`http://localhost:3001/api/patient/getpatient/${id}`)
          .then((res) => {
            setData(res.data);
          });
        await axios
          .get(`http://localhost:3001/api/patient/getpatienthistory/${id}`)
          .then((res) => {
            setHistory(res.data);
          });
      };
      fetchData();
    } catch (err) {
      console.error("Failed to fetch data: " + err);
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="bg-main">
          <h1>ข้อมูลส่วนตัว</h1>
          <div className="main-datagrid">
            {data.map((v) => {
              return (
                <>
                  <div>
                    <div className="line1">
                      <b>ชื่อ</b> : {v.patient_name + " " + v.patient_lname}{" "}
                      <b>เพศ</b> :{" "}
                      {v.patient_gender === "M"
                        ? "ชาย"
                        : v.patient_gender === "FM"
                        ? "หญิง"
                        : "ไม่ระบุ"}{" "}
                      <b>เบอร์โทรศัท์</b> : {v.patient_tel}
                    </div>
                    <div className="line2">
                      <b>วันเกิด</b> :{" "}
                      {moment(v.patient_dob).format("DD-MM-YYYY")}{" "}
                      <b>รหัสบัตรประจำตัวประชาชน</b> : {v.patient_id_card}{" "}
                    </div>
                    <div className="line3">
                      <b>ที่อยู่</b> : {v.patient_address} <b>น้ำหนัก</b> :{" "}
                      {v.patient_weight} <b>ส่วนสูง</b> : {v.patient_height}
                    </div>
                    <div className="line4">
                      <b>ความดัน</b> : {v.patient_pressure} <b>โรคประจำตัว</b> :{" "}
                      {v.patient_personal_desease
                        ? v.patient_personal_desease
                        : "-"}{" "}
                      <b>ยาที่แพ้</b> :{" "}
                      {v.patient_medic ? v.patient_medic : "-"}
                    </div>
                  </div>
                </>
              );
            })}
            <br></br>
            <hr></hr>
            <br></br>
            {history?.map((h) => {
              if(h.created_date){
                return (
                  <>
                   <div className="line8"><b>วันที่เข้ารับการรักษา</b> : {moment(h.created_date).format("DD-MM-YYYY")}</div>
                    <div className="line5"><b>ประวัติการรักษา</b> : {h.his_detail}</div>
                    <div className="line6"><b>ยาที่ได้รับ</b> : {h.his_medicine}</div>
                    <div className="line7"><b>นัดครั้งต่อไป</b> : {moment(h.his_next).format("DD-MM-YYYY")}</div>
                    <div className="line7"><b>แพทย์เจ้าของไข้</b> : {h.doctor}</div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                  </>
                );
              }
             
            })}
          </div>
          <div className="btn-adddata">
            <Link to="/">
              <button className="button-73">กลับหน้าหลัก</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
