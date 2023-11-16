import React from "react";
import axios from "axios";
import "./doctor.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Doctor = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      field: "patient_name",
      headerName: "Firstname",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "patient_lname",
      headerName: "Lastname",
      type: "string",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: `patient_gender`,
      headerName: "Gender",
      type: "string",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: `patient_weight`,
      headerName: "Weight",
      type: "string",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: `patient_height`,
      headerName: "Height",
      type: "string",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: `patient_pressure`,
      headerName: "Pressure",
      type: "string",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: `patient_detail`,
      headerName: "Detail",
      type: "string",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: `patient_personal_disease`,
    //   headerName: "Personal disease",
    //   type: "string",
    //   width: 250,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: `patient_medic`,
    //   headerName: "Medic",
    //   type: "string",
    //   width: 250,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/callpatient/${params.row.patient_id}`}>
              <button
                className="btn-call"
              >
                เรียกเข้ารับบริการ
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get(`http://localhost:3001/api/patient/getpatientwaiting`)
          .then((res) => {
            setData(res.data);
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
          <h1>ระบบสำหรับหมอ - คนไข้ที่กำลังรอใช้บริการ</h1>
          <div className="main-datagrid">
            <DataGrid
              className="datagrid"
              getRowId={(row) => row.patient_id}
              rows={data}
              columns={columns}
              pageSize={14}
              rowsPerPageOptions={[14]}
              checkboxSelection
              style={{ height: "600px" }}
            />
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
