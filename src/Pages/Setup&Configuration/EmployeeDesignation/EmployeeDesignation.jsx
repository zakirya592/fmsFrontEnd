import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import excel from '../../../Image/excel.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
import AddWorkstatus from '../../../Component/AllRounter/setup configuration/EmployeeDesignation/NewEmployeeDesignation';
import { CSVLink } from "react-csv";

function EmployeeDesignation() {

    const [DesignationDesc, setDesignationDesc] = useState()
    const ref = useRef(null)
    const [itemCode, setItemCode] = useState(null);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [getdata, setgetdata] = useState([])
    // Get api
    const getapi = () => {
        axios.get(`/api/Designation_GET_LIST`, {
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
    const Deletedapi = (DesignationCode) => {
        console.log(DesignationCode);
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
            text: `You want to delete this ${DesignationCode} Employee Designation`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/Designation_DELETE_BYID/${DesignationCode}`)
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
                    `Employee Designation ${DesignationCode} has been Deleted`,
                    'success'
                )
            }
        })

    };
    // columns
    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 100 },
        { field: 'WORKSTATUS', headerName: 'EMPLOYEE DESIGNATION CODE', width: 250 },
        { field: 'description', headerName: 'DESCRIPTION', width: 350 },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 170,
            renderCell: (params) => (
                <div>
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => updata(params.row.DesignationCode)}>
                        <FlipCameraAndroidIcon />
                    </button>
                    {/* <!-- Button trigger modal --> */}
                    <button type="button" class="btn" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                        <FlipCameraAndroidIcon />
                    </button>
                    
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => Deletedapi(params.row.DesignationCode)}>
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
        WORKSTATUS: row.DesignationCode,
        description: row.DesignationDesc

    }))

    // Updata section
    // GEt by id Api
    function updata(DesignationCode) {
        console.log(DesignationCode);
        ref.current.click()
        // get api
        axios.get(`/api/Designation_GET_BYID/${DesignationCode}`, {
        },)
            .then((res) => {
                console.log('TO get the list hg', res.data);
                setDesignationDesc(res.data.recordset[0].DesignationDesc)

                setItemCode(DesignationCode); // Store the WorkTypeCode in state
            })
            .catch((err) => {
                console.log(err);

            });
    }

    const handleClose = () => {
        setOpen(false);
    };
    // UPdata api
    const postapi = (e) => {
        e.preventDefault();
        // ref.current.click(SolutiontatusCode)
        console.log(itemCode, "you know");
        axios.put(`/api/Designation_Put/${itemCode}`, {
            DesignationDesc: DesignationDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                getapi()
                Swal.fire(
                    'Update!',
                    `Employee Designation ${itemCode} has been updated`,
                    'success'
                ).then(() => {
                    handleClose();
                });
            })
            .catch((err) => {
                console.log(err);
            });
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
                                <p className="color1 workitoppro my-auto">EMPLOYEE DESIGNATION MAINTENANCE
                                    <span className='star'>*</span>
                                </p>
                                <div className="d-flex">
                                    <AddWorkstatus />
                                    <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                                        <img src={excel} alt="export" className='me-1' />
                                        Import <GetAppIcon />
                                    </button>
                                    <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export  <FileUploadIcon />
                                    </CSVLink>
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
                        </div>
                    </div>
                </Box>
            </div>
            {/* Model */}
            <div class="modal fade mt-5 " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog bgupdata" style={{ borderRadius: '10px', border: '4px solid #1E3B8B' }}>
                    <div class="modal-content bgupdata">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Updata WorkStatus </h5>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body">
                            <form onSubmit={postapi}>

                                <div className='emailsection position-relative d-grid my-1'>
                                    <label htmlFor='DesignationDesc' className='lablesection color3 text-start mb-1'>
                                        WorkStatus Desc<span className='star'>*</span>
                                    </label>

                                    <input
                                        types='text'
                                        id='DesignationDesc'
                                        value={DesignationDesc}
                                        onChange={e => {
                                            setDesignationDesc(e.target.value)
                                        }}
                                        className='rounded inputsection py-2 borderfo'
                                        placeholder='WorkStatus Desc'
                                        required
                                    ></input>
                                </div>

                                <div className="d-flex justify-content-between p-4 ">
                                    <button type="button" class="border-0 px-3  savebtn py-2" data-bs-dismiss="modal"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <button type="submit" class="border-0 px-3 savebtn py-2" data-bs-dismiss="modal"><AddCircleOutlineIcon className='me-2' />Save</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeDesignation