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
import Createwroke from '../../../Component/AllRounter/setup configuration/Work types/Createwroke';
import axios from 'axios';
import Swal from "sweetalert2";
import "./Updata.css"
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";

function Worketypesmaintance() {
    const navigate = useNavigate()
    const componentpdf = useRef();
    const genertpdf = useReactToPrint({
        content: () => componentpdf.current,
    });
    const [getdata, setgetdata] = useState([])

    const getapi = () => {
        axios.get(`/api/WorkType_GET_LIST`, {
        },)
            .then((res) => {
                console.log('TO get the list', res.data);
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
    const Deletedapi = (workTrade) => {
        console.log(workTrade);
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
                axios.delete(`/api/WORKTYPE_DELETE_BYID/${workTrade}`)
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

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 100 },
        { field: 'workTrade', headerName: 'WORK TYPE', width: 200 },
        { field: 'description', headerName: 'DESCRIPTION', width: 350 },
        {
            field: 'action', headerName: 'ACTION', width: 170,
            renderCell: (params) => (
                <div>
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => {
                        navigate(`/Updata/Worktypes/${params.row.WorkTypeCode}`);
                    }}>
                        <FlipCameraAndroidIcon />
                    </button>
                    <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => Deletedapi(params.row.WorkTypeCode)}>
                        <DeleteOutlineIcon />
                    </button>
                </div>
            ),
        },
    ];

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    const filteredData = getdata && getdata.map((row, indes) => ({
        ...row,
        id: indes + 1,
        // SEQ:row.EmployeeID,
        workTrade: row.WorkTypeCode,
        description: row.WorkTypeDesc

    }))


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
                                <p className="color1 workitoppro my-auto">WORK TYPE MAINTENANCE
                                    <span className='star'>*</span>
                                </p>
                                <div className="d-flex">
                                    <Createwroke />
                                    <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                                        <img src={excel} alt="export" className='me-1' />
                                        Import <GetAppIcon />
                                    </button>
                                    {/* <button type="button" className="btn btn-outline-primary color2" onClick={genertpdf}>
                                        <img src={excel} alt="export" className='me-1' htmlFor='epoet'  /> Export  <FileUploadIcon />
                                    </button> */}

                                    <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export  <FileUploadIcon />
                                    </CSVLink>
                                </div>
                            </div>
                            <hr className="color3 line width" />
                            <div style={{ height: 420, width: '80%' }} className='tableleft' ref={componentpdf}  >
                                <DataGrid
                                    rows={filteredData}
                                    columns={columns}
                                    pagination
                                    rowsPerPageOptions={<div className="my-pagination-options">[25, 50, 100]</div>}
                                    paginationModel={paginationModel}
                                    onPaginationModelChange={setPaginationModel}
                                    disableRowSelectionOnClick
                                    checkboxSelection
                                    hideFooterSelectedRowCount
                                // radioButtonSelection
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100 mt-3 mb-3">
                            <button type="button" className="border-0 px-3 savebtn py-2 " onClick={() => {
                                navigate(`/`);
                            }}>
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

export default Worketypesmaintance