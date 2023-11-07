import React, { useEffect, useState } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
function ExperienceStep({ setActiveStep, activestep, Experience }) {
  const params = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState({
    title: false,
    company_name: false,
    start_date: false,
    end_date: false,
    location: false,
    status: false,
  });
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Select");


  const handleSubmit = (e) => {
    e.preventDefault();
    let Educationdata = {
      user_id: localStorage.getItem('userid'),
      title,
      company_name: companyName,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
      location,
      status,
      created_on: moment(new Date()).format('YYYY-MM-DD'),
    }
    let err = {
      title: title.trim() == "",
      company_name: companyName.trim() == "",
      start_date: startDate == "",
      end_date: endDate == "",
      location: location.trim() == "",
      status: status.trim() == "",
    }
    if (Object.values(err).some(val => val == true)) {
      setError(err)
    } else {
      if (params.action == 'update') {
        BaseURL.put(`/user/experience/update/${localStorage.getItem('userid')}`, Educationdata).then(res => {
          if (res.data.status) {
            localStorage.setItem('activestep', activestep + 1)
            setActiveStep(activestep + 1)
            // SuccessAlert()
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      } else {
        BaseURL.post('/user/experience/create', Educationdata).then(res => {
          if (res.data.status) {
            localStorage.setItem('activestep', activestep + 1)
            setActiveStep(activestep + 1)
            alert(res.data.message)
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      }
    }
  };
  const ListExperienceData = () => {
    if (Experience.length) {
      setTitle(Experience[0]["title"])
      setCompanyName(Experience[0]["company_name"])
      setStartDate(new Date(Experience[0]["start_date"]))
      setEndDate(new Date(Experience[0]["end_date"]))
      setLocation(Experience[0]["location"])
      setStatus(Experience[0]["status"])
    }
  }
  useEffect(() => {
    if (Experience.length == 0) {
      navigate("/profile/add-profile/create")
    } else {
      navigate("/profile/add-profile/update")
      ListExperienceData()
    }

  }, [Experience.length])
  return (
    <>
      <h2>Experience Details</h2>
      <div>
        <FormLabel>Role Name <span className="text-danger">*</span></FormLabel>
        <TextField
          fullWidth
          size="small"
          placeholder="Full Stack Developer"
          aria-label="Role Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-describedby="basic-addon1"
        />
        {error.title && <div className="text-danger">Univercity is Required</div>}



        <FormLabel>Company Name <span className="text-danger">*</span></FormLabel>
        <TextField
          fullWidth
          size="small"
          placeholder="Company Name"
          aria-label="Company Name"
          aria-describedby="basic-addon1"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        {error.company_name && <div className="text-danger">Univercity is Required</div>}




        <FormLabel>Start Date <span className="text-danger">*</span></FormLabel><br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker slotProps={{ textField: { fullWidth: true, size: "small" } }} />
        </LocalizationProvider>

        {error.start_date && <div className="text-danger">Univercity is Required</div>}



        <FormLabel>End Date <span className="text-danger">*</span></FormLabel><br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker slotProps={{ textField: { fullWidth: true, size: "small" } }} />
        </LocalizationProvider>


        <FormLabel>Company Location <span className="text-danger">*</span></FormLabel><br />
        <TextField
          fullWidth
          size="small"
          placeholder="Company Location"
          aria-label="Company Location"

          aria-describedby="basic-addon1"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        {error.location && <div className="text-danger">Univercity is Required</div>}




        <FormLabel>Status <span className="text-danger">*</span></FormLabel><br />
        <Select
          fullWidth
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <MenuItem value="Select">Select status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">Inactive</MenuItem>
        </Select>
        {error.status && <div className="text-danger">Univercity is Required</div>}

        {
          params.action == "update" ? <Button style={{ marginTop: "20px" }} variant="contained" disableElevation onClick={handleSubmit}>
            Update
          </Button> : <Button style={{ marginTop: "20px" }} variant="contained" disableElevation onClick={handleSubmit}>
            Save
          </Button>
        }
      </div>
      <div style={{ marginTop: "20px", textAlign: "right" }} >
        <Button onClick={() => setActiveStep(Number(activestep) - 1)} variant="contained" disableElevation>
          Back
        </Button>
        <Button style={{ marginLeft: "20px" }} onClick={() => setActiveStep(Number(activestep) + 1)} variant="contained" disableElevation>
          Next
        </Button>
      </div>
    </>
  )
}

export default ExperienceStep;