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
    const handleChange = (field, fieldValue) => {
        setValue((prevValue) => ({
          ...prevValue,
          [field]: fieldValue,
        }));
      };
    
      const handleSave = () => {
        const dataToSend = {
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
        };
    
        axios
          .post(`/api/VendorMaster_post`, dataToSend)
          .then((res) => {
            console.log(res.data);
            Swal.fire('Created!', `Vendor Master ${value.VendorID} has been created successfully`, 'success');
            setValue({
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
          })
          .catch((err) => {
            console.log(err);
            const statuss = err.response.status;
    
            if (statuss === 404) {
              Swal.fire('Error!', 'VendorID is required', 'error');
            } else if (statuss === 500) {
              Swal.fire('Error!', 'This VendorID Already exists', 'error');
            } else {
              Swal.fire('Error!', `${err.response.message}`, 'error');
            }
          });
      };
    return (
        <>
        <div className="bg">
            <Box sx={{ display: "flex" }}>
                <Siderbar />
                <AppBar className="fortrans locationfortrans" position="fixed">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                            <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => { navigate(`/`); }} />
                            <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="topermaringpage  container">
                    <div className="py-3">
                        <div className="d-flex justify-content-between my-auto">
                            <p className="color1 workitoppro my-auto">View/Modify Vendor/Supplier Master
                                <span className='star'>*</span>
                            </p>
                            <div className="d-flex">
                                <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
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
                                </button>
    
                            </div>
                        </div>
                        <hr className="color3 line width" />
                        <div className="row mx-auto formsection">
    
                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                <div className='emailsection position-relative d-grid my-2'>
                                    <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
                                        Vendor/Supplier Code<span className='star'>*</span>
                                    </label>
                                    <input
                type="text"
                id="SupplierCode"
                value={value.SupplierCode} 
                onChange={(e) => handleChange("SupplierCode", e.target.value)} 
                className="rounded inputsection py-2"
                placeholder="Enter Supplier Code"
                required
              ></input>
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
                                        Vendor/Supplier Name<span className='star'>*</span>
                                    </label>
    
                                    <input
      type="text"
      id="SupplierName"
      value={value.SupplierName} 
      onChange={(e) => handleChange("SupplierName", e.target.value)} 
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
                Complete Address<span className="star">*</span>
            </label>
            <div className="form-floating inputsectiondropdpwn">
                <textarea
                    id="CompleteAddress"
                    value={value.CompleteAddress} // Update this line
                    onChange={(e) => handleChange("CompleteAddress", e.target.value)} // Update this line
                    className="rounded inputsectiondropdpwn w-100 color2 py-2"
                    placeholder="Enter Address Details"
                ></textarea>
            </div>
        </div>
    </div>
    
                        </div>
                        <hr className="color3 line width" />
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div" className="d-flex py-2 userCredentials" style={{ justifyContent: 'center' }}>
                                <p className="text-center my-auto" style={{ color: 'white', textAlign: 'center' }}>
                                    Contact Person <span className='star'>*</span>
                                </p>
                            </Typography>
                        </Toolbar>
                        {/* below section */}
                        <div className="row mx-auto formsection">
                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div className="emailsection position-relative d-grid my-2">
            <label htmlFor="FirstName" className="lablesection color3 text-start mb-1">
                First Name<span className="star">*</span>
            </label>
            <input
                type="text"
                id="FirstName"
                value={value.FirstName} // Update this line
                onChange={(e) => handleChange("FirstName", e.target.value)} // Update this line
                className="rounded inputsection py-2"
                placeholder="Enter Your First Name"
                required
            />
            <p className="position-absolute text-end serachicon"></p>
        </div>
    </div>
    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div className="emailsection position-relative d-grid my-2">
            <label htmlFor="MiddleName" className="lablesection color3 text-start mb-1">
                Middle Name<span className="star">*</span>
            </label>
            <input
                type="text"
                id="MiddleName"
                value={value.MiddleName} // Update this line
                onChange={(e) => handleChange("MiddleName", e.target.value)} // Update this line
                className="rounded inputsection py-2"
                placeholder="Enter Your Middle Name"
                required
            />
            <p className="position-absolute text-end serachicon"></p>
        </div>
    </div>
    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div className="emailsection position-relative d-grid my-2">
            <label htmlFor="LastName" className="lablesection color3 text-start mb-1">
                Last Name<span className="star">*</span>
            </label>
            <input
                type="text"
                id="LastName"
                value={value.LastName} // Update this line
                onChange={(e) => handleChange("LastName", e.target.value)} // Update this line
                className="rounded inputsection py-2"
                placeholder="Enter Your Last Name"
                required
            />
            <p className="position-absolute text-end serachicon"></p>
        </div>
    </div>
    
                            </div>
                            
                            {/* mobile number */}
                           < div className="row mx-auto">
                           <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div className="emailsection d-grid my-2">
            <label htmlFor="MobileNumber" className="lablesection color3 text-start mb-1">
                Mobile Number
            </label>
            <PhoneInput
                placeholder="+966   500000000"
                id="MobileNumber"
                value={value.mobileNumber} // Update this line
                onChange={(phoneNumber) => handleChange("mobileNumber", phoneNumber)} // Update this line
                className="customstyling rounded inputsection custom-phone-input customstyling"
                defaultCountry="SA"
                dropdownClass="custom-phone-dropdown"
            />
        </div>
    </div>
    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div className="emailsection d-grid my-2">
            <label htmlFor="LandlineNumber" className="lablesection color3 text-start mb-1">
                Landline Number
            </label>
            <PhoneInput
                placeholder="+966   500000000"
                id="LandlineNumber"
                value={value.LandlineNumber} // Update this line
                onChange={(phoneNumber) => handleChange("LandlineNumber", phoneNumber)} // Update this line
                className="customstyling rounded inputsection custom-phone-input customstyling"
                defaultCountry="SA"
                dropdownClass="custom-phone-dropdown"
            />
        </div>
    </div>
    
    {/* email here */}
    <div className="col-sm-7 col-md-3 col-lg-3 col-xl-3">
        <div className="emailsection position-relative d-grid my-2">
            <label htmlFor="EmailAddress" className="lablesection color3 text-start mb-1">
                Email Address
            </label>
            <input
                type="email"
                id="EmailAddress"
                value={value.email} // Update this line
                onChange={(e) => handleChange("email", e.target.value)} // Update this line
                className="rounded inputsection py-2"
                placeholder="Enter your Email Address"
                required
            />
        </div>
    </div>
    
    
    {/* vonderInformation */}
    <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 ">
        <div className='emailsection d-grid my-2'>
            <label htmlFor='VonderInformation' className='lablesection color3 text-start mb-1'>
                Vonder Information<span className='star'>*</span>
            </label>
            <div className="form-floating inputsectiondropdpwn">
                <textarea
                    className='rounded inputsectiondropdpwn w-100 color2 py-2'
                    placeholder="Enter Vendor related products or any additional information "
                    id="VonderInformation"
                    value={value.VonderInformation} // Update this line
                    onChange={(e) => handleChange("VonderInformation", e.target.value)} // Update this line
                ></textarea>
            </div>
        </div>
    </div>
    
                        </div>
                    </div>
                    <div className="d-flex justify-content-between w-100 mt-3 mb-3">
                        <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => { navigate(`/`); }}>
                            <ArrowCircleLeftOutlinedIcon className='me-2' />
                            Back
                        </button>
                        <button type="button" className="border-0 px-3 savebtn py-2" onClick={handleSave}>
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