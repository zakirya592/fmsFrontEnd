import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import excel from '../../../Image/excel.png';
import { Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppBar from '@mui/material/AppBar';
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DataGrid, GridCellCheckboxRenderer } from '@mui/x-data-grid';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import Createwroke from '../../../Component/AllRounter/setup configuration/Work types/Createwroke';
import axios from 'axios';
import Swal from "sweetalert2";
import "./Updata.css"
import { useNavigate} from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from "react-csv";

function Worketypesmaintance() {
    const navigate = useNavigate()
    const [WorkTypeDesc, setWorkTypeDesc] = useState("")
    const [getdata, setgetdata] = useState([])
    const [open, setOpen] = useState(false);
    const [itemCode, setItemCode] = useState(null);

    const componentpdf = useRef();
    

    const handleClick = (WorkTypeCode) => {
        setOpen(true);
        console.log(WorkTypeCode);
        axios
          .get(`/api/WorkType_GET_BYID/${WorkTypeCode}`)
          .then((res) => {
            console.log('To get the list', res.data);
            setWorkTypeDesc(res.data.recordset[0].WorkTypeDesc);
            setItemCode(WorkTypeCode); // Store the WorkTypeCode in state
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      const postapi = () => {
        axios
          .put(`/api/WorkType_Put/${itemCode}`, {
            WorkTypeDesc: WorkTypeDesc,
          })
          .then((res) => {
            console.log('Update', res.data);
            getapi()
            setWorkTypeDesc('');
            Swal.fire('Update!', 'You have successfully updated.', 'success').then(() => {
              handleClose();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      function handleSaveClick() {
        postapi();
        handleClose();
      }
      
      const handleClose = () => {
        setOpen(false);
      };
      
      
      

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
                    <button
                        type="button"
                        className="btn mx-1 color2 btnwork"
                        // onClick={handleClick}
                        onClick={() => handleClick(params.row.WorkTypeCode)}
                    >
                        <FlipCameraAndroidIcon />
                    </button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        style={{
                            zIndex: 1500,
                            top: '50%',
                            left: '55%',
                            width: '30%',
                            height: '22%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <form >
                            {/* Modal content */}
                            <div className="row mx-auto px-3 formsection">
                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2">
                                    <div className="emailsection position-relative d-grid my-1 popupfield">
                                        <label htmlFor="WorkTypeDesc" className="lablesection color3 text-start mb-1">
                                            WorkType Desc<span className="star">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            id="WorkTypeDesc"
                                            value={WorkTypeDesc}
                                            onChange={(e) => {
                                                setWorkTypeDesc(e.target.value);
                                            }}
                                            className="rounded inputsection py-2 borderfo px-2"
                                            placeholder="Work Type Description"
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between p-4">
                                <button
                                    type="button"
                                    className="border-0 px-3 savebtn py-2"
                                    onClick={handleClose}
                                >
                                    <ArrowCircleLeftOutlinedIcon className="me-2" />
                                    Back
                                </button>
                                <button
  type="button"
  className="border-0 px-3 savebtn py-2"
  onClick={() => handleSaveClick(params.row.WorkTypeCode)}
>
                                    <AddCircleOutlineIcon className="me-2" />
                                    Save
                                </button>
                            </div>
                        </form>
                    </Modal>


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
       const [selectedRows, setSelectedRows] = useState([]);

    const handleRowSelection = (id, isSelected, resetSelection) => {
        if (resetSelection) {
            setSelectedRows(id);
        } else {
            setSelectedRows((prevSelectedRows) => {
                if (isSelected) {
                    // Add newly selected rows to the selection
                    return [...prevSelectedRows, ...id];
                } else {
                    // Remove deselected rows from the selection
                    return prevSelectedRows.filter((rowId) => !id.includes(rowId));
                }
            });
        }
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
                                    radioButtonSelection   
                                    selectedRows={selectedRows}
                                    onSelectionModelChange={handleRowSelection}
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

                {/* <!-- Modal --> */}
                <div class="modal fade mt-5" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Worketypesmaintance