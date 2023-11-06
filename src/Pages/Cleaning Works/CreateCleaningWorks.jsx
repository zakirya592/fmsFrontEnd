import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
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


function CreateCleaningWorks() {
    const navigate = useNavigate();
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
        DepartmentCode: 'Select Dept Code',
        BuildingCode: 'Select Building',
        Location: 'Select Location',
        CleaningGroupCode: "Select Cleaning Group",
        WorkTradeCode: "Select Work Trade",
        SchedPriorityCode: "Select Scheduling",
        Intruction_Remarks: '',
        Scheduleendtime: "",
        Schedulestarttime: "",
        RequestNumber: ''
    })
    const [unitCode, setUnitCode] = useState([]);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const abortControllerRef = useRef(null);
    const [DeptDesc, setDeptDesc] = useState([])
    const [CleaningDesc, setCleaningDesc] = useState([])

    // all drop down api 
    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // dropdownCleaning
        axios.get(`/api/CleaningGroup_GET_LIST`).then((res) => {
            setdropdownCleaning(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Scheduling
        axios.get(`/api/SchedPriority_GET_LIST`).then((res) => {
            setdropdownSchedPriorityCode(res.data.recordsets[0])
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
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Work Trade
        axios.get(`/api/WorkTRADE_GET_LIST`).then((res) => {
            setdropdownWorkTrade(res.data.recordsets[0])
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

        }

        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setvalue(prevValue => ({
                    ...prevValue,
                    EmployeeID: []
                }))
                setAutocompleteLoading(true);
                return;
            }
            setUnitCode([])
            setOpen(false);
            setAutocompleteLoading(false);
        }

    }
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
                setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
            })
            .catch((err) => {
                console.log(err);
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
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // Cleaning
    const handleCleaningChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            CleaningGroupCode: e.target.value,
        }));
        axios.get(`/api/CleaningGroup_GET_BYID/${Deptnale}`)
            .then((res) => {
                setCleaningDesc(res.data.recordset[0].CleaningGroupDesc)
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
    // all about work request number
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
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
                const {
                    WorkType,
                    WorkTrade,
                    WorkPriority,
                    ProblemDescription,
                    RequestStatus,
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
                    RequestStatus,
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
    const Createapi = async () => {
        await axios.post(`/api/CleaningWorks_post`, {
            RequestNumber: value.RequestNumber,
            EmployeeID: value.EmployeeID,
            RequestDateTime: value.RequestDateTime,
            WorkType: value.WorkType,
            CleaningGroup: value.CleaningGroupCode,
            WorkPriority: value.WorkPriority,
            Intruction_Remarks: value.Intruction_Remarks,
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
                        text: `CleaningWork ${value.RequestNumber} has been created`,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Navigate to the next page when "OK" is clicked
                            navigate('/cleaning')
                        }
                    });
                }
                if (res.status == 404) {
                    Swal.fire({
                        title: "Error",
                        text: "RequestNumber is required",
                        icon: "error",
                    })
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

    const [Schedulestarttime, setSchedulestarttime] = useState('0');
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

        // Combine the components and return the formatted date
        // return `${formattedMonth}/${formattedDay}/${year}`;
    }



    const formattedDate = `${formatDate(weekDates[1].startDate)} ${formatDate(weekDates[2].startDate)} ${formatDate(weekDates[3].startDate)} ${formatDate(weekDates[4].startDate)}`
    const StartWorkOrderDateTimeweek = formattedDate.split(' ')

    const enddataweek = `${formatDate(weekDates[1].endDate)} ${formatDate(weekDates[2].endDate)} ${formatDate(weekDates[3].endDate)} ${formatDate(weekDates[4].endDate)}`
    const endWorkOrderDateTimeweek = enddataweek.split(' ')

    console.log(endWorkOrderDateTimeweek);
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
                console.log(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }
   
    // Daily post // current date and time
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
                    ScheduledDateTime: '',
                    WorkStatus: '',
                    WorkPriority: '',
                    WorkCategoryCode: '',
                    WorkDescription: '',
                    FailureCode: '',
                    SolutionCode: '',
                    AssignedtoEmployeeID: '',
                    AppointmentDateTime: '',
                    TotalDays: '0',
                    TotalHours: '0',
                    TotalMinutes: '0',
                    TotalCostofWork: '0',
                    CompletedByEmployeeID: '0',
                    CompletionDateTime: '0',

                }).then((res) => {
                        console.log(res);
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
        console.log(selectedStartDate);
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
                                    <p className='color1 workitoppro my-auto'>Create Cleaning Works</p>

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
                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='AssetCode' className='lablesection color3 text-start mb-1'>
                                                Cleaning Group
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="cleaninggroup" aria-label="Floating label select example" value={value.CleaningGroupCode}
                                                onChange={handleCleaningChange}          >
                                                <option value={value.CleaningGroupCode}>{value.CleaningGroupCode}</option>

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
                                                min={Schedulestarttime} />
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
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example" value={value.SchedPriorityCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        SchedPriorityCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value={value.SchedPriorityCode}>{value.SchedPriorityCode}</option>
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

                                        <button type="button" class="border-0 px-3 mx-2  savebtn py-2" onClick={Createapi}><SaveIcon className='me-2' />SAVE</button>
                                        <button type="button" class="border-0 px-3 mx-2 proceedbtn py-2" onClick={handleGenerateClick}><VideoLibraryIcon className='me-2' />GENERATE  PM WORK ORDERS</button>
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

export default CreateCleaningWorks