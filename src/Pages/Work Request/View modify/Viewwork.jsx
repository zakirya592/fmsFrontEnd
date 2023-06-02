import React, { useState } from 'react'
import Siderbar from '../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import "./Viewmodify.css"
import excel from "../../../Image/excel.png"
import pagepin from "../../../Image/pagepin.png"
import PrintIcon from '@mui/icons-material/Print';
// import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Create from '../../../Component/View work/Create'


function Viewwork() {
    const [Employeenumber, setEmployeenumber] = useState('')
    const [WorkRequest, setWorkRequest] = useState('')
    const [Firstname, setFirstname] = useState('')
    const [Middlename, setMiddlename] = useState('')
    const [Lastname, setLastname] = useState('')
    const [Mobilenumber, setMobilenumber] = useState('')
    const [Landlinenumber, setLandlinenumber] = useState('')
    const [Departmentcode, setDepartmentcode] = useState('')
    const [Location, setLocation] = useState('')
    const [Building, setBuilding] = useState('')
    const [Departmentname, setDepartmentname] = useState('')
    const [WorkType, setWorkType] = useState('')
    const [WorkTypeDescription, setWorkTypeDescription] = useState('')
    const [WorkPriority, setWorkPriority] = useState('')
    const [workTrade, setworkTrade] = useState('')
    const [workTradeDescription, setworkTradeDescription] = useState('')
    const [ProblemCategory, setProblemCategory] = useState('')
    const [AssetCode, setAssetCode] = useState('')
    const [AssetCategory, setAssetCategory] = useState('')
    const [Manufacturer, setManufacturer] = useState('')
    const [Model, setModel] = useState('')

    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar
                            className='fortrans'
                            position='fixed'

                        >
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">

                           
                            {/* Top section */}
                            <div className="d-flex justify-content-between my-auto">
                                <p className='color1 workitoppro my-auto'>View/Modify Work Request*</p>
                                <div className="d-flex">
                                    <img src={pagepin} className='me-2'/>
                                    {/* <button type="button" class="btn btn-outline-primary mx-1 color2 btnwork"><AddCircleOutlineRoundedIcon className='me-1' />Create</button> */}
                                        <Create/>
                                    <button type="button" class="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
                                    <button type="button" class="btn btn-outline-primary color2"><img src={excel}/> Export</button>
                                </div>
                            </div>

                            <hr className='color3 line' />
                            {/* Row section */}
                            <div className="row mx-auto formsection">

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
                                            Employee Number*
                                        </label>

                                        <input
                                            types='text'
                                            id='Employeenumber'
                                            value={Employeenumber}
                                            onChange={e => {
                                                setEmployeenumber(e.target.value)
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

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                            Work Request Number*
                                        </label>

                                        <input
                                            types='text'
                                            id='WorkRequest'
                                            value={WorkRequest}
                                            onChange={e => {
                                                setWorkRequest(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Request Number'
                                            required
                                        ></input>
                                        <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='Employdata' className='lablesection color3 text-start mb-1'>
                                            Request Date/Time*
                                        </label>
                                            <input type="datetime-local" id="Employdata"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div className='emailsection  d-grid my-2'>
                                        <label htmlFor='Firstname' className='lablesection color3 text-start mb-1'>
                                            First Name*
                                        </label>

                                        <input
                                            types='text'
                                            id='Firstname'
                                            value={Firstname}
                                            onChange={e => {
                                                setFirstname(e.target.value)
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
                                            Middle Name*
                                        </label>

                                        <input
                                            types='text'
                                            id='Middlename'
                                            value={Middlename}
                                            onChange={e => {
                                                setMiddlename(e.target.value)
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
                                            Last Name*
                                        </label>

                                        <input
                                            types='text'
                                            id='Lastname'
                                            value={Lastname}
                                            onChange={e => {
                                                setLastname(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Last Name'
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div className='emailsection  d-grid my-2'>
                                        <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                            Mobile Number*
                                        </label>

                                        <PhoneInput
                                            placeholder="+966   500000000"
                                            value={Mobilenumber}
                                            onChange={setMobilenumber}
                                            className='rounded inputsection py-2'
                                            country="US" />

                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div className='emailsection  d-grid my-2'>
                                        <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                            Landline Number*
                                        </label>

                                        <PhoneInput
                                            placeholder="+966  0100000000"
                                            value={Landlinenumber}
                                            onChange={setLandlinenumber}
                                            className='rounded inputsection py-2'
                                            country="US" />

                                    </div>
                                </div>
                            </div>
                            {/* seconde row */}
                            <div className="row mx-auto formsection">

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                            Department Code*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example" value={Departmentcode}
                                            onChange={(event) => {
                                                setDepartmentcode(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Dept Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                            Department Name*
                                        </label>

                                        <input
                                            types='text'
                                            id='Departmentname'
                                            value={Departmentname}
                                            onChange={e => {
                                                setDepartmentname(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Department Name'
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                            Building*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={Building}
                                            onChange={(event) => {
                                                setBuilding(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Dept Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                            Location*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" value={Location}
                                            onChange={(event) => {
                                                setLocation(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Location</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            {/* 3rd row */}
                            <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='WorkType' className='lablesection color3 text-start mb-1'>
                                            Work Type*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkType" aria-label="Floating label select example" value={WorkType}
                                            onChange={(event) => {
                                                setWorkType(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Type</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='WorkTypeDescription' className='lablesection color3 text-start mb-1'>
                                            Work Type Description *
                                        </label>

                                        <input
                                            types='text'
                                            id='WorkTypeDescription'
                                            value={WorkTypeDescription}
                                            onChange={e => {
                                                setWorkTypeDescription(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Work Type Description '
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='WorkPriority' className='lablesection color3 text-start mb-1'>
                                            Work Priority*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkPriority" aria-label="Floating label select example" value={WorkPriority}
                                            onChange={(event) => {
                                                setWorkPriority(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Priority</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            {/* 4th row */}
                            <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                            Work Trade*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example" value={workTrade}
                                            onChange={(event) => {
                                                setworkTrade(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Trade</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='workTradeDescription' className='lablesection color3 text-start mb-1'>
                                            Work Trade Description  *
                                        </label>

                                        <input
                                            types='text'
                                            id='WorkTypeDescription'
                                            value={workTradeDescription}
                                            onChange={e => {
                                                setworkTradeDescription(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Work Trade Description '
                                            required
                                        ></input>
                                    </div>
                                </div>

                            </div>

                            <hr className='color3 line' />
 {/* 5th row */}
                            <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='ProblemCategory' className='lablesection color3 text-start mb-1'>
                                            Problem Category*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="ProblemCategory" aria-label="Floating label select example" value={ProblemCategory}
                                            onChange={(event) => {
                                                setProblemCategory(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Problem Category</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                            Problem Description*
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription"></textarea>
                                          
                                        </div>
                                    </div>
                                </div>

                            </div>

                             {/* 6th row */}
                            <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='AssetCode' className='lablesection color3 text-start mb-1'>
                                            Asset Code*
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="AssetCode" aria-label="Floating label select example" value={AssetCode}
                                            onChange={(event) => {
                                                setAssetCode(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select  Asset Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='AssetDescription' className='lablesection color3 text-start mb-1'>
                                            Asset Description*
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea className='rounded inputsectiondropdpwn w-100 color2 py-1' placeholder="Asset Description " id="AssetDescription"></textarea>
                                          
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* 7th */}
                            <div className="row mx-auto formsection">

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className='emailsection  d-grid my-2'>
                                        <label htmlFor='AssetCategory' className='lablesection color3 text-start mb-1'>
                                            Asset Category*
                                        </label>

                                        <input
                                            types='text'
                                            id='AssetCategory'
                                            value={AssetCategory}
                                            onChange={e => {
                                                setAssetCategory(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Asset Category '
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className='emailsection  d-grid my-2'>
                                        <label htmlFor='Manufacturer' className='lablesection color3 text-start mb-1'>
                                            Manufacturer*
                                        </label>

                                        <input
                                            types='text'
                                            id='Manufacturer'
                                            value={Manufacturer}
                                            onChange={e => {
                                                setManufacturer(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Manufacturer'
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className='emailsection  d-grid my-2'>
                                        <label htmlFor='Model' className='lablesection color3 text-start mb-1'>
                                           Model*
                                        </label>

                                        <input
                                            types='text'
                                            id='Model'
                                            value={Model}
                                            onChange={e => {
                                                setModel(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Model'
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                                <button type="button" class="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                <button type="button" class="border-0 px-3  savebtn py-2"><SaveIcon className='me-2'/>SAVE</button>
                            </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Viewwork