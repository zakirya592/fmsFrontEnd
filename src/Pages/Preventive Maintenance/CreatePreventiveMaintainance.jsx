import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import "./Preventive.css"
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined } from '@ant-design/icons';
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Siderbar from '../../Component/Siderbar/Siderbar'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

function CreatePreventiveMaintainance() {
    const navigate = useNavigate();
    const [assetTypelist, setassetTypelist] = useState("");
    const [AssetCategory, setAssetCategory] = useState('')
    const [Manufacturer, setManufacturer] = useState('')
    const [Model, setModel] = useState('')
    const [assetTypeDiscription, setassetTypeDiscription] = useState("");

    const [unitCode, setUnitCode] = useState([]);
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const abortControllerRef = useRef(null);

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

    const [value, setvalue] = useState({
        EmployeeID: null, RequestNumber: "", RequestStatus: '', WorkPriority: '', DepartmentCode: '', LocationCode: '',
        WorkTrade: '', BuildingCode: '', WorkType: '', maindescript: '', Schedulestarttime: '', Scheduleendtime: '', RequestDateTime: getCurrentDateTimeString(),
        schedulingpriority: '', AssetItemTagID: '',
    })

    // dropdown
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkTradeLIST, setdropdownWorkTradeLIST] = useState([])
    const [schedulingprioritylist, setschedulingprioritylist] = useState([])

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
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`/api/WorkTRADE_GET_LIST`).then((res) => {
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // asset type
        axios.get(`/api/AssetType_GET_LIST`).then((res) => {
            setassetTypelist(res.data.recordsets[0])
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
        // priority
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setWorkPrioritlist(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });


        axios.get(`/api/SchedPriority_GET_LIST`)
            .then((res) => {
                setschedulingprioritylist(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Gender API error:", err);
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
    const [WorkTypedesc, setWorkTypedesc] = useState('')
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
            })
            .catch((err) => {
                console.log(err);
            });
        // // WorkTrade_LIST
        axios.get(`/api/WorkTrade_LIST/${Deptnale}`).then((res) => {
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleProvinceChangeassetType = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetItemTagID: e.target.value,
        }));
        axios.get(`/api/AssetType_GET_BYID/${Deptnale}`)
            .then((res) => {
                setassetTypeDiscription(res.data.recordset[0].AssetTypeDesc)
            })
            .catch((err) => {
                console.log(err);;
            });

        axios.get(`/api/AssetType_GET_BYAssetType/${Deptnale}`)
            .then((res) => {
                setAssetCategory(res.data.recordset[0].AssetCategory)
                setManufacturer(res.data.recordset[0].Manufacturer)
                setModel(res.data.recordset[0].Model)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        if (reason === 'reset' || reason === 'clear') {
            setUnitCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setUnitCode([])
            return;
        }
        if (newInputValue === null) {
            // perform operation when input is cleared
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
                    setUnitCode(data ?? [])
                    setOpen(true);
                    setAutocompleteLoading(false);
                    // 
                })
                .catch((error) => {
                    console.log('-----', error);
                }
                );
        } catch (error) {
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
                    WorkType,
                    WorkPriority,
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
                    WorkType,
                    WorkPriority,
                    // RequestNumber
                }));
                const Depauto = res.data.recordsets[0][0].DepartmentCode
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

    // Assign to Employee Logic.
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const abortControllerRefcompleteemployee = useRef(null);

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
                    RequestStatus,
                    ProblemCategory,
                    AssetItemTagID,
                    DepartmentCode,
                    BuildingCode,
                }));
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                const workaout = res.data.recordsets[0][0].WorkType
                axios.get(`/api/WorkType_descri_LIST/${workaout}`)
                    .then((res) => {
                        setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                const worktrude = res.data.recordsets[0][0].WorkType
                axios.get(`/api/WorkTrade_LIST/${worktrude}`).then((res) => {
                    setdropdownWorkTradeLIST(res.data.recordsets[0])
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
    const handleAutoCompleteInputChangecompleteemployee = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        if (reason === 'reset' || reason === 'clear') {
            setUnitCodecompleteemployee([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValuecompleteemployee || newInputValuecompleteemployee.trim() === '') {
            // perform operation when input is cleared
            setUnitCodecompleteemployee([])
            return;
        }
        if (newInputValuecompleteemployee === null) {
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
                    const data = response?.data?.recordset;
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
                return;
            }
            setUnitCodecompleteemployee([])
            setOpencompleteemployee(false);
            setAutocompleteLoadingcompleteemployee(false);
        }

    }

    const handleGPCAutoCompleteChangecompleteemployee = (event, value) => {
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
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }
    const [selectedOption, setSelectedOption] = useState(null);

    const Createapi = async () => {
        await axios.post(`/api/PreventiveMaintenance_post`, {
            RequestNumber: value.RequestNumber,
            EmployeeID: value.EmployeeID,
            RequestDateTime: value.RequestDateTime,
            WorkType: value.WorkType,
            WorkPriority: value.WorkPriority,
            AssetItemTagID: value.AssetItemTagID,
            DepartmentCode: value.DepartmentCode,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            MaintenanceDescription: value.maindescript,
            Frequency: selectedOption,
            ScheduleStartDateTime: Schedulestarttime,
            ScheduleEndDateTime: Scheduleendtime,
            SchedulingPriority: value.schedulingpriority,
        },)
            .then((res) => {
                if (res.status == 201) {
                    Swal.fire({
                        title: "Success",
                        text: `Preventive ${value.RequestNumber} has been created`,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/Preventive')
                        }
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text: `${err.response.data.error}`,
                    icon: "error",
                })
            });
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [Schedulestarttime, setSchedulestarttime] = useState('');
    const [Scheduleendtime, setScheduleendtime] = useState('');
    const [workordernumber, setworkordernumber] = useState([])
    // A function to format the WorkOrderNumber
    const formatWorkOrderNumber = (reqput) => {
        if (reqput >= 1 && reqput <= 9) {
            return `000-000-00${reqput}`;
        } else if (reqput >= 10 && reqput <= 99) {
            return `000-000-0${reqput}`;
        } else if (reqput >= 100 && reqput <= 999) {
            return `000-000-${reqput}`;
        } else if (reqput >= 1000 && reqput <= 9999) {
            return `000-000-${reqput}`;
        } else {
            return `000-000-${reqput}`;
        }
    };

    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].WorkOrderNumber;
                const formattedRequestNumber = formatWorkOrderNumber(reqput);
                setworkordernumber(formattedRequestNumber);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        Requestnumberapi();
    }, [])

    const successmessage = () => {
        Swal.fire({
            title: "Success",
            text: `Work Order has been Generate successfully`,
            icon: "success",
            confirmButtonText: "OK",
        })
    }

    const weeks = [];
    let currentWeek = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

 for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push(null); // Placeholder for days before the first day of the month
    }

    for (let day = 1; day <= daysInMonth; day++) {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        // Add the last week if it's not complete
        weeks.push(currentWeek);
    }

    // Get the starting and ending dates for each week
    const weekDates = weeks.map(week => {
        const firstDay = week[0];
        const lastDay = week[week.length - 1];

        if (firstDay && lastDay) {
            const startDate = new Date(year, month, firstDay);

            const endDate = new Date(year, month, lastDay);
            return { startDate, endDate };
        }
        return 'null'; // Handle incomplete weeks
    });

    function formatDate(date) {
        // Get the day, month, and year components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const year = date.getFullYear();

        // Ensure the day and month have leading zeros if necessary
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}T${hours}:${minutes}`;

    }
    const formattedDate = `${formatDate(weekDates[1].startDate)} ${formatDate(weekDates[2].startDate)} ${formatDate(weekDates[3].startDate)} ${formatDate(weekDates[4].startDate)}`
    const StartWorkOrderDateTimeweek = formattedDate.split(' ')

    const enddataweek = `${formatDate(weekDates[1].endDate)} ${formatDate(weekDates[2].endDate)} ${formatDate(weekDates[3].endDate)} ${formatDate(weekDates[4].endDate)}`
    const endWorkOrderDateTimeweek = enddataweek.split(' ')

    const requestincreas = async () => {
        try {
            const response = await axios.get(`/api/workRequestCount_GET_BYID/1`);
            const currentWorkOrderNumber = response.data.recordset[0].WorkOrderNumber;
            const reqput = currentWorkOrderNumber + 1;

            const formattedRequestNumberssss = formatWorkOrderNumber(reqput);

            const formattedRequestNumber1 = formatWorkOrderNumber(reqput + 1);

            const formattedRequestNumber2 = formatWorkOrderNumber(reqput + 2);

            const formattedRequestNumber3 = formatWorkOrderNumber(reqput + 3);

            const ordernumber = [formattedRequestNumberssss, formattedRequestNumber1, formattedRequestNumber2, formattedRequestNumber3]
            const stringArray = ordernumber.map(String);
            axios.put(`/api/WorkOrderNumberCount_Puts/1`, {
                WorkOrderNumber: reqput + 3
            });
            axios.post(`/api/Wordorder_post_week`, {
                WorkOrderNumbers: stringArray,
                WorkRequestNumber: value.RequestNumber,
                StartWorkOrderDateTime: StartWorkOrderDateTimeweek,
                EndWorkOrderDateTime: endWorkOrderDateTimeweek,
            }).then((res) => {
                successmessage()
            })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    // Daily post current date and time  
    const currentStartingData = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const dailyStartEndData = currentStartingData()
    const requestincreasweek = async () => {
        try {
            const response = await axios.get(`/api/workRequestCount_GET_BYID/1`);
            const currentWorkOrderNumber = response.data.recordset[0].WorkOrderNumber;
            const reqput = currentWorkOrderNumber + 1;
            const startWorkOrderDateTime = dailyStartEndData;

            axios.put(`/api/WorkOrderNumberCount_Puts/1`, {
                WorkOrderNumber: reqput,
            }).then((res) => {
                axios.post(`/api/WorkOrders_post`, {

                    WorkOrderNumber: workordernumber,
                    WorkRequestNumber: value.RequestNumber,
                    EndWorkOrderDateTime: startWorkOrderDateTime,
                    StartWorkOrderDateTime: startWorkOrderDateTime,
                    WorkStatus: 'Open',
                    WorkPriority: '',
                    WorkCategoryCode: '',
                    WorkDescription: '',
                    FailureCode: '',
                    SolutionCode: '',
                    AssignedtoEmployeeID: '',
                    AppointmentDateTime: '',
                    ScheduledDateTime: '',
                    TotalDays: '0',
                    TotalHours: '0',
                    TotalMinutes: '0',
                    TotalCostofWork: '0',
                    CompletedByEmployeeID: '0',
                    CompletionDateTime: '0',

                })
                    .then((res) => {
                        Requestnumberapi()
                        successmessage()
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const handleGenerateClick = () => {
        let alertMessage = ":";

        if (!value.RequestNumber) {
            alertMessage += "\n Work Request Number";
        }
        if (!selectedOption) {
            alertMessage += "\n Frequency";
        }

        if (alertMessage === ":") {
            // All fields are filled, proceed with your logic
            if (selectedOption === "Daily") {
                // Post data to the API once for Daily
                requestincreasweek()
            } else if (selectedOption === "Weekly") {
                // Post data to the API 4 times for Weekly
                requestincreas()
            }
        } else {
            Swal.fire({
                title: "Error",
                text: `${alertMessage} is required for Generate`,
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    };

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
        if (selectedEndDate < new Date(Schedulestarttime)) {
            setScheduleendtime(new Date(Schedulestarttime));
        } else {
            setScheduleendtime(event.target.value);

        }
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
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-1'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 mt-1 text-start'>
                                                Employee
                                            </label>
                                        </div>

                                        <Autocomplete
                                            id="serachGpc"
                                            className='rounded inputsection py-0 mt-0'
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
                                    <p
                                        className='position-absolute text-end serachicon'
                                    >
                                        <SearchOutlined className=' serachicon' />
                                    </p>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                                Work Request Number<span className='star'>*</span>
                                            </label>

                                            <Autocomplete
                                                id="completeemployee"
                                                required
                                                className='rounded inputsection py-0 mt-0'
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
                                                        placeholder='Work Request Number'
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
                                                value={value.RequestDateTime} // Use a default value or value.RequestDateTime
                                                // value={getCurrentDateTimeString()}
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
                                                value={value.WorkPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkPriority: e.target.value
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
                                                Asset Type
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="assettype" aria-label="Floating label select example"
                                                value={value.AssetItemTagID}
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
                                                Asset type Discription
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
                                                readOnly
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
                                                readOnly
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
                                                readOnly
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
                                                value={value.DepartmentCode}
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
                                                value={value.BuildingCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
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
                                                value={value.LocationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
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
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of maintenance "
                                                    value={value.maindescript}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            maindescript: e.target.value
                                                        }))
                                                    }} id="ProblemDescription"></textarea>

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
                                                min={new Date()}
                                            />


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
                                                min={Schedulestarttime} />


                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                                Work Trade
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                value={value.WorkTrade}
                                                // onChange={Worktrandedesc}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkTrade: e.target.value
                                                    }))
                                                }}
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
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Scheduling' className='lablesection color3 text-start mb-1'>
                                                Scheduling Priority*
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Scheduling" aria-label="Floating label select example"
                                                value={value.schedulingpriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        schedulingpriority: e.target.value
                                                    }))
                                                }}
                                            >
                                                <option selected className='inputsectiondropdpwn'>Select Scheduling Priority</option>
                                                {
                                                    schedulingprioritylist && schedulingprioritylist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.SchedPriorityCode}>{itme.SchedPriorityCode}</option>
                                                        )
                                                    })
                                                }

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

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Bi-Monthly"
                                                value="Bi-Monthly"
                                                checked={selectedOption === "Bi-Monthly"}
                                                onChange={handleRadioChange} />
                                            <label className="form-check-label color3 radialable" htmlFor="Bi-Monthly">Bi-Monthly</label>
                                        </div>

                                        <div className="form-check form-check-inline ">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Quarterly"
                                                value="Quarterly"
                                                checked={selectedOption === "Quarterly"}
                                                onChange={handleRadioChange} />
                                            <label className="form-check-label color3 radialable" htmlFor="Quarterly">Quarterly</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="Yearly"
                                                value="Yearly"
                                                checked={selectedOption === "Yearly"}
                                                onChange={handleRadioChange} />
                                            <label className="form-check-label color3 radialable" htmlFor="Yearly">Yearly</label>
                                        </div>

                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/preventive')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <div className="d-flex">

                                        <button type="button" class="border-0 px-3 mx-2  savebtn py-2" onClick={Createapi}><SaveIcon className='me-2' />SAVE</button>
                                        <button type="button" class="border-0 px-3 mx-2 proceedbtn py-2" onClick={handleGenerateClick}><VideoLibraryIcon className='me-2' />GENERATE  PM WORK ORDERS</button>
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