import React, { useState, useEffect, useRef } from 'react'
import Siderbar from '../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';

function Viewusersystemaccess() {

    let { userId } = useParams();
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])
    const [value, setvalue] = useState({
        EmployeeID: null, DepartmentCode: '', Departmentname: '', BuildingCode: '', LocationCode: '', MobileNumber: '', LandlineNumber: '', Firstname: '', Middlename: '', Lastname: '',
        windowuserid: '', emailAddress: '', userId: '', userIdPassword: '', windowuserpassword: '', userRole: '', Title: '', UserAuthorityCode: null
    })

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 160 },
        { field: 'SystemModuleCode', headerName: 'SYSTEM MODULES', width: 470 },
    ];

    const filteredData = getdata && getdata.map((row, indes) => ({
        ...row,
        id: indes + 1,
        SystemModuleCode: row.SystemModuleCode,
    }))

    const getapi = () => {
        axios.get(`/api/UserSystemAccess_GET_BYID/${userId}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    EmployeeID: res.data.recordset[0].EmployeeID,
                    UserAuthorityCode: res.data.recordset[0].UserAuthorityCode
                }));
                const EmployeeID = res.data.recordset[0].EmployeeID
                axios.get(`/api/usersystemAccess_get_Em_id/${EmployeeID}`)
                    .then((res) => {
                        setgetdata(res.data.recordset)
                    }).catch((err) => {
                        console.log(err);
                    });
                axios.post(`/api/getworkRequest_by_EPID`, {
                    EmployeeID,
                }).then((res) => {

                    const {
                        Firstname, Lastname, Middlename,
                        LandlineNumber, MobileNumber,
                        DepartmentCode, BuildingCode, LocationCode,
                    } = res.data.recordsets[0][0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        Firstname, Lastname, Middlename,
                        LandlineNumber, MobileNumber,
                        DepartmentCode, BuildingCode, LocationCode,
                    }));
                    const Depauto = res.data.recordsets[0][0].DepartmentCode
                    axios.get(`/api/Department_desc_LIST/${Depauto}`)
                        .then((res) => {
                            setDeptDesc(res.data.recordset[0].DepartmentDesc)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }).catch((err) => {
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

    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    useEffect(() => {
        axios.get(`/api/Department_LIST`).then((res) => {
            setdropdownDepartmentLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        // Location_LIST
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }, [])
    // Department
    const [DeptDesc, setDeptDesc] = useState('')
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
    // Employe ID
    const [unitCode, setUnitCode] = useState([]);
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const abortControllerRef = useRef(null);

    // EmployeeID
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {

            const {
                Firstname, Middlename, Lastname,
                DepartmentCode, BuildingCode, LocationCode,
                MobileNumber, LandlineNumber
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname, Middlename, Lastname,
                DepartmentCode, BuildingCode, LocationCode,
                MobileNumber, LandlineNumber
            }));
            const Depauto = res.data.recordsets[0][0].DepartmentCode
            axios.get(`/api/Department_desc_LIST/${Depauto}`)
                .then((res) => {
                    setDeptDesc(res.data.recordset[0].DepartmentDesc)
                })
                .catch((err) => {
                    console.log(err);;
                });
        })
            .catch((err) => {
                console.log(err);
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

        setAutocompleteLoading(true);
        setOpen(true);
        try {
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            // Create a new AbortController
            abortControllerRef.current = new AbortController();
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
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
                EmployeeID: value.EmployeeID,
                Firstname: value.Firstname
            }));
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const abortControllerRefcompleteemployee = useRef(null);
    const handleAutoCompleteInputChangecompleteemployee = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        if (reason === 'reset' || reason === 'clear') {
            setUnitCodecompleteemployee([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValuecompleteemployee || newInputValuecompleteemployee.trim() === '') {
            setUnitCodecompleteemployee([])
            return;
        }
        if (newInputValuecompleteemployee === null) {
            setUnitCodecompleteemployee([])
            setvalue(prevValue => ({
                ...prevValue,
                UserAuthorityCode: [],
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
            axios.get('/api/UserAuthority_GET_DropdownList')
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
                    UserAuthorityCode: [],
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
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                UserAuthorityCode: [],
            }));
        }

        if (value && value.UserAuthorityCode) {
            setvalue(prevValue => ({
                ...prevValue,
                UserAuthorityCode: value.UserAuthorityCode,
            }));
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
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
                                        navigate('/usersystemaccess')
                                    })} />
                                    <p className="text-center my-auto ms-5">User Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>User Access View
                                    </p>

                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">
                                    {/* Employee name  */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee Number<span className='star'>*</span>
                                            </label>
                                            <Autocomplete
                                                id="EmployeeID"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCode} 
                                                getOptionLabel={(option) =>
                                                    option?.EmployeeID
                                                        ? option.EmployeeID + ' - ' + option.Firstname
                                                        : ''
                                                }
                                                readOnly
                                                // getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID} // This determines which value gets sent to the API
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
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='UserAuthority' className='lablesection color3 text-start mb-1'>
                                                User Authority<span className='star'>*</span>
                                            </label>

                                            <Autocomplete
                                                id="UserAuthority"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodecompleteemployee}
                                                getOptionLabel={(option) =>
                                                    option?.UserAuthorityCode
                                                        ? option.UserAuthorityCode
                                                        : ''
                                                }
                                                // getOptionSelected={(option, value) => option.UserAuthorityCode === value.UserAuthorityCode}
                                                onChange={handleGPCAutoCompleteChangecompleteemployee}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.UserAuthorityCode}
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
                                                        placeholder='User Authority'
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
                                    {/* Mobile Number */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='MobileNumber' className='lablesection color3 text-start mb-1'>
                                                Mobile Number
                                            </label>

                                            <PhoneInput
                                                placeholder="+966   500000000"
                                                value={value.MobileNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        MobileNumber: e.target
                                                    }))
                                                }}
                                                id='MobileNumber'
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* Landline Number */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='LandlineNumber' className='lablesection color3 text-start mb-1'>
                                                Landline Number
                                            </label>

                                            <PhoneInput
                                                placeholder="+966  0100000000"
                                                value={value.LandlineNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LandlineNumber: e.target
                                                    }))
                                                }}
                                                id='LandlineNumber'
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                </div>
                                {/* line two  */}
                                <div className="row mx-auto formsection">
                                    {/* Title */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Title' className='lablesection color3 text-start mb-1'>
                                                Title
                                            </label>

                                            <input
                                                placeholder="Enter Title"
                                                value={value.Title}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Title: e.target
                                                    }))
                                                }}
                                                id='Title'
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* Firstname */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='firstname' className='lablesection color3 text-start mb-1'>
                                                First Name
                                            </label>

                                            <input
                                                placeholder="Enter First Name"
                                                value={value.Firstname}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Firstname: e.target.value
                                                    }))
                                                }}
                                                id='firstname'
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* MiddleName */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Middlename' className='lablesection color3 text-start mb-1'>
                                                Middle Name
                                            </label>

                                            <input
                                                id='Middlename'
                                                placeholder="Enter Middle Name"
                                                value={value.Middlename}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Middlename: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                country="US" />

                                        </div>
                                    </div>
                                    {/* Lastname */}
                                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='lastname' className='lablesection color3 text-start mb-1'>
                                                Last Name
                                            </label>

                                            <input
                                                id='lastname'
                                                placeholder="Enter Last Name"
                                                value={value.Lastname}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Lastname: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                            />

                                        </div>
                                    </div>
                                </div>
                                {/* third Line */}

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='DepartmentCode' className='lablesection color3 text-start mb-1'>
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
                                                onClick={((e) => {
                                                    setDeptDesc(e.target.value)
                                                })}
                                                readOnly
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
                                {/* break line */}
                                <hr className='color3 line' />
                                {/* Table */}
                                <div style={{ height: 420, width: '53%', margin: 'auto' }} className='tableleft'>
                                    <DataGrid
                                        rows={filteredData}
                                        columns={columns}
                                        pageSize={5}
                                        checkboxSelection
                                        disableRowSelectionOnClick
                                    />
                                </div>

                                {/* below Buttons */}
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/usersystemaccess')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Viewusersystemaccess