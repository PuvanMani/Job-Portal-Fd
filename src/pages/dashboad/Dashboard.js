import React, { Component } from 'react';
import { BaseURL } from '../user-pages/api';
import { DeleteAlert, UpdateAlert } from '../sweetalert/sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Users: [],
      fname: "",
      lname: "",
      email: ""
    }
  }

  ListAllData = () => {
    let url = localStorage.getItem('role') == "Admin" ? '/user/list' : `/user/listbyid/${localStorage.getItem('userid')}`
    BaseURL.get(url).then((res) => {
      if (res.data.message) {
        this.setState({ Users: [...res.data.message] });
      } else {
        alert(res.data.message)
      }
    })
  }
  componentDidMount() {
    this.ListAllData()
  }
  handleUpdate = () => {

    let data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email

    }
    BaseURL.put(`user/update/${localStorage.getItem("updateid")}`, data).then(res => {
      if (res.data.status) {
        this.setState({ open: false })
        this.ListAllData()
        localStorage.removeItem("updateid")
      }
    })
  }
  handleEdit = (userid) => {
    const data = this.state.Users.find(val => val.user_id == userid);
    localStorage.setItem("updateid", userid)
    this.setState({ fname: data.fname, lname: data.lname, email: data.email, open: true })
  }

  handleDelete = async (userid) => {
    if (await DeleteAlert()) {
      BaseURL.delete(`/user/delete/${userid}`).then(res => {
        if (res.data.status) {
          this.ListAllData()
        } else {
          alert(res.data.message)
        }
      })
    }

  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Overall Profile<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{localStorage.getItem('role') == "Admin" ? this.state.Users.length : 2} Profiles</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Employee List <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{localStorage.getItem('role') == "Admin" ? (this.state.Users.length > 0 && this.state.Users?.filter(val => val.role == "Employee")).length : 2} Employees</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Recruiter List <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{localStorage.getItem('role') == "Admin" ? (this.state.Users.length > 0 && this.state.Users?.filter(val => val.role == "Recruiter")).length : 2} Recruiter</h2>
                <h6 className="card-text">Increased by 90%</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="page-header">
          <h3 className="page-title"> Profiles </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Recuritement</a></li>
              <li className="breadcrumb-item active" aria-current="page">Profile Details</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Profile Details</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> User </th>
                        <th> Full name </th>
                        <th> Email</th>
                        <th> Role Name </th>
                        <th> Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Users.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td className="py-1">{data.user_id}</td>
                            <td> {data.fname} {data.lname}</td>
                            <td> {data.email} </td>
                            <td> {data.role} </td>
                            <td> <button type="button" onClick={() => this.handleEdit(data.user_id)} className="btn btn-gradient-dark btn-icon-text">
                              Edit
                              <i className="mdi mdi-file-check btn-icon-append"></i>
                            </button>
                              {localStorage.getItem('role') == "Admin" ? (<button type="button" onClick={() => this.handleDelete(data.user_id)} className="btn btn-gradient-danger btn-icon-text">
                                <i className="mdi mdi-delete btn-icon-trash"></i>
                                Delete
                              </button>) : ""}
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
                show={this.state.open}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Update User Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="fname">
                    <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='First Name'
                      name="fname"
                      value={this.state.fname}
                      onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                    {this.state.fname == "" && <div className="text-danger">First Name is Required</div>}
                  </Form.Group>
                  <Form.Group controlId="lname">
                    <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Last Name'
                      name="lname"
                      value={this.state.lname}
                      onChange={(e) => this.setState({ lname: e.target.value })}
                    />
                    {this.state.lname == "" && <div className="text-danger">First Name is Required</div>}
                  </Form.Group>
                  <Form.Group controlId="fname">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Email'
                      name="fname"
                      disabled={true}
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    {this.state.email == "" && <div className="text-danger">First Name is Required</div>}
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => this.setState({ ...this.state, open: false })}>Close</Button>
                  <Button onClick={async () => {
                    if (await UpdateAlert()) {
                      this.handleUpdate()
                    }
                  }}>Update</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Dashboard;