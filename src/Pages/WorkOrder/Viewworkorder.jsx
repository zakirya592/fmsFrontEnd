import React, { useState, useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import "../Work Request/View modify/Viewmodify.css";
import { useNavigate, useParams } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import moment from 'moment';

function Viewworkorder() {
    const navigate = useNavigate();
    let { userId } = useParams();
    const [value, setvalue] = useState({
        orderNumber: '', RequestNumber: null, workStatus: '', workPriority: '', WorkCategory: "", failureCode: '',
        solutionCode: '', assignEmployee: null, EmployeeName: '', completeEmployee: null, CompleteEmployeeName: '',
        costWork: '', AppointmentDateTime: "", ScheduledDateTime: '', WorkCategoryDiscriptionmain: '',
    })
    const [failureDiscriptionCode, setFailureDiscriptionCode] = useState([]);
    const [solutionCodeDiscription, setsolutionCodeDiscription] = useState("");

    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [workCategorylist, setworkCategorylist] = useState([])
    const [WorkCategoryDiscription, setWorkCategoryDiscription] = useState([])
    const [failureStatusCodelist, setfailureStatusCodelist] = useState([])
    const [solutionCodelist, setsolutionCodelist] = useState([])

    // state for the time 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeDifference, setTimeDifference] = useState('');
    const [minutesdifferent, setminutesdifferent] = useState('')
    const [daysBetween, setDaysBetween] = useState(0);

    // Work Employes ID  Api
    // Emp ID
    function GetgetworkRequest() {
        axios.get(`/api/WorkOrders_GET_BYID/${userId}`).then((res) => {
            console.log('asdfaf=====================================', res);

            const orderNumber = res.data.recordset[0].WorkOrderNumber
            const RequestNumber = res.data.recordset[0].WorkRequestNumber
            const costWork = res.data.recordset[0].TotalCostofWork;
            const assignEmployee = res.data.recordset[0].AssignedtoEmployeeID
            const completeEmployee = res.data.recordset[0].CompletedByEmployeeID
            const WorkCategoryDiscriptionmain = res.data.recordset[0].WorkDescription
            const workStatus = res.data.recordset[0].WorkStatus
            const workPriority = res.data.recordset[0].WorkPriority
            const WorkCategory = res.data.recordset[0].WorkCategoryCode
            const failureCode = res.data.recordset[0].FailureCode
            const solutionCode = res.data.recordset[0].SolutionCode
            const ScheduledDateTime = moment(res.data.recordset[0].ScheduledDateTime).format('YYYY-MM-DD')
            const AppointmentDateTime = moment(res.data.recordset[0].AppointmentDateTime).format('YYYY-MM-DD')
            const startdat = moment(res.data.recordset[0].StartWorkOrderDateTime).format('YYYY-MM-DD h:mm A')
            const enddata = moment(res.data.recordset[0].EndWorkOrderDateTime).format('YYYY-MM-DD h:mm A')
            setStartDate(startdat)
            setEndDate(enddata)
            setvalue((prevValue) => ({
                ...prevValue,
                orderNumber,
                RequestNumber,
                costWork,
                WorkCategoryDiscriptionmain,
                workStatus,
                workPriority,
                WorkCategory,
                failureCode,
                solutionCode,
                assignEmployee,
                completeEmployee,
                ScheduledDateTime,
                AppointmentDateTime
            }));

            setminutesdifferent(res.data.recordset[0].TotalMinutes)
            setTimeDifference(res.data.recordset[0].TotalHours)
            setDaysBetween(res.data.recordset[0].TotalDays)
            // FailureCodedec
            const FailureCodedec = res.data.recordset[0].FailureCode
            axios.get(`/api/Failure_GET_BYID/${FailureCodedec}`)
                .then((res) => {
                    // console.log('-----:', res.data);
                    setFailureDiscriptionCode(res.data.recordset[0].FailureStatusDesc)

                })
                .catch((err) => {
                    // console.log(err);;
                });
            // SolutionCode
            const soluctionCodedec = res.data.recordset[0].SolutionCode
            axios.get(`/api/Solution_GET_BYID/${soluctionCodedec}`)
                .then((res) => {
                    setsolutionCodeDiscription(res.data.recordset[0].SolutionStatusDesc)
                })
                .catch((err) => {
                    // console.log(err);;
                });

            // Work Catager
            const workcategoryCodedec = res.data.recordset[0].WorkCategoryCode
            axios.get(`/api/WorkCatagres_GET_BYID/${workcategoryCodedec}`)
                .then((res) => {
                    // console.log('-----', res.data);
                    setWorkCategoryDiscription(res.data.recordset[0].WorkCategoryDesc)

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
        GetgetworkRequest()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    // Work Request Number
    const [unitCode, setUnitCode] = useState([]);
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const abortControllerRef = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/Filter_WR')
            .then((response) => {
                // console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                // console.log("----------------------------", data);
                const unitNameList = data.map((requestdata) => ({
                    RequestNumber: requestdata?.RequestNumber,
                    RequestStatus: requestdata?.RequestStatus,
                }));
                setUnitCode(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

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
                RequestNumber: []
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
            axios.get('/api/Filter_WR')
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
                    RequestNumber: []
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

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                RequestNumber: [],
                RequestStatus: []
            }));
        }

        if (value && value.RequestNumber) {
            // postapi(value.EmployeeID);
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

    useEffect(() => {
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
            // console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setWorkPrioritlist(res.data.recordsets[0])
            // console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`/api/WorkCatagres_GET_CODE_LIST`).then((res) => {
            setworkCategorylist(res.data.recordsets[0])
            // console.log('WorkCatagres_GET_LIST', res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Failure_GET_CODELIST`).then((res) => {
            setfailureStatusCodelist(res.data.recordsets[0])
            // console.log('Failure_GET_CODELIST', res.data.recordsets[0].FailureStatusCode);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Solution_GET_CODE_LIST`).then((res) => {
            setsolutionCodelist(res.data.recordsets[0])
            // console.log('SolutiontatusCode', res.data.recordsets[0]);
        })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            WorkCategory: e.target.value,
        }));
        axios.get(`/api/WorkCatagres_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log('-----', res.data);
                setWorkCategoryDiscription(res.data.recordset[0].WorkCategoryDesc)

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const handleProvinceChangeFailure = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            failureCode: e.target.value,
        }));
        axios.get(`/api/Failure_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log('-----:', res.data);
                setFailureDiscriptionCode(res.data.recordset[0].FailureStatusDesc)

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const solutionCodeheeandly = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            solutionCode: e.target.value,
        }));
        axios.get(`/api/Solution_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log('-----:', res.data);
                setsolutionCodeDiscription(res.data.recordset[0].SolutionStatusDesc)

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    // Assign to Employee Logic.
    const [unitCodeID, setUnitCodeID] = useState([]);
    const [openID, setOpenID] = useState(false);
    const [autocompleteLoadingID, setAutocompleteLoadingID] = useState(false);
    const [gpcListID, setGpcListID] = useState([]); // gpc list
    const abortControllerRefID = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------", data);
                const dataget = data.map((requestdata) => ({
                    RequestNumber: requestdata?.RequestNumber,
                    RequestStatus: requestdata?.RequestStatus,
                }));
                // setUnitCodeID(dataget)
                setOpenID(false)
            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputChangeID = async (eventID, newInputValueID, reason) => {
        console.log('==========+++++++======', newInputValueID)

        if (reason === 'reset' || reason === 'clear') {
            setGpcListID([]); // Clear the data list if there is no input
            setUnitCodeID([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValueID || newInputValueID.trim() === '') {
            // perform operation when input is cleared
            setGpcListID([]);
            setUnitCodeID([])
            return;
        }
        if (newInputValueID === null) {

            // perform operation when input is cleared
            setGpcListID([]);
            setUnitCodeID([])
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: [],
                EmployeeName: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingID(true);
        setOpenID(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefID.current) {
                abortControllerRefID.current.abort();
            }
            // Create a new AbortController
            abortControllerRefID.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodeID(data ?? [])
                    setOpenID(true);
                    setUnitCodeID(data)
                    setAutocompleteLoadingID(false);
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
                    assignEmployee: [],
                    EmployeeName: []
                }))
                setAutocompleteLoadingID(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeID([])
            setOpenID(false);
            setAutocompleteLoadingID(false);
        }

    }

    const handleGPCAutoCompleteChangeID = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: [],
                EmployeeName: []
            }));
        }

        if (value && value.EmployeeID) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: value.EmployeeID,
                EmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    // Time section Logic.
    const handleStartDateChange = (event) => {
        const selectedStartDate = new Date(event.target.value);
        const nextDay = new Date(selectedStartDate);
        nextDay.setDate(selectedStartDate.getDate() + 1);

        setStartDate(event.target.value);
        setEndDate(nextDay);

        // Ensure end date is never before the selected start date
        if (nextDay < new Date(endDate)) {
            setEndDate(nextDay);
        } else {
            setEndDate('');
        }

    };
    const handleEndDateChange = (event) => {
        const selectedEndDate = new Date(event.target.value);

        // Ensure end date is never before the selected start date
        if (selectedEndDate < new Date(startDate)) {
            setEndDate(new Date(startDate));
        } else {
            // setEndDate(selectedEndDate);
            setEndDate(event.target.value);

        }
        calculateTimeDifference();

        if (startDate && selectedEndDate > new Date(startDate)) {
            const days = Math.ceil((selectedEndDate - new Date(startDate)) / (1000 * 60 * 60 * 24)) - 1;
            setDaysBetween(days);
        } else {
            setDaysBetween(0);
        }


    };
    const calculateTimeDifference = () => {
        if (startDate && endDate) {
            const startDateTime = new Date(startDate);
            const endDateTime = new Date(endDate);

            const timeDiff = Math.abs(endDateTime - startDateTime);
            // const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            // const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const hours = Math.floor(timeDiff / 3600000); // 1 hour = 3600000 milliseconds
            console.log(hours * 60);
            // const minutes = Math.floor((timeDiff * 60 % 3600000) / 60000); // 1 minute = 60000 milliseconds
            const minutes = hours * 60


            setTimeDifference(hours);
            setminutesdifferent(minutes)
        } else {
            setTimeDifference('');
        }
    };

    // Assign to Employee Logic.
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const [gpcListcompleteemployee, setGpcListcompleteemployee] = useState([]); // gpc list
    const abortControllerRefcompleteemployee = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------", data);
                const dataget = data.map((requestdata) => ({
                    RequestNumber: requestdata?.RequestNumber,
                    RequestStatus: requestdata?.RequestStatus,
                }));
                // setUnitCodeID(dataget)
                setOpencompleteemployee(false)
            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

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
                completeEmployee: [],
                CompleteEmployeeName: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
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
            axios.get('/api/EmployeeID_GET_LIST')
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
                    completeEmployee: [],
                    CompleteEmployeeName: []
                }))
                setAutocompleteLoadingID(true);
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
                completeEmployee: [],
                CompleteEmployeeName: []
            }));
        }

        if (value && value.EmployeeID) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                completeEmployee: value.EmployeeID,
                CompleteEmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }


    return (
        <>
            <div className="bg">
                <div className="">
                    <Box sx={{ display: "flex" }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                                        navigate('/workorder')
                                    })} />
                                    <p className="text-center my-auto ms-5">Work Order</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        View/Modify Work Orders
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/*Rows Section */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="WorkOrderNumber"
                                                className="lablesection color3 text-start mb-1" >
                                                Work Order Number <span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='ordernumber'
                                                value={value.orderNumber}
                                                onChange={handleInputChange}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Work Order Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="WorkRequestNumber"
                                                className="lablesection color3 text-start mb-1">
                                                Work Request Number
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCode} // Use the formattedGpcList here
                                                // getOptionLabel={(option) => option?.EmployeeID + ' - ' + option?.Firstname}
                                                getOptionLabel={(option) =>
                                                    option?.RequestNumber
                                                        ? option.RequestNumber + ' - ' + option.RequestStatus
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.RequestNumber === value.RequestNumber} // This determines which value gets sent to the API
                                                onChange={handleGPCAutoCompleteChange}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.RequestNumber} - {option.RequestStatus}
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
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workStatus' className='lablesection color3 text-start mb-1'>
                                                Work Status
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workStatus" aria-label="Floating label select example"
                                                value={value.workStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        workStatus: e.target.value
                                                    }))
                                                }}>
                                                <option selected className='inputsectiondropdpwn'>Select Work Status</option>
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workpriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workPriority" aria-label="Floating label select example"
                                                value={value.workPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
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
                                    {/* second line */}
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Work Category
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workCategory" aria-label="Floating label select example"
                                                value={value.WorkCategory}
                                                onChange={handleProvinceChange} >
                                                <option selected className='inputsectiondropdpwn'>Select Work Category</option>
                                                {
                                                    workCategorylist && workCategorylist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkCategoryCode}>{itme.WorkCategoryCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Work Category Discription
                                            </label>
                                            <input
                                                types='text'
                                                id='workCategoryDiscription'
                                                value={WorkCategoryDiscription}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Category Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                    {/* Third line */}
                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                                Work Description
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription"
                                                    value={value.WorkCategoryDiscriptionmain}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            WorkCategoryDiscriptionmain: e.target.value
                                                        }))
                                                    }}></textarea>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* forth row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='failurecode' className='lablesection color3 text-start mb-1'>
                                                Failure Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example"
                                                value={value.failureCode}
                                                onChange={handleProvinceChangeFailure}>
                                                <option selected className='inputsectiondropdpwn'>Select Failure Code</option>
                                                {
                                                    failureStatusCodelist && failureStatusCodelist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.FailureStatusCode}>{itme.FailureStatusCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="failureCodeDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Failure Code Description
                                            </label>
                                            <input
                                                types='text'
                                                id='failurecodediscription'
                                                value={failureDiscriptionCode}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Work Category Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* fifth row  */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='solutioncode' className='lablesection color3 text-start mb-1'>
                                                Solution Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example"
                                                value={value.solutionCode}
                                                onChange={solutionCodeheeandly}>
                                                <option selected className='inputsectiondropdpwn'>Select Solution Code</option>
                                                {
                                                    solutionCodelist && solutionCodelist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.SolutiontatusCode}>{itme.SolutiontatusCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="solutioncodeDisctiption"
                                                className="lablesection color3 text-start mb-1">
                                                Solution Code Description
                                            </label>
                                            <input
                                                types='text'
                                                id='solutioncodeDisctiption'
                                                value={solutionCodeDiscription}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Solution Code Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* sixth row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='empoyeeid' className='lablesection color3 text-start mb-1'>
                                                Assign to Employee
                                            </label>
                                            <Autocomplete
                                                id="serachGpcid"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeID}
                                                getOptionLabel={(option) =>
                                                    option?.EmployeeID
                                                        ? option.EmployeeID + ' - ' + option.Firstname
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID}
                                                onChange={handleGPCAutoCompleteChangeID}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmployeeID} - {option.Firstname}
                                                    </li>
                                                )}
                                                value={value.EmployeeID}
                                                onInputChange={(eventID, newInputValueID, params) =>
                                                    handleAutoCompleteInputChangeID(eventID, newInputValueID, params)
                                                }
                                                loading={autocompleteLoadingID}
                                                open={openID} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setOpenID(true);
                                                }}
                                                onClose={() => {
                                                    setOpenID(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingID ? (
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="employeename"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='employeename'
                                                value={value.EmployeeName}
                                                // onChange={e => {
                                                //     setEmployeeName(e.target.value)
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Seventh row  */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                                Appiontment Date/Time
                                            </label>
                                            <input type={value.AppointmentDateTime} id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2'
                                                value={value.AppointmentDateTime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AppointmentDateTime: e.target.value
                                                    }))
                                                }} />


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ScheduledDateTimeate' className='lablesection color3 text-start mb-1'>
                                                Scheduled Date/Time
                                            </label>
                                            <input type={value.ScheduledDateTime} id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2' value={value.ScheduledDateTime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ScheduledDateTime: e.target.value
                                                    }))
                                                }} />


                                        </div>
                                    </div>
                                </div>
                                {/* Eight row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='startdate' className='lablesection color3 text-start mb-1'>
                                                Start Date/Time
                                            </label>
                                            <input type={startDate} id="startdate" name="birthdaytime" className='rounded inputsection py-2' value={startDate}
                                                onChange={handleStartDateChange}
                                                min={new Date()} />


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='endDate' className='lablesection color3 text-start mb-1'>
                                                End Date/Time
                                            </label>
                                            <input type={endDate} id="endDate" name="birthdaytime" className='rounded inputsection py-2'
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                min={startDate} />


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='totaldays' className='lablesection color3 text-start mb-1'>
                                                Total days
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={daysBetween} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='totalhours' className='lablesection color3 text-start mb-1'>
                                                Total hours
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={timeDifference} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='totalminutes' className='lablesection color3 text-start mb-1'>
                                                Total Minutes
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={minutesdifferent} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='costofwork' className='lablesection color3 text-start mb-1'>
                                                Cost of Work
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={value.costWork}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        costWork: e.target.value
                                                    }))
                                                }} />


                                        </div>
                                    </div>
                                </div>
                                {/* Ninth Row*/}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='completeemployee' className='lablesection color3 text-start mb-1'>
                                                Completed By Employee
                                            </label>
                                            <Autocomplete
                                                id="completeemployee"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodecompleteemployee}
                                                getOptionLabel={(option) =>
                                                    option?.EmployeeID
                                                        ? option.EmployeeID + ' - ' + option.Firstname
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID}
                                                onChange={handleGPCAutoCompleteChangecompleteemployee}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmployeeID} - {option.Firstname}
                                                    </li>
                                                )}
                                                value={value.EmployeeID}
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="employeename"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='employeename'
                                                value={value.CompleteEmployeeName}

                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/workorder')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Viewworkorder;
