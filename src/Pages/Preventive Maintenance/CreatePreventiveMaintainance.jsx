import React, { useState , useEffect} from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import "./Preventive.css"
import excel from "../../Image/excel.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined } from '@ant-design/icons';
import "react-phone-number-input/style.css";
import Create from '../../Component/View work/Create'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Siderbar from '../../Component/Siderbar/Siderbar'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function CreatePreventiveMaintainance() {
    const navigate = useNavigate();
    const [Employeenumber, setEmployeenumber] = useState('')
    const [WorkRequest, setWorkRequest] = useState('')
    const [Firstname, setFirstname] = useState('')
    const [Middlename, setMiddlename] = useState('')
    const [Lastname, setLastname] = useState('')
    const [WorkType, setWorkType] = useState('')
    const [WorkPriority, setWorkPriority] = useState('')
    const [assetTypelist, setassetTypelist] = useState("");
    const [AssetCode, setAssetCode] = useState('')
    const [AssetCategory, setAssetCategory] = useState('')
    const [Manufacturer, setManufacturer] = useState('')
    const [Model, setModel] = useState('')
    const [Scheduling, setScheduling] = useState('')
    const [Departmentcode, setDepartmentcode] = useState('')
    const [Location, setLocation] = useState('')
    const [Building, setBuilding] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetTypeDiscription, setassetTypeDiscription] = useState("");

    const initialWorkTypeDesc = localStorage.getItem('WorkTypeDesc') || "Select Work Trade Desc";


    // dropdown
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkTradeLIST, setdropdownWorkTradeLIST] = useState([])




    // apis
    useEffect(() => {
// building
        axios.get(`/api/Building_LIST`)
            .then((res) => {
                setdropdownBuildingLIST(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Gender API error:", err);
            });
            // work type
            axios.get(`/api/WorkType_LIST`).then((res) => {
                setdropdownworktypesLIST(res.data.recordsets[0])
            })
                .catch((err) => {
                    console.log(err);
                });
                    // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            // console.log("Loaction list", res.data.recordset);
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                // console.log(err);;
            });
        axios.get(`/api/WorkTRADE_GET_LIST`).then((res) => {
            // console.log("Loaction list", res.data.recordset);
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                // console.log(err);;
            });
            // asset type
            axios.get(`/api/AssetType_GET_LIST`).then((res) => {
                setassetTypelist(res.data.recordsets[0])
                console.log(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });
                    // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownDepartmentLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
            // priority
            axios.get(`/api/WorkPriority_LIST`).then((res) => {
                setWorkPrioritlist(res.data.recordsets[0])
                console.log(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });
            }, [])
                    axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setWorkPrioritlist(res.data.recordsets[0])
            console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
                // Department
    const [DeptDesc, setDeptDesc] = useState([])
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setDepartmentcode((prevValue) => ({
            ...prevValue,
            DepartmentCode: e.target.value,
        }));
        axios.get(`/api/Department_desc_LIST/${Deptnale}`)
            .then((res) => {
                // console.log(res.data);
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                // console.log(err);;
            });
    }
    const [WorkTypedesc, setWorkTypedesc] = useState(initialWorkTypeDesc)
    const Workypesdesc = (e) => {
        localStorage.setItem('WorkType', e.target.value)
        const Deptnale = e.target.value;
        setWorkType(prevValue => ({
            ...prevValue,
            WorkType: e.target.value
        }))
        axios.get(`/api/WorkType_descri_LIST/${Deptnale}`)
            .then((res) => {
                setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                localStorage.setItem('WorkTypeDesc', res.data.recordset[0].WorkTypeDesc)
            })
            .catch((err) => {
                console.log(err);
            });
        // // WorkTrade_LIST
        // axios.get(`/api/WorkTrade_LIST/${Deptnale}`).then((res) => {
        //     setdropdownWorkTradeLIST(res.data.recordsets[0])
        // })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }
    const handleProvinceChangeassetType = (e) => {
        const Deptnale = e.target.value;
        setAssetType((prevValue) => ({
            ...prevValue,
            assetType: e.target.value,
        }));
        axios.get(`/api/AssetType_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setassetTypeDiscription(res.data.recordset[0].AssetTypeDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
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
                      navigate('/preventive')
                    })} />
                                    <p className="text-center my-auto ms-5">Preventive Maintenance</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">

                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Create Preventive Maintenance<span className='star'>*</span></p>
                                    <div className="d-flex">
                                        {/* <button type="button" class="btn btn-outline-primary mx-1 color2 btnwork"><AddCircleOutlineRoundedIcon className='me-1' />Create</button> */}
                                        <Create />
                                        <button type="button" class="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
                                        <button type="button" class="btn btn-outline-primary color2"><img src={excel} /> Export</button>
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
                                                Employee Number<span className='star'>*</span>
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
                                                Work Request Number<span className='star'>*</span>
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
                                                Request Date/Time
                                            </label>
                                            <input type="datetime-local" id="Employdata" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Firstname' className='lablesection color3 text-start mb-1'>
                                                First Name
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
                                                Middle Name
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
                                                Last Name
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='WorkType' className='lablesection color3 text-start mb-1'>
                                                Work Type
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkType" aria-label="Floating label select example"
                                                // value={value.WorkType}
                                                onChange={Workypesdesc}>
                                                <option className='inputsectiondropdpwn'>Select Work Type</option>
                                                {
                                                    dropdownworktypesLIST && dropdownworktypesLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkTypeCode}>{itme.WorkTypeCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                        <label htmlFor='WorkTypeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Type Description
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={WorkTypedesc}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Type Description  '
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workpriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workPriority" aria-label="Floating label select example"
                                                // value={value.workPriority}
                                                onChange={e => {
                                                    setWorkPriority(prevValue => ({
                                                        ...prevValue,
                                                        workPriority: e.target.value
                                                    }))
                                                }} >
                                                <option selected className='inputsectiondropdpwn'>Select Work Priority</option>
                                                {
                                                    WorkPrioritlist && WorkPrioritlist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkPriorityCode}>{itme.WorkPriorityCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>


                                </div>
                                    <hr className='color3 line' />

                                {/* 2nd row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                            Asset Type <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="assettype" aria-label="Floating label select example"
                                        //    value={value.assetType}
                                              onChange={handleProvinceChangeassetType}
                                            >
                                            <option selected className='inputsectiondropdpwn'>Select Asset type</option>
                                              {
                                                  assetTypelist && assetTypelist.map((itme, index) => {
                                                      return (
                                                          <option key={index} value={itme.AssetTypeCode}>{itme.AssetTypeCode}</option>
                                                      )
                                                  })
                                              }
                                        </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                        <div className='emailsection d-grid my-2'>
                                        <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset type Discription<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='assetsubcategorydiscription'
                                            value={assetTypeDiscription}
                                            // onChange={e => {
                                            //     setassetTypeDiscription(e.target.value)
                                            // }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Type Discription'
                                            required
                                        ></input>
                                        </div>
                                    </div>

                                </div>

                                {/* 3rd row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='AssetCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Category
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Manufacturer' className='lablesection color3 text-start mb-1'>
                                                Manufacturer
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Model' className='lablesection color3 text-start mb-1'>
                                                Model
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Warrantyper' className='lablesection color3 text-start mb-1'>
                                                Warranty Period
                                            </label>
                                            <input type="datetime-local" id="Warrantyper" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Warrantyend' className='lablesection color3 text-start mb-1'>
                                                Warranty End Date
                                            </label>
                                            <input type="date" id="Warrantyend" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='DepartmentCode' className='lablesection color3 text-start mb-1'>
                                                Department Code
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id='DepartmentCode'
                                                aria-label='Floating label select example'
                                                // value={value.DepartmentCode}
                                                onChange={handleProvinceChange}
                                            >
                                                <option value='not Selected Select Dept Code'>Select Dept Code</option>
                                                {
                                                    dropdownDepartmentLIST && dropdownDepartmentLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.DepartmentCode}>{itme.DepartmentCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                        <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Department Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Departmentname'
                                                value={DeptDesc}

                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         Departmentname: e.target.value
                                                //     }))
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Department Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building
                                            </label>
                                            <select className='roundedinputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" 
                                            // value={value.BuildingCode}

                                                onChange={e => {
                                                    setBuilding(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option value='Select Building'>Select Building</option>
                                                {
                                                    dropdownBuildingLIST && dropdownBuildingLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.BuildingCode}>{itme.BuildingCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                                Location
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" 
                                            // value={value.LocationCode}
                                                onChange={e => {
                                                    setLocation(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value='Select Location'>Select Location</option>
                                                {
                                                    dropdownLocation && dropdownLocation.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.LocationCode}>{itme.LocationCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                
                                {/* 4th row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                                Maintenance Description
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of maintenance " id="ProblemDescription"></textarea>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <hr className='color3 line' />

                                {/* 5th row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ScheduleStart' className='lablesection color3 text-start mb-1'>
                                                Schedule-Start Date/Time*
                                            </label>
                                            <input type="datetime-local" id="ScheduleStart" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Scheduleend' className='lablesection color3 text-start mb-1'>
                                                Schedule-End Date/Time*
                                            </label>
                                            <input type="datetime-local" id="Scheduleend" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                                Work Trade
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                // value={value.WorkTrade}
                                                // onChange={Worktrandedesc}
                                                >
                                                <option className='inputsectiondropdpwn'>{localStorage.getItem('WorkTradeCode') || 'Select Work Trade'}</option>
                                                {
                                                    dropdownWorkTradeLIST && dropdownWorkTradeLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkTradeCode}>{itme.WorkTradeCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Scheduling' className='lablesection color3 text-start mb-1'>
                                                Scheduling Priority*
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Scheduling" aria-label="Floating label select example" value={Scheduling}
                                                onChange={(event) => {
                                                    setScheduling(event.target.value)
                                                }}>
                                                <option selected className='inputsectiondropdpwn'>Select Scheduling Priority</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="formsection mx-auto p-2 mt-2 ">
                                    <div className=' rounded inputsection py-2 text-start '>
                                        <label htmlFor='Frequency' className='lablesection ms-3 color3 text-start mb-1'>
                                            Frequency
                                        </label>
                                        
                                        <div className="form-check form-check-inline ms-3">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Daily" value="option1"/>
                                            <label className="form-check-label color3 radialable" htmlFor="Daily">Daily</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Weekly" value="option2"/>
                                            <label className="form-check-label color3 radialable" htmlFor="Weekly">Weekly</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Monthly" value="option1" />
                                            <label className="form-check-label color3 radialable" htmlFor="Monthly">Monthly</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Bi-Monthly" value="option2" />
                                            <label className="form-check-label color3 radialable" htmlFor="Bi-Monthly">Bi-Monthly</label>
                                        </div>

                                        <div className="form-check form-check-inline ">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Quarterly" value="option1" />
                                            <label className="form-check-label color3 radialable" htmlFor="Quarterly">Quarterly</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Yearly" value="option2" />
                                            <label className="form-check-label color3 radialable" htmlFor="Yearly">Yearly</label>
                                        </div>

                                    </div>
                                </div>
                               
                            

                                <div className="d-flex justify-content-between mt-3">
                                <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                      navigate('/preventive')
                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                   <div className="d-flex">

                                    <button type="button" class="border-0 px-3 mx-2  savebtn py-2"><SaveIcon className='me-2' />SAVE</button>
                                    <button type="button" class="border-0 px-3 mx-2 proceedbtn py-2"><VideoLibraryIcon className='me-2' />GENERATE  PM WORK ORDERS</button>
                                   </div>

                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default CreatePreventiveMaintainance