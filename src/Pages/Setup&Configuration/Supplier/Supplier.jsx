import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
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
import Swal from "sweetalert2";

function Employeemaster() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])

    // print button
    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        
        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';
        
        const tableHtml = `
            <table border="1">
                <tr>
                    <th style="${headerStyle}">SEQ</th>
                    <th style="${headerStyle}">Vendor ID</th>
                    <th style="${headerStyle}">Vendor Name</th>
                    <th style="${headerStyle}">Mobile Number</th>
                    <th style="${headerStyle}">Email</th>
                </tr>
                ${tableData.map(row => `
                    <tr>
                        <td>${row['id']}</td>
                        <td>${row['VendorID']}</td>
                        <td>${row['VendorName']}</td>
                        <td>${row['ContactMobileNumber']}</td>
                        <td>${row['ContactEmail']}</td>
                    </tr>`).join('')}
            </table>`;
        
        const printContent = `
            <html>
                <head>
                    <title>DataGrid Table</title>
                    <style>
                        @media print {
                            body {
                                padding: 0;
                                margin: 0;
                            }
                            th {
                                ${headerStyle}
                            }
                        }
                    </style>
                </head>
                <body>${tableHtml}</body>
            </html>`;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };
    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/VendorMaster_GET_LIST`, {
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


    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 120 },
        { field: 'VendorID', headerName: 'Vendor ID', width: 220 },
        { field: 'VendorName', headerName: 'Vendor Name', width: 220 },
        { field: 'ContactMobileNumber', headerName: 'Mobile Number', width: 220 },
        { field: 'ContactEmail', headerName: 'Email', width: 220 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 150, renderCell: ActionButtons },
    ];
    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

        const Deletedapi = (VendorID) => {
            handleMenuClose();
            
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success mx-2',
                    cancelButton: 'btn btn-danger mx-2',
                },
                buttonsStyling: false
            });
        
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: `Do you want to delete Vendor with ID ${VendorID} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/VendorMaster_DELETE_BYID/${VendorID}`)
                        .then((res) => {
                            // Handle successful delete response
                            console.log('Deleted successfully', res);
                            getapi();
                            // Refresh the table data if needed
                            // You can call the API again or remove the deleted row from the state
                        })
                        .catch((err) => {
                            // Handle delete error
                            console.log('Error deleting', err);
                        });
        
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        `Vendor with ID ${VendorID} has been deleted.`,
                        'success'
                    );
                }
            });
        };
        
        const handleMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        const handleUpdate = () => {
            // Handle update action
            handleMenuClose();
        };

        const handleDeleteButtonClick = () => {
            // Handle delete action
            handleMenuClose();
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
                        navigate(`/View/Employeemaster/${params.row.VendorID}`)
                    })}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={(() => {
                        navigate(`/Updata/Employeemaster/${params.row.VendorID}`)
                    })}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => Deletedapi(params.row.VendorID)}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }

    const filteredData = getdata && getdata.map((row, index) => ({
        id: index + 1,
        VendorID: row.VendorID,
        VendorName: row.VendorName,
        ContactMobileNumber: row.ContactMobileNumber,
        ContactEmail: row.ContactEmail,
    }));


    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    return (
        <>
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
                                        <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                        Create Vendor/Supplier Master <span className='star'>*</span> </p>
                                        <div className="d-flex">
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/Create/supplier')
                                            })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredData)}>
                                                <PrintIcon className="me-1" />
                                                Print
                                            </button>
                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />

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
        </>
    );
}

export default Employeemaster;
