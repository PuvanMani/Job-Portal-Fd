import React, { Component } from 'react';
import { BaseURL } from '../../config/AxiosConfig';
import moment from 'moment';


export const colourOptions = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" }
];

export class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  componentDidMount() {
    BaseURL.get(`user/listbyid/${localStorage.getItem("userid")}`).then((res) => {
      this.setState({ Userdata: res.data.message })
    })
    BaseURL.get(`user/list/alldetails/${localStorage.getItem("userid")}`).then((res) => {
      this.setState({ ProfileData: res.data.message.Profile, EducationData: res.data.message.Education, ExperienceData: res.data.message.Experience, Address: res.data.message.Address, SkillData: res.data.message.Skills, Certificationdata: res.data.message.Certifications })
    })
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 style={{ marginBottom: "20px" }}>Profile Details </h3>

        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h5 className='text-primary'>Profile Details</h5>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }} >First Name  : </p>
                    <p style={{ display: "inline" }} ><b>{this.state.Userdata && this.state.Userdata[0]["fname"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Last name  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Userdata && this.state.Userdata[0]["lname"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Email  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Userdata && this.state.Userdata[0]["email"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Gender  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["gender"]}</b></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>DOB  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && moment(new Date(this.state.ProfileData[0]["dob"])).format("DD-MM-YYYY")}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Marital Status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["marital_status"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Gender  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["gender"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Pan Number  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["pan_number"]}</b></p>
                  </div>
                </div>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Aadhar Number  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["aadhar_number"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Pasport Number  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["passport"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Passport Expire  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && moment(new Date(this.state.ProfileData[0]["passport_expire"])).format("DD-MM-YYYY")}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>User Type  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["user_type"]}</b></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>LinkedIn  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["linked_in"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Facebook  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["facebook"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Twiter  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["twitter"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Work Status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["work_status"]}</b></p>
                  </div>
                </div>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Mobile Number  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["alternate_mobile"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Differently Abled  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["differently_abled"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["status"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Pan Number  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["pan_number"]}</b></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>DOB  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && moment(new Date(this.state.ProfileData[0]["dob"])).format("DD-MM-YYYY")}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Marital Status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["marital_status"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Gender  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ProfileData && this.state.ProfileData[0]["gender"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-6 p-3'>
                    {this.state.ProfileData && <embed src={this.state.ProfileData[0]["resume"]} type="application/pdf" width="100%" height="100%" />}
                  </div>
                  <div className='col-sm-12 col-lg-6 p-3'>
                    {this.state.Certificationdata && <img src={this.state.ProfileData[0]["photo"]} width="200px" height='100%' />}
                  </div>
                </div>
                <h5 className='text-primary'>Address Details</h5>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Address  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Address && this.state.Address[0]["address"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>City  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Address && this.state.Address[0]["city"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Pincode  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Address && this.state.Address[0]["pincode"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Landmark  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Address && this.state.Address[0]["landmark"]}</b></p>
                  </div>
                </div>
                <h5 className='text-primary'>Education Details</h5>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>DOB  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.EducationData && this.state.EducationData[0]["course"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Institute Name  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.EducationData && this.state.EducationData[0]["institute_name"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Univercity  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.EducationData && this.state.EducationData[0]["univercity"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Year of Passed  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.EducationData && this.state.EducationData[0]["year_of_pass"]}</b></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Percentage  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.EducationData && this.state.EducationData[0]["percentage"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.EducationData && this.state.EducationData[0]["status"]}</b></p>
                  </div>
                </div>
                <h5 className='text-primary'>Experience Details</h5>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>DOB  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ExperienceData && this.state.ExperienceData[0]["title"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Company Name  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ExperienceData && this.state.ExperienceData[0]["company_name"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Start Date  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ExperienceData && moment(new Date(this.state.ExperienceData[0]["start_date"])).format("DD-MM-YYYY")}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>End date  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ExperienceData && moment(new Date(this.state.ExperienceData[0]["end_date"])).format("DD-MM-YYYY")}</b></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Location  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ExperienceData && this.state.ExperienceData[0]["location"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.ExperienceData && this.state.ExperienceData[0]["status"]}</b></p>
                  </div>
                </div>
                <h5 className='text-primary'>Skills Details</h5>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Skills  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.SkillData && this.state.SkillData[0]["skill"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>status  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.SkillData && this.state.SkillData[0]["status"]}</b></p>
                  </div>
                </div>
                <h5 className='text-primary'>Certifications Details</h5>
                <div className='row bg-light text-black'>
                  <div className='col-sm-12 col-lg-3 p-3'>
                    <p style={{ display: "inline" }}>Certificate Title  : </p>
                    <p style={{ display: "inline" }}><b>{this.state.Certificationdata && this.state.Certificationdata[0]["cert_title"]}</b></p>
                  </div>
                  <div className='col-sm-12 col-lg-6 p-3'>
                    {this.state.Certificationdata && <embed src={this.state.Certificationdata[0]["cert_proof"]} type="application/pdf" width="100%" height="100%" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewProfile;
