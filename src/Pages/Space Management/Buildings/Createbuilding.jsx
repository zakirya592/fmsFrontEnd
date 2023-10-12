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
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { Modal, Button, Form } from "react-bootstrap";

function Createbuilding() {
    const navigate = useNavigate();

    const [value, setvalue] = useState({
        BuildingCode: '', Buildiingname: '',
        LocationCode: '', Locationname: '',
        Latitude: '', Longtitude: '',
        BuildingCapacity: '0'
    })

    const [dropdownLocation, setdropdownLocation] = useState([])

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
                console.log(res.data);
                setlocationdesc(res.data.recordset[0].LocationDesc)
            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const [imageshow, setimageshow] = useState()

    const [selectedFile, setSelectedFile] = useState(null);
    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
    }

    // Map Loactiuon
    // Design section 
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const handleShowModal = () => {
        setShowModal(true);

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission with selectedLocation data
        console.log(selectedLocation);
        setShowModal(false);
    };
    // Loaction section 
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };
    const handlePlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                const newLocation = {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    address: place.formatted_address,
                };
                setSelectedLocation(newLocation);
            }
        }
    };
    // Current Loaction
    const [currentLocation, setCurrentLocation] = useState(null);
    useEffect(() => {
        // Get the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.log('Error getting current location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleMapClicked = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        // Use the Geocoder service to get the address based on latitude and longitude

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;

                setSelectedLocation({ latitude, longitude, address });
                console.log(address, latitude, longitude);
                setCurrentLocation(null);
            }

        });
    };

    const formData = new FormData();
    formData.append('BuildingCode', value.BuildingCode);
    formData.append('BuildingDesc', value.Buildiingname);
    formData.append('Capacity', value.BuildingCapacity);
    formData.append('Latitude', selectedLocation?.latitude || '');
    formData.append('Longtitude', selectedLocation?.longitude || '');
    formData.append('LocationCode', value.LocationCode);
    formData.append('BuildingImage', selectedFile);

    const addtransaction = async () => {
        axios.post(`/api/Building_newpage_post`, formData)
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Building Maintenance  ${value.BuildingCode} has been created successfully`,
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
                                                value={selectedLocation ? selectedLocation.latitude : ""}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Longtitude: e.target.value
                                                    }))
                                                }}
                                                readOnly
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
                                                value={selectedLocation ? selectedLocation.longitude : ""}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Longtitude: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='99999999999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="Locationmap"
                                                className="lablesection color3 text-start mb-1">
                                                My Location
                                            </label>
                                            <button id='Locationmap' className='fs-6 py-2 w-100 loactiontak px-2 fw-bold bg-light border border-secondary loactioncolor ' onClick={handleShowModal}>
                                                Pick your Location
                                            </button>
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
                                    <button type="button" className="border-0 px-3 mx-2  savebtn py-2" onClick={addtransaction}><SaveIcon className='me-2' />SAVE</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>

                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Select Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <GoogleMap
                            mapContainerStyle={{ height: '400px', width: '100%' }}
                            center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : currentLocation}
                            zoom={10}
                            onClick={handleMapClicked}
                        >
                            <StandaloneSearchBox onLoad={handleSearchBoxLoad} onPlacesChanged={handlePlacesChanged}>
                                <input
                                    type="text"
                                    placeholder="Search for a location"
                                    style={{
                                        boxSizing: 'border-box',
                                        border: '1px solid transparent',
                                        width: '240px',
                                        height: '32px',
                                        padding: '0 12px',
                                        borderRadius: '3px',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        textOverflow: 'ellipses',
                                        position: 'absolute',
                                        left: '50%',
                                        marginLeft: '-120px',
                                    }}
                                />
                            </StandaloneSearchBox>

                            {currentLocation && <Marker position={currentLocation} />}

                            {selectedLocation && (
                                <Marker
                                    position={{
                                        lat: selectedLocation.latitude,
                                        lng: selectedLocation.longitude,
                                    }}
                                >

                                </Marker>
                            )}
                        </GoogleMap>

                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group controlId="formLatitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedLocation ? selectedLocation.latitude : ""}
                                // readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formLongitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedLocation ? selectedLocation.longitude : ""}
                                // readOnly
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {selectedLocation ? <p>{localStorage.setItem('latitude', selectedLocation.latitude)}</p> : ""}
                {selectedLocation ? <p>{localStorage.setItem('longitude', selectedLocation.longitude)}</p> : ""}
            </div>
        </>
    );
}

export default Createbuilding;
