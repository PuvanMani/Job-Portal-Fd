import React, { useEffect, useState } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import moment from "moment";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ProfileDetails({ setActiveStep, activestep, Profile, Address }) {
  const params = useParams()
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("Select");
  const [dob, setdob] = useState("");
  const [marital_status, setmarital_status] = useState("Select");
  const [pan_number, setpan_number] = useState("");
  const [aadhar_number, setaadhar_number] = useState("");
  const [passport, setpassport] = useState("");
  const [passport_expire, setpassport_expire] = useState("");
  const [user_type, setuser_type] = useState("");
  const [linked_in, setlinked_in] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [work_status, setwork_status] = useState("Select");
  const [resume, setresume] = useState("");
  const [resumeBase, setresumeBase] = useState("");
  const [mobile_number, setmobile_number] = useState("");
  const [differently_abled, setdifferently_abled] = useState("Select");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [landmark, setlandmark] = useState("");
  const [status, setstatus] = useState("Select");
  const [error, setError] = useState({
    gender: false,
    dob: false,
    marital_status: false,
    user_type: false,
    work_status: false,
    resume: false,
    alternate_mobile: false,
    differently_abled: false,
    address: false,
    pincode: false,
    city: false,
    landmark: false,
    status: false,
  })
  function Submit() {
    let profileObj = {
      user_id: localStorage.getItem('userid'),
      gender,
      dob: moment(dob).format('YYYY-MM-DD'),
      marital_status,
      pan_number,
      aadhar_number,
      passport,
      passport_expire: moment(passport_expire).format('YYYY-MM-DD'),
      user_type,
      linked_in,
      work_status,
      facebook,
      twitter,
      resume: resumeBase,
      photo: "",
      alternate_mobile: mobile_number,
      differently_abled,
      status,
      created_on: moment(new Date()).format('YYYY-MM-DD')
    }
    let addressObj = {
      user_id: localStorage.getItem('userid'),
      address,
      city,
      pincode,
      landmark,
      status,
      created_on: moment(new Date()).format('YYYY-MM-DD')
    }
    let err = {
      gender: gender.trim() == "Select" ? true : false,
      dob: dob == "" ? true : false,
      marital_status: marital_status.trim() == "Select" ? true : false,
      user_type: user_type.trim() == "Select" ? true : false,
      work_status: work_status.trim() == "Select" ? true : false,
      alternate_mobile: mobile_number.trim() == "" ? true : false,
      differently_abled: differently_abled == "Select" ? true : false,
      address: address.trim() == "" ? true : false,
      pincode: pincode.trim() == "" ? true : false,
      city: city.trim() == "" ? true : false,
      landmark: landmark.trim() == "" ? true : false,
      status: status.trim() == "Select" ? true : false,
    }
    if (Object.values(err).some((val) => val == true)) {
      setError(err)
    } else {
      setError({})
      if (params.action == "update") {
        BaseURL.put(`/user/profile/update/${localStorage.getItem("userid")}`, { profile: profileObj, address: addressObj }).then((res => {
          if (res.data.status) {
            localStorage.setItem('activestep', activestep + 1)
            setActiveStep(activestep + 1)
            // SuccessAlert()
          } else {
            alert(res.data.message.sqlMessage)
          }
        }))
      } else {
        BaseURL.post('/user/profile/create', { profile: profileObj, address: addressObj }).then((res => {
          if (res.data.status) {
            alert(res.data.message)
            localStorage.setItem('activestep', activestep + 1)
            setActiveStep(activestep + 1)
          } else {
            alert(res.data.message.sqlMessage)
          }
        }))
      }
    }
  }
  function ListUserDetails() {
    BaseURL.get(`/user/listbyid/${localStorage.getItem('userid')}`).then(res => {
      if (res.data.status) {
        const [message] = res.data.message
        setfname(message.fname ? message.fname : "")
        setlname(message.lname ? message.lname : "")
        setemail(message.email ? message.email : "")
        if (Profile.length > 0) {
          setgender(Profile[0]["gender"]);
          setdob(new Date(Profile[0]["dob"]));
          setmarital_status(Profile[0]["marital_status"]);
          setpan_number(Profile[0]["pan_number"]);
          setaadhar_number(Profile[0]["aadhar_number"]);
          setpassport(Profile[0]["passport"]);
          setpassport_expire(new Date(Profile[0]["passport_expire"]));
          setuser_type(Profile[0]["user_type"]);
          setlinked_in(Profile[0]["linked_in"]);
          setfacebook(Profile[0]["facebook"]);
          settwitter(Profile[0]["twitter"]);
          setwork_status(Profile[0]["work_status"]);
          setresumeBase(Profile[0]["resume"]);
          setmobile_number(Profile[0]["alternate_mobile"]);
          setdifferently_abled(Profile[0]["differently_abled"]);
          if (Address.length > 0) {
            setstatus(Profile[0]["status"]);
            setaddress(Address[0]["address"]);
            setcity(Address[0]["city"]);
            setpincode(Address[0]["pincode"]);
            setlandmark(Address[0]["landmark"]);
          }
        }
        if (Address.length > 0) {

        }
      } else {
        alert(res.data.message)
      }
    })
  }



  const handlePDFChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setresumeBase(reader.result);
      setresume(file.name);
    };

    if (file) {
      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    ListUserDetails()
  }, [Profile.length, Address.length])


  return (
    <>
      <h2>Profile Details</h2>
      <div>
        <FormLabel>Firstname</FormLabel>
        <TextField
          placeholder="Firstname"
          aria-label="Firstname"
          value={fname}
          fullWidth
          size="small"
          onChange={(e) => setfname(e.target.value)}
          disabled={true}
        />

        <FormLabel>Lastname</FormLabel>
        <TextField
          placeholder="Lastname"
          aria-label="Lastname"
          value={lname}
          fullWidth
          size="small"
          onChange={(e) => setlname(e.target.value)}
          disabled={true}
        />

        <FormLabel>Email Id</FormLabel>
        <TextField
          aria-label="emailid"
          type="email"
          value={email}
          placeholder="Enter email"
          fullWidth
          size="small"
          onChange={(e) => setemail(e.target.value)}
          disabled={true}
        />

        <FormLabel>Gender <span className="text-danger">*</span></FormLabel><br />
        <Select error={error.gender}
          fullWidth
          size="small"
          helperText={error.gender ? "Gender is Required" : ""}
          value={gender}
          onChange={(e) => setgender(e.target.value)}>
          <MenuItem value="Select">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>

        <FormLabel>Date Of Birth <span className="text-danger">*</span></FormLabel><br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DatePicker
            // placeholderText="2019-12-23"
            // value={"2019-12-23"}
            onChange={(date) => setdob(date)}
            slotProps={{ textField: { fullWidth: true, size: "small" } }} />
        </LocalizationProvider>

        <FormLabel>Marital Status <span className="text-danger">*</span></FormLabel><br />

        <Select error={error.marital_status}
          fullWidth
          size="small" helperText={error.marital_status ? "Marital Status is Required" : ""} name="select option" value={marital_status}
          onChange={(e) => setmarital_status(e.target.value)}>
          <MenuItem value="Select">Select Marital Status</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>

        </Select>

        <FormLabel>Pan Number</FormLabel><br />
        <TextField
          error={error.pan_number}
          helperText={error.pan_number ? "Pan Number is Required" : ""}
          value={pan_number}
          placeholder="Pan Number"
          aria-label="Pan Number"
          fullWidth
          size="small"
          onChange={(e) => setpan_number(e.target.value)}
        />

        <FormLabel>Adhar number</FormLabel><br />
        <TextField
          value={aadhar_number}
          placeholder="Aadhar number"
          aria-label="Aadhar number"
          fullWidth
          size="small"
          onChange={(e) => setaadhar_number(e.target.value)}
        />

        <FormLabel>Passport Number</FormLabel><br />
        <TextField
          value={passport}
          placeholder="Passport Number"
          aria-label="Passport Number"
          fullWidth
          size="small"
          onChange={(e) => setpassport(e.target.value)}
        />

        <FormLabel>Passport Expire Date</FormLabel><br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // value={passport_expire}
            // placeholderText="2019-12-23"
            onChange={(date) => setpassport_expire(date)}
            slotProps={{ textField: { fullWidth: true, size: "small" } }} />
        </LocalizationProvider>

        <FormLabel htmlFor="basic-url">Linked In URL</FormLabel>
        <TextField
          fullWidth
          size="small"
          placeholder="LinkedIn" id="basic-url" value={linked_in}
          onChange={(e) => setlinked_in(e.target.value)} aria-describedby="basic-addon3" />

        <FormLabel htmlFor="basic-url">Facebook URL</FormLabel>
        <TextField
          fullWidth
          size="small"
          placeholder="Facebook"
          id="basic-url" value={facebook}
          onChange={(e) => setfacebook(e.target.value)} aria-describedby="basic-addon3" />

        <FormLabel htmlFor="basic-url">Twitter URL</FormLabel>
        <TextField
          fullWidth
          size="small"
          placeholder="Twitter"
          id="basic-url" value={twitter}
          onChange={(e) => settwitter(e.target.value)} aria-describedby="basic-addon3" />

        <FormLabel>Work Status <span className="text-danger">*</span></FormLabel><br />
        <Select error={error.work_status}
          fullWidth
          size="small" helperText={error.work_status ? "Work Status is Required" : ""} name="select option" value={work_status}
          onChange={(e) => setwork_status(e.target.value)}>
          <MenuItem value="Select">Select Work Status</MenuItem>
          <MenuItem value="Single">Open to work</MenuItem>
          <MenuItem value="Married">Notice Period</MenuItem>
        </Select>

        <FormLabel>Upload Your Resume <span className="text-danger">*</span></FormLabel><br />
        <input type="file" style={{ margin: "10px 0px 10px 0px" }} onChange={handlePDFChange} /><br />
        {resumeBase && <embed src={resumeBase} type="application/pdf" width={100} height={150} />}<br />

        <FormLabel>Mobile Number <span className="text-danger">*</span></FormLabel><br />
        <TextField
          error={error.alternate_mobile}
          helperText={error.alternate_mobile ? "Mobile Number is Required" : ""}
          fullWidth
          size="small"
          onChange={(e) => setmobile_number(e.target.value)}
          placeholder="Mobile Number"
          value={mobile_number}
          aria-label="Mobile Number"
        />

        <FormLabel>Differently Abled <span className="text-danger">*</span></FormLabel><br />

        <Select
          error={error.differently_abled}
          fullWidth
          size="small" helperText={error.differently_abled ? "Differently Abled is Required" : ""} name="select option" value={differently_abled}
          onChange={(e) => setdifferently_abled(e.target.value)}>
          <MenuItem value="Select">Select Option</MenuItem>
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select><br></br>



        <FormLabel>Address <span className="text-danger">*</span></FormLabel><br />
        <TextField
          error={error.address}
          helperText={error.address ? "Address is Required" : ""}
          fullWidth
          size="small"
          onChange={(e) => setaddress(e.target.value)}
          placeholder="Address"
          value={address}
          aria-label="Aadress"
        />

        <FormLabel>City <span className="text-danger">*</span></FormLabel><br />
        <TextField
          error={error.city}
          helperText={error.city ? "City is Required" : ""}
          placeholder="City"
          value={city}
          aria-label="City"
          fullWidth
          size="small"
          onChange={(e) => setcity(e.target.value)}
        />

        <FormLabel>Pincode <span className="text-danger">*</span></FormLabel><br />
        <TextField
          error={error.pincode}
          helperText={error.pincode ? "Pincode is Required" : ""}
          placeholder="Pincode"
          value={pincode}
          aria-label="Pincode"
          fullWidth
          size="small"
          onChange={(e) => setpincode(e.target.value)}
        />


        <FormLabel>Landmark <span className="text-danger">*</span></FormLabel><br />
        <TextField
          error={error.landmark}
          helperText={error.landmark ? "Landmark is Required" : ""}
          placeholder="Landmark"
          value={landmark}
          aria-label="Landmark"
          fullWidth
          size="small"
          onChange={(e) => setlandmark(e.target.value)}
        />


        <FormLabel>Status <span className="text-danger">*</span></FormLabel><br />
        <Select fullWidth size="small" error={error.status} name="select option" value={status}
          onChange={(e) => setstatus(e.target.value)}>
          <MenuItem value="Select">Selecet Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">inActive</MenuItem>
        </Select>

        {
          params.action == "update" ? <Button disableElevation sx={{ mt: "20px" }} variant="contained" onClick={Submit}>
            Update
          </Button> : <Button sx={{ mt: "20px" }} disableElevation variant="contained" color="primary" onClick={Submit}>
            Save
          </Button>
        }
      </div>
      <div style={{ marginTop: "20px", textAlign: "right" }} >
        <Button onClick={() => setActiveStep(Number(activestep) + 1)} variant="contained" disableElevation>
          Next
        </Button>
      </div>
    </>
  )
}
export default ProfileDetails;   