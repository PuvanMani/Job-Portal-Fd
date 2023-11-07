import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BaseURL } from '../user-pages/api';

function JobDetailsById({ job_id }) {
  const [job, setJob] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    BaseURL.get(`job/listbyjobid/${1}`)
      .then((response) => {
        if (response.data.status) {
          setJob([...response.data.message]);
        } else {
          setError('Job details not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
        setError('Error fetching job details. Please try again.');
      });
  }, [job.length]);

  return (
    <div>
      <h1>Job Details</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : job.length > 0 ? (
        <div>
          <h5> Job Title : {job[0].title}</h5>
          <p>Description: {job[0].description || 'No description available'}</p>
          <p>Salary: {job[0].salary}</p>
          <p>Location: {job[0].locations}</p>
          {/* Add more job details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default JobDetailsById;