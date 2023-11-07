import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BaseURL } from '../user-pages/api';
import { Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/styles/style.css";
import { DeleteAlert, UpdateAlert } from '../sweetalert/sweetalert';
function RecruiterList() {
    const [jobs, setJobs] = useState([]);
    const [open, setopen] = useState(false);
    const [company_name, setcompany_name] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [experience, setexperience] = useState("");
    const [locations, setlocations] = useState("");
    const [salary, setsalary] = useState("");
    const [skills, setskills] = useState("");
    const [status, setstatus] = useState("");
    const [contact, setcontact] = useState("");

    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10);

    const ListAllData = () => {
        if (localStorage.getItem('role') == "Recruiter") {
            BaseURL.get(`/user/listbyuserid/${localStorage.getItem('userid')}`)
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
        let data = {
            title,
            description,
            company_name,
            experience,
            locations,
            salary,
            skills,
            status,
        }
        BaseURL.put(`/job/update/${localStorage.getItem("updateid")}`, data).then(res => {
            if (res.data.status) {
                setopen(false)
                ListAllData()
                localStorage.removeItem("updateid")
            }
        })
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
        if (await DeleteAlert()) {
            BaseURL.delete(`/job/delete/${jobid}`).then(async res => {
                if (res.data.status) {
                    ListAllData()
                } else {
                    alert(res.data.message)
                }
            })
        }

    }
    useEffect(() => {
        ListAllData()
    }, []);

    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Recuriter List</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th> Job Title </th>
                                        <th> Job Description </th>
                                        <th> Company Name</th>
                                        <th> Experience</th>
                                        <th> Skills</th>
                                        <th> Salery</th>
                                        <th> Location</th>
                                        <th> Contact</th>
                                        <th> Status</th>
                                        <th> Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((data, i) => {
                                        return (
                                            <tr key={i}>
                                                <td >{data.title}</td>
                                                <td> {data.description}</td>
                                                <td> {data.company_name} </td>
                                                <td> {data.experience} Year</td>
                                                <td> {data.skills} </td>
                                                <td> {data.salary} </td>
                                                <td> {data.locations} </td>
                                                <td> {data.contact} </td>
                                                <td> {data.status} </td>
                                                <td>
                                                    <button type="button" onClick={() => handleEdit(data.job_id)} className="btn btn-gradient-dark btn-icon-text">
                                                        Edit
                                                        <i className="mdi mdi-file-check btn-icon-append"></i>
                                                    </button>
                                                    <button type="button" onClick={() => handleDelete(data.job_id)} className="btn btn-gradient-danger btn-icon-text">
                                                        <i className="mdi mdi-delete btn-icon-trash"></i>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal
                        show={open}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Update Job Details
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="title">
                                <Form.Label>Job Title <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Job Title'
                                    name="tile"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                />
                                {title == "" && <div className="text-danger">Job Title is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Job Description <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Job Description'
                                    name="description"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                                {description == "" && <div className="text-danger">Job Description is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="companyname">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Company Name'
                                    name="company_name"
                                    value={company_name}
                                    onChange={(e) => setcompany_name(e.target.value)}
                                />
                                {company_name == "" && <div className="text-danger">Company Name is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="experience">
                                <Form.Label>Experience</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Experience'
                                    name="experience"
                                    value={experience}
                                    onChange={(e) => setexperience(e.target.value)}
                                />
                                {experience == "" && <div className="text-danger">Experience is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="skills">
                                <Form.Label>Skills</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Skills'
                                    name="skills"
                                    value={skills}
                                    onChange={(e) => setskills(e.target.value)}
                                />
                                {skills == "" && <div className="text-danger">Skills is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="salery">
                                <Form.Label>Salery</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Salery'
                                    name="salery"
                                    value={salary}
                                    onChange={(e) => setsalary(e.target.value)}
                                />
                                {salary == "" && <div className="text-danger">Salery is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Location'
                                    name="location"
                                    value={locations}
                                    onChange={(e) => setlocations(e.target.value)}
                                />
                                {locations == "" && <div className="text-danger">Location is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="contact">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Contact'
                                    name="contact"
                                    value={contact}
                                    onChange={(e) => setcontact(e.target.value)}
                                />
                                {contact == "" && <div className="text-danger">Contact is Required</div>}
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder='Status'
                                    name="status"
                                    value={status}
                                    onChange={(e) => setstatus(e.target.value)}
                                >
                                    <option value=''>Select</option>
                                    <option value='Active'>Active</option>
                                    <option value='inActive'>inActive</option>
                                </Form.Control>
                                {status == "" && <div className="text-danger">Status is Required</div>}
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setopen(false)}>Close</Button>
                            <Button onClick={async () => {
                                if (await UpdateAlert()) {
                                    handleUpdate()
                                }
                            }}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default RecruiterList;
