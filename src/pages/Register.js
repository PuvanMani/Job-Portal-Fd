import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { BaseURL } from "./api";

const Register = () => {

  const history = useHistory();
  const [role, setrole] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [error, setError] = useState({
    user_type: false,
    fname: false,
    lname: false,
    email: false,
    password: false,
    cpassword: false,
  });


  const validateForm = (values) => {
    const error = {};


  };
  const signupHandler = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let UserData = {
      fname,
      lname,
      email,
      password,
      role
    }
    let err = {
      user_type: role.trim() == "",
      fname: fname.trim() == "",
      lname: lname.trim() == "",
      email: email.trim() == "" || !emailPattern.test(email),
      password: password.trim() == "",
      cpassword: cpassword.trim() == "",
    }
    if (password == cpassword) {
      if (Object.values(err).some(val => val == true)) {
        setError(err)
      } else {
        BaseURL.post('/auth/signup', UserData).then((res) => {
          if (res.data.status) {
            history.push('/auth/login')
          } else {
            alert(res.data.message.sqlMessage)
          }
        })
      }
    } else {
      alert("Passoerd don't Match")
    }
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(user);
  //     axios.post("https://kitecareer.com/jobapp/register", user).then((res) => {
  //       alert(res.data.message);
  //       history.push('/login');
  //       //navigate("/login", { replace: true });
  //     });
  //   }
  // }, [formErrors]);
  return (
    <>
      <div className="d-flex align-items-center auth px-0" style={{ height: "100vh" }}>
        <div className="row w-100 mx-0">
          <div className="col-lg-6 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require('../../assets/images/logo.png')} alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light pb-3">Signing up is easy. It only takes a few steps</h6>
              <form >
                <div className="row w-100">
                  <div className="col-lg-6 mx-auto">
                    <Form.Group>
                      <Form.Label>Select User Type <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        as="select" // Use a select input for dropdown
                        name="user_type"
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="Employee">Employee</option>
                        <option value="Recruiter">Recruiter</option>
                      </Form.Control>
                      {error.user_type && <div className="text-danger">User Type is Required</div>}
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 mx-auto">
                    <Form.Group controlId="fname">
                      <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder='First Name'
                        name="fname"
                        value={fname}
                        onChange={(e) => setfname(e.target.value)}
                      />
                      {error.fname && <div className="text-danger">First Name is Required</div>}
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 mx-auto">
                    <Form.Group controlId="lname">
                      <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder='Last Name'
                        name="lname"
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                      />
                      {error.lname && <div className="text-danger">Last Name is Required</div>}
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 mx-auto">
                    <Form.Group controlId="email">
                      <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder='example@gmail.com'
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                      {error.email && <div className="text-danger">Email is Required</div>}
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 mx-auto">
                    <Form.Group controlId="password">
                      <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder='Password'
                        name="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      {error.password && <div className="text-danger">Password is Required</div>}
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 mx-auto">
                    <Form.Group controlId="cpassword">
                      <Form.Label>Confirm password <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder='Confirm Password'
                        name="cpassword"
                        value={cpassword}
                        onChange={(e) => setcpassword(e.target.value)}
                      />
                      {error.cpassword && <div className="text-danger">Confirm Password is Required</div>}
                    </Form.Group>
                  </div>
                </div>

                <Button onClick={signupHandler} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                  Sign In
                </Button>

              </form>
              <NavLink to="/auth/login">Already registered? Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
