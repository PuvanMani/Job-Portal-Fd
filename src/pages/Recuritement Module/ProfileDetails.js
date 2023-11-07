import React, { useState, useEffect } from "react";
import "../../asset/style/style.css";
import ProfileDetailsStep from "./ProfileDetailsStep";
import EducationStep from "./EducationDetailsStep";
import ExperienceStep from "./ExperienceStep";
import CertificationStep from "./CertificationStep";
import SkillsStep from "./SkillStep";
import { BaseURL } from "../../config/AxiosConfig";
import { useNavigate } from "react-router-dom";




function ProfileDetails() {
  const navigate = useNavigate()
  const [activestep, setActiveStep] = useState(null);
  const [Profile, setProfile] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [Experience, setExperience] = useState([]);
  const [Address, setAddress] = useState([]);
  const [Certifications, setCertifications] = useState([]);
  const [Education, setEducation] = useState([]);

  const ListAllDetails = () => {
    BaseURL.get(`/user/list/alldetails/${localStorage.getItem('userid')}`).then(res => {
      if (res.data.status) {
        setProfile([...res.data.message.Profile]);
        setAddress([...res.data.message.Address]);
        setSkills([...res.data.message.Skills]);
        setExperience([...res.data.message.Experience]);
        setCertifications([...res.data.message.Certifications]);
        setEducation([...res.data.message.Education]);
        if (res.data.message.Profile.length > 0) {
          setActiveStep(0)
          navigate('/profile/add-profile/update')
        } else {
          setActiveStep(0)
        }
      } else {
        alert(res.data.message)
      }
    })
  }
  useEffect(() => {
    ListAllDetails()
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {
                activestep == null ? <div>Loading ...</div> : (
                  <div>
                    {activestep === 0 && <ProfileDetailsStep setActiveStep={setActiveStep} activestep={activestep} Profile={Profile} Address={Address} />}
                    {activestep === 1 && <EducationStep setActiveStep={setActiveStep} activestep={activestep} Education={Education} />}
                    {activestep === 2 && <ExperienceStep setActiveStep={setActiveStep} activestep={activestep} Experience={Experience} />}
                    {activestep === 3 && <CertificationStep setActiveStep={setActiveStep} activestep={activestep} Certification={Certifications} />}
                    {activestep === 4 && <SkillsStep setActiveStep={setActiveStep} activestep={activestep} Skills={Skills} />}
                  </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
