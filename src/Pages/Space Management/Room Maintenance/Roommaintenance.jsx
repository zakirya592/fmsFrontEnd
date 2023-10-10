import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import excel from '../../../Image/excel.png';
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
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function Roommaintenance() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])

    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/EmployeeMaster_GET_LIST`, {
        },)
            .then((res) => {
                setgetdata(res.data.recordset)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])


    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'EmployeeID', headerName: 'Room Code', width: 160 },
        { field: 'FullName', headerName: 'DESCRIPTION ', width: 300 },
        { field: 'NationalityCode', headerName: 'Area ', width: 190 },
        { field: 'BuildingCode', headerName: 'Building Code', width: 190 },
        { field: 'DepartmentCode', headerName: 'Location Code', width: 190 },
        { field: 'DepartmentCode', headerName: 'Capacity', width: 190 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

        const Deletedapi = (EmployeeID) => {
            handleMenuClose();
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
                text: `Do you really want to Delete ${EmployeeID} Room record! `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/EmployeeMaster_DELETE_BYID/${EmployeeID}`)
                        .then((res) => {
                            // Handle successful delete response
                            console.log('Deleted successfully', res);
                            getapi()
                        })
                        .catch((err) => {
                            // Handle delete error
                            console.log('Error deleting', err);
                        });
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        `Room  ${EmployeeID} has been deleted.`,
                        'success'
                    )
                }
            })

        };
        const handleMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
            setAnchorEl(null);
        };


        return (
            <div>
                <Button className='actionBtn' onClick={handleMenuOpen} style={{ color: "black" }}>
                    <span style={{ paddingRight: '10px' }}>Action</span>
                    <ArrowDropDownIcon />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={(() => {
                        navigate(`/View/Employeemaster/${params.row.EmployeeID}`)
                    })}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={(() => {
                        navigate(`/Updata/Employeemaster/${params.row.EmployeeID}`)
                    })}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => Deletedapi(params.row.EmployeeID)}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }
    const [EmployeeIDfilter, setEmployeeIDfilter] = useState('')
    const filteredData = getdata && getdata.filter(row => (
        (!EmployeeIDfilter || row.EmployeeID.toLowerCase().includes(EmployeeIDfilter.toLowerCase()))
    )).map((row, index) => {
        const fullName = `${row.Firstname} ${row.Middlename} ${row.Lastname}`.trim();
        return {
            ...row,
            id: index + 1,
            RequestNumber: row.RequestNumber,
            EmployeeID: row.EmployeeID,
            FullName: fullName, // Combine first name, middle name, and last name
            NationalityCode: row.NationalityCode,
            BuildingCode: row.BuildingCode,
            DepartmentCode: row.DepartmentCode,
            Gender: row.Gender,
        };
    });

    const [statuscheck, setstatuscheck] = useState()
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    // Updata btn
    const handleAddToWorkRequest = () => {
        if (!selectedRow || selectedRow.length === 0) {
            Swal.fire({
                title: "Error",
                text: `Select a Room maintenance by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }

        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            console.log('Post the Data:', firstSelectedRow.EmployeeID);
            navigate(`/Updata/Employeemaster/${firstSelectedRow.EmployeeID}`)
        }

        const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
        setSelectedRowIds(selectedRowData);
        // Example: sendToWorkRequest(selectedRowData);
    };

    // Import 
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0]; // Assuming you have data in the first sheet
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                json.forEach((item) => {
                    axios.post(`/api/WorkTrade_post`, {
                        WorkTypeCode: item.WorkTypeCode, // Adjust property names as needed
                        WorkTradeCode: item.WorkTradeCode,
                        WorkTradeDesc: item.WorkTradeDesc,
                        // Add more properties as needed
                    })
                        .then((res) => {
                            console.log('Add', res.data);
                            // Handle success
                            Swal.fire(
                                'Add!',
                                `Room maintenance has been created`,
                                'success'
                            )
                            getapi()
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire(
                                'Error!',
                                `Some Room maintenance already exist`,
                                'error'
                            )
                            // Handle errors
                        });
                });
            };
            reader.readAsArrayBuffer(file);

        }
    };

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
                                        <p className="text-center my-auto ms-5">ROOM MAINTENANCE</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            ROOM MAINTENANCE </p>
                                        <div className="d-flex">
                                            <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Request is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/Create/Roomaintenance')
                                            })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                            <label type="button" className="btn btn-outline-primary mx-1 color2 btnwork" htmlFor="Importdata">
                                                <img src={excel} alt="export" className='me-1' />
                                                Import <GetAppIcon />
                                            </label>
                                            <input type="file" accept=".xlsx" onChange={handleFileUpload} className='d-none' id='Importdata' />
                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export  <FileUploadIcon />
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />
                                    <div style={{ height: 420, width: '100%' }} className='mt-5'>
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

export default Roommaintenance;
