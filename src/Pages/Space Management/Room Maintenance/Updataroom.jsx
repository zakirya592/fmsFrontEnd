import React, { useState, useEffect } from 'react'
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
import Printer from "../../../Image/RoomMaintence.png"
import BrowserFolder from "../../../Image/browsefolder 3.png"

function Updataroom() {
    const navigate = useNavigate();
    let { userId } = useParams();

    const [value, setvalue] = useState({
        RoomCode: '', RoomName: '', Area: '', Floor: '',
        BuildingCode: '', Buildiingname: '',
        LocationCode: '', Locationname: [],
        RoomCapacity: '', noofCapacity: '', Vacancy: '',
    })
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])

    const getapi = () => {
        axios.get(`/api/Rooms_newpage_GET_BYID/${userId}`, {
        },)
            .then((res) => {
                console.log('TO Room Managment Master By ID', res.data);
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomCode: res.data.data[0].RoomCode,
                    RoomName: res.data.data[0].RoomDesc,
                    Area: res.data.data[0].Area,
                    Floor: res.data.data[0].FloorCode,
                    BuildingCode: res.data.data[0].BuildingCode,
                    RoomCapacity: res.data.data[0].Capacity,
                    noofCapacity: res.data.data[0].Occupants,
                    Vacancy: res.data.data[0].VacancyFlag,
                    LocationCode: res.data.data[0].LocationCode,
                }));

                if (res.data.data && res.data.data[0]) {
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
                            console.log(err);
                        });
                }
               
                const buildingcodeget = res.data.data[0].BuildingCode
                axios.get(`/api/Building_GET_BYID/${buildingcodeget}`)
                    .then((res) => {
                        setBuildingDesc(res.data.recordset[0].BuildingDesc)
                        setimageshow(res.data.recordset[0].BuildingImage)
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

    }, [])

    const [imageshow, setimageshow] = useState()
    // Building
    const [BuildingDesc, setBuildingDesc] = useState([])
    const buildinghandleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            BuildingCode: e.target.value,
        }));
        axios.get(`/api/Building_GET_BYID/${Deptnale}`)
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
                const loactioncode = res.data.recordset[0].LocationCode
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

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    // Location
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            LocationCode: e.target.value,
        }));
        axios.get(`/api/Location_GET_BYID/${Deptnale}`)
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
    }


    const [selectedFile, setSelectedFile] = useState(null);
    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
    }


    const addtransaction = async () => {
        axios.put(`/api/Rooms_newpage_Put/${userId}`, {
            RoomDesc: value.RoomName,
            Area: value.Area,
            FloorCode: value.Floor,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            Capacity: value.RoomCapacity,
            Occupants: value.noofCapacity,
            VacancyFlag: value.Vacancy
        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Update!',
                    `Room Maintenance  ${userId} has been updated`,
                    'success'
                )
                navigate('/Roomaintenance')

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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/Roomaintenance')} />
                                    <p className="text-center my-auto ms-5">Space Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        ROOM MAINTENANCE - UPDATE
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-12 col-lg-8 col-xl-8 " style={{ height: '250px' }}>
                                        {/* <center> */}
                                        <img src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : Printer} alt="" className='me-1' width='100%' height='100%' />
                                        <div className="d-flex ms-2" htmlFor="file-inputs">
                                            <label htmlFor="file-inputs" className='pointerss'>
                                                <img src={BrowserFolder} />
                                            </label>
                                            <input
                                                id="file-inputs"
                                                type="file"
                                                onChange={handleChangeback}
                                                style={{ display: 'none' }}
                                            />
                                            <label className='ms-1 fw-bold pointerss' htmlFor="file-inputs">Upload Image</label>
                                        </div>

                                        {/* </center> */}

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
                                            <input
                                                type='text'
                                                id='RoomCode'
                                                value={value.RoomCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RoomCode: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Room Name'
                                            ></input>
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
                                                Building
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}
                                                onChange={buildinghandleProvinceChange}>
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
                                                Location
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                value={value.LocationCode}
                                                onChange={handleProvinceChange}
                                            >
                                                <option className='inputsectiondropdpwn' value=''>Select Location code</option>
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

                                <hr className="color3 line" />

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="RoomCapacity"
                                                className="lablesection color3 text-start mb-1">
                                                Room Capacity
                                            </label>
                                            <input
                                                type='number'
                                                id='RoomCapacity'
                                                value={value.RoomCapacity}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RoomCapacity: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="noofCapacity"
                                                className="lablesection color3 text-start mb-1">
                                                No. of Occupancy
                                            </label>
                                            <input
                                                type='text'
                                                id='noofCapacity'
                                                value={value.noofCapacity}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        noofCapacity: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Vacancy' className='lablesection color3 text-start mb-1'>
                                                Vacancy(Y/N) ?
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2 text-center' id="Vacancy" aria-label="Floating label select example" value={value.Vacancy}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Vacancy: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value=''>X</option>
                                                <option value='Yes'>Yes</option>
                                                <option value='No'>No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={() => navigate('/Roomaintenance')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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

export default Updataroom;
