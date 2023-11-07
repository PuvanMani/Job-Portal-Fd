import React, { useState } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import { Box, Container, FormLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();
  const [role, setrole] = useState("Select");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [sumbited, setsumbited] = useState(false);

  const [error, setError] = useState({
    user_type: false,
    fname: false,
    lname: false,
    email: false,
    password: false,
    cpassword: false,
  });

  const signupHandler = (e) => {
    e.preventDefault();
    setsumbited(true)
    const emailPattern = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let UserData = {
      fname,
      lname,
      email,
      password,
      role
    }
    let err = {
      user_type: role.trim() == "Select",
      fname: fname.trim() == "",
      lname: lname.trim() == "",
      email: email.trim() == "" || !emailPattern.test(email),
      password: password.trim() == "",
      cpassword: cpassword.trim() == "",
    }
    if (password == cpassword) {
      if (Object.values(err).some(val => val == true)) {
        setError(err)
        setsumbited(false)
      } else {
        BaseURL.post('/auth/signup', UserData).then((res) => {
          if (res.data.status) {
            setsumbited(false)
            navigate('/auth/login')
          } else {
            alert(res.data.message.sqlMessage)
            setsumbited(false)
          }
        })
      }
    } else {
      alert("Passoerd don't Match")
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ minHeight: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ p: 3, width: "100%", minHeight: "40vh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", display: "flex", flexDirection: "column", justifyContent: "space-around", borderRadius: "12px", backgroundColor: '#FFF' }}>
          <Typography variant="h5" component='h5'>Register</Typography>
          <FormLabel>First Name</FormLabel>
          <TextField variant="outlined" error={error.fname} helperText={error.fname ? "First Name is Required" : ""} placeholder="First Name" size="small" fullWidth onChange={(e) => setfname(e.target.value)} />
          <FormLabel>Last Name</FormLabel>
          <TextField variant="outlined" error={error.lname} helperText={error.lname ? "Last Name is Required" : ""} placeholder="Last Name" size="small" fullWidth onChange={(e) => setlname(e.target.value)} />
          <FormLabel>Role</FormLabel>
          <Select
            // value={age}
            placeholder="Role"
            size="small"
            fullWidth
            value={role}
            error={error.user_type}
            helperText={error.user_type ? "User Type is Required" : ""}
            onChange={(e) => setrole(e.target.value)}
          >
            <MenuItem disabled value="Select">User Type</MenuItem>
            <MenuItem value="Recruiter">Recruiter</MenuItem>
            <MenuItem value="Job Seeker">Job Seeker</MenuItem>
          </Select>
          <FormLabel>Email</FormLabel>
          <TextField variant="outlined" error={error.email} helperText={error.email ? "Email is Required" : ""} placeholder="Email" size="small" fullWidth onChange={(e) => setemail(e.target.value)} />
          <FormLabel>Passoword</FormLabel>
          <TextField variant="outlined" error={error.password} helperText={error.password ? "Passworrd is Required" : ""} placeholder="Password" size="small" fullWidth onChange={(e) => setpassword(e.target.value)} />
          <FormLabel>Confirm Password</FormLabel>
          <TextField variant="outlined" error={error.cpassword} helperText={error.cpassword ? "Confirm Password is Required" : ""} placeholder="Confirm Password" size="small" fullWidth onChange={(e) => setcpassword(e.target.value)} />
          <LoadingButton variant="contained" onClick={signupHandler} className="btn btn-primary" loading={sumbited} disableElevation fullWidth sx={{ mt: "10px" }}>Sign up</LoadingButton>
          <Link to='/auth/login' style={{ marginTop: "10px", textDecoration: "underline" }}>I already have a account, Login.</Link>
        </Box>
      </Container>
    </>
  );
};
export default RegisterPage;
