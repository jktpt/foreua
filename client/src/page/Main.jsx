import React from "react";
import axios from "axios";
import "./main.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Main = () => {
  const [data, setData] = useState([]);

  const deletePatient = async (id, name) => {
    try {
      console.log(id);
      if (window.confirm(`Do you want to delete ${name} ?`) === true) {
        await axios
          .delete(`http://localhost:3001/api/patient/deletepatient/${id}`)
          .then((response) => {
            setData(
              data.filter((val) => {
                return val.patient_id !== id;
              })
            );
          });
      }
    } catch (err) {
      console.error("Error uploading file: ", err);
    }
  };
  const waitPatient = async (id_w) => {
    try {
      console.log(id_w);
      await axios
        .put(
          `http://localhost:3001/api/patient/waitpatient/${id_w}`
        )
        .then((res) => {
          window.location.reload();
        });
    } catch (err) {
      console.error("Error uploading file: ", err);
    }
  };


  const columns = [
    {
      field: `patient_id_card`,
      headerName: "ID Card",
      type: "string",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "patient_name",
      headerName: "Firstname",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "patient_lname",
      headerName: "Lastname",
      type: "string",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: `patient_tel`,
      headerName: "Tel number",
      type: "string",
      width: 150,
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
      field: `patient_status`,
      headerName: "Status",
      type: "string",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: `patient_weight`,
    //   headerName: "Weight",
    //   type: "string",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: `patient_height`,
    //   headerName: "Height",
    //   type: "string",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: `patient_pressure`,
    //   headerName: "Pressure",
    //   type: "string",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
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
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className={params.row.patient_status === "done" ? "btn-wait" : "hide"}
              onClick={() => {
                waitPatient(params.row.patient_id);
              }}
            >
              Waiting Doctor
            </button>
            <Link to={`/addpatient/${params.row.patient_id}`}>
              <button
                className="btn-edit"
                onClick={() => {
                  // hiddenCarousel(params.row.home_carousel_id);
                }}
              >
                Edit
              </button>
            </Link>

            <button
              className="btn-delete"
              onClick={() => {
                deletePatient(params.row.patient_id, params.row.patient_name);
              }}
            >
              Delete
            </button>
            <Link to={`/profile/${params.row.patient_id}`}>
              <button
                className="btn-profile"
                onClick={() => {
                  // hiddenCarousel(params.row.home_carousel_id);
                }}
              >
                Profile
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
          .get(`http://localhost:3001/api/patient/getpatient`)
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
          <h1>หน้าหลักในการแสดงข้อมูลลูกค้า</h1>
          <div className="main-datagrid">
            <DataGrid
              className="datagrid"
              getRowId={(row) => row.patient_id}
              rows={data}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7]}
              checkboxSelection
              style={{ height: "600px" }}
            />
          </div>
          <div className="btn-adddata">
            <Link to="/addpatient">
              <button className="btn-add">Add Data</button>
            </Link>

            <Link to="/doctor">
              <button className="btn-doctor">Doctor form</button>
            </Link>

            <Link to="/adddoctor">
              <button className="btn-doc">Add Doctor</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
