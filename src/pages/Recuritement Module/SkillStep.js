import React, { useState } from 'react';
import { BaseURL } from '../../config/AxiosConfig';
import moment from 'moment';
import { useEffect } from 'react';
import { Button, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';


const SkillStep = ({ setActiveStep, activestep, Skills }) => {
  const navigate = useNavigate();
  const params = useParams()
  const [error, setError] = useState({
    skill: false,
    status: false
  });
  const [skill, setskill] = useState("");
  const [status, setstatus] = useState("Select");



  const handleSubmit = (e) => {
    e.preventDefault();

    let SkillData = {
      user_id: localStorage.getItem('userid'),
      skill,
      status,
      created_on: moment(new Date()).format('YYYY-MM-DD'),
    }
    let err = {
      skill: skill.trim() == "",
      status: status == ""
    }
    if (Object.values(err).some(val => val == true)) {
      setError(err)
    } else {
      if (params.action == "update") {
        BaseURL.post(`/user/skills/update/${localStorage.getItem("userid")}`, SkillData).then(res => {
          if (res.data.status) {
            // SuccessAlert()
            navigate('/dashboard')
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      } else {
        BaseURL.post('/user/skills/create', SkillData).then(res => {
          if (res.data.status) {
            alert(res.data.message)
            localStorage.setItem('activestep', activestep + 1)
            navigate('/dashboard')
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      }
    }
  };
  useEffect(() => {
    if (Skills.length > 0) {
      setskill(Skills[0]["skill"])
      setstatus(Skills[0]["status"])
    }
  }, [Skills.length])
  return (
    <>
      <h2>Skill Details</h2>
      <FormLabel>Skills <span className="text-danger">*</span></FormLabel>
      <TextField
        fullWidth
        size="small"
        type="text"
        placeholder='HTML, CSS, JavaScript'
        name="skills"
        value={skill}
        onChange={(e) => setskill(e.target.value)}
      />

      <FormLabel>Status <span className="text-danger">*</span></FormLabel>
      <Select
        fullWidth
        size="small"
        value={status}
        onChange={(e) => setstatus(e.target.value)}
      >
        <MenuItem value="Select">Select Status</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>

      {
        params.action == "update" ? <Button disableElevation variant="contained" sx={{ mt: "20px" }} onClick={handleSubmit}>Update</Button> : <Button disableElevation sx={{ mt: "20px" }} variant="contained" onClick={handleSubmit}>Submit</Button>
      }

      <div style={{ marginTop: "20px", textAlign: "right" }} >
        <Button onClick={() => setActiveStep(Number(activestep) - 1)} variant="contained" disableElevation>
          Back
        </Button>
      </div>
    </>
  );
};

export default SkillStep;
