import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import excel from '../../Image/excel.png';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function Testing() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])
    const [datanumber, setdatanumber] = useState([])

    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/EmployeeRooms_GET_List`)
            .then((res) => {
                const employeeRoomsData = res.data.data;
                const promises = employeeRoomsData.map((item) => {
                    const itid = item.RoomCode;
                    
                    return axios.get(`/api/Rooms_newpage_GET_BYID/${itid}`)
                        .then((res) => {
                            return {
                                item,
                                data: res.data, // Use res.data directly, assuming it contains the data you need
                            };
                        })
                        .catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: [],
                            };
                        });
                });

                Promise.all(promises)
                    .then((results) => {
                        const recordsWithEmployeeID = employeeRoomsData.map((item, index) => ({
                            EmployeeID: item.EmployeeID,
                            records: results[index].data,
                        }));
                        setgetdata(recordsWithEmployeeID);
                        console.log(recordsWithEmployeeID);
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

    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])

    useEffect(() => {
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Department_LIST
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloor(res.data.data)
        })
            .catch((err) => {
                console.log(err);
            });
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'RoomCode', headerName: 'Room Code', width: 160 },
        { field: 'RoomDesc', headerName: 'DESCRIPTION ', width: 300 },
        { field: 'EmployeeID', headerName: 'Employee Number', width: 190 },
        { field: 'FloorCode', headerName: 'Floor Code', width: 190 },
        { field: 'Buildingcode', headerName: 'Building Code', width: 190 },
        { field: 'LocationCode', headerName: 'Location Code', width: 190 },
    ];


    const [BuildingCodefiltervalue, setBuildingCodefiltervalue] = useState('')
    const [LocationCodefiltervalue, setLocationCodefiltervalue] = useState('')
    const [Floorfilter, setFloorfilter] = useState()

    const filteredData = getdata && getdata.filter(row => (
        (!BuildingCodefiltervalue || row.records.data?.[0]?.BuildingCode === BuildingCodefiltervalue) &&
        (!Floorfilter || row.records.data?.[0]?.FloorCode === Floorfilter) &&
        (!LocationCodefiltervalue || row.records.data?.[0]?.LocationCode === LocationCodefiltervalue)
    )).map((row, index) => {
        return {
            ...row,
            id: index + 1,
            RoomCode: row.records.data?.[0]?.RoomCode || row.RoomCode ,
            EmployeeID: row.EmployeeID || row.Employeeid,
            RoomDesc: row.records.data?.[0]?.RoomDesc || row.RoomDesc,
            FloorCode: row.records.data?.[0]?.FloorCode || row.FloorCode,
            Buildingcode: row.records.data?.[0]?.BuildingCode || row.BuildingCode,
            LocationCode: row.records.data?.[0]?.LocationCode || row.LocationCode,
        };
    });

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);


    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    return (
        <>
            <div className="bg">
                <div className="bg">
                    <div className="">
                        <Box sx={{ display: 'flex' }}>
                            <Siderbar />
                            <AppBar className="fortrans locationfortrans" position="fixed">
                                <Toolbar>
                                    <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                        <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                                            navigate('/')
                                        })} />
                                        <p className="text-center my-auto ms-5">Space Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            Employee Room Assignments </p>
                                        <div className="d-flex">
                                          
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/Create/Employee/RoomAssigment')
                                            })}><AddCircleOutlineIcon className='me-1' />Create</button>

                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export  <FileUploadIcon />
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />
                                    {/* Search Fields */}
                                    <div className="row mx-auto formsection my-3">

                                        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                    Building Code
                                                </label>
                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example"
                                                    value={BuildingCodefiltervalue}
                                                    onChange={(e) => {
                                                        setBuildingCodefiltervalue(e.target.value)
                                                    }}>
                                                    <option className='inputsectiondropdpwn' value=''>Select Dept Code</option>
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
                                                    Location Code
                                                </label>

                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                    value={LocationCodefiltervalue}
                                                    onChange={((e) => {
                                                        setLocationCodefiltervalue(e.target.value)
                                                    })}
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

                                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                                                    Floor Code
                                                </label>
                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example"
                                                    value={Floorfilter}
                                                    onChange={(e) => {
                                                        setFloorfilter(e.target.value)
                                                    }
                                                    }
                                                >

                                                    <option className='inputsectiondropdpwn' value=''>Select Floor Code</option>
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
                                    <div style={{ height: 420, width: '100%' }}>
                                        <DataGrid
                                            rows={filteredData}
                                            columns={columns}
                                            pagination
                                            rowsPerPageOptions={[10, 25, 50]} // Optional: Set available page size options
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={setPaginationModel}
                                            checkboxSelection
                                            disableRowSelectionOnClick
                                            disableMultipleSelection
                                            selectionModel={selectedRowIds}
                                            onSelectionModelChange={(selection) => setSelectedRowIds(selection)}
                                            rowSelectionModel={rowSelectionModel}
                                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                                setRowSelectionModel(newRowSelectionModel); // Set the state with selected row ids
                                                const selectedRows = filteredData.filter((row) => newRowSelectionModel.includes(row.id));
                                                setSelectedRow(selectedRows); // Set the state with selected row data objects
                                                // handleRowClick(selectedRows);

                                            }}
                                        />

                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                            navigate('/')
                                        })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testing;
