import React, { useState, useEffect } from 'react'
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
import { v4 as uuidv4 } from 'uuid';
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

    let counter = 0;

    function generateUuidStartingWith1() {
        const uuid = uuidv4();
        return `${uuid.substring(4, 10)}`;
    }

    function generateCustomId() {
        const paddedCounter = counter.toString().padStart(3, '0');// Pad counter with leading zeros
        counter++;
        return `0${paddedCounter}-${generateUuidStartingWith1()}`;
    }

    const Requesnumberss = (e) => {
        const { value } = e.target;
        setvalue((prevValue) => ({
            ...prevValue,
            RequestNumber: value,
        }));
    };

   

    function generateCustomId() {
        const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 999999999
        const formattedId = randomNumber.toString().padStart(9, '0'); // Pad with leading zeros

        const sections = [];
        for (let i = 0; i < formattedId.length; i += 3) {
            sections.push(formattedId.substr(i, 3));
        }

        return sections.join('-');
    }

    const [value, setvalue] = useState({
        EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
        DepartmentCode: '', Departmentname: '',//Department api input 
        BuildingCode: '', //AddBuildingInworkRequestPOST api input
        LocationCode: '',// //AddLocationInworkRequestPOST api input
        WorkType: "", WorkTypeDesc: '',//AddWorkTypeInworkRequestPOST api input
        WorkPriority: '',//AddWorkPriorityInworkRequestPOST api input
        AssetItemTagID: '',// AddAssetItemTagIDInworkRequestPOST api input
        AssetItemDescription: '', AssetCategory: '', Manufacturer: '', Model: '',//AddassetItemInworkRequestPOST api input
        ProblemCategory: '', ProblemDescription: '',
        // RequestDateTime: '',
        // RequestNumber: generateCustomId(),
        RequestNumber: generateCustomId(),
        RequestStatus: 'Open',
        workTrade: '',
        WorkOrder: '',
        AssetItemTag: '',
        CompletedByEmp: '',
        FeedbackEmp: '',
        Feedback_Remarks: '',
        RequestDateTime: getCurrentDateTimeString(), // Initialize with current date and time

    })


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
        },)
            .then((res) => {
                // console.log('Add work api first api', res.data);
                // setvalue(prevState => ({ ...prevState, EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', WorkRequest: '', MobileNumber: '', LandlineNumber: '',DepartmentCode:"",LocationCode:"",BuildingCode:"" }));
                if (res.status == 201) {
                    Swal.fire({
                        title: "Success",
                        text: "Work Request is created !!!",
                        icon: "success",
                        confirmButtonText: "OK",
                    })

                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`The ID is  duplicate Give unique`, {
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
        axios.post(`/api/getworkRequest`, {
            EmployeeID,
        }).then((res) => {
            // console.log(res.data)
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
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log(res.data);

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

        }
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
    const [DeptDesc, setDeptDesc] = useState([])
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: e.target.value,
        }));
        axios.get(`/api/Department_desc_LIST/${Deptnale}`)
            .then((res) => {
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
                setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)


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
    const [WorkTradedesc, setWorkTradedesc] = useState([])
    const Worktrandedesc = (e) => {
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
            ...prevValue,
            WorkTrade: e.target.value
        }))
        axios.get(`/api/WorkTrade_descri_LIST/${Deptnale}`)
            .then((res) => {
                setWorkTradedesc(res.data.recordset[0].WorkTradeDesc)
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
        // axios.get(`/api/ProblemCategory_descrip_LIST/${Deptnale}`)
        //     .then((res) => {
        //         // setProblemdesctext(res.data.recordset[0].ProblemCategoryDesc)
        //         setvalue(prevValue => ({
        //             ...prevValue,
        //             ProblemDescription: res.data.recordset[0].ProblemCategoryDesc
        //         }))
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    // Work Request Number
    // post api for the data 
    function Workrequestpost(RequestNumber) {
        axios.post(`/api/getworkRequestsecond`, {
            RequestNumber,
        }).then((res) => {
            if (res.data.recordsets[0].length === 0) {
                Swal.fire('Oops...!', 'Something went wrong!', 'error')
                // setModelError(true);
            } else {
                console.log(res.data);
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
                        // console.log(res.data);
                        setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                axios.get(`/api/WorkTrade_LIST/${workaout}`).then((res) => {
                    // console.log("WorkTrade_LIST", res.data.recordset);
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

    // All Createapi function
    const allCreateapi = () => {
        Createapi();
        workrequsrpostapi()
        AssetItemTagIDpost()
    }

    // All Updata api  function 
    const Updatealldata = () => {
        Updated()
        WorkRequestNumber();
    }

    const Goback = () => {
        navigate(-1); // Navigate back one step in the browser history
    };
    //   Table section 
    const [getdata, setgetdata] = useState([])
    // List a data thougth api 
    const getapi = () => {
        const empid = localStorage.getItem('postemployid',)
        axios.get(`/api/assetworkrequest_GET_BYID/${empid}`)
            .then((res) => {
                console.log('assetworkrequest _ GET _ BYID', res.data.recordset);
                const AssetItemDescriptionsssss = res.data.recordset
                // setgetdata(res.data.recordset);
                const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                console.log(AssetItemDescriptionsssss);

                // const promises = res.data.recordset.map((item) => {
                //     const itid = item.AssetItemDescription;
                //     console.log(itid);
                    
                //     return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`)
                //         .then((res) => {
                //             console.log(res.data.recordset);
                //             return {
                //                 item,
                //                 data: res.data.recordset ,// Store API response data here
                //             };
                            
                //         })
                //         .catch((err) => {
                //             console.log(err);
                //             return {
                //                 item,
                //                 data: null // Handle error case here
                //             };
                //         });
                // });
                

                // Promise.all(promises)
                //     .then((results) => {
                       
                //         // console.log('dfrfdf',results);
                //         results.forEach((itemRecords, index) => {
                //             console.log(`Records for ${AssetItemDescriptionsss[index]}:`, itemRecords);
                //             // setgetdata(results);
                //             const recordsWithDescriptions = AssetItemDescriptionsss.map((description, index) => ({
                //                 description: description,
                //                 records: results[index]
                //             }));

                //             setgetdata(recordsWithDescriptions);
                //         });
                
                //     });
                    

                // {
                //     AssetItemDescriptionsss.map((item,indi)=>{
                      
                //         axios.get(`/api/tblAssetsMaster_GET_BYID/${item}`)
                //             .then((res) => {
                //                 // console.log('Asset Item Descriptionsss', item);
                //                 // console.log('tblAssetsMaster _GET_BYID', res.data.recordset[0]);
                //                 setgetdata(res.data.recordset);
                //             })
                //             .catch((err) => {
                //                 console.log(err);
                //             });
                //     })
                // }
                
                const assetDescriptionsString = AssetItemDescriptionsss.join(',');
                console.log(assetDescriptionsString);
                axios.get(`/api/tblAssetsMaster_GET_BYID/${AssetItemDescriptionsss}`)
                    .then((res) => {
                        console.log('TO get the list Asset Item Description', res.data.recordset);
                        console.log('Asser item desc', AssetItemDescriptionsss);
                        setgetdata(res.data.recordset);
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
        getapi()
    }, [])

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetNumber', headerName: 'ASSET/STOCK NUMBER', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetQty', headerName: 'ASSET QTY', width: 150 },
        { field: 'Model', headerName: 'MODEL', width: 200 },
        { field: 'Manufacturer', headerName: 'MONIFACTURER', width: 200 },
    ];

    const filteredRows = getdata && getdata.map((row, indes) => ({
        ...row,
        id: indes + 1,
        AssetItemDescription: row.AssetItemDescription,
        AssetItemGroup: row.AssetItemGroup,
        AssetCategory: row.AssetCategory,
        AssetSubCategory: row.AssetSubCategory,
        RequestDateTime: row.RequestDateTime,
        WorkType: row.WorkType,
        Manufacturer: row.Manufacturer //this Both id  is to display a work types desc //ok
    }))

    // Deleted api section
    const Deletedapi = (AssetItemDescription) => {
        console.log(AssetItemDescription);
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
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/AssetsMaster_DELETE_BYID/${AssetItemDescription}`)
                    .then((res) => {
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        getapi()
                        // Refresh the table data if needed
                        // You can call the API again or remove the deleted row from the state
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Error deleting', err);
                    });
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                )
            }
        })

    };

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

    const employeeIDonchange=(e)=>{
        setvalue(prevValue => ({
            ...prevValue,
            EmployeeID: e.target.value
        }))
        localStorage.setItem('EmployeeIDset', e.target.value)
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={Goback} />
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
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" ><PrintIcon className='me-1' />Print</button>
                                        {/* excel  */}
                                        <button type="button" className="btn btn-outline-primary color2"><img src={excel} alt='' /> Export</button>
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
                                                onChange={employeeIDonchange}
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
                                                First Name<span className='star'>*</span>
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
                                <div className="row mx-auto formsection" >

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
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
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
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
                                            <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                                Department Code<span className='star'>*</span>
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3 ">
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

                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                value={value.LocationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
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
                                                className='rounded inputsection py-2'
                                                placeholder='Work Type Description  '
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
                                                Work Trade<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                value={value.WorkTrade}
                                                onChange={Worktrandedesc}>
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
                                                value={WorkTradedesc}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Trade Description '
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 my-auto col-md-3 col-lg-3 col-xl-3 ">
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork mt-3 btnworkactive" onClick={(() => {
                                            navigate('/AssetMasters')
                                            console.log(localStorage.getItem('EmployeeIDset'));
                                            
                                        })}> <AddCircleOutlineIcon className='me-1' />Asset Code</button>

                                    </div>

                                </div>

                                <hr className='color3 line' />
                                {/* Table section */}
                                <div style={{ height: 250, width: '100%' }}>
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
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/workRequest')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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