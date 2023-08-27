import React, { useState, useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../Component/Siderbar/Siderbar";
import pagepin from "../../Image/pagepin.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import excel from "../../Image/excel.png";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import "../Work Request/View modify/Viewmodify.css";
import WorkOrderCreate from "../../Component/View work/WorkOrderCreate";
import PrintIcon from "@mui/icons-material/Print";
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';

function WorkOrder() {
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        orderNumber: '', RequestNumber: null, EmployeeID:null,
    })
    const [workStatus, setWorkStatus] = useState("");
    const [workPriority, setWorkPriority] = useState("");
    const [workCategory, setWorkCategory] = useState("");
    const [workCategoryDiscription, setWorkCategoryDiscription ] = useState("");
    const [failureCode, setFailureCode] = useState("");
    const [failureDiscriptionCode, setFailureDiscriptionCode] = useState("");
    const [solutionCode, setsolutionCode] = useState("");
    const [solutionCodeDiscription, setsolutionCodeDiscription] = useState("");
    const [assignEmployee, setAssignEmployee] = useState("");
    const [EmployeeName, setEmployeeName] = useState("");
    const [completeEmployee, setcompleteEmployee] = useState("");
    const [CompleteEmployeeName, setCompleteEmployeeName] = useState("");

    // Work Employes ID  Api
    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                console.log('Work Request Number Api', res.data.recordset[0]);
                const reqput = res.data.recordset[0].WorkOrderNumber;
                // const reqput=1000
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
                setvalue(prevState => ({ ...prevState, orderNumber: formattedRequestNumber }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        Requestnumberapi()
    }, [])

    const requestincreas = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                console.log('Work Request Number Api', res.data.recordset[0].EmployeeID);
                const reqput = res.data.recordset[0].WorkOrderNumber + 1;
                // localStorage.setItem('Requestnumbers', reqput)
                axios.put(`/api/WorkOrderNumberCount_Put/1`, {
                    WorkOrderNumber: reqput
                })
                    .then((res) => {
                        console.log('Work Request Number put Api', res.data);
                        const reqput = res.data.recordset[0].WorkOrderNumber + 1;
                        setvalue(prevState => ({ ...prevState, orderNumber: '000-000-' + '0' + `${reqput}` }));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const created=()=>{
        requestincreas()
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    // Work Request Number
    const [unitCode, setUnitCode] = useState([]);
    const [dropname, setdropname] = useState([])
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [hsLoaderOpen, setHsLoaderOpen] = useState(false);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const abortControllerRef = useRef(null);

    useEffect(() => {

        // const handleOnBlurCall = () => {

        axios.get('/api/Filter_WR')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------",data);
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
                RequestStatus:[]
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
                                    <div className="d-flex">
                                        <img src={pagepin} className="me-2" alt="pagepin" />
                                        <WorkOrderCreate />
                                        <button
                                            type="button"
                                            class="btn btn-outline-primary mx-1 color2 btnwork">
                                            <PrintIcon className="me-1" />
                                            Print
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-outline-primary color2">
                                            <img src={excel} alt="excel" /> Export
                                        </button>
                                    </div>
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
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workStatus" aria-label="Floating label select example" value={workStatus}
                                            onChange={(event) => {
                                                setWorkStatus(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Status</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workpriority' className='lablesection color3 text-start mb-1'>
                                            Work Priority 
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workPriority" aria-label="Floating label select example" value={workPriority}
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
                                {/* second line */}
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                            Work Category 
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workCategory" aria-label="Floating label select example" value={workCategory}
                                            onChange={(event) => {
                                                setWorkCategory(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Category</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Work Category Discription
                                            </label>
                                            <input
                                            types='text'
                                            id='workCategoryDiscription'
                                            value={workCategoryDiscription}
                                            onChange={e => {
                                                setWorkCategoryDiscription(e.target.value)
                                            }}
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
                                    {/* Third line */}
                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                            Work Description
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription"></textarea>
                                          
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
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example" value={failureCode}
                                            onChange={(event) => {
                                                setFailureCode(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Failure Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
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
                                            onChange={e => {
                                                setFailureDiscriptionCode(e.target.value)
                                            }}
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
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example" value={solutionCode}
                                            onChange={(event) => {
                                                setsolutionCode(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Solution Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
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
                                            onChange={e => {
                                                setsolutionCodeDiscription(e.target.value)
                                            }}
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
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="empoyeeid" aria-label="Floating label select example" value={assignEmployee}
                                            onChange={(event) => {
                                                setAssignEmployee(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Employee ID</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
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
                                            value={EmployeeName}
                                            onChange={e => {
                                                setEmployeeName(e.target.value)
                                            }}
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
                                            <input type="datetime-local" id="apaintmentdate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='scheduledate' className='lablesection color3 text-start mb-1'>
                                            Scheduled Date/Time
                                        </label>
                                            <input type="datetime-local" id="apaintmentdate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
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
                                            <input type="datetime-local" id="startdate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='endDate' className='lablesection color3 text-start mb-1'>
                                            End Date/Time
                                        </label>
                                            <input type="datetime-local" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='totaldays' className='lablesection color3 text-start mb-1'>
                                            Total days
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='totalhours' className='lablesection color3 text-start mb-1'>
                                            Total hours
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='totalminutes' className='lablesection color3 text-start mb-1'>
                                            Total Minutes
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='costofwork' className='lablesection color3 text-start mb-1'>
                                            Cost of Work
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
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
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="completeemploye" aria-label="Floating label select example" value={completeEmployee}
                                            onChange={(event) => {
                                                setcompleteEmployee(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Employee ID</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
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
                                            value={CompleteEmployeeName}
                                            onChange={e => {
                                                setCompleteEmployeeName(e.target.value)
                                            }}
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
                                    <button type="button" class="border-0 px-3  savebtn py-2" onClick={created}><SaveIcon className='me-2'/>SAVE</button>
                            </div>
                            </div>              
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default WorkOrder;
