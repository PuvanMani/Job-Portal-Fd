import React, { useEffect, useState } from 'react';
import { BaseURL } from '../../config/AxiosConfig';
// import { Form, Modal } from 'react-bootstrap';
import { Box, Dialog, FormLabel, IconButton, MenuItem, TextField, Tooltip } from '@mui/material';
import MyDataGrid from '../../component/table/datagrid';
import { LoadingButton } from '@mui/lab';
import { Select } from '@mui/material';
import Datatable from '../../component/table/datatable';
function JobView() {
  const [jobs, setJobs] = useState([]);
  const [open, setopen] = useState(false);
  const [company_name, setcompany_name] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [experience, setexperience] = useState("");
  const [locations, setlocations] = useState("");
  const [salary, setsalary] = useState("");
  const [skills, setskills] = useState("");
  const [status, setstatus] = useState("Select");
  const [contact, setcontact] = useState("");

  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [error, setError] = useState({
    title: false,
    description: false,
    company_name: false,
    experience: false,
    locations: false,
    salary: false,
    skills: false,
    contact: false,
    status: false,
  })

  const ListAllData = () => {
    if (localStorage.getItem('role') == "Recruiter") {
      BaseURL.get(`/job/listbyuserid/${localStorage.getItem('userid')}`)
        .then((response) => {
          if (response.data.status) {
            setJobs([...response.data.message]);
          } else {
            alert(response.data.message)
          }
        })
    } else {
      BaseURL.get('/job/list')
        .then((response) => {
          if (response.data.status) {
            setJobs(response.data.message);
          } else {
            alert(response.data.message)
          }
        })
    }
  }

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    const maxPage = Math.ceil(jobs.length / jobsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleUpdate = () => {
    setloading(true)
    let err = {
      title: title.trim() == "",
      description: description.trim() == "",
      company_name: company_name.trim() == "",
      experience: experience.trim() == "",
      locations: locations.trim() == "",
      salary: salary.trim() == "",
      skills: skills.trim() == "",
      contact: contact.trim() == "",
      status: status.trim() == "Select",
    }
    let data = {
      title,
      description,
      company_name,
      experience,
      locations,
      salary,
      skills,
      status,
      contact
    }
    if (Object.values(err).some(val => val == true)) {
      setError(err);
      setloading(false);
    } else {
      BaseURL.put(`/job/update/${localStorage.getItem("updateid")}`, data).then(res => {
        if (res.data.status) {
          setopen(false);
          ListAllData()
        }
      })
    }
  }
  const handleEdit = (jobid) => {
    const data = jobs.find(val => val.job_id == jobid);
    localStorage.setItem("updateid", jobid)
    setcompany_name(data.company_name)
    settitle(data.title)
    setdescription(data.description)
    setexperience(data.experience)
    setlocations(data.locations)
    setsalary(data.salary)
    setskills(data.skills)
    setstatus(data.status)
    setcontact(data.contact)
    setopen(true)
  }
  const handleDelete = async (jobid) => {
    if (true) {
      BaseURL.delete(`/job/delete/${jobid}`).then(async res => {
        if (res.data.status) {
          ListAllData()
        } else {
          alert(res.data.message)
        }
      })
    }
  }

  const columns = [
    {
      field: 'title',
      headerName: 'Job Title',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Job Description',
      sortable: false,
      width: 160,
    },
    {
      field: 'company_name',
      headerName: 'Company Name',
      width: 180,
    },
    {
      field: 'experience',
      headerName: 'Experience',
      width: 180,
      valueGetter: (params) => `${params.row.experience} Year`,
    },
    {
      field: 'skills',
      headerName: 'Skills',
      width: 130,
    },
    {
      field: 'salary',
      headerName: 'Salery',
      width: 160,
    },
    {
      field: 'locations',
      headerName: 'Location',
      width: 160,
    },
    {
      field: "contact",
      headerName: 'Contact',
      width: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
    }
  ];
  useEffect(() => {
    ListAllData()
  }, []);

  return (
    <Box>
      <h2>Job List</h2>
      <Datatable rows={jobs} columns={columns} EditFunc={handleEdit} DeleteFunct={handleDelete} id="job_id" applyButton={localStorage.getItem("role") == "Job Seeker" ? true : false} />
      <Dialog open={open}>
        <Box sx={{ p: 3 }}>
          <h4 style={{ margin: 0, marginBottom: "10px" }}>Edit Company</h4>
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

          <FormLabel>Company Name</FormLabel>
          <TextField
            size='small'
            fullWidth
            error={error.company_name}
            helperText={error.company_name ? "Company Name is Required" : ""}
            placeholder='Company Name'
            value={company_name}
            onChange={(e) => setcompany_name(e.target.value)}
          />

          <FormLabel>Experience</FormLabel>
          <TextField
            size='small'
            fullWidth
            error={error.experience}
            helperText={error.experience ? "Experience is Required" : ""}
            placeholder='Experience'
            value={experience}
            onChange={(e) => setexperience(e.target.value)}
          />
          <FormLabel>Skills</FormLabel>
          <TextField
            size='small'
            fullWidth
            error={error.skills}
            helperText={error.skills ? "Skills is Required" : ""}
            placeholder='Skills'
            value={skills}
            onChange={(e) => setskills(e.target.value)}
          />
          <FormLabel>Salery</FormLabel>
          <TextField
            size='small'
            fullWidth
            error={error.salary}
            helperText={error.salary ? "salary is Required" : ""}
            placeholder='Salery'
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
          />

          <FormLabel>Location</FormLabel>
          <TextField
            size='small'
            fullWidth
            error={error.locations}
            helperText={error.locations ? "Locations is Required" : ""}
            placeholder='Location'
            value={locations}
            onChange={(e) => setlocations(e.target.value)}
          />

          <FormLabel>Contact</FormLabel>
          <TextField
            size='small'
            fullWidth
            error={error.contact}
            helperText={error.contact ? "Contact is Required" : ""}
            placeholder='Contact'
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
          />


          <FormLabel>Status</FormLabel>
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
            <button style={{ padding: "5px 10px", marginRight: "10px", mr: "10px" }} className='btn btn-danger' variant='outlined' onClick={() => setopen(false)}>Close</button>
            <button style={{ padding: "5px 10px" }} className='btn btn-primary' loading={loading} sx={{ ml: "10px" }} onClick={() => handleUpdate()} variant='contained'>Update</button>
          </Box>
        </Box>
      </Dialog>
    </Box>

  );
}

export default JobView;
