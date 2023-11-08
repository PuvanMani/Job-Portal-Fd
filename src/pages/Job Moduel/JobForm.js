import React, { useEffect, useState } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Box, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";


function Addjob() {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false);
  const [companyList, setCompanyList] = useState([])
  const [company_name, setcompany_name] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [experience, setexperience] = useState("");
  const [locations, setlocations] = useState("");
  const [salary, setsalary] = useState("");
  const [skills, setskills] = useState("");
  const [status, setstatus] = useState("Select");
  const [contact, setcontact] = useState("");

  const [error, setError] = useState({
    title: false,
    description: false,
    salary: false,
    company_name: false,
    skills: false,
    contact: false,
    locations: false,
    status: false,
    experience: false,
  });
  async function submitJob(e) {
    e.preventDefault();
    setloading(true)
    let err = {
      title: title.trim() == "",
      description: description.trim() == "",
      salary: salary.trim() == "",
      company_name: company_name.trim() == "",
      skills: skills.trim() == "",
      contact: contact.trim() == "",
      locations: locations.trim() == "",
      status: status == "Select",
      experience: experience.trim() == "",
    }
    let JobData = {
      user_id: localStorage.getItem('userid'),
      title,
      description,
      salary,
      company_name,
      skills,
      contact,
      locations,
      status,
      experience,
      profile: "Base64String"
    }
    if (Object.values(err).some(val => val == true)) {
      setError(err)
      setloading(false)
    } else {
      BaseURL.post('/job/create', JobData).then(async res => {
        if (res.data.status) {
          setloading(true)
          navigate('/jobs/view-job')

        }
      })
    }
  }
  const ListCompany = () => {
    BaseURL.get(`/user/company/listbyuserid/${localStorage.getItem("userid")}`).then(res => {
      if (res.data.status) {
        setCompanyList([...res.data.message])
      } else {
        alert(res.data.message)
      }
    })
  }
  useEffect(() => {
    ListCompany()
  }, [])
  return (
    <div style={{ marginBottom: "30px" }}>
      <h1 style={{ margin: 0, marginBottom: "10px" }}>Create Company</h1>
      <Box style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em", marginTop: "20px" }}>
        <FormLabel>Job Title <span className="text-danger">*</span></FormLabel>
        <TextField
          size='small'
          fullWidth
          error={error.title}
          helperText={error.title ? "Job Title is Required" : ""}
          placeholder='Job Title'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <FormLabel>Job Description <span className="text-danger">*</span></FormLabel>
        <TextField
          size='small'
          fullWidth
          error={error.description}
          helperText={error.description ? "Job description is Required" : ""}
          placeholder='Job Description'
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />

        <FormLabel>Company Name <span className="text-danger">*</span></FormLabel>
        <Autocomplete disablePortal
          options={companyList}
          value={{ company_name }}
          getOptionLabel={(option) => option["company_name"]}
          onChange={(e, value) => {
            if (value) {
              setcompany_name(value.company_name)
            } else {
              setcompany_name("")
            }
          }}
          fullWidth
          size="small"
          renderInput={(params) => <TextField size="small" {...params} placeholder="Company Name" />}
        />
        <FormLabel>Experience <span className="text-danger">*</span></FormLabel>
        {console.log(company_name)}
        <TextField
          size='small'
          fullWidth
          error={error.experience}
          helperText={error.experience ? "Experience is Required" : ""}
          placeholder='Experience'
          value={experience}
          onChange={(e) => setexperience(e.target.value)}
        />
        <FormLabel>Skills <span className="text-danger">*</span></FormLabel>
        <TextField
          size='small'
          fullWidth
          error={error.skills}
          helperText={error.skills ? "Skills is Required" : ""}
          placeholder='Skills'
          value={skills}
          onChange={(e) => setskills(e.target.value)}
        />
        <FormLabel>Salery <span className="text-danger">*</span></FormLabel>
        <TextField
          size='small'
          fullWidth
          error={error.salary}
          helperText={error.salary ? "salary is Required" : ""}
          placeholder='Salery'
          value={salary}
          onChange={(e) => setsalary(e.target.value)}
        />

        <FormLabel>Location <span className="text-danger">*</span></FormLabel>
        <TextField
          size='small'
          fullWidth
          error={error.locations}
          helperText={error.locations ? "Locations is Required" : ""}
          placeholder='Location'
          value={locations}
          onChange={(e) => setlocations(e.target.value)}
        />

        <FormLabel>Contact <span className="text-danger">*</span></FormLabel>
        <TextField
          size='small'
          fullWidth
          error={error.contact}
          helperText={error.contact ? "Contact is Required" : ""}
          placeholder='Contact'
          value={contact}
          onChange={(e) => setcontact(e.target.value)}
        />


        <FormLabel>Status <span className="text-danger">*</span></FormLabel>
        <Select
          size='small'
          fullWidth
          error={error.status}
          helperText={error.status ? "Status is Required" : ""}
          placeholder='Status'
          value={status}
          onChange={(e) => setstatus(e.target.value)}
        >
          <MenuItem disabled value='Select'>Select Status</MenuItem>
          <MenuItem value='Active'>Active</MenuItem>
          <MenuItem value='inActive'>inActive</MenuItem>
        </Select>
        <Box sx={{ mt: "10px", textAlign: "right" }}>
          <LoadingButton disableElevation loading={loading} sx={{ ml: "10px", backgroundColor: "#4e52d0" }} onClick={submitJob} variant='contained'>Create</LoadingButton>
        </Box>
      </Box>
    </div>
  )
}

export default Addjob