import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Printer from "../../../Image/building.png"
import BrowserFolder from "../../../Image/browsefolder 3.png"

function Viewbuilding() {
    const navigate = useNavigate();
    let { userId } = useParams();

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState()
    const [dropdownLocation, setdropdownLocation] = useState([])

    const [value, setvalue] = useState({
        BuildingCode: '', Buildiingname: '',
        LocationCode: '', Locationname: '',
        Latitude: '', Longtitude: '',
        BuildingCapacity: '0'
    })

    const getapi = () => {
        axios.get(`/api/Building_newpage_GET_BYID/${userId}`, {
        },)
            .then((res) => {
                console.log('TO Assets Master By ID', res.data);
                setvalue((prevValue) => ({
                    ...prevValue,
                    BuildingCode: res.data.data[0].BuildingCode,
                    Buildiingname: res.data.data[0].BuildingDesc,
                    BuildingCapacity: res.data.data[0].Capacity,
                    Latitude: res.data.data[0].Latitude,
                    Longtitude: res.data.data[0].Longtitude,
                    LocationCode: res.data.data[0].LocationCode,
                }));
                setimageshow(res.data.data[0].BuildingImage)

                const loactiondesc = res.data.data[0].LocationCode
                axios.get(`/api/Location_GET_BYID/${loactiondesc}`)
                    .then((res) => {
                        // console.log(res.data);
                        setlocationdesc(res.data.recordset[0].LocationDesc)
                    })
                    .catch((err) => {
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


    useEffect(() => {
        // Location_LIST
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    // Location
    const [locationdesc, setlocationdesc] = useState([])
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            LocationCode: e.target.value,
        }));
        axios.get(`/api/Location_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log(res.data);
                setlocationdesc(res.data.recordset[0].LocationDesc)
            })
            .catch((err) => {
                // console.log(err);;
            });
    }


    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
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
                                        Building Maintenance - View
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
                                            <input
                                                types='text'
                                                id='BuildingCapacity'
                                                value={value.BuildingCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Building Code'
                                            ></input>
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
                                                onChange={handleProvinceChange}
                                            >
                                                <option className='inputsectiondropdpwn' value=''>Select Location</option>
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
                                                type='text'
                                                id='Locationname'
                                                value={locationdesc}
                                                readOnly
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
                                                type='text'
                                                id='Latitude'
                                                value={value.Latitude}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Latitude: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
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
                                                type='text'
                                                id='Longtitude'
                                                value={value.Longtitude}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Longtitude: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
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
                                                type='number'
                                                id='BuildingCapacity'
                                                value={value.BuildingCapacity}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCapacity: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                            ></input>

                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={() => navigate('/Buildings')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                  </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Viewbuilding;
