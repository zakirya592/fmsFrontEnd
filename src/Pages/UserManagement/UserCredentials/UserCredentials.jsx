import React, { useState } from 'react'
import Siderbar from '../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import excel from "../../../Image/excel.png"
import pagepin from "../../../Image/pagepin.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Create from '../../../Component/View work/Create'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
function UserCredentials() {
    const [EmployeeID, setEmployeeID] = useState("")
    const [EmployeeStatus, setEmployeeStatus] = useState("")
    const [MobileNumber, setMobileNumber] = useState("")
    const [LandlineNumber, setLandlineNumber] = useState("")
    const [Title, setTitle] = useState("")
    const [Firstname, setFirstname] = useState("")
    const [Middlename, setMiddlename] = useState("")
    const [Lastname, setLastname] = useState("")
    const [DepartmentCode, setDepartmentCode] = useState("")
    const [DepartmentName, setDepartmentName] = useState("")
    const [Building, setBuilding] = useState("")
    const [Location, setLocation] = useState("")
    const [userRole, setuserRole] = useState('')
    const [userRoleDiscription, setuserRoleDiscription] = useState('')
    const [userId, setuserId] = useState("")
    const [windowuserid, setwindowuserid] = useState("")
    const [windowuserpassword, setwindowuserpassword] = useState("")
    const [userIdPassword, setuserIdPassword] = useState("")
    const [emailAddress, setemailAddress] = useState("")
    const navigate = useNavigate();

    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                      navigate('/')
                    })} />                                    <p className="text-center my-auto ms-5">User Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>View/Modify User Credentials <span className='star'>*</span>
                                    </p>
                                    <div className="d-flex">
                                        <img src={pagepin} className='me-2' alt='' />
                                        <Create />
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
                                        <button type="button" className="btn btn-outline-primary color2"><img src={excel} alt='' /> Export</button>
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                {/* line one */}
                                <div className="row mx-auto formsection">
                                    {/* Employee name  */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee Number<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeID'
                                                value={EmployeeID}
                                                onChange={e => {
                                                    setEmployeeID(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Employee Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                    {/* Employee Status */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee Status<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeID'
                                                value={EmployeeStatus}
                                                onChange={e => {
                                                    setEmployeeStatus(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Employee Status'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                    {/* Mobile Number */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Mobile Number<span className='star'>*</span>
                                            </label>

                                            <PhoneInput
                                                placeholder="+966   500000000"
                                                value={MobileNumber}
                                                onChange={e => {
                                                    setMobileNumber
                                                        (
                                                            e.target.value
                                                        )
                                                }}
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* Landline Number */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Landline Number<span className='star'>*</span>
                                            </label>

                                            <PhoneInput
                                                placeholder="+966  0100000000"
                                                value={LandlineNumber}
                                                onChange={e => {
                                                    setLandlineNumber(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                </div>
                                {/* line two  */}
                                <div className="row mx-auto formsection">
                                    {/* Title */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Title<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Title"
                                                value={Title}
                                                onChange={e => {
                                                    setTitle(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* Firstname */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='firstname' className='lablesection color3 text-start mb-1'>
                                                First Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter First Name"
                                                value={Firstname}
                                                onChange={e => {
                                                    setFirstname(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* MiddleName */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Middlename' className='lablesection color3 text-start mb-1'>
                                                Middle Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Middle Name"
                                                value={Middlename}
                                                onChange={e => {
                                                    setMiddlename(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* Lastname */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='lastname' className='lablesection color3 text-start mb-1'>
                                                Last Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Last Name"
                                                value={Lastname}
                                                onChange={e => {
                                                    setLastname(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                            />

                                        </div>
                                    </div>
                                </div>
                                {/* third Line */}
                                <div className="row mx-auto formsection">
                                    {/* Departement code  */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Departement Code<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Departement Code"
                                                value={DepartmentCode}
                                                onChange={e => {
                                                    setDepartmentCode(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                            />

                                        </div>
                                    </div>
                                    {/* Dept name */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='deptname' className='lablesection color3 text-start mb-1'>
                                                Departement Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Departement Name"
                                                value={DepartmentName}
                                                onChange={e => {
                                                    setDepartmentName(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                            />

                                        </div>
                                    </div>
                                    {/* building  */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='building' className='lablesection color3 text-start mb-1'>
                                                Building<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Building"
                                                value={Building}
                                                onChange={e => {
                                                    setBuilding(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                            />

                                        </div>
                                    </div>
                                    {/* location */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='location' className='lablesection color3 text-start mb-1'>
                                                Location<span className='star'>*</span>
                                            </label>

                                            <input
                                                placeholder="Enter Location"
                                                value={Location}
                                                onChange={e => {
                                                    setLocation(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                            />

                                        </div>
                                    </div>
                                </div>
                                {/* break line */}
                                <hr className='color3 line' />
                                <Toolbar>
  <Typography variant="h6" noWrap component="div" className="d-flex py-2 userCredentials" style={{ justifyContent: 'center' }}>
    <p className="text-center my-auto" style={{ color: 'white', textAlign: 'center' }}>
      User Credentials <span className='star'>*</span>
    </p>
  </Typography>
</Toolbar>


                                {/* line four */}
                                {/* userrole */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                                User Role<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example" value={userRole}
                                                onChange={e => {
                                                    setuserRole(e.target.value)
                                                }}>

                                                <option className='inputsectiondropdpwn'>Select Dept Code</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* user role discription  */}
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                User Role Discription<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='userrolediscription'
                                                value={userRoleDiscription}
                                                onChange={e => {
                                                    setuserRoleDiscription(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter User Role Discription '
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>
                                {/* line five */}
                                {/* userID */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='userid' className='lablesection color3 text-start mb-1'>
                                                User-ID<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='userrolediscription'
                                                value={userId}
                                                onChange={e => {
                                                    setuserId(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter User ID'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    {/* userpassowrd */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='userid' className='lablesection color3 text-start mb-1'>
                                                Password<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='password'
                                                id='userpassword'
                                                value={userIdPassword}
                                                onChange={e => {
                                                    setuserIdPassword(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='*********'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>

                                {/* line six */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='userid' className='lablesection color3 text-start mb-1'>
                                                Window User-ID<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='userrolediscription'
                                                value={windowuserid}
                                                onChange={e => {
                                                    setwindowuserid(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Window User ID'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    {/* userpassowrd */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='userid' className='lablesection color3 text-start mb-1'>
                                                Password<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='password'
                                                id='userpassword'
                                                value={windowuserpassword}
                                                onChange={e => {
                                                    setwindowuserpassword(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='*************'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>
                                {/* Line seven */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='userid' className='lablesection color3 text-start mb-1'>
                                                Email Address<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='email'
                                                id='emailaddress'
                                                value={emailAddress}
                                                onChange={e => {
                                                    setemailAddress(e.target.value
                                                    )
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Window User ID'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>
                                {/* below Buttons */}
                                <div className="d-flex justify-content-between mt-3">
                                <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                      navigate('/')
                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <button type="button" className="border-0 px-3  savebtn py-2" ><SaveIcon className='me-2' />SAVE</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default UserCredentials