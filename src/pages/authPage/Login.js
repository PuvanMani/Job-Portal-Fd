import React, { useState, useEffect } from "react";
// import { Form, Button } from 'react-bootstrap';
// import { NavLink, useHistory } from "react-router-dom";
import { BaseURL } from '../../config/AxiosConfig'; // Import the authentication function
import { Box, Button, Container, FormLabel, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { ErrorAlert } from "../sweetalert/sweetalert";

const LoginPage = () => {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
  })
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };



  const loginHandler = async (e) => {
    let regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i
    e.preventDefault();
    setIsSubmit(true);
    let err = {
      email: user.email.trim() == "",
      password: user.password.trim() == ""
    }

    if (Object.values(err).some(val => val == true)) {
      setIsSubmit(false);
      setError(err)
    } else {
      try {
        const { data } = await BaseURL.post('/auth/login', user)
        if (data.status) {
          setIsSubmit(false);
          BaseURL.defaults.headers.token = data.token;
          const { user } = data;
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', user.fname + " " + user.lname)
          localStorage.setItem('userid', user.user_id)
          localStorage.setItem('role', user.role);
          navigate('/dashboard')
        } else {
          alert(data.message);
          setIsSubmit(false)
        }
      } catch (errorAccur) {
        ErrorAlert("Loging Error", errorAccur.response.data.message);
        setIsSubmit(false)
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])
  return (
    <Container maxWidth="sm" sx={{ minHeight: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ p: 3, width: "100%", minHeight: "40vh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", display: "flex", flexDirection: "column", justifyContent: "space-around", borderRadius: "12px", backgroundColor: "#FFF" }}>
        <Typography variant="h5" component='h5'>Login</Typography>
        <FormLabel>Email</FormLabel>
        <TextField variant="outlined" name="email" error={error.email} helperText={error.email ? "Email is Required" : ""} placeholder="Email" size="small" fullWidth onChange={changeHandler} />
        <FormLabel>Password</FormLabel>
        <TextField variant="outlined" name="password" error={error.password} helperText={error.password ? "Email is Required" : ""} placeholder="Password" size="small" fullWidth onChange={changeHandler} />
        <LoadingButton variant="contained" loading={isSubmit} onClick={loginHandler} disableElevation fullWidth sx={{ mt: "10px" }}>Login</LoadingButton>
        <Link to='/auth/signup' style={{ marginTop: "10px", textDecoration: "underline" }}>I don't have a account, Register.</Link>
      </Box>
    </Container>
  );
};

export default LoginPage;