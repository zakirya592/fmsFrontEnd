import React, { useState, useEffect, useRef } from 'react'
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
    const [gpcList, setGpcList] = useState([]); // gpc list
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
        EmployeeID: null, RequestNumber: null, RequestStatus: '', WorkPriority: '', DepartmentCode: '', LocationCode: '',
        WorkTrade: '', BuildingCode: '', WorkType: '', maindescript: '', Schedulestarttime: '', Scheduleendtime: '', RequestDateTime: getCurrentDateTimeString(),
        schedulingpriority: '', AssetItemTagID:'',
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


        axios.get(`/api/SchedPriority_GET_LIST`)
            .then((res) => {
                setschedulingprioritylist(res.data.recordsets[0]);
                console.log('schedulingprioritylist', schedulingprioritylist);
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
                // console.log(res.data);
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                // console.log(err);;
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
                console.log('-----:', res.data);
                setassetTypeDiscription(res.data.recordset[0].AssetTypeDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
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
                console.log('-------------------', res.data.recordsets[0][0]);
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                console.log('-------------------------------------------', Depauto);
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        // console.log(res.data);
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        // console.log(err);;
                    });

            }
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

    // Assign to Employee Logic.
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const [gpcListcompleteemployee, setGpcListcompleteemployee] = useState([]); // gpc list
    const abortControllerRefcompleteemployee = useRef(null);

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
                // console.log('-------------------------------------------', Depauto);
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        // console.log(res.data);
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        // console.log(err);;
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
                const worktrude = res.data.recordsets[0][0].WorkType
                console.log('worktrude', worktrude);
                axios.get(`/api/WorkTrade_LIST/${worktrude}`).then((res) => {
                    console.log("WorkTrade_LIST", res.data.recordset);
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
            ScheduleStartDateTime: value.Schedulestarttime,
            ScheduleEndDateTime: value.Scheduleendtime,
            SchedulingPriority: value.schedulingpriority,
        },)
            .then((res) => {
                console.log('Add work api first api', res.data);
                if (res.status == 201) {
                    Swal.fire({
                        title: "Success",
                        text: `Preventive ${value.RequestNumber} has been created`,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Navigate to the next page when "OK" is clicked
                            navigate('/Preventive')
                        }
                    });
                }
                if (res.status == 404){
                    Swal.fire({
                        title: "Error",
                        text: "RequestNumber is required",
                        icon: "error",
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "RequestNumber is required",
                    icon: "error",
                })
            });
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
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
                                    <div className="d-flex">
                                        {/* <button type="button" class="btn btn-outline-primary mx-1 color2 btnwork"><AddCircleOutlineRoundedIcon className='me-1' />Create</button> */}
                                        {/* <Create /> */}
                                        {/* <button type="button" class="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button> */}
                                        {/* <button type="button" class="btn btn-outline-primary color2"><img src={excel} /> Export</button> */}
                                    </div>
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
                                                Request Date/Time<span className='star'>*</span>
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
                                                value={value.Schedulestarttime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Schedulestarttime: e.target.value
                                                    }))
                                                }}/>


                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Scheduleend' className='lablesection color3 text-start mb-1'>
                                                Schedule-End Date/Time*
                                            </label>
                                            <input type="datetime-local" id="Scheduleend" name="birthdaytime" className='rounded inputsection py-2'
                                                value={value.Scheduleendtime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Scheduleendtime: e.target.value
                                                    }))
                                                }} />


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