import React, { useState, useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from "sweetalert2";
import Printer from "../../../Image/Roomassesct.png"
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';

function Updataemployeeroomassigment() {
    const navigate = useNavigate();
    let { userId } = useParams();

    const [value, setvalue] = useState({
        EmployeeID: null, Firstname: '',
        DesignationCode: '', DesignationName: '',
        RoomCode: '', RoomName: '', Area: '', Floor: '',
        BuildingCode: '', Buildiingname: '',
        LocationCode: '', Locationname: [],
        RoomCapacity: '', noofCapacity: '', Vacancy: '',

    })
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])
    const [dropdownRoomLIST, setdropdownRoomLIST] = useState([])
    const [dropdownDesignation, setdropdownDesignation] = useState([])
    const getapi = () => {
        axios.get(`/api/EmployeeRooms_GET_BYID/${userId}`)
            .then((res) => {
                console.log('TO Room Managment Master By ID', res.data);
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomCode: res.data.data[0].RoomCode,
                    EmployeeID: res.data.data[0].EmployeeID,
                }));

                const Roomcodess = res.data.data[0].RoomCode
                const EmployeeID = res.data.data[0].EmployeeID
                axios.post(`/api/getworkRequest_by_EPID`, {
                    EmployeeID,
                }).then((res) => {
                    const {
                        Firstname,
                    } = res.data.recordsets[0][0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        Firstname,
                    }));
                })
                    .catch((err) => {
                        console.log(err);
                    });

                axios.get(`/api/Rooms_newpage_GET_BYID/${Roomcodess}`)
                    .then((res) => {
                        console.log('code id', res.data.data[0]);
                        setvalue((prevValue) => ({
                            ...prevValue,
                            RoomName: res.data.data[0].RoomDesc,
                            Area: res.data.data[0].Area,
                            Floor: res.data.data[0].FloorCode,
                            BuildingCode: res.data.data[0].BuildingCode,
                            LocationCode: res.data.data[0].LocationCode
                        }));
                        const RoomCodes = res.data.data[0].RoomCode
                        const loactioncode = res.data.data[0].LocationCode
                        axios.get(`/api/Location_GET_BYID/${loactioncode}`)
                            .then((res) => {
                                setvalue((prevValue) => {
                                    if (res.data.recordset && res.data.recordset[0]) {
                                        return {
                                            ...prevValue,
                                            Locationname: res.data.recordset[0].LocationDesc,
                                        };
                                    } else {
                                        // Handle the case where res.data.recordset[0] is undefined
                                        return prevValue; // or return a default value
                                    }
                                });
                            })
                            .catch((err) => {
                                // console.log(err);;
                            });

                        axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                            .then((res) => {
                                setBuildingDesc(res.data.recordset[0].BuildingDesc)
                                setimageshow(res.data.recordset[0].BuildingImage)
                                setvalue((prevValue) => {
                                    if (res.data.recordset && res.data.recordset[0]) {
                                        return {
                                            ...prevValue,
                                            LocationCode: res.data.recordset[0].LocationCode,
                                        };
                                    } else {
                                        // Handle the case where res.data.recordset[0] is undefined
                                        return prevValue; // or return a default value
                                    }
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        // console.log(err);;
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])
    useEffect(() => { 
        // DesignationCode
        axios.get(`/api/Designation_GET_LIST`).then((res) => {
            setdropdownDesignation(res.data.recordset)
        })
            .catch((err) => {
                console.log(err);
            });
        // Building_LIST
        axios.get(`/api/Building_GET_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Location_LIST
        axios.get(`/api/Location_GET_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Floor
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloor(res.data.data)
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Rooms_newpage_GET_List`).then((res) => {
            setdropdownRoomLIST(res.data.data)

        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const [imageshow, setimageshow] = useState()
    // Building
    const [BuildingDesc, setBuildingDesc] = useState([])
    const RoomCodehandleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            RoomCode: e.target.value,
        }));

        axios.get(`/api/Rooms_newpage_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('code id', res.data.data[0]);
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomName: res.data.data[0].RoomDesc,
                    Area: res.data.data[0].Area,
                    Floor: res.data.data[0].FloorCode,
                    BuildingCode: res.data.data[0].BuildingCode,
                    LocationCode: res.data.data[0].LocationCode
                }));
                const RoomCodes = res.data.data[0].RoomCode
                const loactioncode = res.data.data[0].LocationCode
                axios.get(`/api/Location_GET_BYID/${loactioncode}`)
                    .then((res) => {
                        setvalue((prevValue) => {
                            if (res.data.recordset && res.data.recordset[0]) {
                                return {
                                    ...prevValue,
                                    Locationname: res.data.recordset[0].LocationDesc,
                                };
                            } else {
                                // Handle the case where res.data.recordset[0] is undefined
                                return prevValue; // or return a default value
                            }
                        });
                    })
                    .catch((err) => {
                        // console.log(err);;
                    });

                axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                    .then((res) => {
                        setBuildingDesc(res.data.recordset[0].BuildingDesc)
                        setimageshow(res.data.recordset[0].BuildingImage)
                        setvalue((prevValue) => {
                            if (res.data.recordset && res.data.recordset[0]) {
                                return {
                                    ...prevValue,
                                    LocationCode: res.data.recordset[0].LocationCode,
                                };
                            } else {
                                // Handle the case where res.data.recordset[0] is undefined
                                return prevValue; // or return a default value
                            }
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const dropdownDesignationhandleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            DesignationCode: e.target.value,
        }));

        axios.get(`/api/Designation_GET_BYID/${Deptnale}`).then((res) => {
            console.log('+++++++++++++', res.data);
            setvalue((prevValue) => {
                if (res.data.recordset && res.data.recordset[0]) {
                    return {
                        ...prevValue,
                        DesignationName: res.data.recordset[0].DesignationDesc,
                    };
                } else {
                    // Handle the case where res.data.recordset[0] is undefined
                    return prevValue; // or return a default value
                }
            });
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
                Firstname,
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname,
            }));
        })
            .catch((err) => {
                //// console.log(err);;
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
                EmployeeID: value.EmployeeID,
                Firstname: value.Firstname
            }));
            console.log('Received value----------:', value.EmployeeID);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const addtransaction = async () => {
        axios.put(`/api/EmployeeRooms_Put/${userId}`, {
            RoomCode: value.RoomCode,
        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Update!',
                    `Employee Room Assignments  ${userId} has been update`,
                    'success'
                )
                navigate('/Employee/RoomAssigment')

            })
            .catch((err) => {
                console.log(err);
                const statuss = err.response.data.error

                Swal.fire(
                    'Error!',
                    ` ${statuss} `,
                    'error'
                )
            });

    };

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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/Employee/RoomAssigment')} />
                                    <p className="text-center my-auto ms-5">Space Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        Employee Room Assignments - Modify
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-12 col-lg-2 col-xl-2 ">
                                        <img src={imageshow != null ? imageshow : Printer} alt="" className="printerpic w-100 h-100 my-1" />
                                    </div>

                                    {/*  Employee Number */}
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-3 ms-3">

                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee Number
                                            </label>
                                            <Autocomplete
                                                readOnly
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
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor=' DesignationCode' className='lablesection color3 text-start mb-1'>
                                                Designation Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="DesignationCode" aria-label="Floating label select example" value={value.DesignationCode}
                                                onChange={dropdownDesignationhandleProvinceChange}>
                                                <option className='inputsectiondropdpwn' value=''>Select Designation Code</option>
                                                {
                                                    dropdownDesignation && dropdownDesignation.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.DesignationCode}>{itme.DesignationCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        {/* Employee Name */}
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={value.Firstname}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='DesignationName' className='lablesection color3 text-start mb-1'>
                                                Designation Name
                                            </label>
                                            <input
                                                types='text'
                                                id='DesignationCode'
                                                value={value.DesignationName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        DesignationName: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder=' Designation Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                {/* Break Line */}
                                <hr className="color3 line" />

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='RoomCode' className='lablesection color3 text-start mb-1'>
                                                Room Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="RoomCode" aria-label="Floating label select example" value={value.RoomCode}
                                                onChange={RoomCodehandleProvinceChange}>
                                                <option className='inputsectiondropdpwn' value=''>Select Room Code</option>
                                                {
                                                    dropdownRoomLIST && dropdownRoomLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.RoomCode}>{itme.RoomCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='RoomName' className='lablesection color3 text-start mb-1'>
                                                Room Name
                                            </label>

                                            <input
                                                types='text'
                                                id='RoomName'
                                                value={value.RoomName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RoomName: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Room Name'
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Area' className='lablesection color3 text-start mb-1'>
                                                Area/Table
                                            </label>

                                            <input
                                                types='text'
                                                id='Area'
                                                value={value.Area}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Area: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Area / Table '
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid'>
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label htmlFor='Floor' className='lablesection color3 text-start mb-1'>
                                                    Floor
                                                </label>
                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                    value={value.Floor}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            Floor: e.target.value
                                                        }))
                                                    }}
                                                >
                                                    <option className='inputsectiondropdpwn my-1'>Select Floor </option>
                                                    {
                                                        dropdownFloor && dropdownFloor.map((itme, index) => {
                                                            return (
                                                                <option key={index} value={itme.FloorCode}>{itme.FloorCode}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}
                                                // onChange={buildinghandleProvinceChange}
                                                readOnly
                                            >
                                                <option className='inputsectiondropdpwn'>Select Building Code</option>
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

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Buildiing Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Departmentname'
                                                value={BuildingDesc}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Buildiing Name'
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                                Location Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                value={value.LocationCode}
                                                // onChange={handleProvinceChange}
                                                readOnly
                                            >
                                                <option className='inputsectiondropdpwn'>Select Location code</option>
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

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Locationname' className='lablesection color3 text-start mb-1'>
                                                Location Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Locationname'
                                                value={value.Locationname}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Location Name'
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={() => navigate('/Employee/RoomAssigment')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <button type="button" className="border-0 px-3 mx-2  savebtn py-2" onClick={addtransaction}><SaveIcon className='me-2' />SAVE</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Updataemployeeroomassigment;
