import React, { useState } from 'react'
import Siderbar from '../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import excel from "../../Image/excel.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateWorkRequest() {
    
    const [value, setvalue] = useState({
        EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
        Departmentcode: '', Departmentname: '',//Department api input 
        BuildingCode: '', //AddBuildingInworkRequestPOST api input
        Location: '',// //AddLocationInworkRequestPOST api input
        WorkType: "", WorkTypeDesc: '',//AddWorkTypeInworkRequestPOST api input
        WorkPriority: '',//AddWorkPriorityInworkRequestPOST api input
        AssetCode: '',// AddAssetItemTagIDInworkRequestPOST api input
        AssetItemDescription: '', AssetCategory: '', Manufacturer: '', Model: '',//AddassetItemInworkRequestPOST api input
        RequestDateTime: '',
        workTrade: '',
        WorkOrder: '',
        ProblemCategory: '',
        ProblemDescription: '',
        AssetItemTag: '',
        CompletedByEmp: '',
        FeedbackEmp: '',
        Feedback_Remarks: '',
        WorkRequest: '',

    })

    const [workTradeDescription, setworkTradeDescription] = useState('')

    // generateId random
    const generateId = () => {
        const randomNumber = Math.floor(Math.random() * 100000000);
        return randomNumber.toString().padStart(8, '0');
    };


    const Update = async () => {
        //  AddworkRequestPOST api
        const generatedId = generateId();
        await axios.post(`/api/AddworkRequestPOST`, {
            EmployeeID: generatedId,
            Firstname: value.Firstname,
            Middlename: value.Middlename,
            Lastname: value.Lastname,
            "MobileNumber": value.MobileNumber,
            LandlineNumber: value.LandlineNumber,
        },)
            .then((res) => {
                console.log('Add work api first api', res.data);
                setvalue(prevState => ({ ...prevState, EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', WorkRequest: '', MobileNumber: '', LandlineNumber: '' }));
            })
            .catch((err) => {
                console.log(err);
            });

        // Department api
        await axios.post(`/api/AddDepartmentInworkRequestPOST`, {
            DepartmentCode: value.DepartmentCode,
            DepartmentDesc: value.Departmentname,
        },)
            .then((res) => {
                console.log('department api second', res.data);
                setvalue(prevState => ({ ...prevState, DepartmentCode: '', Departmentname: '' }));

            })
            .catch((err) => {
                console.log(err);
            });

        // AddBuildingInworkRequestPOST api
        await axios.post(`/api/AddBuildingInworkRequestPOST`, {
            BuildingCode: value.BuildingCode,
            BuildingDesc: '',
        },)
            .then((res) => {
                console.log('Add Bbuilding work requse api 3rd', res.data);
                setvalue(prevState => ({ ...prevState, BuildingCode: '' }));
            })
            .catch((err) => {
                console.log(err);
            });

        // AddLocationInworkRequestPOST api
        await axios.post(`/api/AddLocationInworkRequestPOST`, {
            LocationCode: value.Location,
            LocationDesc: '',
        },)
            .then((res) => {
                console.log('Add loaction api 4th', res.data);
                setvalue(prevState => ({ ...prevState, Location: '' }));
            })
            .catch((err) => {
                console.log(err);
            });

        // AddWorkTypeInworkRequestPOST
        await axios.post(`/api/AddWorkTypeInworkRequestPOST`, {
            WorkTypeCode: value.WorkType,
            WorkTypeDesc: value.WorkTypeDesc,
        },)
            .then((res) => {
                console.log('AddWorkTypeInworkRequestPOST 5th api', res.data);
                setvalue(prevState => ({ ...prevState, WorkType: '', WorkTypeDesc: '' }));
            })
            .catch((err) => {
                console.log(err);
            });

        // AddWorkPriorityInworkRequestPOST
        await axios.post(`/api/AddWorkPriorityInworkRequestPOST`, {
            WorkPriorityCode: value.WorkPriority,
            WorkPriorityDesc: '',
            WorkPrioritySeq: '',
        },)
            .then((res) => {
                console.log('AddWorkPriorityInworkRequestPOST 6th api', res.data);
                setvalue(prevState => ({ ...prevState, WorkPriority: '' }));
            })
            .catch((err) => {
                console.log(err);
            });

        //  AddAssetItemTagIDInworkRequestPOST
        await axios.post(`/api/AddAssetItemTagIDInworkRequestPOST`, {
            AssetItemTagID: value.AssetCode,
        },)
            .then((res) => {
                console.log('AddAssetItemTagIDInworkRequestPOST 7th api', res.data);
                setvalue(prevState => ({ ...prevState, AssetCode: '', }));
            })
            .catch((err) => {
                console.log(err);
            });

        // AddassetItemInworkRequestPOST
        await axios.post(`/api/AddassetItemInworkRequestPOST`, {
            AssetItemDescription: value.AssetItemDescription,
            AssetCategory: value.AssetCategory,
            Manufacturer: value.Manufacturer,
            Model: value.Model,
        },)
            .then((res) => {
                console.log('AddassetItemInworkRequestPOST 8th api', res.data);
                setvalue(prevState => ({ ...prevState, AssetItemDescription: '', AssetCategory: '', Manufacturer: '', Model: '', }));
            })
            .catch((err) => {
                console.log(err);
            });

        await Swal.fire({
            title: "Success",
            text: "you have Success submited the Data",
            icon: "success",
            confirmButtonText: "OK",
        })
    };
    const navigate = useNavigate();

    const Goback = () => {
        navigate(-1); // Navigate back one step in the browser history
      };
    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2"  onClick= {Goback}/>
                                    <p className="text-center my-auto mx-auto">Work Request</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Create Work Request</p>
                                    <div className="d-flex">

                                        {/* create */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork btnworkactive"><PrintIcon className='me-1' />Create</button>
                                        {/* print  */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
                                        {/* excel  */}
                                        <button type="button" className="btn btn-outline-primary color2"><img src={excel}  alt=''/> Export</button>
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee Number<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='EmployeeID'
                                                value={value.EmployeeID}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        EmployeeID: e.target.value
                                                    }))
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                                Work Request Number<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkRequest'
                                                value={value.WorkRequest}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkRequest: e.target.value
                                                    }))
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Employdata' className='lablesection color3 text-start mb-1'>
                                                Request Date/Time<span className='star'>*</span>
                                            </label>
                                            <input type="datetime-local" id="Employdata"

                                                value={value.RequestDateTime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestDateTime: e.target.value
                                                    }))
                                                }}
                                                name="birthdaytime" className='rounded inputsection py-2' />
                                        </div>

                                    </div>
                                    {/* change the value for the request status  */}
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                                Request Status<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example" value={value.Departmentcode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Departmentcode: e.target.value
                                                    }))
                                                }}>

                                                <option className='inputsectiondropdpwn'>Select Stutus</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* Row Two */}
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

                                {/* Row Three */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Mobile Number<span className='star'>*</span>
                                            </label>

                                            <PhoneInput
                                                placeholder="+966   500000000"
                                                value={value.MobileNumber}
                                                onChange={(phoneNumber) =>
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        MobileNumber: phoneNumber,
                                                    }))
                                                }
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Landline Number<span className='star'>*</span>
                                            </label>

                                            <PhoneInput
                                                placeholder="+966  0100000000"
                                                value={value.LandlineNumber}
                                                onChange={(LandlineNumber) =>
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        LandlineNumber: LandlineNumber,
                                                    }))
                                                }
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                </div>
                                {/* second row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                                Department Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example" value={value.Departmentcode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Departmentcode: e.target.value
                                                    }))
                                                }}>

                                                <option className='inputsectiondropdpwn'>Select Dept Code</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Department Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Departmentname'
                                                value={value.Departmentname}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Departmentname: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Department Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Dept Code</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                                Location<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" value={value.Location}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Location: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Location</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                {/* 3rd row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkType' className='lablesection color3 text-start mb-1'>
                                                Work Type<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkType" aria-label="Floating label select example"
                                                value={value.WorkType}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkType: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Work Type</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='WorkTypeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Type Description <span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={value.WorkTypeDesc}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkTypeDesc: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Type Description '
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkPriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkPriority" aria-label="Floating label select example"
                                                value={value.WorkPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkPriority: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Work Priority</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {/* 4th row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                                Work Trade<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                value={value.WorkTrade}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkTrade: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Work Trade</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='workTradeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Trade Description  <span className='star'>*</span>
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
                                {/* 6th row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='AssetCode' className='lablesection color3 text-start mb-1'>
                                                Asset Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="AssetCode" aria-label="Floating label select example"
                                                value={value.AssetCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AssetCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select  Asset Code</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='AssetDescription' className='lablesection color3 text-start mb-1'>
                                                Asset Description<span className='star'>*</span>
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-1' placeholder="Asset Description " id="AssetDescription" value={value.AssetItemDescription}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            AssetItemDescription: e.target.value
                                                        }))
                                                    }}></textarea>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
  <div className="d-flex align-items-center justify-content-center mt-4">
    <button type="button" className="btn color2 btnwork">
      <AddCircleOutlineIcon />
    </button>
    <button type="button" className="btn  color2 btnwork">
      <DeleteIcon />
    </button>
    <button type="button" className="btn color2 btnwork">
      <FlipCameraAndroidIcon />
    </button>
  </div>
</div>


                                </div>

                                {/* 7th */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='AssetCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Category<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='AssetCategory'
                                                value={value.AssetCategory}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AssetCategory: e.target.value
                                                    }))
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
                                                Manufacturer<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Manufacturer'
                                                value={value.Manufacturer}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Manufacturer: e.target.value
                                                    }))
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
                                                Model<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Model'
                                                value={value.Model}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Model: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Model'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                {/* 8th  */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='ProblemCategory' className='lablesection color3 text-start mb-1'>
                                                Problem Category<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="ProblemCategory" aria-label="Floating label select example"
                                                value={value.ProblemCategory}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ProblemCategory: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Problem Category</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                                Problem Description<span className='star'>*</span>
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription" value={value.ProblemDescription}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            ProblemDescription: e.target.value
                                                        }))
                                                    }}></textarea>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={Update}><SaveIcon className='me-2' />SAVE</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkRequest