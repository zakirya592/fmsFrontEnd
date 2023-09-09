import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Toolbar from '@mui/material/Toolbar';
import GetAppIcon from '@mui/icons-material/GetApp';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Siderbar from "../../../../Component/Siderbar/Siderbar";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
function CreateSupplier() {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        VendorID: '',
        VendorName: '',
        VendorAddress: '',
        ContactLastname: '',
        ContactFirstname: '',
        ContactMiddlename: '',
        ContactMobileNumber: '',
        ContactLandlineNumber: '',
        ContactEmail: '',
        VendorInformation: '',
    });

    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                console.log('Work Request Number Api', res.data.recordset[0]);
                const reqput = res.data.recordset[0].VendorID;
                // const reqput=10
                let formattedRequestNumber;
                if (reqput >= 1 && reqput <= 9) {
                    formattedRequestNumber = `000${reqput}`;
                } else if (reqput >= 10 && reqput <= 99) {
                    formattedRequestNumber = `00${reqput}`;
                } else if (reqput >= 100 && reqput <= 999) {
                    formattedRequestNumber = `0${reqput}`;
                } else if (reqput >= 1000 && reqput <= 9999) {
                    formattedRequestNumber = `${reqput}`;
                } else {
                    formattedRequestNumber = `${reqput}`;
                }
                // localStorage.setItem('Requestnumbers', reqput)
                setValue(prevState => ({ ...prevState, VendorID: formattedRequestNumber }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        Requestnumberapi()
    }, [])

    const requestincreas = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                console.log('Work Request Number Api', res.data.recordset[0].VendorID);
                const reqput = res.data.recordset[0].VendorID + 1;
                // localStorage.setItem('Requestnumbers', reqput)
                axios.put(`/api/VendorIDCount_Put/1`, {
                    VendorID: reqput
                })
                    .then((res) => {
                        console.log('Work Request Number put Api', res.data);
                        const reqput = res.data.recordset[0].VendorID + 1;
                        setValue(prevState => ({ ...prevState, VendorID: '000-000-' + '0' + `${reqput}` }));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleChange = (field, fieldValue) => {
        setValue((prevValue) => ({
            ...prevValue,
            [field]: fieldValue,
        }));
    };

    const addSupplier = async () => {
        axios.post(`/api/VendorMaster_post`, {
            VendorID: value.VendorID,
            VendorName: value.VendorName,
            VendorAddress: value.VendorAddress,
            ContactLastname: value.ContactLastname,
            ContactFirstname: value.ContactFirstname,
            ContactMiddlename: value.ContactMiddlename,
            ContactMobileNumber: value.ContactMobileNumber,
            ContactLandlineNumber: value.ContactLandlineNumber,
            ContactEmail: value.ContactEmail,
            VendorInformation: value.VendorInformation,
        },)
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Supplier ${value.VendorID} has been created successfully`,
                    'success'
                )
                navigate('/supplier')

            })
            .catch((err) => {
                console.log(err);
                const statuss = err.response.status

                if (statuss == 404) {
                    Swal.fire(
                        'Error!',
                        'Supplier is required  ',
                        'error'
                    )
                }
                else if (statuss == 500) {
                    Swal.fire(
                        'Error!',
                        `This Supplier Already exit`,
                        'error'
                    )
                }
                // else {
                //     Swal.fire(
                //         'Error!',
                //         `${err.response.message}`,
                //         'error'
                //     )
                // }
            });

    };

    const Postdata=()=>{
        requestincreas()
        addSupplier()
    }
    return (
        <>
            <div className="bg">
                <Box sx={{ display: "flex" }}>
                    <Siderbar />
                    <AppBar className="fortrans locationfortrans" position="fixed">
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => { navigate(`/supplier`); }} />
                                <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className="topermaringpage  container">
                        <div className="py-3">
                            <div className="d-flex justify-content-between my-auto">
                                <p className="color1 workitoppro my-auto">Create Vendor/Supplier Master

                                </p>
                                <div className="d-flex">
                                    {/* <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                                        <AddCircleOutlineIcon />
                                        Create
                                    </button>
                                    <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                                        <LocalPrintshopIcon />
                                        Print
                                    </button>
                                    <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                                        <GetAppIcon />
                                        Export
                                    </button> */}

                                </div>
                            </div>
                            <hr className="color3 line width" />
                            <div className="row mx-auto formsection">

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
                                            Vendor/Supplier Code <span className='star'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="VendorID"
                                            value={value.VendorID}
                                            onChange={(e) => handleChange("VendorID", e.target.value)}
                                            className="rounded inputsection py-2"
                                            placeholder="Enter Supplier Code"
                                            required
                                        />
                                        <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchIcon className=' serachicon' />
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
                                            Vendor/Supplier Name
                                        </label>

                                        <input
                                            type="text"
                                            id="VendorName"
                                            value={value.VendorName}
                                            onChange={(e) => handleChange("VendorName", e.target.value)}
                                            className="rounded inputsection py-2"
                                            placeholder="Enter Vendor/Supplier Name"
                                            required
                                        />

                                        <p
                                            className='position-absolute text-end serachicon'
                                        >
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                                    <div className="emailsection d-grid my-2">
                                        <label htmlFor="ProblemDescription" className="lablesection color3 text-start mb-1">
                                            Complete Address
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea
                                                id="VendorAddress"  // Update this to "VendorAddress"
                                                value={value.VendorAddress}  // Update this to "VendorAddress"
                                                onChange={(e) => handleChange("VendorAddress", e.target.value)}  // Update this to "VendorAddress"
                                                className="rounded inputsectiondropdpwn w-100 color2 py-2"
                                                placeholder="Enter Vendor Address"
                                            ></textarea>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr className="color3 line width" />
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 userCredentials" style={{ justifyContent: 'center' }}>
                                    <p className="text-center my-auto" style={{ color: 'white', textAlign: 'center' }}>
                                        Contact Person
                                    </p>
                                </Typography>
                            </Toolbar>
                            {/* below section */}
                            <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="emailsection position-relative d-grid my-2">
                                        <label htmlFor="ContactFirstname" className="lablesection color3 text-start mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="ContactFirstname"
                                            value={value.ContactFirstname}
                                            onChange={(e) => handleChange("ContactFirstname", e.target.value)}
                                            className="rounded inputsection py-2"
                                            placeholder="Enter Your First Name"
                                        />
                                        <p className="position-absolute text-end serachicon"></p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="emailsection position-relative d-grid my-2">
                                        <label htmlFor="ContactMiddlename" className="lablesection color3 text-start mb-1">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            id="ContactMiddlename"
                                            value={value.ContactMiddlename}
                                            onChange={(e) => handleChange("ContactMiddlename", e.target.value)}
                                            className="rounded inputsection py-2"
                                            placeholder="Enter Your Middle Name"
                                        />
                                        <p className="position-absolute text-end serachicon"></p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="emailsection position-relative d-grid my-2">
                                        <label htmlFor="ContactLastname" className="lablesection color3 text-start mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="ContactLastname"
                                            value={value.ContactLastname}
                                            onChange={(e) => handleChange("ContactLastname", e.target.value)}
                                            className="rounded inputsection py-2"
                                            placeholder="Enter Your Last Name"
                                        />
                                        <p className="position-absolute text-end serachicon"></p>
                                    </div>
                                </div>
                            </div>


                            {/* mobile number */}
                            <div className="row mx-auto">
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="emailsection d-grid my-2">
                                        <label htmlFor="ContactMobileNumber" className="lablesection color3 text-start mb-1">
                                            Mobile Number
                                        </label>
                                        <PhoneInput
                                            placeholder="+966 500000000"
                                            id="ContactMobileNumber"
                                            value={value.ContactMobileNumber} // Update this line
                                            onChange={(phoneNumber) => handleChange("ContactMobileNumber", phoneNumber)} // Update this line
                                            className="customstyling rounded inputsection custom-phone-input customstyling"
                                            defaultCountry="SA"
                                            dropdownClass="custom-phone-dropdown"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="emailsection d-grid my-2">
                                        <label htmlFor="ContactLandlineNumber" className="lablesection color3 text-start mb-1">
                                            Landline Number
                                        </label>
                                        <PhoneInput
                                            placeholder="+966 500000000"
                                            id="ContactLandlineNumber"
                                            value={value.ContactLandlineNumber} // Update this line
                                            onChange={(phoneNumber) => handleChange("ContactLandlineNumber", phoneNumber)} // Update this line
                                            className="customstyling rounded inputsection custom-phone-input customstyling"
                                            defaultCountry="SA"
                                            dropdownClass="custom-phone-dropdown"
                                        />
                                    </div>
                                </div>

                                {/* email here */}
                                <div className="col-sm-7 col-md-3 col-lg-3 col-xl-3">
                                    <div className="emailsection position-relative d-grid my-2">
                                        <label htmlFor="ContactEmail" className="lablesection color3 text-start mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="ContactEmail"
                                            value={value.ContactEmail} // Update this line
                                            onChange={(e) => handleChange("ContactEmail", e.target.value)} // Update this line
                                            className="rounded inputsection py-2"
                                            placeholder="Enter your Email Address"
                                        />
                                    </div>
                                </div>

                                {/* vonderInformation */}
                                <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='VendorInformation' className='lablesection color3 text-start mb-1'>
                                            Vendor Information
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea
                                                className='rounded inputsectiondropdpwn w-100 color2 py-2'
                                                placeholder="Enter Vendor related products or any additional information "
                                                id="VendorInformation"
                                                value={value.VendorInformation} // Update this line
                                                onChange={(e) => handleChange("VendorInformation", e.target.value)} // Update this line
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex justify-content-between w-100 mt-3 mb-3">
                            <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => { navigate(`/supplier`) }}>
                                <ArrowCircleLeftOutlinedIcon className='me-2' />
                                Back
                            </button>
                            <button type="button" className="border-0 px-3 savebtn py-2" onClick={Postdata}>
                                <SaveAsIcon className='me-2' />
                                Save
                            </button>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    );
}

export default CreateSupplier;