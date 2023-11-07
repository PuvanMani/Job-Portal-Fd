import React, { useState } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import moment from "moment";
import { Box, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
function CompanyForm() {
  const navigate = useNavigate();
  const [company_name, setcompany_name] = useState("");
  const [gst_no, setgst_no] = useState("");
  const [company_email, setcompany_email] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [website_url, setwebsite_url] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [twitter, settwitter] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [contact_number, setcontact_number] = useState("");
  const [status, setstatus] = useState("Select");

  const [error, setError] = useState({
    company_name: false,
    gst_no: false,
    company_email: false,
    address: false,
    pincode: false,
    website_url: false,
    contact_number: false,
    status: false,
  });
  async function submitJob(e) {
    e.preventDefault();
    let err = {
      company_name: company_name.trim() == "",
      gst_no: gst_no.trim() == "",
      company_email: company_email.trim() == "",
      address: address.trim() == "",
      pincode: pincode.trim() == "",
      website_url: website_url.trim() == "",
      contact_number: contact_number.trim() == "",
      status: status.trim() == "Select",
    }
    let JobData = {
      user_id: localStorage.getItem('userid'),
      company_name,
      gst_no,
      company_email,
      address,
      pincode,
      website_url,
      linkedin,
      twitter,
      facebook,
      instagram,
      contact_number,
      status,
      created_on: moment(new Date()).format("YYYY-MM-DD")
    }
    if (Object.values(err).some(val => val == true)) {
      setError(err)
    } else {
      BaseURL.post('/user/company/create', JobData).then(res => {
        if (res.data.status) {
          // SuccessAlert()
          navigate('/company/view-company')
        }
      })
    }
  }


  return (
    <div style={{ marginBottom: "30px" }}>
      <h1>Add Company</h1>
      <Box style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em", marginTop: "20px" }}>
        <FormLabel> Company Name <span className="text-danger">*</span></FormLabel>
        <TextField
          placeholder="Company Name"
          aria-label="Title"
          value={company_name}
          onChange={(e) => setcompany_name(e.target.value)}
          required
          size="small"
          error={error.company_name}
          helperText={error.company_name ? "Company Name is Required" : ""}
          fullWidth
        />
        <FormLabel > GST No <span className="text-danger">*</span></FormLabel>
        <TextField
          placeholder="GST No"
          aria-label="GST No"
          value={gst_no}
          onChange={(e) => setgst_no(e.target.value)}
          required
          size="small"
          error={error.gst_no}
          helperText={error.gst_no ? "Company GST no is Required" : ""}
          fullWidth
        />
        <FormLabel > Company Email <span className="text-danger">*</span></FormLabel>
        <TextField
          placeholder="Company Email"
          aria-label="Company Email"
          value={company_email}
          onChange={(e) => setcompany_email(e.target.value)}
          required
          size="small"
          error={error.company_email}
          helperText={error.company_email ? "Company Email is Required" : ""}
          fullWidth
        />
        <FormLabel >Address <span className="text-danger">*</span></FormLabel>
        <TextField
          placeholder="Address"
          aria-label="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          required
          size="small"
          error={error.address}
          helperText={error.address ? "Company Address is Required" : ""}
          fullWidth
        />

        <FormLabel >Pincode <span className="text-danger">*</span></FormLabel>
        <TextField
          placeholder="Pincode"
          aria-label="Experiance"
          value={pincode}
          onChange={(e) => setpincode(e.target.value)}
          required
          size="small"
          error={error.pincode}
          helperText={error.pincode ? "pincode is Required" : ""}
          fullWidth
        />
        <FormLabel > Website URl <span className="text-danger">*</span></FormLabel>
        <TextField
          placeholder="Website URL"
          aria-label="Title"
          value={website_url}
          onChange={(e) => setwebsite_url(e.target.value)}
          required
          size="small"
          error={error.website_url}
          helperText={error.website_url ? "Website URL is Required" : ""}
          fullWidth
        />
        <FormLabel > LinkedIn</FormLabel>
        <TextField
          placeholder="LinkedIn"
          aria-label="Title"
          value={linkedin}
          onChange={(e) => setlinkedin(e.target.value)}
          required
          size="small"
          fullWidth
        />

        <FormLabel >Twitter </FormLabel><br />
        <TextField
          placeholder="Twitter"
          aria-label="twitter"
          value={twitter}
          onChange={(e) => settwitter(e.target.value)}
          required
          size="small"
          fullWidth
        />

        <FormLabel >Facebook</FormLabel><br />
        <TextField
          placeholder="Facebook"
          aria-label="Facebook"

          value={facebook}
          onChange={(e) => setfacebook(e.target.value)}
          required
          size="small"
          fullWidth
        />
        <FormLabel >Instagram </FormLabel><br />
        <TextField
          placeholder="Instagram"
          aria-label="Instagram"

          value={instagram}
          onChange={(e) => setinstagram(e.target.value)}
          required
          size="small"
          fullWidth
        />
        <FormLabel >Contact Number <span className="text-danger">*</span></FormLabel><br />
        <TextField
          placeholder="Contact Number"
          aria-label="Contact Number"

          value={contact_number}
          onChange={(e) => setcontact_number(e.target.value)}
          required
          size="small"
          error={error.contact_number}
          helperText={error.contact_number ? "Contact Number is Required" : ""}
          fullWidth
        />
        <FormLabel >Status <span className="text-danger">*</span></FormLabel><br />
        <Select
          placeholder="Select status"
          value={status}
          onChange={(e) => setstatus(e.target.value)}
          required
          size="small"
          error={error.status}
          helperText={error.status ? "Status is Required" : ""}
          fullWidth
        >
          <MenuItem disabled value="Select">Select Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">inActive</MenuItem>
        </Select>
        <Box sx={{ textAlign: "right" }}>
          <LoadingButton disableElevation variant="contained" sx={{ mt: "10px", backgroundColor: "#4e52d0" }} onClick={submitJob}>
            Create
          </LoadingButton>
        </Box>
      </Box>
    </div>
  )
}

export default CompanyForm;