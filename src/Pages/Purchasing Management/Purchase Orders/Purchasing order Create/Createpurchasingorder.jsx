import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import pagepin from "../../../../Image/pagepin.png";
import PhoneInput from "react-phone-number-input";
function Createpurchasingorder() {

    const [value, setvalue] = useState({
        VendorCode: '', VendorName: '',
        Firstname: '', Middlename: '', Lastname: '',
        MobileNumber: '', LandlineNumber: '', EmailAddress:'',
    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

   
    return (
        <>
            <img src={pagepin} alt=""
                onClick={handleClick} className=" mx-1 color2 btnwork"></img>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >


                {/* Row two */}
                <div className="row mx-auto formsection">

                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                        <div className='emailsection position-relative d-grid my-2'>
                            <label htmlFor='VendorCode' className='lablesection color3 text-start mb-1'>
                                Vendor Code<span className='star'>*</span>
                            </label>
                            <input
                                types='text'
                                id='VendorCode'
                                value={value.VendorCode}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        VendorCode: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='VendorCode'
                                required
                            ></input>

                        </div>
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                        <div className='emailsection position-relative d-grid my-2'>
                            <label htmlFor='VendorName' className='lablesection color3 text-start mb-1'>
                                Vendor Name<span className='star'>*</span>
                            </label>
                            <input
                                types='text'
                                id='VendorName'
                                value={value.VendorName}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        VendorName: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Vendor Name'
                                required
                            ></input>
                        </div>
                    </div>


                </div>
                <div className="row mx-auto formsection">

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='Firstname' className='lablesection color3 text-start mb-1'>
                                First Name<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='Firstname'
                                value={value.Firstname}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Firstname: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Enter First Name'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='Middlename' className='lablesection color3 text-start mb-1'>
                                Middle Name<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='Middlename'
                                value={value.Middlename}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Middlename: e.target.value
                                    }))
                                }}

                                className='rounded inputsection py-2'
                                placeholder='Enter Middle Name'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                Last Name<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='Lastname'
                                value={value.Lastname}

                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Lastname: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Enter Last Name'
                                required
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mx-auto formsection">

                   

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='MobileNumber' className='lablesection color3 text-start mb-1'>
                                Mobile Number<span className='star'>*</span>
                            </label>

                            <PhoneInput
                                placeholder="+966   500000000"
                                id='MobileNumber'
                                value={value.MobileNumber}
                                onChange={(phoneNumber) =>
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        MobileNumber: phoneNumber,
                                    }))
                                }
                                className='rounded inputsection w-100 custom-phone-input py-2'
                                defaultCountry="SA"
                                dropdownClass='custom-phone-dropdown'
                            />

                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='Landlinenumber' className='lablesection color3 text-start mb-1'>
                                Landline Number<span className='star'>*</span>
                            </label>

                            <PhoneInput
                                placeholder="+966  0100000000"
                                id='Landlinenumber'
                                value={value.LandlineNumber}
                                onChange={(LandlineNumber) =>
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        LandlineNumber: LandlineNumber,
                                    }))
                                }
                                className='rounded inputsection py-2'
                                defaultCountry="SA" />

                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='EmailAddress' className='lablesection color3 text-start mb-1'>
                                Email Address<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='EmailAddress'
                                value={value.EmailAddress}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        EmailAddress: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Enter Your Email Address'
                                required
                            ></input>
                        </div>
                    </div>
                </div>
                
                <div className="d-flex justify-content-between my-2 ps-4">
                    <button type="button" class="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                </div>


            </Menu>
        </>
    )
}

export default Createpurchasingorder