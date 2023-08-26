import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import excel from '../../../Image/excel.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GetAppIcon from '@mui/icons-material/GetApp';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DataGrid } from '@mui/x-data-grid';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import Newproblemcategory from '../../../Component/AllRounter/setup configuration/Problem Category/Newproblemcategory';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function ProblemCategory() {
    const ref = useRef(null)
    const [itemCode, setItemCode] = useState(null);
    const [eProblemCategoryDesc, seteProblemCategoryDesc] = useState()
    const [open, setOpen] = useState(false)
    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 150 },
        { field: 'ProblemCategoryCode', headerName: 'PROBLEM CATEGORY CODE', width: 270 },
        { field: 'ProblemCategoryDesc', headerName: 'DESCRIPTION', width: 270 },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 170,
            renderCell: (params) => (
                <div>
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => updata(params.row.ProblemCategoryCode)}>
                        <FlipCameraAndroidIcon />
                    </button>
                    {/* <!-- Button trigger modal --> */}
                    <button type="button" class="btn" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                        <FlipCameraAndroidIcon />
                    </button>
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => Deletedapi(params.row.ProblemCategoryCode)}>
                        <DeleteOutlineIcon />
                    </button>
                </div>
            ),
        },
    ];

    const navigate = useNavigate()
    const [getdata, setgetdata] = useState([])
   const getapi = () => {
        axios.get(`/api/ProblemCategory_GET_LIST`, {
        },)
            .then((res) => {
                console.log('TO get the list', res);
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
    const Deletedapi = (ProblemCategoryCode) => {
        console.log(ProblemCategoryCode);
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
            text: `You want to delete this ${ProblemCategoryCode} Problem Category`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/ProblemCategory_DELETE_BYID/${ProblemCategoryCode}`)
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
                    `Problem Category ${ProblemCategoryCode} has been Deleted`,
                    'success'
                )
            }
        })

    };

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    const filteredData = getdata && getdata.map((row, indes) => ({
        ...row,
        id: indes + 1,
        // SEQ:row.EmployeeID,
        ProblemCategoryCode: row.ProblemCategoryCode,
        ProblemCategoryDesc: row.ProblemCategoryDesc

    }))

         // Updata section
    // GEt by id Api
    function updata(ProblemCategoryCode) {
        console.log(ProblemCategoryCode);
        ref.current.click()
        // get api
        axios.get(`/api/ProblemCategory_GET_BYID/${ProblemCategoryCode}`, {
        },)
            .then((res) => {
                console.log('TO get the list hg', res.data);
                seteProblemCategoryDesc(res.data.recordset[0].ProblemCategoryDesc)
                setItemCode(ProblemCategoryCode); // Store the WorkTypeCode in state
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
        console.log(itemCode);
        axios.put(`/api/ProblemCategory_Put/${itemCode}`, {
            ProblemCategoryDesc: eProblemCategoryDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                seteProblemCategoryDesc('')
                getapi()
                Swal.fire(
                    'Update!',
                    `Problem Category ${itemCode} has been updated`,
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
                                <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => { navigate(`/`); }} />
                                <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className="topermaringpage  container">
                        <div className="py-3">
                            <div className="d-flex justify-content-between my-auto">
                                <p className="color1 workitoppro my-auto">PROBLEM CATEGORY MAINTENANCE
                                    <span className='star'>*</span>
                                </p>
                                <div className="d-flex">
                                    <Newproblemcategory />
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
                                    disableMultipleSelection
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100 mt-3 mb-3">
                            <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => { navigate(`/`); }}>
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

                 {/* <!-- Modal --> */}
            <div class="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog bgupdata" style={{ borderRadius: '10px', border: '4px solid #1E3B8B' }}>
                    <div class="modal-content bgupdata">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Updata Request Status Code</h5>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body">
                            <form onSubmit={postapi}>
                                <div className='emailsection position-relative d-grid my-1'>
                                    <label htmlFor='DepartmentDesc' className='lablesection color3 text-start mb-1'>
                                        eProblemCategory Desc<span className='star'>*</span>
                                    </label>

                                    <input
                                        types='text'
                                        id='DepartmentDesc'
                                        value={eProblemCategoryDesc}
                                        onChange={e => {
                                            seteProblemCategoryDesc(e.target.value)
                                        }}
                                        className='rounded inputsection py-2 borderfo'
                                        placeholder='ProblemCategory Desc'
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

export default ProblemCategory