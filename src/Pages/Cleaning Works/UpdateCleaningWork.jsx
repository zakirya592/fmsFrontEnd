import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Siderbar from '../../Component/Siderbar/Siderbar'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import axios from 'axios';
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import moment from 'moment';

function UpdateCleaningWork() {
    const navigate = useNavigate();
    let { userId } = useParams();

    // current date and time 
    const getCurrentDateTimeString = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    //dropdowns
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkPriorityLIST, setdropdownWorkPriorityLIST] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownCleaning, setdropdownCleaning] = useState([])
    const [dropdownWorkTrade, setdropdownWorkTrade] = useState([])
    const [dropdownSchedPriorityCode, setdropdownSchedPriorityCode] = useState([])
    const [value, setvalue] = useState({
        EmployeeID: null,
        RequestDateTime: getCurrentDateTimeString(),
        DepartmentCode: '',
        BuildingCode: '',
        LocationCode: '',
        CleaningGroup: "",
        WorkTradeCode: "",
        SchedulingPriority: "",
        Intruction_Remarks: '',
        Scheduleendtime: "",
        Schedulestarttime: "",
        RequestStatus:''
    })
    const [unitCode, setUnitCode] = useState([]);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const abortControllerRef = useRef(null);
    const [DeptDesc, setDeptDesc] = useState([])
    const [CleaningDesc, setCleaningDesc] = useState([])



    const [bdata, setbata] = useState([])
    const [edata, setedata] = useState([])
    const [requestdata, setrequestdata] = useState([])

    function GetgetworkRequest() {
        axios.get(`/api/CleaningWorks_GET_BYID/${userId}`).then((res) => {
            const {
                EmployeeID,
                RequestNumber,
                Firstname,
                Lastname,
                Middlename,
                MobileNumber,
                LandlineNumber,
                DepartmentCode,
                BuildingCode,
                LocationCode,
                WorkType,
                MaintenanceDescription,
                WorkPriority,
                AssetItemTagID,
                CleaningGroup,
                Intruction_Remarks,
                SchedulingPriority,
            } = res.data.recordsets[0][0];


            setvalue((prevValue) => ({
                ...prevValue,
                EmployeeID,
                RequestNumber,
                Firstname,
                Lastname,
                WorkType,
                Middlename,
                MobileNumber,
                LandlineNumber,
                DepartmentCode,
                BuildingCode,
                LocationCode,
                MaintenanceDescription,
                WorkPriority,
                AssetItemTagID,
                CleaningGroup,
                Intruction_Remarks,
                SchedulingPriority
            }));

          setScheduleendtime(res.data.recordsets[0][0].ScheduleEndDateTime)
            setSchedulestarttime(res.data.recordsets[0][0].ScheduleStartDateTime)
            const Emplid = res.data.recordsets[0][0].EmployeeID
            axios.post(`/api/getworkRequest_by_EPID`, {
                'EmployeeID': Emplid,
            }).then((res) => {
                console.log('======++++', res.data)
                const {
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    // RequestNumber
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    Firstname,
                    Lastname,
                    Middlename,
                    // RequestNumber
                }));
            })
                .catch((err) => {
                    //// console.log(err);;
                });
            const RequestNumberss = res.data.recordsets[0][0].RequestNumber
            axios.post(`/api/getworkRequestsecond`, {
                'RequestNumber': RequestNumberss,
            }).then((res) => {
                console.log('======++++', res.data)
                const {
                    RequestStatus,
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    RequestStatus,
                }));
            })
                .catch((err) => {
                    //// console.log(err);;
                });
            // CleaningGroup_GET_BYID
            const cleaningGroup = res.data.recordsets[0][0].CleaningGroup
            axios.get(`/api/CleaningGroup_GET_BYID/${cleaningGroup}`)
                .then((res) => {
                    console.log(res.data, "cleaningdsjdf kdsfj");
                    setCleaningDesc(res.data.recordset[0].CleaningGroupDesc)
                })
                .catch((err) => {
                    //// console.log(err);;
                });
            // requestdata
            const requestda = res.data.recordsets[0][0].RequestDateTime
            const reqdata = moment(requestda).format('YYYY-MM-DD h:mm A')
            setrequestdata(reqdata)
            console.log('RequestDateTime', requestda);
            setvalue(prevValue => ({
                ...prevValue,
                RequestDateTime: requestda
            }))

            // Start data
            const startdat = res.data.recordsets[0][0].ScheduleStartDateTime
            const sdata = moment(startdat).format('YYYY-MM-DD h:mm A')
            setbata(sdata)
            setvalue(prevValue => ({
                ...prevValue,
                Schedulestarttime: startdat
            }))


            // End Data
            const enddata = res.data.recordsets[0][0].ScheduleEndDateTime
            const edata = moment(enddata).format('YYYY-MM-DD h:mm A')
            setedata(edata)
            setvalue(prevValue => ({
                ...prevValue,
                Scheduleendtime: enddata
            }))

            setSelectedOption(res.data.recordsets[0][0].Frequency)

            const AssetItemTagIDdesc = res.data.recordsets[0][0].AssetItemTagID
            axios.get(`/api/AssetType_GET_BYID/${AssetItemTagIDdesc}`)
                .then((res) => {
                    console.log('-----:', res.data);
                    // setassetTypeDiscription(res.data.recordset[0].AssetTypeDesc)

                })
                .catch((err) => {
                    console.log(err);;
                });
            const workaout = res.data.recordsets[0][0].WorkType
            axios.get(`/api/WorkType_descri_LIST/${workaout}`)
                .then((res) => {
                    // console.log(res.data);
                    setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                })
                .catch((err) => {
                    console.log(err);
                });
            const depmantlistdesc = res.data.recordsets[0][0].DepartmentCode
            axios.get(`/api/Department_desc_LIST/${depmantlistdesc}`)
                .then((res) => {
                    // console.log(res.data);
                    setDeptDesc(res.data.recordset[0].DepartmentDesc)
                })
                .catch((err) => {
                    // console.log(err);;
                });
        })
            .catch((err) => {
                //// console.log(err);;
            });
    }


    useEffect(() => {
        GetgetworkRequest(); // Fetch vendor data when the component mounts
    }, []);
    // all drop down api 
    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            // console.log("dropdownBuilding LIST", res.data.recordset);
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // dropdownCleaning
        axios.get(`/api/CleaningGroup_GET_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownCleaning(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // Scheduling
        axios.get(`/api/SchedPriority_GET_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownSchedPriorityCode(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // WorkType_LIST
        axios.get(`/api/WorkType_LIST`).then((res) => {
            // console.log("WorkType LIST", res.data.recordset);
            setdropdownworktypesLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // WorkPriority_LIST
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            // console.log("WorkPriority LIST", res.data.recordset);
            setdropdownWorkPriorityLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            // console.log("Loaction list", res.data.recordset);
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                // console.log(err);;
            });
        // Work Trade
        axios.get(`/api/WorkTRADE_GET_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownWorkTrade(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownDepartmentLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });

    }, [])


    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)
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
                    console.log('Dropdown me', response.data.recordset)
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
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {
            // console.log(res.data)
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
                    WorkTradeCode,
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
                    WorkTradeCode,
                    // RequestNumber
                }));
                console.log('-------------------', res.data.recordsets[0][0]);
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                console.log('-------------------------------------------', Depauto);
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

    // descriptions
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
                // console.log(err);;
            });
    }
    // department
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
                //// console.log(err);;
            });
    }
    // Cleaning
    const handleCleaningChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            CleaningGroup: e.target.value,
        }));
        axios.get(`/api/CleaningGroup_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log(res.data, "cleaningdsjdf kdsfj");
                setCleaningDesc(res.data.recordset[0].CleaningGroupDesc)
            })
            .catch((err) => {
                //// console.log(err);;
            });
    }
    const handleGPCAutoCompleteChange = (event, value) => {

        console.log('Received value:', value); // Debugging line
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
            console.log('Received value----------:', value.EmployeeID);
            localStorage.setItem('EmployeeIDset', value.EmployeeID);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }
    // all about work request number
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [gpcListcompleteemployee, setGpcListcompleteemployee] = useState([]); // gpc list
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const abortControllerRefcompleteemployee = useRef(null);
    function Workrequestpost(RequestNumber) {
        axios.post(`/api/getworkRequestsecond`, {
            RequestNumber,
        }).then((res) => {
            if (res.data.recordsets[0].length === 0) {
                Swal.fire('Oops...!', 'Something went wrong!', 'error');
                // setModelError(true);
            } else {
                console.log(res.data);
                const {
                    WorkType,
                    WorkTrade,
                    WorkPriority,
                    ProblemDescription,
                    ProblemCategory,
                    RequestDateTime,
                    AssetItemTagID,
                    DepartmentCode,
                    BuildingCode,
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    WorkType,
                    WorkTrade,
                    WorkPriority,
                    ProblemDescription,
                    ProblemCategory,
                    RequestDateTime,
                    AssetItemTagID,
                    DepartmentCode,
                    BuildingCode,
                }));
            }
        });
    }
    const [selectedOption, setSelectedOption] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleAutoCompleteInputChangecompleteemployee = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        console.log('==========+++++++======', newInputValuecompleteemployee)

        if (reason === 'reset' || reason === 'clear') {
            setGpcListcompleteemployee([]); // Clear the data list if there is no input
            setUnitCodecompleteemployee([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValuecompleteemployee || newInputValuecompleteemployee.trim() === '') {
            // perform operation when input is cleared
            setGpcListcompleteemployee([]);
            setUnitCodecompleteemployee([])
            return;
        }
        if (newInputValuecompleteemployee === null) {

            // perform operation when input is cleared
            setGpcListcompleteemployee([]);
            setUnitCodecompleteemployee([])
            setvalue(prevValue => ({
                ...prevValue,
                RequestNumber: [],
                RequestStatus: []
            }))
            return;
        }

        setAutocompleteLoadingcompleteemployee(true);
        setOpencompleteemployee(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefcompleteemployee.current) {
                abortControllerRefcompleteemployee.current.abort();
            }
            // Create a new AbortController
            abortControllerRefcompleteemployee.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/workRequest_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodecompleteemployee(data ?? [])
                    setOpencompleteemployee(true);
                    setUnitCodecompleteemployee(data)
                    setAutocompleteLoadingcompleteemployee(false);
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
                    RequestNumber: [],
                    RequestStatus: []
                }))
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodecompleteemployee([])
            setOpencompleteemployee(false);
            setAutocompleteLoadingcompleteemployee(false);
        }

    }
    const handleGPCAutoCompleteChangecompleteemployee = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                RequestNumber: [],
                RequestStatus: []
            }));
        }

        if (value && value.RequestNumber) {
            Workrequestpost(value.RequestNumber);
            setvalue(prevValue => ({
                ...prevValue,
                RequestNumber: value.RequestNumber,
                RequestStatus: value.RequestStatus
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const updataapi = async () => {
        await axios.put(`/api/CleaningWorks_Put/${userId}`, {
            RequestNumber: value.RequestNumber,
            EmployeeID: value.EmployeeID, 
            RequestDateTime: value.RequestDateTime,
            WorkType: value.WorkType,
            WorkPriority: value.WorkPriority,
            AssetItemTagID: value.AssetItemTagID,
            DepartmentCode: value.DepartmentCode,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            Intruction_Remarks: value.Intruction_Remarks,
            Frequency: selectedOption,
            ScheduleStartDateTime: Schedulestarttime,
            ScheduleEndDateTime: Scheduleendtime,
            SchedulingPriority: value.SchedulingPriority,
            CleaningGroup: value.CleaningGroup,
        },)
            .then((res) => {
                console.log('Add work api first api', res.data);
                if (res.status == 201) {
                    Swal.fire({
                        title: "Success",
                        text: `Cleaning Work ${value.RequestNumber}  has been updated`,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Navigate to the next page when "OK" is clicked
                            navigate('/cleaning')
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "This Employee Number already exist",
                    icon: "error",
                })
            });
    };

    const [Schedulestarttime, setSchedulestarttime] = useState('');
    const [Scheduleendtime, setScheduleendtime] = useState('');

    const handleStartDateChange = (event) => {
        const selectedStartDate = new Date(event.target.value);
        const nextDay = new Date(selectedStartDate);
        nextDay.setDate(selectedStartDate.getDate() + 1);

        setSchedulestarttime(event.target.value);
        setScheduleendtime(nextDay);

        // Ensure end date is never before the selected start date
        if (nextDay < new Date(Scheduleendtime)) {
            setScheduleendtime(nextDay);
        } else {
            setScheduleendtime('');
        }

    };
    const handleEndDateChange = (event) => {
        const selectedEndDate = new Date(event.target.value);

        // Ensure end date is never before the selected start date
        if (selectedEndDate < new Date(Schedulestarttime)) {
            setScheduleendtime(new Date(Schedulestarttime));
        } else {
            // setScheduleendtime(selectedEndDate);
            setScheduleendtime(event.target.value);

        }
    };
    
    return (
        <>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                                        navigate('/Cleaning')
                                    })} />
                                    <p className="text-center my-auto ms-5">Cleaning Works</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Update Cleaning Works</p>
                                    
                                </div>

                                <hr className='color3 line' />

                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-1'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start'>
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

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                                Work Request Number<span className='star'>*</span>
                                            </label>

                                            <Autocomplete
                                                id="completeemployee"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodecompleteemployee}
                                                getOptionLabel={(option) =>
                                                    option?.RequestNumber
                                                        ? option.RequestNumber + ' - ' + option.RequestStatus
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.RequestNumber === value.RequestNumber}
                                                onChange={handleGPCAutoCompleteChangecompleteemployee}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.RequestNumber} - {option.RequestStatus}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventcompleteemployee, newInputValuecompleteemployee, params) =>
                                                    handleAutoCompleteInputChangecompleteemployee(eventcompleteemployee, newInputValuecompleteemployee, params)
                                                }
                                                loading={autocompleteLoadingcompleteemployee}
                                                open={opencompleteemployee} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setOpenID(true);
                                                }}
                                                onClose={() => {
                                                    setOpencompleteemployee(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingcompleteemployee ? (
                                                                        <CircularProgress style={{ color: 'black' }} size={20} />
                                                                    ) : null}
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
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Employdata' className='lablesection color3 text-start mb-1'>
                                                Request Date/Time
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="Employdata"
                                                value={value.RequestDateTime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestDateTime: e.target.value
                                                    }))
                                                }}
                                                name="RequestDateTime"
                                                className='rounded inputsection py-2'
                                            />


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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='WorkTypeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Type Description
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
                                            <label htmlFor='workpriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority
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

                                <hr className='color3 line' />

                                {/* 2nd row */}
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
                                            <select className='roundedinputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option value="BuildingCode">Building Code</option>
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
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" value={value.LocationCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value="LocationCode">Select Location </option>
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
                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='AssetCode' className='lablesection color3 text-start mb-1'>
                                                Cleaning Group
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="cleaninggroup" aria-label="Floating label select example"
                                                value={value.CleaningGroup}
                                                onChange={handleCleaningChange}          >
                                                <option value="Cleaning Group">Select Cleaning Group</option>

                                                {
                                                    dropdownCleaning && dropdownCleaning.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.CleaningGroupCode}>{itme.CleaningGroupCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='AssetDescription' className='lablesection color3 text-start mb-1'>
                                                Group Description
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-1' placeholder="Asset Description " id="AssetDescription" value={CleaningDesc}></textarea>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* 4th row */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                                Instructions/Remarks
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea
                                                    className='rounded inputsectiondropdpwn w-100 color2 py-2'
                                                    placeholder="Describe the cleaning works"
                                                    id="ProblemDescription"
                                                    name="Intruction_Remarks" // Add a name attribute to the textarea
                                                    value={value.Intruction_Remarks} // Ensure it's bound to the value in your state
                                                    onChange={handleInputChange} // Include this if you want to update the state on input changes
                                                ></textarea>

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
                                            <input type="datetime-local" id="ScheduleStart" name="birthdaytime" className='rounded inputsection py-2'
                                                value={Schedulestarttime}
                                                onChange={handleStartDateChange}
                                                min={new Date()} />
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Scheduleend' className='lablesection color3 text-start mb-1'>
                                                Schedule-End Date/Time*
                                            </label>
                                            <input type="datetime-local" id="Scheduleend" name="birthdaytime" className='rounded inputsection py-2'
                                                value={Scheduleendtime}
                                                onChange={handleEndDateChange}
                                                min={Schedulestarttime} 
                                                 />
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                                Work Trade
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example" value={value.WorkTradeCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkTradeCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value={value.WorkTradeCode}>{value.WorkTradeCode}</option>
                                                {
                                                    dropdownWorkTrade && dropdownWorkTrade.map((itme, index) => {
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
                                                Scheduling Priority
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example" value={value.SchedulingPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        SchedulingPriority: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value="Select Scheduling">Select Scheduling</option>
                                                {
                                                    dropdownSchedPriorityCode && dropdownSchedPriorityCode.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.SchedPriorityCode}>{itme.SchedPriorityCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {/* 6th row */}
                                <div className="formsection mx-auto p-2 mt-2 ">
                                    <div className=' rounded inputsection py-2 text-start '>
                                        <label htmlFor='Frequency' className='lablesection ms-3 color3 text-start mb-1'>
                                            Frequency
                                        </label>

                                        <div className="form-check form-check-inline ms-3">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Daily"
                                                value="Daily"
                                                checked={selectedOption === "Daily"}
                                                onChange={handleRadioChange} />
                                            <label className="form-check-label color3 radialable" htmlFor="Daily">Daily</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Weekly"
                                                value="Weekly"
                                                checked={selectedOption === "Weekly"}
                                                onChange={handleRadioChange} />
                                            <label className="form-check-label color3 radialable" htmlFor="Weekly">Weekly</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Monthly"
                                                value="Monthly"
                                                checked={selectedOption === "Monthly"}
                                                onChange={handleRadioChange} />
                                            <label className="form-check-label color3 radialable" htmlFor="Monthly">Monthly</label>
                                        </div>

                                    </div>
                                </div>

                                {/* button section */}
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/Cleaning')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <div className="d-flex">

                                        <button type="button" class="border-0 px-3 mx-2  savebtn py-2" onClick={updataapi}><SaveIcon className='me-2' />SAVE</button>
                                        <button type="button" class="border-0 px-3 mx-2 proceedbtn py-2"><VideoLibraryIcon className='me-2' />GENERATE  PM WORK ORDERS</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default UpdateCleaningWork