import React, { useEffect, useState } from 'react';
import { BaseURL } from '../../config/AxiosConfig';
import { Box, Button, Dialog, FormLabel, IconButton, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MyDataGrid from '../../component/table/datagrid';
import Datatable from '../../component/table/datatable';
function CompanyList() {

    const [Company, setCompany] = useState([]);
    const [open, setopen] = useState(false);
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        company_name: false,
        gst_no: false,
        company_email: false,
        address: false,
        pincode: false,
        website_url: false,
        linkedin: false,
        twitter: false,
        facebook: false,
        instagram: false,
        contact_number: false,
        status: false,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [CompanyPerPage] = useState(10);
    const columns = [
        {
            field: 'company_name',
            headerName: 'Company Name',
            width: 200,
        },
        {
            field: 'gst_no',
            headerName: 'GST no',
            sortable: false,
            width: 160,
        },
        {
            field: 'company_email',
            headerName: 'Company Email',
            width: 180,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 180,
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            width: 130,
        },
        {
            field: 'website_url',
            headerName: 'Website URL',
            width: 160,
        },
        {
            field: 'linkedin',
            headerName: 'LinkedIn',
            width: 160,
        },
        {
            field: 'twitter',
            headerName: 'Twitter',
            width: 160,
        },
        {
            field: 'facebook',
            headerName: 'Facebook',
            width: 160,
        },
        {
            field: 'instagram',
            headerName: 'Instagram',
            width: 160,
        },
        {
            field: 'contact_number',
            headerName: 'Contact Number',
            width: 180,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
        }
    ];
    const ListAllData = () => {
        if (localStorage.getItem('role') == "Recruiter") {
            BaseURL.get(`/user/company/listbyuserid/${localStorage.getItem('userid')}`)
                .then((response) => {
                    if (response.data.status) {
                        setCompany([...response.data.message]);
                    } else {
                        alert(response.data.message)
                    }
                })
        } else {
            BaseURL.get('/user/company/list')
                .then((response) => {
                    if (response.data.status) {
                        setCompany(response.data.message);
                    } else {
                        alert(response.data.message)
                    }
                })
        }
    }

    const indexOfLastJob = currentPage * CompanyPerPage;
    const indexOfFirstJob = indexOfLastJob - CompanyPerPage;
    const currentCompany = Company.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        const maxPage = Math.ceil(Company.length / CompanyPerPage);
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleUpdate = () => {
        setLoading(true)
        let err = {
            company_name: company_name.trim() == "",
            gst_no: gst_no.trim() == "",
            company_email: company_email.trim() == "",
            address: address.trim() == "",
            pincode: pincode.trim() == "",
            website_url: website_url.trim() == "",
            linkedin: linkedin.trim() == "",
            twitter: twitter.trim() == "",
            facebook: facebook.trim() == "",
            instagram: instagram.trim() == "",
            contact_number: contact_number.trim() == "",
            status: status.trim() == "",
        }
        let CompanyData = {
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
        }
        if (Object.values(err).some(val => val == true)) {
            setLoading(false)
            setError(err)
        } else {
            BaseURL.put(`/user/company/update/${localStorage.getItem("updateid")}`, CompanyData).then(res => {
                if (res.data.status) {
                    ListAllData()
                    setLoading(false)
                    setopen(false)
                }
            })
        }
    }
    const handleEdit = (companyid) => {
        const data = Company.find(val => val.company_id == companyid);
        localStorage.setItem("updateid", companyid);
        setcompany_name(data.company_name);
        setgst_no(data.gst_no);
        setcompany_email(data.company_email);
        setaddress(data.address);
        setpincode(data.pincode);
        setwebsite_url(data.website_url);
        setlinkedin(data.linkedin);
        settwitter(data.twitter);
        setfacebook(data.facebook);
        setinstagram(data.instagram);
        setcontact_number(data.contact_number);
        setstatus(data.status)
        setopen(true)
    }
    const handleDelete = async (companyid) => {
        BaseURL.delete(`/user/company/delete/${companyid}`).then(async res => {
            if (res.data.status) {
                ListAllData()
            } else {
                alert(res.data.message)
            }
        })
    }
    useEffect(() => {
        ListAllData()
    }, []);

    return (
        <Box>
            <h2>Company List</h2>
            <Datatable rows={Company} columns={columns} id="company_id" EditFunc={handleEdit} DeleteFunct={handleDelete} />
            <Dialog open={open}>
                <Box sx={{ p: 2 }}>
                    <h3 style={{ margin: 4 }}>Edit Company Details</h3>
                    <FormLabel> Company Name <span className="text-danger">*</span></FormLabel>
                    <TextField
                        placeholder="Company Name"
                        size='small'
                        fullWidth
                        error={error.company_name}
                        helperText={error.company_name ? "Company Name is Required" : ""}
                        value={company_name}
                        onChange={(e) => setcompany_name(e.target.value)}


                    />
                    <FormLabel> GST No <span className="text-danger">*</span></FormLabel>
                    <TextField
                        placeholder="GST No"
                        size='small'
                        fullWidth
                        error={error.gst_no}
                        helperText={error.gst_no ? "GST No is Required" : ""}
                        value={gst_no}
                        onChange={(e) => setgst_no(e.target.value)}


                    />
                    <FormLabel> Company Email <span className="text-danger">*</span></FormLabel>
                    <TextField
                        placeholder="Company Email"
                        size='small'
                        fullWidth
                        error={error.company_email}
                        helperText={error.company_email ? "Company Email is Required" : ""}
                        value={company_email}
                        onChange={(e) => setcompany_email(e.target.value)}


                    />

                    <FormLabel>Address <span className="text-danger">*</span></FormLabel>
                    <TextField
                        placeholder="Address"
                        size='small'
                        fullWidth
                        error={error.address}
                        helperText={error.address ? "CompanyAddress is Required" : ""}

                        value={address}
                        onChange={(e) => setaddress(e.target.value)}

                    />
                    <FormLabel>Pincode <span className="text-danger">*</span></FormLabel>
                    <TextField
                        placeholder="Pincode"
                        size='small'
                        fullWidth
                        error={error.pincode}
                        helperText={error.pincode ? "Pincode is Required" : ""}

                        value={pincode}
                        onChange={(e) => setpincode(e.target.value)}

                    />
                    <FormLabel> Website URl <span className="text-danger">*</span></FormLabel>
                    <TextField
                        placeholder="Website URL"
                        size='small'
                        fullWidth
                        error={error.website_url}
                        helperText={error.website_url ? "Website URL is Required" : ""}
                        value={website_url}
                        onChange={(e) => setwebsite_url(e.target.value)}


                    />
                    <FormLabel> LinkedIn</FormLabel>
                    <TextField
                        placeholder="LinkedIn"
                        size='small'
                        fullWidth
                        error={error.linkedin}
                        helperText={error.linkedin ? "LinkedIn is Required" : ""}
                        value={linkedin}
                        onChange={(e) => setlinkedin(e.target.value)}


                    />
                    <FormLabel>twitter </FormLabel><br />
                    <TextField
                        placeholder="twitter"
                        size='small'
                        fullWidth
                        error={error.twitter}
                        helperText={error.twitter ? "Twitter is Required" : ""}
                        value={twitter}
                        onChange={(e) => settwitter(e.target.value)}

                    />
                    <FormLabel>Facebook</FormLabel><br />
                    <TextField
                        placeholder="Facebook"
                        size='small'
                        fullWidth
                        error={error.facebook}
                        helperText={error.company_name ? "Facebook is Required" : ""}
                        value={facebook}
                        onChange={(e) => setfacebook(e.target.value)}

                    />
                    <FormLabel>Instagram </FormLabel><br />
                    <TextField
                        placeholder="Instagram"
                        size='small'
                        fullWidth
                        error={error.instagram}
                        helperText={error.instagram ? "Instagram is Required" : ""}


                        value={instagram}
                        onChange={(e) => setinstagram(e.target.value)}

                    />
                    <FormLabel>Contact Number <span className="text-danger">*</span></FormLabel><br />
                    <TextField
                        placeholder="Contact Number"
                        size='small'
                        fullWidth
                        error={error.contact_number}
                        helperText={error.contact_number ? "Contact Number is Required" : ""}
                        value={contact_number}
                        onChange={(e) => setcontact_number(e.target.value)}

                    />
                    <FormLabel>Status <span className="text-danger">*</span></FormLabel><br />

                    <Select
                        placeholder="Select status"
                        fullWidth
                        error={error.status}
                        helperText={error.status ? "Status is Required" : ""}
                        size='small'
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                    >
                        <MenuItem disabled value="Select">User Type</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="inActive">inActive</MenuItem>
                    </Select>
                    <Box sx={{ mt: "10px", textAlign: "right" }}>
                        <button style={{ padding: "5px 10px", marginRight: "10px", mr: "10px" }} className='btn btn-danger' variant='outlined' onClick={() => setopen(false)}>Close</button>
                        <button style={{ padding: "5px 10px" }} className='btn btn-primary' loading={loading} sx={{ ml: "10px" }} onClick={() => handleUpdate()} variant='contained'>Update</button>
                    </Box>
                </Box>
            </Dialog>

        </Box>
    );
}

export default CompanyList;
