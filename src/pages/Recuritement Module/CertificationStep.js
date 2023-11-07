import React, { useState } from "react";
import { BaseURL } from "../../config/AxiosConfig";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";

const CertificationStep = ({ setActiveStep, activestep, Certification }) => {
  const params = useParams()
  const [certificate, setCertificate] = useState({
    cert_title: "",
    cert_proof: "",
    status: "",
  });
  const [certificateProofs, setCertificateProofs] = useState([""]); // Array to hold certificate proof fields
  const [cert_title, setcert_title] = useState("");
  const [cert_proof, setcert_proof] = useState("");
  const [cert_proofBase, setcert_proofBase] = useState("");
  const [status, setstatus] = useState("Select");

  const [error, setError] = useState({
    cert_title: false,
    cert_proof: false,
    status: false,
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    let CertificateData = {
      user_id: localStorage.getItem('userid'),
      cert_title,
      cert_proof: cert_proofBase,
      status,
      created_on: moment(new Date()).format('YYYY-MM-DD')
    }
    let err = {
      cert_title: cert_title.trim() == "",
      cert_proof: cert_proof == "",
      status: status == "",
    }
    if (Object.values(err).some(val => val == true)) {
      setError(err)
    } else {
      if (params.action == "update") {
        BaseURL.put(`/user/certifications/update/${localStorage.getItem("userid")}`, CertificateData)
          .then((res) => {
            if (res.data.status) {
              localStorage.setItem('activestep', activestep + 1)
              setActiveStep(activestep + 1)
              // SuccessAlert()
            } else {
              alert(res.data.message.sqlMessage)
            }
          })
      } else {
        BaseURL.post('/user/certifications/create', CertificateData)
          .then((res) => {
            if (res.data.status) {
              alert(res.data.message)
              localStorage.setItem('activestep', activestep + 1)
              setActiveStep(activestep + 1)
            } else {
              alert(res.data.message.sqlMessage)
            }
          })
      }

    }
  };


  const handleProofChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setcert_proofBase(reader.result);
      setcert_proof(file.name);
    };

    if (file) {
      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (Certification.length > 0) {
      setcert_title(Certification[0]["cert_title"]);
      setcert_proofBase(Certification[0]["cert_proof"])
      setcert_proof("proof")
      setstatus(Certification[0]["status"]);
      setcert_title(Certification[0]["cert_title"]);
    }
  }, [Certification.length])
  return (
    <>
      <h2>Certification Details</h2>
      <FormLabel>Certificate Title <span className="text-danger">*</span></FormLabel>
      <TextField
        fullWidth
        size="small"
        placeholder="Python"
        type="text"
        name="cert_title"
        value={cert_title}
        onChange={(e) => setcert_title(e.target.value)}
      />
      {error.title && <div className="text-danger">Univercity is Required</div>}

      <FormLabel>Certificate Proof <span className="text-danger">*</span></FormLabel>
      <TextField
        fullWidth
        size="small"
        type="file"
        onChange={handleProofChange}
      />
      {error.cert_proof && <div className="text-danger">Proof is Required</div>}

      <FormLabel>Status <span className="text-danger">*</span></FormLabel>
      <Select
        fullWidth
        size="small"
        onChange={(e) => setstatus(e.target.value)}
        value={status}
      >
        <MenuItem value="Select" >Select Status</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
      {error.status && <div className="text-danger">Status is Required</div>}

      <Button sx={{ mt: "20px", mr: "20px", textTransform: "none" }} variant="contained" color="secondary" disableElevation>
        Add New Field
      </Button>

      {
        params.action == "update" ? <Button sx={{ mt: "20px" }} disableElevation variant="contained" onClick={handleSubmit}>Update</Button> : <Button sx={{ mt: "20px" }} disableElevation variant="contained" onClick={handleSubmit}>Save</Button>
      }
      <div style={{ marginTop: "20px", textAlign: "right" }} >
        <Button sx={{ mr: "20px" }} onClick={() => setActiveStep(Number(activestep) - 1)} disableElevation variant="contained">
          Back
        </Button>
        <Button onClick={() => setActiveStep(Number(activestep) + 1)} disableElevation variant="contained">
          Next
        </Button>
      </div>
    </>
  );
};

export default CertificationStep;
