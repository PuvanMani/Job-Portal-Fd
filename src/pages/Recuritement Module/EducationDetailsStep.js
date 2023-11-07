import React, { useState, useEffect } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";


function EducationDetailsStep({ setActiveStep, activestep, Education }) {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState('');
  const [institute_name, setInstitutename] = useState('');
  const [university, setUniversity] = useState('');
  const [year_of_pass, setYearofpass] = useState('');
  const [percentage, setPercentage] = useState('');
  const [status, setStatus] = useState('Select');


  const [errors, setErrors] = useState({
    course: false,
    institute_name: false,
    univercity: false,
    year_of_pass: false,
    percentage: false,
    status: false,
  });





  function handleSubmit(e) {

    e.preventDefault();
    const formData = {
      user_id: localStorage.getItem('userid'),
      course,
      institute_name,
      univercity: university,
      year_of_pass,
      percentage,
      status,
    };
    let err = {
      course: course.trim() == "",
      institute_name: institute_name.trim() == "",
      univercity: university.trim() == "",
      year_of_pass: year_of_pass.trim() == "",
      percentage: percentage.trim() == "",
      status: status.trim() == "Select",
    }
    if (Object.values(err).some(val => val == true)) {
      setErrors(err)
    } else {
      if (params.action == 'update') {
        BaseURL.put(`/user/education/update/${localStorage.getItem('userid')}`, formData).then(res => {
          if (res.data.status) {
            localStorage.setItem('activestep', activestep + 1)
            setActiveStep(activestep + 1)
            // SuccessAlert()
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      } else {
        BaseURL.post('/user/education/create', formData).then(res => {
          if (res.data.status) {
            localStorage.setItem('activestep', activestep + 1)
            setActiveStep(activestep + 1)
            alert('Data created successfully!');
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      }
    }
  }

  const ListEducationdata = () => {
    if (Education.length > 0) {
      setCourse(Education[0]["course"]);
      setInstitutename(Education[0]["institute_name"]);
      setUniversity(Education[0]["univercity"]);
      setYearofpass(Education[0]["year_of_pass"]);
      setPercentage(Education[0]["percentage"]);
      setStatus(Education[0]["status"]);
    }
  }
  useEffect(() => {
    if (params.action == "update" && Education.length == 0) {
      navigate("/profile/add-profile/create")
    } else {
      navigate("/profile/add-profile/update")
      ListEducationdata()
    }
  }, [Education.length]);
  return (
    <>
      <h2>Education Details</h2>
      <div>
        <FormLabel>Course</FormLabel>
        <TextField
          fullWidth
          helperText={errors.percentage ? "Course is Required" : ""}
          error={errors.course}
          size="small"
          placeholder="BCA"
          value={course}
          onChange={e => setCourse(e.target.value)} required
        />

        <FormLabel>Institute Name</FormLabel>
        <TextField
          fullWidth
          helperText={errors.institute_name ? "Institute Name is Required" : ""}
          error={errors.institute_name}
          size="small"
          placeholder="Institute Name"
          value={institute_name}
          onChange={e => setInstitutename(e.target.value)} required
        />
        <FormLabel>University</FormLabel>
        <TextField
          fullWidth
          helperText={errors.univercity ? "University is Required" : ""}
          error={errors.univercity}
          size="small"
          placeholder="University"
          value={university}
          onChange={e => setUniversity(e.target.value)} required
        />

        <FormLabel>Year Of Passing</FormLabel><br />
        <TextField
          fullWidth
          helperText={errors.year_of_pass ? "Year of Passing is Required" : ""}
          error={errors.year_of_pass}
          size="small"
          placeholder="Year Of Passing"
          value={year_of_pass}
          onChange={e => setYearofpass(e.target.value)} required
        />

        <FormLabel>Percentage</FormLabel><br />
        <TextField
          fullWidth
          helperText={errors.percentage ? "Percentage is Required" : ""}
          error={errors.percentage}
          size="small"
          placeholder="Percentage"
          value={percentage}
          onChange={e => setPercentage(e.target.value)} required
        />

        <FormLabel>Status</FormLabel><br />
        <Select
          fullWidth
          helperText={errors.status ? "Status is Required" : ""}
          error={errors.status}
          size="small"
          value={status}
          onChange={e => setStatus(e.target.value)} required>
          <MenuItem value="Select">Select Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">Inactive</MenuItem>
        </Select>

        {
          params.action == "update" ? (<Button style={{ marginTop: "20px" }} disableElevation onClick={handleSubmit} variant="contained" type="submit">
            Update
          </Button>) : (<Button style={{ marginTop: "20px" }} disableElevation onClick={handleSubmit} variant="contained" type="submit">
            Save
          </Button>)
        }
        <div style={{ marginTop: "20px", textAlign: "right" }} >
          <Button style={{ marginRight: "20px" }} disableElevation onClick={() => setActiveStep(Number(activestep) - 1)} variant="contained">
            Back
          </Button>
          <Button disableElevation onClick={() => setActiveStep(Number(activestep) + 1)} variant="contained">
            Next
          </Button>
        </div>
      </div>
    </>
  )
}

export default EducationDetailsStep;
