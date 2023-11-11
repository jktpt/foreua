import React from "react";
import "./form.css";
import axios from "axios";
import { useState } from "react";

export const Adddoctor = () => {
  const [name, setName] = useState("");

  const handleClick = async () => {
    const formData = new FormData();

    formData.append("name", name.replace(/[0-9]/g, ''));
      if (
        name.trim() !== ""
      ) {
        await axios
          .post(`http://localhost:3001/api/patient/insertdoctor`, formData)
          .then((res) => {
            window.location.href = "/";
          });
      }
  };

  return (
    <div className="container-bg">
      <div className="container">
        <header>เพิ่มข้อมูลแพทย์</header>
        <div className="formdetail">
          <div className="form first">
            <div className="details personal">
              <span className="title">กรุณากรอกรายละเอียดดังนี้</span>

              <div className="fields">
                <div className="input-field2">
                  <label>ชื่อ - นามสกุล </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่อ - นามสกุล"
                    required
                    value={name}
                   />
                </div>
              </div>

              <button className="nextBtn" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
