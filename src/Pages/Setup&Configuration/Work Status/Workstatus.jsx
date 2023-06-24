import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import excel from '../../../Image/excel.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import './setupAndConfiguration.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GetAppIcon from '@mui/icons-material/GetApp';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DataGrid } from '@mui/x-data-grid';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import AddWorkstatus from '../../../Component/AllRounter/setup configuration/Work Status/AddWorkstatus';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';

function Workstatus() {

    const navigate = useNavigate()
    const [getdata, setgetdata] = useState([])
    // Get api
    const getapi = () => {
        axios.get(`/api/WorkStatus_GET_LIST`, {
        },)
            .then((res) => {
                console.log('TO get the status', res.data);
                setgetdata(res.data.recordset)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])
    // Deleted api section
    const Deletedapi = (WorkStatusCode) => {
        console.log(WorkStatusCode);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2',
                // actions: 'mx-3'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/WORKStatus_DELETE_BYID/${WorkStatusCode}`)
                    .then((res) => {
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        getapi()
                        // Refresh the table data if needed
                        // You can call the API again or remove the deleted row from the state
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Error deleting', err);
                    });
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                )
            }
        })

    };
    // columns
    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 100 },
        { field: 'WORKSTATUS', headerName: 'WORK STATUS CODE', width: 200 },
        { field: 'description', headerName: 'DESCRIPTION', width: 350 },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 170,
            renderCell: (params) => (
                <div>
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => {
                        navigate(`/Updata/Workstatus/${params.row.WorkStatusCode}`);
                    }}>
                        <FlipCameraAndroidIcon />
                    </button>
                    
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => Deletedapi(params.row.WorkStatusCode)}>
                        <DeleteOutlineIcon />
                    </button>
                </div>
            ),
        },
    ];
    // paginationModel
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    // filteredData
    const filteredData = getdata && getdata.map((row, indes) => ({
        ...row,
        id: indes + 1,
        // SEQ:row.EmployeeID,
        WORKSTATUS: row.WorkStatusCode,
        description: row.WorkStatusDesc

    }))

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <>
            <div className="bg">
                <Box sx={{ display: "flex" }}>
                    <Siderbar />
                    <AppBar className="fortrans locationfortrans" position="fixed">
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => {
                                    navigate(`/`);
                                }} />
                                <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className="topermaringpage  container">
                        <div className="py-3">
                            <div className="d-flex justify-content-between my-auto">
                                <p className="color1 workitoppro my-auto">WORK STATUS MAINTENANCE
                                    <span className='star'>*</span>
                                </p>
                                <div className="d-flex">
                                    <AddWorkstatus />
                                    <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                                        <img src={excel} alt="export" className='me-1' />
                                        Import <GetAppIcon />
                                    </button>
                                    <button type="button" className="btn btn-outline-primary color2">
                                        <img src={excel} alt="export" className='me-1' /> Export <FileUploadIcon />
                                    </button>
                                </div>
                            </div>
                            <hr className="color3 line width" />
                            <div style={{ height: 420, width: '80%' }} className='tableleft'>
                                <DataGrid
                                    rows={filteredData}
                                    columns={columns}
                                    pagination
                                    rowsPerPageOptions={[25, 50, 100]} // Optional: Set available page size options
                                    paginationModel={paginationModel}
                                    onPaginationModelChange={setPaginationModel}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100 mt-3 mb-3">
                            <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => {
                                navigate(`/`);
                            }} >
                                <ArrowCircleLeftOutlinedIcon className='me-2' />
                                Back
                            </button>
                            <button type="button" className="border-0 px-3 savebtn py-2">
                                <SaveIcon className='me-2' />
                                SAVE
                            </button>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default Workstatus