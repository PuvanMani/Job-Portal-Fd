import React, { useState, useEffect } from "react";
// import { Form, Button } from 'react-bootstrap';
// import { NavLink, useHistory } from "react-router-dom";
import { BaseURL } from '../../config/AxiosConfig'; // Import the authentication function
import { Box, Button, Container, FormLabel, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  // const history = useHistory()
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
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

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      try {
        const { data } = await BaseURL.post('/auth/login', user)
        if (data.status) {
          BaseURL.defaults.headers.token = data.token;
          handleSuccessfulLogin(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('An error occurred during login');
      }
    }
  };


  const handleSuccessfulLogin = (users) => {
    const { user } = users
    localStorage.setItem('token', users.token)
    localStorage.setItem('name', user.fname + " " + user.lname)
    localStorage.setItem('userid', user.user_id)
    localStorage.setItem('role', user.role)
    // history.push('/dashboard')
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // history.push('/dashboard')
    }
  }, [])
  return (
    <Container maxWidth="sm" sx={{ minHeight: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ p: 3, width: "100%", minHeight: "40vh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", display: "flex", flexDirection: "column", justifyContent: "space-around", borderRadius: "12px" }}>
        <Typography variant="h5" component='h5'>Login</Typography>
        <FormLabel>Email</FormLabel>
        <TextField variant="outlined" name="email" placeholder="Email" size="small" fullWidth onChange={changeHandler} />
        <FormLabel>Password</FormLabel>
        <TextField variant="outlined" name="password" placeholder="Password" size="small" fullWidth onChange={changeHandler} />
        <LoadingButton variant="contained" disableElevation fullWidth sx={{ mt: "10px" }}>Login</LoadingButton>
      </Box>
    </Container>
  );
};

export default Login;