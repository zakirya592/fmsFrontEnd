import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from "sweetalert2";
import Printer from "../../../Image/building.png"
import BrowserFolder from "../../../Image/browsefolder 3.png"

function Createbuilding() {
    const navigate = useNavigate();

    const [value, setvalue] = useState({
        BuildingCode: '', Buildiingname: '',
        LocationCode: '', Locationname: '',
        Latitude: '', Longtitude: '',
        BuildingCapacity: ''
    })

    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])

    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Location_LIST
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const [imageshow, setimageshow] = useState()

    const [selectedFile, setSelectedFile] = useState(null);
    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
    }

    const addtransaction = async () => {
        axios.post(`/api/AssetTransactions_post`, {
            AssetItemTagID: value.AssetItemTagID,
            AssetItemDescription: value.AssetItemDescription,
            AssetCondition: value.AssetCondition,
            SerialNumber: value.SerialNumber,
            EmployeeID: value.EmployeeID,
            BuildingCode: value.BuildingCode,
            DepartmentCode: value.DepartmentCode,
            LocationCode: value.LocationCode,
            CaptureDateTime: '01',
            ScannedDateTime: '90',

        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Buildings  ${value.AssetItemTagID} has been created successfully`,
                    'success'
                )
                navigate('/Buildings')

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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/Buildings')} />
                                    <p className="text-center my-auto ms-5">BUILDING MAINTENANCE</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        Building Maintenance - Create
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

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Buildiing Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Departmentname'
                                                value={value.Buildiingname}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Buildiingname: e.target.value
                                                    }))
                                                }}
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

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Locationname' className='lablesection color3 text-start mb-1'>
                                                Location Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Locationname'
                                                value={value.Locationname}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Locationname: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Location Name'
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <p className="fw-bold mt-2 ms-2 color1 fs-5">GPS Coordinates</p>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="Latitude"
                                                className="lablesection color3 text-start mb-1">
                                                Latitude
                                            </label>
                                            <input
                                                types='text'
                                                id='Latitude'
                                                value={value.Latitude}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Latitude: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="Longtitude"
                                                className="lablesection color3 text-start mb-1">
                                                Longtitude
                                            </label>
                                            <input
                                                types='text'
                                                id='Longtitude'
                                                value={value.Longtitude}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Longtitude: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="BuildingCapacity"
                                                className="lablesection color3 text-start mb-1">
                                                Building Capacity
                                            </label>
                                            <input
                                                types='text'
                                                id='BuildingCapacity'
                                                value={value.BuildingCapacity}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCapacity: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={() => navigate('/Buildings')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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

export default Createbuilding;
