import React, { useState, useEffect, useRef } from 'react'
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
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import { CSVLink } from "react-csv";

function CreateWorkRequest() {
    const navigate = useNavigate();

    const getCurrentDateTimeString = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const initialRequestStatus = localStorage.getItem('RequestStatus') || "Open"; // Use empty string if null
    const initialFirstName = localStorage.getItem('Firstname') || ""; // Use empty string if null
    const initialMiddlename = localStorage.getItem('Middlename') || ""; // Use empty string if null
    const initialLastname = localStorage.getItem('Lastname') || ""; // Use empty string if null
    const initialMobileNumber = localStorage.getItem('MobileNumber') || ""; // Use empty string if null
    const initialLandlineNumber = localStorage.getItem('LandlineNumber') || ""; // Use empty string if null
    const initialDepartmentCode = localStorage.getItem('Departmentcode') || "Select Dept Code";
    const initialBuildingCode = localStorage.getItem('BuildingCode') || "Select Dept Code";
    const initialLocationCode = localStorage.getItem('LocationCode') || "Select Location Code";
    const initialWorkType = localStorage.getItem('WorkType') || "Select WorkType Code";
    const initialWorkPriority = localStorage.getItem('WorkPriority') || "";
    const initialWorkTradeCode = localStorage.getItem('WorkTradeCode') || "Select Work Trade Code Code";
    const initialWorkTypeDesc = localStorage.getItem('WorkTypeDesc') || "Select Work Trade Desc";
    const initialDepartmentname = localStorage.getItem('Departmentname') || "Select Departmentname";
    const initialWorkTradedesc = localStorage.getItem('WorkTradedesc') || "Select Work Trade desc";
    const initialrequestnumber = localStorage.getItem('Requestnumbers') || "";

    const [value, setvalue] = useState({
        EmployeeID: null, Firstname: initialFirstName, Middlename: initialMiddlename, Lastname: initialLastname,
        MobileNumber: initialMobileNumber, LandlineNumber: initialLandlineNumber,//AddworkRequestPOST api input
        DepartmentCode: initialDepartmentCode, Departmentname: initialDepartmentname,//Department api input 
        BuildingCode: initialBuildingCode, //AddBuildingInworkRequestPOST api input
        LocationCode: initialLocationCode,// //AddLocationInworkRequestPOST api input
        WorkType: initialWorkType, WorkTypeDesc: initialWorkTypeDesc,//AddWorkTypeInworkRequestPOST api input
        WorkPriority: initialWorkPriority,//AddWorkPriorityInworkRequestPOST api input
        AssetItemTagID: '',// AddAssetItemTagIDInworkRequestPOST api input
        AssetItemDescription: '', AssetCategory: '', Manufacturer: '', Model: '',//AddassetItemInworkRequestPOST api input
        ProblemCategory: '', ProblemDescription: '',
        RequestNumber: '',
        RequestStatus: initialRequestStatus,
        workTrade: initialWorkTradeCode,
        WorkOrder: '',
        AssetItemTag: '',
        CompletedByEmp: '',
        FeedbackEmp: '',
        Feedback_Remarks: '',
        RequestDateTime: getCurrentDateTimeString(), // Initialize with current date and time

    })

    const [renum, setrenum] = useState('')
    // Work Request Number Api
    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].RequestNumber + 1;
                setrenum(reqput)
                let formattedRequestNumber;
                if (reqput >= 1 && reqput <= 9) {
                    formattedRequestNumber = `000-000-00${reqput}`;
                } else if (reqput >= 10 && reqput <= 99) {
                    formattedRequestNumber = `000-000-0${reqput}`;
                } else if (reqput >= 100 && reqput <= 999) {
                    formattedRequestNumber = `000-000-${reqput}`;
                } else if (reqput >= 1000 && reqput <= 9999) {
                    formattedRequestNumber = `000-000-${reqput}`;
                } else {
                    formattedRequestNumber = `000-000-${reqput}`;
                }
                // localStorage.setItem('Requestnumbers', reqput)
                setvalue(prevState => ({ ...prevState, RequestNumber: formattedRequestNumber }));
                const reqnumber = `000-000-0${reqput}`
                localStorage.setItem('requestnumber', formattedRequestNumber)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const requestincreas = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].RequestNumber + 1;
                // localStorage.setItem('Requestnumbers', reqput)
                setvalue(prevState => ({ ...prevState, RequestNumber: '000-000-' + '0' + `${reqput}` }));

                axios.put(`/api/workRequestCount_Put/1`, {
                    RequestNumber: reqput
                })
                    .then((res) => {
                        axios.get(`/api/workRequestCount_GET_BYID/${reqput}`).then((res) => {
                            console.log('Work request country second api', res);
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

    useEffect(() => {
        Requestnumberapi()
    }, [])

    const Createapi = async () => {
        await axios.post(`/api/AddworkRequestPOST`, {
            EmployeeID: value.EmployeeID,
            Firstname: value.Firstname,
            Middlename: value.Middlename,
            Lastname: value.Lastname,
            MobileNumber: value.MobileNumber,
            LandlineNumber: value.LandlineNumber,
            BuildingCode: value.BuildingCode,
            DepartmentCode: value.DepartmentCode,
            LocationCode: value.LocationCode,
            // RequestNumber: value.RequestNumber,
        },)
            .then((res) => {
                // console.log('Add work api first api', res.data);
                setvalue(prevState => ({ ...prevState, EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', WorkRequest: '', MobileNumber: '', LandlineNumber: '', DepartmentCode: "", LocationCode: "", BuildingCode: "" }));
                if (res.status == 201) {
                    Swal.fire({
                        title: "Success",
                        text: "Successfully Saved...",
                        icon: "success",
                        confirmButtonText: "OK",
                    })

                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`${err.message}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    const Updated = async () => {
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
                // console.log('Updata the api data/ ', res.data);
                setvalue(prevState => ({ ...prevState, EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', WorkRequest: '', MobileNumber: '', LandlineNumber: '', BuildingCode: '', DepartmentCode: '', LocationCode: '' }));
            })
            .catch((err) => {
                console.log(err);
            });
        await Swal.fire({
            title: "Success",
            text: "you have Success Updata the Data",
            icon: "success",
            confirmButtonText: "OK",
        })
    };

    // post api for the data 
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {
            if (res.data.recordsets[0].length === 0) {
                Swal.fire('Oops...!', 'Employee ID not found!', 'error')
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
                    WorkTrade,
                    // RequestNumber
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
                    WorkTrade,
                    // RequestNumber
                }));
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        //// console.log(err);;
                    });

            }
        })
            .catch((err) => {
                //// console.log(err);;
            });
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            postapi(value.EmployeeID);
        }
    }

    const [AssetItemTagautom, setAssetItemTagautom] = useState('Asset ItemCode')

    function searchbtn(e) {
        // e.preventDefault();
        postapi(value.EmployeeID);
    }
    // Dropdown list

    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    useEffect(() => {
        // RequestStatus_LIST
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
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
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // WorkType_LIST
        axios.get(`/api/WorkType_LIST`).then((res) => {
            setdropdownworktypesLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // WorkPriority_LIST
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setdropdownWorkPriorityLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // AssetType_LIST
        axios.get(`/api/AssetType_LIST`).then((res) => {
            setdropdownAssetTypeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // ProblemCategory_LIST
        axios.get(`/api/ProblemCategory_LIST`).then((res) => {
            setdropdownProblemCategoryLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    // Department
    const [DeptDesc, setDeptDesc] = useState(initialDepartmentname)
    const handleProvinceChange = (e) => {
        localStorage.setItem('Departmentcode', e.target.value);

        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: e.target.value,
        }));
        axios.get(`/api/Department_desc_LIST/${Deptnale}`)
            .then((res) => {
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
                localStorage.setItem('Departmentname', res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // WorkTypedesc
    const [WorkTypedesc, setWorkTypedesc] = useState(initialWorkTypeDesc)
    const Workypesdesc = (e) => {
        localStorage.setItem('WorkType', e.target.value)
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
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
        // WorkTrade_LIST
        axios.get(`/api/WorkTrade_LIST/${Deptnale}`).then((res) => {
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
    }

    // prmWorkTrade
    const [WorkTradedesc, setWorkTradedesc] = useState(initialWorkTradedesc)
    const Worktrandedesc = (e) => {
        const Deptnale = e.target.value;
        localStorage.setItem('WorkTradeCode', e.target.value);
        setvalue(prevValue => ({
            ...prevValue,
            WorkTrade: e.target.value
        }))
        axios.get(`/api/WorkTrade_descri_LIST/${Deptnale}`)
            .then((res) => {
                setWorkTradedesc(res.data.recordset[0].WorkTradeDesc)
                localStorage.setItem('WorkTradedesc', res.data.recordset[0].WorkTradeDesc)
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
            AssetItemTagID: e.target.value
        }))
        axios.get(`/api/AssetType_descrip_LIST/${Deptnale}`)
            .then((res) => {
                setAssetTypedesc(res.data.recordset[0].AssetItemDescription)
                axios.get(`/api/AssetType_model_all_LIST/${res.data.recordset[0].AssetItemDescription}`)
                    .then((res) => {
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

    // Work Request Number
    function Workrequestpost(RequestNumber) {
        axios.post(`/api/getworkRequestsecond`, {
            RequestNumber,
        }).then((res) => {
            if (res.data.recordsets[0].length === 0) {
                Swal.fire('Oops...!', 'Something went wrong!', 'error')
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
                const workaout = res.data.recordsets[0][0].WorkType
                axios.get(`/api/WorkType_descri_LIST/${workaout}`)
                    .then((res) => {
                        setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                axios.get(`/api/WorkTrade_LIST/${workaout}`).then((res) => {
                    setdropdownWorkTradeLIST(res.data.recordsets[0])
                    const worktradauto = res.data.recordsets[0][0].WorkTradeCode;
                    axios.get(`/api/WorkTrade_descri_LIST/${worktradauto}`)
                        .then((res) => {
                            setWorkTradedesc(res.data.recordset[0].WorkTradeDesc)
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
                    setAssetItemTagautom(res.data.recordset[0].AssetItemTagID)
                    const assetdascauto = res.data.recordset[0].AssetItemTagID
                    axios.get(`/api/AssetType_descrip_LIST/${assetdascauto}`)
                        .then((res) => {
                            setAssetTypedesc(res.data.recordset[0].AssetItemDescription)
                            const modellistmode = res.data.recordset[0].AssetItemDescription
                            axios.get(`/api/AssetType_model_all_LIST/${modellistmode}`)
                                .then((res) => {
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

    const workrequsrpostapi = async () => {
        await axios.post(`/api/AddworkRequestsecondPOST`, {
            RequestNumber: value.RequestNumber,
            WorkType: value.WorkType,
            WorkTrade: value.WorkTrade,
            AssetItemTagID: value.AssetItemTagID,
            WorkPriority: value.WorkPriority,
            RequestStatus: value.RequestStatus,
            DepartmentCode: value.DepartmentCode,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            EmployeeID: value.EmployeeID,
            ProblemCategory: value.ProblemCategory,
            ProblemDescription: value.ProblemDescription,
            RequestDateTime: value.RequestDateTime,
        },)
            .then((res) => {
                console.log(res.data);
                // setvalue(prevState => ({ ...prevState, RequestNumber: '', ProblemDescription:'', WorkType: '', WorkTrade: '', AssetItemTagID: "", WorkPriority: "", ProblemCategory: "", EmployeeID: '', RequestStatus :''}));
            })
            .catch((err) => {
                console.log(err);
            });

    };

    const AssetItemTagIDpost = async () => {
        await axios.post(`/api/WorkRequestItems_post`, {
            RequestNumber: value.RequestNumber,
            AssetItemTagID: value.AssetItemTagID,
            AssetItemQty: '1',
            AssetItemQtyUsed: '1',

        },)
            .then((res) => {
                console.log('3rd api', res.data);
                // setvalue(prevState => ({ ...prevState, RequestNumber: '', ProblemDescription:'', WorkType: '', WorkTrade: '', AssetItemTagID: "", WorkPriority: "", ProblemCategory: "", EmployeeID: '', RequestStatus :''}));
            })
            .catch((err) => {
                console.log(err);
            });

    };

    // Putapi
    const WorkRequestNumber = async () => {
        await axios.put(`/api/updatesecondWorkRequest`, {
            RequestNumber: value.RequestNumber,
            WorkType: value.WorkType,
            WorkTrade: value.WorkTrade,
            WorkPriority: value.WorkPriority,
        },)
            .then((res) => {
                setvalue(prevState => ({ ...prevState, RequestNumber: '', WorkPriority: '', WorkTrade: '', WorkType: '', }));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [lenght, setlenght] = useState('')
    const [empreq, setempreq] = useState(false)
    // All Createapi function
    const allCreateapi = () => {
        requestincreas()
        workrequsrpostapi()
        AssetItemTagIDpost()
        Swal.fire({
            title: "Success",
            text: `Work request ${value.RequestNumber} has been created successfully`,
            icon: "success",
            confirmButtonText: "OK",
        })
        navigate('/workrequest'); // Navigate after alert is closed
        localStorage.removeItem('postemployid');
        localStorage.removeItem('EmployeeIDset');
        localStorage.removeItem('MobileNumber');
        localStorage.removeItem('RequestStatus');
        localStorage.removeItem('Firstname');
        localStorage.removeItem('Middlename');
        localStorage.removeItem('Lastname');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('LandlineNumber');
        localStorage.removeItem('Departmentcode');
        localStorage.removeItem('BuildingCode');
        localStorage.removeItem('LocationCode');
        localStorage.removeItem('WorkType');
        localStorage.removeItem('WorkTradeCode');
        localStorage.removeItem('WorkPriority');
        localStorage.removeItem('WorkTypeDesc');
        localStorage.removeItem('Departmentname');
        localStorage.removeItem('WorkTradedesc');
        localStorage.clear();

        //    }

    }
    const Assetcodebtn = (e) => {
        setvalue(prevValue => ({
            ...prevValue,
            EmployeeID: e.target.value
        }))
        navigate('/Addassetcode')
    }

    // All Updata api  function 
    const Updatealldata = () => {
        Updated()
        WorkRequestNumber();
    }

    const [getdata, setgetdata] = useState([])
    const [datanumber, setdatanumber] = useState([])

    const getapi = () => {
        // const empid = localStorage.getItem('postemployid',)
        const empid = localStorage.getItem('requestnumber',)
        axios.get(`/api/assetworkrequest_GET_BYID/${empid}`)
            .then((res) => {
                const AssetItemDescriptionsssss = res.data.recordset
                const SAQ = res.data.recordset.map((item) => item.seq);
                const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                const promises = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`)
                        .then((res) => {
                            return {
                                item,
                                data: res.data.recordset,// Store API response data here
                            };

                        })
                        .catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: null // Handle error case here
                            };
                        });

                });

                const assetItemTagIDs = [];

                // Create an array of promises for fetching data and updating assetItemTagIDs
                const promisesNumber = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    return axios.get(`/api/AssetTransactions_GET_ItemDescription/${itid}`)
                        .then((res) => {
                            return {
                                item,
                                data: res.data.recordset,// Store API response data here
                            };

                        }).catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: [] // Handle error case here
                            };
                        });
                });

                Promise.all([Promise.all(promises), Promise.all(promisesNumber)])
                    .then(([results1, results2]) => {

                        results1.forEach((itemRecords, index) => {
                            const recordsWithDescriptions = AssetItemDescriptionsss.map((description, index) => ({
                                description: description,
                                records: results1[index],
                                saq: SAQ[index],
                            }));

                            const recordsWithSAQ = SAQ.map((saq, index) => ({
                                saq: SAQ[index],
                                records: results1[index],
                            }));
                            setgetdata(recordsWithDescriptions, recordsWithSAQ);
                        });
                        results2.forEach((itemRecords, index) => {
                            const assetItemTagID = AssetItemDescriptionsss.map((assetItemTagID, index) => ({
                                assetItemTagID: assetItemTagID,
                                records: results2[index],
                                saq: SAQ[index],
                            }));
                            setdatanumber(assetItemTagID);

                        });

                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemTagID', headerName: 'ASSET/STOCK NUMBER', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetQty', headerName: 'ASSET QTY', width: 150 },
        { field: 'Model', headerName: 'MODEL', width: 200 },
        { field: 'Manufacturer', headerName: 'MONIFACTURER', width: 200 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];
    //  Deleting the assetworkrequest DELETE_BYID
    const Deletedapi = (ASQS) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2',
                // actions: 'mx-3'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You want to delete this AssetCode",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/assetworkrequest_DELETE_BYID/${ASQS}`)
                    .then((res) => {
                        getapi()
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'AssetCode has been deleted.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log('Error deleting', err);
                    });

            }
        })

    };

    // Button section
    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <MenuItem onClick={() => {
                    Deletedapi(params.row.ASQS)
                    handleMenuClose();
                }}>
                    <span style={{ paddingRight: '10px' }}>Delete</span>
                    <DeleteIcon />
                </MenuItem>
            </div>
        );
    }
    const countDuplicates = (array, key) => {
        const counts = {};
        array.forEach(item => {
            const value = item[key];
            counts[value] = (counts[value] || 0) + 1;
        });
        return counts;
    };
    // Get the data first
    const duplicatesCount = countDuplicates(getdata, 'description');
    // Extract unique descriptions
    const uniqueDescriptions = Array.from(new Set(getdata.map(row => row.description)));
    // Create filteredRows with unique descriptions and counts
    const filteredRows = uniqueDescriptions.map((description, index) => ({

        id: index + 1,
        AssetItemDescription: description,
        AssetItemTagID: datanumber[index]?.records?.data[0]?.AssetItemTagID || "",
        ASQS: getdata.find(row => row.description === description)?.saq || 0,
        AssetQty: duplicatesCount[description] || 0,
        AssetItemGroup: getdata[index].records ? getdata[index].records.data[0].AssetItemGroup : '',
        AssetCategory: getdata[index].records ? getdata[index].records.data[0].AssetCategory : '',
        AssetSubCategory: getdata[index].records ? getdata[index].records.data[0].AssetSubCategory : '',
        RequestDateTime: getdata[index].records ? getdata[index].records.data[0].RequestDateTime : '',
        Model: getdata[index].records ? getdata[index].records.data[0].Model : '',
        Manufacturer: getdata[index].records ? getdata[index].records.data[0].Manufacturer : '',
    }));

    // Now you can loop through the filteredRows and access duplicatesCount to display counts alongside entries
    filteredRows.forEach(row => {
        const description = row.AssetItemDescription;
        const count = row.AssetQty;
        const AssetItemTagID = "sdf";
    });

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const employeeIDonchange = (e) => {
        setvalue(prevValue => ({
            ...prevValue,
            EmployeeID: e.target.value
        }))
        localStorage.setItem('EmployeeIDset', e.target.value)
    }

    const handlePrintAssetTable = (tableData) => {
        const printWindow = window.open('', '_blank');

        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
    <table border="1">
      <tr>
        <th style="${headerStyle}">SEQ</th>
        <th style="${headerStyle}">ASSET/STOCK NUMBER</th>
        <th style="${headerStyle}">ASSET ITEM GROUP</th>
        <th style="${headerStyle}">ASSET ITEM DESCRIPTION</th>
        <th style="${headerStyle}">ASSET QTY</th>
        <th style="${headerStyle}">MODEL</th>
        <th style="${headerStyle}">MANUFACTURER</th>
      </tr>
      ${tableData.map(row => `
        <tr>
          <td>${row['id']}</td>
          <td>${row['AssetNumber']}</td>
          <td>${row['AssetItemGroup']}</td>
          <td>${row['AssetItemDescription']}</td>
          <td>${row['AssetQty']}</td>
          <td>${row['Model']}</td>
          <td>${row['Manufacturer']}</td>
        </tr>`).join('')}
    </table>`;

        const printContent = `
    <html>
      <head>
        <title>Asset Table</title>
        <style>
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            th {
              ${headerStyle}
            }
          }
        </style>
      </head>
      <body>${tableHtml}</body>
    </html>
  `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const [unitCode, setUnitCode] = useState([]);
    const [dropname, setdropname] = useState([])
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const abortControllerRef = useRef(null);

    useEffect(() => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                const data = response?.data?.recordset;
                const unitNameList = data.map((unitData) => unitData?.EmployeeID);
                const NAmese = data.map((namedata) => namedata?.Firstname);
                // setdropname(NAmese)
                setdropname(data)
                setUnitCode(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        if (reason === 'reset' || reason === 'clear') {
            setGpcList([]); // Clear the data list if there is no input
            setUnitCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setGpcList([]);
            setUnitCode([])
            return;
        }
        if (newInputValue === null) {

            // perform operation when input is cleared
            setGpcList([]);
            setUnitCode([])
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoading(true);
        setOpen(true);
        try {
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            // Create a new AbortController
            abortControllerRef.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCode(data ?? [])
                    setOpen(true);
                    setAutocompleteLoading(false);
                    // 
                })
                .catch((error) => {
                    console.log('-----', error);

                }
                );

        }


        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setvalue(prevValue => ({
                    ...prevValue,
                    EmployeeID: []
                }))
                setAutocompleteLoading(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCode([])
            setOpen(false);
            setAutocompleteLoading(false);
        }

    }

    const handleGPCAutoCompleteChange = (event, value) => {
        if (value === null || value === ' -') {
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }));
        }
        if (value && value.EmployeeID) {
            postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: value.EmployeeID
            }));
            localStorage.setItem('EmployeeIDset', value.EmployeeID);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const backbtn = (() => {
        localStorage.removeItem('postemployid');
        localStorage.removeItem('EmployeeIDset');
        localStorage.removeItem('MobileNumber');
        localStorage.removeItem('RequestStatus');
        localStorage.removeItem('Firstname');
        localStorage.removeItem('Middlename');
        localStorage.removeItem('Lastname');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('LandlineNumber');
        localStorage.removeItem('Departmentcode');
        localStorage.removeItem('BuildingCode');
        localStorage.removeItem('LocationCode');
        localStorage.removeItem('WorkType');
        localStorage.removeItem('WorkTradeCode');
        localStorage.removeItem('WorkPriority');
        localStorage.removeItem('WorkTypeDesc');
        localStorage.removeItem('Departmentname');
        localStorage.removeItem('WorkTradedesc');
        localStorage.clear();
        navigate('/workRequest')

        axios.delete(`/api/WorkRequest_count_DELETE_BYID/${value.RequestNumber}`)
            .then((res) => {
                getapi()
                console.log(res.data);
            })
            .catch((err) => {
                console.log('Error deleting', err);
            });

    })

    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={backbtn} />
                                    <p className="text-center my-auto mx-auto">Work Request</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Create Work  Request</p>
                                    <div className="d-flex">

                                        {/* create */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork btnworkactive" onClick={allCreateapi}> <AddCircleOutlineIcon className='me-1' />Create</button>
                                        {/* print  */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintAssetTable(filteredRows)}>
                                            <PrintIcon className="me-1" />
                                            Print
                                        </button>
                                        {/* excel  */}
                                        <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                        </CSVLink>
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-1'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee
                                            </label>
                                        </div>

                                        <Autocomplete
                                            id="serachGpc"
                                            className='rounded inputsection py-0 mt-0'
                                            required
                                            options={unitCode} // Use the formattedGpcList here
                                            // getOptionLabel={(option) => option?.EmployeeID + ' - ' + option?.Firstname}
                                            getOptionLabel={(option) =>
                                                option?.EmployeeID
                                                    ? option.EmployeeID + ' - ' + option.Firstname
                                                    : ''
                                            }
                                            getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID} // This determines which value gets sent to the API
                                            onChange={handleGPCAutoCompleteChange}
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                    {option.EmployeeID} - {option.Firstname}
                                                </li>
                                            )}
                                            value={value}
                                            onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                                            loading={autocompleteLoading}
                                            open={open}
                                            onOpen={() => {
                                                // setOpen(true);
                                            }}
                                            onClose={() => {
                                                setOpen(false);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder='Employee Number'
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {autocompleteLoading ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                    sx={{
                                                        '& label.Mui-focused': {
                                                            color: '#000000',
                                                        },
                                                        '& .MuiInput-underline:after': {
                                                            borderBottomColor: '#00006a',
                                                            color: '#000000',
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            '&:hover fieldset': {
                                                                borderColor: '#00006a',
                                                                color: '#000000',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#00006a',
                                                                color: '#000000',
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
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
                                                readOnly
                                                // value={value.RequestNumber}
                                                onChange={handleInputChange}
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
                                            <input
                                                type="datetime-local"
                                                id="Employdata"
                                                value={value.RequestDateTime}
                                                onChange={handleInputChange}
                                                name="RequestDateTime"
                                                className='rounded inputsection py-2'
                                            />
                                        </div>

                                    </div>
                                    {/* change the value for the request status  */}
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='RequestStatus' className='lablesection color3 text-start mb-1'>
                                                Request Status<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="RequestStatus" aria-label="Floating label select example" value={value.RequestStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestStatus: e.target.value
                                                    }))
                                                    localStorage.setItem('RequestStatus', e.target.value);
                                                }}>

                                                <option className='inputsectiondropdpwn' value='Open'>Open</option>
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
                                <div className="row mx-auto formsection" >
                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Firstname' className='lablesection color3 text-start mb-1'>
                                                First Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Firstname'
                                                value={value.Firstname}
                                                // value={item.Firstname}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Firstname: e.target.value
                                                    }))
                                                    localStorage.setItem('Firstname', e.target.value);
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter First Name'
                                                required={true}
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
                                                value={value.Middlename}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Middlename: e.target.value
                                                    }))
                                                    localStorage.setItem('Middlename', e.target.value);
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
                                                value={value.Lastname}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Lastname: e.target.value
                                                    }))
                                                    localStorage.setItem('Lastname', e.target.value);
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Last Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                {/* Row Three */}
                                <div className="row mx-auto formsection" >

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Mobile Number
                                            </label>

                                            <PhoneInput
                                                placeholder="+966   500000000"
                                                id='MobileNumber'
                                                value={value.MobileNumber}
                                                onChange={(phoneNumber) => {
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        MobileNumber: phoneNumber,
                                                    }))
                                                    localStorage.setItem('MobileNumber', phoneNumber);
                                                }}
                                                className='rounded inputsection custom-phone-input py-2'
                                                defaultCountry="SA"
                                                dropdownClass='custom-phone-dropdown'
                                            />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Landline Number
                                            </label>

                                            <PhoneInput
                                                placeholder="+966  0100000000"
                                                id='Landlinenumber'
                                                value={value.LandlineNumber}
                                                onChange={(LandlineNumber) => {
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        LandlineNumber: LandlineNumber,
                                                    }))
                                                    localStorage.setItem('LandlineNumber', LandlineNumber)
                                                }}
                                                className='rounded inputsection py-2'
                                                defaultCountry="SA" />

                                        </div>
                                    </div>
                                </div>

                                {/* second row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                                Department Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example"
                                                value={value.DepartmentCode}
                                                onChange={handleProvinceChange}
                                            >

                                                <option className='inputsectiondropdpwn' >Select Dept Code</option>
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                    localStorage.setItem('BuildingCode', e.target.value)
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Dept Code</option>
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
                                                Location
                                            </label>

                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                value={value.LocationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                    localStorage.setItem('LocationCode', e.target.value)

                                                }}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Location</option>
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
                                                Work Type
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
                                            <label htmlFor='WorkPriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkPriority" aria-label="Floating label select example"
                                                value={value.WorkPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkPriority: e.target.value
                                                    }))
                                                    localStorage.setItem('WorkPriority', e.target.value);
                                                }}>
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
                                                Work Trade
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                value={value.WorkTrade}
                                                onChange={Worktrandedesc}>
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

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='workTradeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Trade Description
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={WorkTradedesc}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Trade Description '
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 my-auto col-md-3 col-lg-3 col-xl-3 ">
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork mt-3 btnworkactive" onClick={Assetcodebtn}> <AddCircleOutlineIcon className='me-1' />Asset Code</button>

                                    </div>

                                </div>

                                <hr className='color3 line' />
                                {/* Table section */}
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredRows}
                                        columns={columns}
                                        pagination
                                        rowsPerPageOptions={[10, 25, 50]} // Optional: Set available page size options
                                        paginationModel={paginationModel}
                                        onPaginationModelChange={setPaginationModel}
                                        checkboxSelection
                                        disableRowSelectionOnClick
                                        disableMultipleSelection
                                    />

                                </div>
                                {/*Button section*/}
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={backbtn}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <div className='d-flex'>

                                        <button type="button" className="border-0 px-3  savebtn py-2" onClick={allCreateapi}><SaveIcon className='me-2' />SAVE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div >
            <ToastContainer />
        </div >
    )
}

export default CreateWorkRequest