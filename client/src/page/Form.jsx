import React from "react";
import "./form.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Form = () => {
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [dob, setDob] = useState("");
  const [idcard, setIdCard] = useState("");
  const [tel, setTel] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [pressure, setPressure] = useState("");
  const [cogdisease, setCogDisease] = useState("");
  const [allerdrug, setAllerDrug] = useState("");
  // const curDate = new Date();
  const location = useLocation();
  const patientId = location.pathname.split("/")[2];

  const handleClick = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("lname", lname);
    formData.append("dob", dob);
    formData.append("idcard", idcard);
    formData.append("tel", tel);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("pressure", pressure);
    formData.append("cogdisease", cogdisease);
    formData.append("allerdrug", allerdrug);
    // if(tel.length !== 10 && idcard.length !== 13){
    //   alert("กรุณาใส่เบอร์โทรศัพท์หรือเลขบัตรประจำตัวประชาชนให้ถูกต้อง")
    // }else{
    if (data) {
      if (
        name.trim() !== "" ||
        lname.trim() !== "" ||
        dob.trim() !== "" ||
        idcard.trim() !== "" ||
        tel.trim() !== "" ||
        gender.trim() !== "" ||
        address.trim() !== "" ||
        weight.trim() !== "" ||
        height.trim() !== "" ||
        pressure.trim() !== "" ||
        cogdisease.trim() !== "" ||
        allerdrug.trim() !== ""
      ) {
        formData.append("patientid", patientId);

        await axios
          .put(`http://localhost:3001/api/patient/updatepatient`, formData)
          .then((res) => {
            window.location.href = "/";
          });
      }
    } else {
      if (
        name.trim() !== "" ||
        lname.trim() !== "" ||
        dob.trim() !== "" ||
        idcard.trim() !== "" ||
        tel.trim() !== "" ||
        gender.trim() !== "" ||
        address.trim() !== "" ||
        weight.trim() !== "" ||
        height.trim() !== "" ||
        pressure.trim() !== "" ||
        cogdisease.trim() !== "" ||
        allerdrug.trim() !== ""
      ) {
        await axios
          .post(`http://localhost:3001/api/patient/insertpatient`, formData)
          .then((res) => {
            window.location.href = "/";
          });
      }
    }
    // }
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

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setName(data.patient_name || "");
      setLName(data.patient_lname || "");
      setDob(data.patient_dob || "");
      setIdCard(data.patient_id_card || "");
      setTel(data.patient_tel || "");
      setGender(data.patient_gender || "");
      setAddress(data.patient_address || "");
      setWeight(data.patient_weight || "");
      setHeight(data.patient_height || "");
      setPressure(data.patient_pressure || "");
      setCogDisease(data.patient_personal_disease || "");
      setAllerDrug(data.patient_medic || "");
    }
  }, [data]);

  return (
    <div className="container-bg">
      <div className="container">
        <header>ข้อมูลผู้ป่วย</header>

        {/* <form action="#"> */}
        <div className="formdetail">
          <div className="form first">
            <div className="details personal">
              <span className="title">รายละเอียดข้อมูลส่วนบุคคล</span>

              <div className="fields">
                <div className="input-field">
                  <label>ชื่อ</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่อ"
                    required
                    value={name}
                  />
                </div>

                <div className="input-field">
                  <label>นามสกุล</label>
                  <input
                    type="text"
                    onChange={(e) => setLName(e.target.value)}
                    placeholder="นามสกุล"
                    required
                    value={lname}
                  />
                </div>

                <div className="input-field">
                  <label>วันเดือนปีเกิด</label>
                  <input
                    type="date"
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="วันเดือนปีเกิด"
                    required
                    value={dob}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="input-field">
                  <label>รหัสบัตรประชาชน</label>
                  <input
                    type="number"
                    placeholder="รหัสบัตรประชาชน"
                    required
                    minLength={13}
                    maxLength={13}
                    value={idcard}
                    onChange={(e) => setIdCard(e.target.value)}
                  />
                </div>

                <div className="input-field">
                  <label>เบอร์โทรศัพท์</label>
                  <input
                    type="number"
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="เบอร์โทรศัพท์"
                    required
                    minLength={10}
                    maxLength={10}
                    value={tel}
                  />
                </div>

                <div className="input-field">
                  <label>เพศ</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onClick={()=>{
                      // console.log(gender);
                    }}
                  >
                    <option value="" disabled>
                      เพศ
                    </option>
                    <option value="M" selected={gender === "M"}>Male</option>
                    <option value="FM" selected={gender === "FM"}>Female</option>
                    <option value="OT" selected={gender === "OT"}>Others</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>ที่อยู่</label>
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ที่อยู่"
                    required
                    value={address}
                  />
                </div>

                <div className="input-field">
                  <label>น้ำหนัก</label>
                  <input
                    type="text"
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="น้ำหนัก"
                    required
                    value={weight}
                  />
                </div>

                <div className="input-field">
                  <label>ส่วนสูง</label>
                  <input
                    type="text"
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="ส่วนสูง"
                    required
                    value={height}
                  />
                </div>

                <div className="input-field">
                  <label>ความดัน</label>
                  <input
                    type="text"
                    onChange={(e) => setPressure(e.target.value)}
                    placeholder="ความดัน"
                    required
                    value={pressure}
                  />
                </div>

                <div className="input-field">
                  <label>โรคประจำตัว</label>
                  <input
                    type="text"
                    onChange={(e) => setCogDisease(e.target.value)}
                    placeholder="โรคประจำตัว"
                    required
                    value={cogdisease}
                  />
                </div>

                <div className="input-field">
                  <label>ยาที่แพ้</label>
                  <input
                    type="text"
                    onChange={(e) => setAllerDrug(e.target.value)}
                    placeholder="ยาที่แพ้"
                    required
                    value={allerdrug}
                  />
                </div>
              </div>

              <button className="nextBtn" onClick={handleClick}>
                {/* <span className="btnText">Submit</span> */}
                Submit
              </button>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};
