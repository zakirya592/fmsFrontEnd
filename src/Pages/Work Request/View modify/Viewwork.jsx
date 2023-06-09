import React, { useState, useEffect } from 'react'
import Siderbar from '../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import "./Viewmodify.css"
import { useNavigate } from "react-router-dom";
import excel from "../../../Image/excel.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Create from '../../../Component/View work/Create'
import Toolbar from '@mui/material/Toolbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function Viewwork() {
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
        DepartmentCode: 'Select Dept Code', Departmentname: '',//Department api input 
        BuildingCode: 'Select Building', //AddBuildingInworkRequestPOST api input
        Location: 'Select Location',// //AddLocationInworkRequestPOST api input
        WorkType: "", WorkTypeDesc: '',//AddWorkTypeInworkRequestPOST api input
        WorkPriority: '',//AddWorkPriorityInworkRequestPOST api input
        AssetCode: '',// AddAssetItemTagIDInworkRequestPOST api input
        AssetItemDescription: '', AssetCategory: '', Manufacturer: '', Model: '',//AddassetItemInworkRequestPOST api input
        RequestNumber: '', workTrade: '',// RequestNumber
        RequestDateTime: '',
        RequestStatus: '',
        AssetItemTag: '',
        CompletedByEmp: '',
        FeedbackEmp: '',
        Feedback_Remarks: '',
    })
    const [activePage, setActivePage] = useState(0);
    
    const [codeSections, setCodeSections] = useState
    ([{ // Initial code section
        AssetCode: '',
        AssetDescription: '',
        AssetCategory: '',
        Manufacturer: '',
        Model: '',
        ProblemCategory: '',
        ProblemDescription: ''
      }]);
      
      const addCodeSection = () => {
        setCodeSections(prevSections => [...prevSections, { // Add a new code section object
          AssetCode: '',
          AssetDescription: '',
          AssetCategory: '',
          Manufacturer: '',
          Model: '',
          ProblemCategory: '',
          ProblemDescription: ''
        }]);
      };
    
      const handleInputChange = (e, index) => {
        const { id, value } = e.target;
        setCodeSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections[index][id] = value;
          return updatedSections;
        });
      };
      
    
      const deleteCodeSection = (index) => {
        setCodeSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections.splice(index, 1);
          return updatedSections;
        });
      };
      

    // post api for the data 
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest`, {
                EmployeeID,
            }).then((res) => {
                console.log(res.data)
                if (res.data.recordsets[0].length === 0) {
                        Swal.fire('Oops...!', 'Something went wrong!', 'error')
                    // setModelError(true);
                } else {

                const {
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                }));
                const Depauto=res.data.recordsets[0][0].DepartmentCode
                    axios.get(`/api/Department_desc_LIST/${Depauto}`)
                        .then((res) => {
                            setDeptDesc(res.data.recordset[0].DepartmentDesc)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }
    const [AssetItemTagautom, setAssetItemTagautom] = useState('Asset ItemCode')
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            postapi(value.EmployeeID);
            
            // axios.get(`/api/Transactions_LIST/${value.EmployeeID}`).then((res) => {
            //     console.log("Transactions_LIST", res.data);
            //     setAssetTypedesc(res.data.recordset[0].AssetItemDescription)
            //     setAssetItemTagautom(res.data.recordset[0].AssetItemTagID)
            //     axios.get(`/api/AssetType_model_all_LIST/${res.data.recordset[0].AssetItemDescription}`)
            //         .then((res) => {
            //             console.log('For auto selection', res.data);
            //             setManufacturerdesc(res.data.recordset[0].Manufacturer)
            //             setAssetCategory(res.data.recordset[0].AssetCategory)
            //             setModel(res.data.recordset[0].Model)
            //         })
            //         .catch((err) => {
            //             console.log(err);
            //         });
            // })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    }

    const Update = async () => {
        await axios.put(`/api/updateWorkRequest`, {
            EmployeeID: value.EmployeeID,
            Firstname: value.Firstname,
            Middlename: value.Middlename,
            Lastname: value.Lastname,
            MobileNumber: value.MobileNumber,
            LandlineNumber: value.LandlineNumber,
            BuildingCode: value.BuildingCode,
            DepartmentCode: value.DepartmentCode,
            LocationCode: value.LocationCode,
        },)
            .then((res) => {
                // console.log('Updata the api data ', res.data);
                setvalue(prevState => ({ ...prevState, EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', WorkRequest: '', MobileNumber: '', LandlineNumber: '', BuildingCode: '', DepartmentCode: '', LocationCode: '' }));
                Swal.fire({
                    title: "Success",
                    text: "you have Success Updata the Data",
                    icon: "success",
                    confirmButtonText: "OK",
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Dropdown list

    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    useEffect(() => {
        // RequestStatus_LIST
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            // console.log("RequestStatus_LIST", res.data.recordset);
            setRequestStatusLIST(res.data.recordsets[0])
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
                console.log(err);
            });
        // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownDepartmentLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    // /Building_LIST WorkType_LIST
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkPriorityLIST, setdropdownWorkPriorityLIST] = useState([])
    const [dropdownWorkTradeLIST, setdropdownWorkTradeLIST] = useState([])
    const [dropdownAssetTypeLIST, setdropdownAssetTypeLIST] = useState([])
    const [dropdownProblemCategoryLIST, setdropdownProblemCategoryLIST] = useState([])
    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            // console.log("dropdownBuilding LIST", res.data.recordset);
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // WorkType_LIST
        axios.get(`/api/WorkType_LIST`).then((res) => {
            // console.log("WorkType LIST", res.data.recordset);
            setdropdownworktypesLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // WorkPriority_LIST
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            // console.log("WorkPriority LIST", res.data.recordset);
            setdropdownWorkPriorityLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // AssetType_LIST
        axios.get(`/api/AssetType_LIST`).then((res) => {
            // console.log("AssetType_LIST", res.data.recordset);
            setdropdownAssetTypeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // ProblemCategory_LIST
        axios.get(`/api/ProblemCategory_LIST`).then((res) => {
            // console.log("ProblemCategory_LIST", res.data.recordset);
            setdropdownProblemCategoryLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    // Department
    const [DeptDesc, setDeptDesc] = useState([])
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: e.target.value,
        }));
        axios.get(`/api/Department_desc_LIST/${Deptnale}`)
            .then((res) => {
                // console.log(res.data);
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // WorkTypedesc
    const [WorkTypedesc, setWorkTypedesc] = useState([])
    const Workypesdesc = (e) => {
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
            ...prevValue,
            WorkType: e.target.value
        }))
        axios.get(`/api/WorkType_descri_LIST/${Deptnale}`)
            .then((res) => {
                // console.log(res.data);
                setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
            })
            .catch((err) => {
                console.log(err);
            });
        // WorkTrade_LIST
        axios.get(`/api/WorkTrade_LIST/${Deptnale}`).then((res) => {
            // console.log("WorkTrade_LIST", res.data.recordset);
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }

    // prmWorkTrade
    const [WorkTradedescp, setWorkTradedescp] = useState([])
    const Worktrandedesc = (e) => {
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
            ...prevValue,
            WorkTrade: e.target.value
        }))
        axios.get(`/api/WorkTrade_descri_LIST/${Deptnale}`)
            .then((res) => {
                // console.log('WorkTrade_descri_LIST',res.data);
                setWorkTradedescp(res.data.recordset[0].WorkTradeDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // AssetType_descrip_LIST
    const [AssetTypedesc, setAssetTypedesc] = useState([])
    const [Manufacturerdesc, setManufacturerdesc] = useState([])
    const [AssetCategory, setAssetCategory] = useState([])
    const [Model, setModel] = useState()
    const AssetDesc = (e) => {
        const Deptnale = e.target.value;

        setvalue(prevValue => ({
            ...prevValue,
            AssetCode: e.target.value
        }))

        axios.get(`/api/AssetType_descrip_LIST/${Deptnale}`)
            .then((res) => {
                // console.log(res.data);
                setAssetTypedesc(res.data.recordset[0].AssetItemDescription)

                axios.get(`/api/AssetType_model_all_LIST/${res.data.recordset[0].AssetItemDescription}`)
                    .then((res) => {
                        // console.log(res.data);
                        setManufacturerdesc(res.data.recordset[0].Manufacturer)
                        setAssetCategory(res.data.recordset[0].AssetCategory)
                        setModel(res.data.recordset[0].Model)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // ProblemCategory_descrip
    const ProblemDesc = (e) => {
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
            ...prevValue,
            ProblemCategory: e.target.value
        }))
    }

    // Work Request Number
    // post api for the data 
    function Workrequestpost(RequestNumber) {
        axios.post(`/api/getworkRequestsecond`, {
            RequestNumber,
        }).then((res) => {
            // console.log('you have post a work requset',res.data)
            if (res.data.recordsets[0].length === 0) {
                Swal.fire('Oops...!', 'Something went wrong!', 'error')
                // setModelError(true);
            } else {
                const {
                    WorkType,
                    WorkTrade,
                    WorkPriority,
                    ProblemDescription,
                    RequestStatus,
                    ProblemCategory,
                    RequestDateTime,
                    AssetItemTagID
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    WorkType,
                    WorkTrade,
                    WorkPriority,
                    ProblemDescription,
                    RequestStatus,
                    ProblemCategory,
                    RequestDateTime,
                    AssetItemTagID
                }));
                // console.log('Work Request Number', res.data.recordsets[0][0]);
                const workaout = res.data.recordsets[0][0].WorkType
                axios.get(`/api/WorkType_descri_LIST/${workaout}`)
                    .then((res) => {
                        // console.log(res.data);
                        setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                axios.get(`/api/WorkTrade_LIST/${workaout}`).then((res) => {
                    // console.log("WorkTrade_LIST", res.data.recordset);
                    setdropdownWorkTradeLIST(res.data.recordsets[0])
                    const worktradauto= res.data.recordsets[0][0].WorkTradeCode;
                    axios.get(`/api/WorkTrade_descri_LIST/${worktradauto}`)
                        .then((res) => {
                            console.log('WorkTrade_descri_LIST',res.data);
                            setWorkTradedescp(res.data.recordset[0].WorkTradeDesc)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                    .catch((err) => {
                        console.log(err);
                    });
                const AssetItemTagIDauto = res.data.recordsets[0][0].AssetItemTagID
                console.log(AssetItemTagIDauto);
                axios.get(`/api/AssetType_descrip_LIST/${AssetItemTagIDauto}`)
                    .then((res) => {
                        setAssetTypedesc(res.data.recordset[0].AssetItemDescription)
                        const modellist = res.data.recordset[0].AssetItemDescription
                        axios.get(`/api/AssetType_model_all_LIST/${modellist}`)
                            .then((res) => {
                                // console.log(res.data);
                                setManufacturerdesc(res.data.recordset[0].Manufacturer)
                                setAssetCategory(res.data.recordset[0].AssetCategory)
                                setModel(res.data.recordset[0].Model)
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleKeyPressworkrequest(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            Workrequestpost(value.RequestNumber);
            axios.get(`/api/WorkRequestItems_GET_BYID/${value.RequestNumber}`)
                .then((res) => {
                    console.log('WorkRequestItems_GET_BYID', res.data);
                    setAssetItemTagautom(res.data.recordset[0].AssetItemTagID)
                    const assetdascauto = res.data.recordset[0].AssetItemTagID
                    console.log(assetdascauto);
                    axios.get(`/api/AssetType_descrip_LIST/${assetdascauto}`)
                        .then((res) => {
                            setAssetTypedesc(res.data.recordset[0].AssetItemDescription)
                            const modellistmode = res.data.recordset[0].AssetItemDescription
                            axios.get(`/api/AssetType_model_all_LIST/${modellistmode}`)
                                .then((res) => {
                                    // console.log(res.data);
                                    setManufacturerdesc(res.data.recordset[0].Manufacturer)
                                    setAssetCategory(res.data.recordset[0].AssetCategory)
                                    setModel(res.data.recordset[0].Model)
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    // Putapi
    const WorkRequestNumber = async () => {
        await axios.put(`/api/updatesecondWorkRequest`, {
            RequestNumber: value.RequestNumber,
            WorkType: value.WorkType,
            WorkTrade: value.WorkTrade,
            WorkPriority: value.WorkPriority,
        },)
            .then((res) => {
                // console.log('Updata the api data ', res.data);
                // setvalue(prevState => ({ ...prevState, RequestNumber: '', WorkPriority: '', WorkTrade: '', WorkType: '', }));
                Swal.fire({
                    title: "Success",
                    text: "you have Success Updata the Data",
                    icon: "success",
                    confirmButtonText: "OK",
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // All function 
    const Updatealldata = () => {
        Update();
        WorkRequestNumber();
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" />
                                    <p className="text-center my-auto mx-auto">Work Request</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>View/Modify Work Request</p>
                                    <div className="d-flex">
                                        {/* pagepin  */}
                                        <Create />
                                        {/* create */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                            navigate('/createworkrequest')
                                        })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                        {/* print  */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
                                        {/* excel  */}
                                        <button type="button" className="btn btn-outline-primary color2"><img src={excel} /> Export</button>
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
                                                onKeyDown={handleKeyPress}
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
                                                value={value.RequestNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestNumber: e.target.value
                                                    }))
                                                }}
                                                onKeyDown={handleKeyPressworkrequest}
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
                                            <label htmlFor='RequestStatus' className='lablesection color3 text-start mb-1'>
                                                Request Status<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="RequestStatus" aria-label="Floating label select example" value={value.RequestStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestStatus: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='inputsectiondropdpwn'>Request Status</option>
                                                {
                                                    RequestStatusLIST && RequestStatusLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.RequestStatusCode}>{itme.RequestStatusCode}</option>
                                                        )
                                                    })
                                                }
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
                                                className='rounded inputsection custom-phone-input py-2'
                                                defaultCountry="SA"
                                                dropdownClass='custom-phone-dropdown'
                                            />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
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
                                </div>
                                {/* second row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='DepartmentCode' className='lablesection color3 text-start mb-1'>
                                                Department Code<span className='star'>*</span>
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id='DepartmentCode'
                                                aria-label='Floating label select example'
                                                value={value.DepartmentCode}
                                                onChange={handleProvinceChange}
                                            >
                                                <option value={value.DepartmentCode}>{value.DepartmentCode}</option>
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

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Department Name<span className='star'>*</span>
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
                                                Building<span className='star'>*</span>
                                            </label>
                                            <select className='roundedinputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option value={value.BuildingCode}>{value.BuildingCode}</option>
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

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                                Location<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" value={value.LocationCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value={value.LocationCode}>{value.LocationCode}</option>
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
                                {/* 3rd row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkType' className='lablesection color3 text-start mb-1'>
                                                Work Type<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkType" aria-label="Floating label select example"
                                                value={value.WorkType}
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

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='WorkTypeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Type Description <span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={WorkTypedesc}
                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         WorkTypeDesc: e.target.value
                                                //     }))
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Type Description '
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
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
                                                }}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Work Priority</option>
                                                {
                                                    dropdownWorkPriorityLIST && dropdownWorkPriorityLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkPriorityCode}>{itme.WorkPriorityCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {/* 4th row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                                Work Trade<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                value={value.WorkTrade}
                                                onChange={Worktrandedesc}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Work Trade</option>
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

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='workTradeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Trade Description  <span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={WorkTradedescp}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Trade Description'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <hr className='color3 line' />
                                {/* 6th row */}
                                {codeSections.slice(activePage, activePage + 1).map((section, index) => (
                                            <div key={index}>
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='AssetCode' className='lablesection color3 text-start mb-1'>
                                                Asset Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="AssetCode" aria-label="Floating label select example"
                                                value={value.AssetCode}
                                                onChange={AssetDesc}>
                                                <option className='inputsectiondropdpwn'>{AssetItemTagautom}</option>
                                                {
                                                    dropdownAssetTypeLIST && dropdownAssetTypeLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.AssetItemTagID}>{itme.AssetItemTagID}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='AssetDescription' className='lablesection color3 text-start mb-1'>
                                                Asset Description<span className='star'>*</span>
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-1' placeholder="tblAssetTransaction.[AssetItemDescription]" id="AssetDescription"
                                                    value={AssetTypedesc}
                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         AssetItemDescription: e.target.value
                                                //     }))
                                                // }}
                                                ></textarea>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
                                        <div className="d-flex align-items-center justify-content-center mt-4">
                                            <button type="button" className="btn color2 btnwork" onClick={addCodeSection}>
                                                <AddCircleOutlineIcon />
                                            </button>
                                            <button type="button" className="btn  color2 btnwork" onClick={() => deleteCodeSection(index)}>
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
                                                value={AssetCategory}
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
                                                value={Manufacturerdesc}
                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         Manufacturer: e.target.value
                                                //     }))
                                                // }}
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
                                                value={Model}
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
                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         ProblemCategory: e.target.value
                                                //     }))
                                                // }}
                                                onChange={ProblemDesc}>
                                                <option className='inputsectiondropdpwn'>Select Problem Category</option>
                                                {
                                                    dropdownProblemCategoryLIST && dropdownProblemCategoryLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.ProblemCategoryCode}>{itme.ProblemCategoryCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                                Problem Description<span className='star'>*</span>
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Problem Description " id="ProblemDescription"
                                                    value={value.ProblemDescription}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ProblemDescription: e.target.value
                                                    }))
                                                }}
                                                ></textarea>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                </div>
                                ))}



                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <Stack spacing={2}>
                                    <Pagination
  count={codeSections.length}
  page={activePage + 1}
  onChange={(event, page) => setActivePage(page - 1)}
/>
    </Stack>
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={Updatealldata}><SaveIcon className='me-2' />SAVE</button>
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