import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
import { SearchOutlined } from '@ant-design/icons';
import excel from '../../../../Image/excel.png';
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
import moment from 'moment'

function MainPurachase() {
    const navigate = useNavigate();
    // print button
    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'PurchaseOrderNumber': row.PurchaseOrderNumber,
            'VendorID': row.VendorID,
            'PurchaseRequestNumber': row.PurchaseRequestNumber,
            'ApprovedByEmpl': row.ApprovedByEmpl,
        }));

        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">PurchaseOrderNumber</th>
          <th style="${headerStyle}">VendorID</th>
           <th style="${headerStyle}">PurchaseRequestNumber</th>
          <th style="${headerStyle}">ApprovedByEmpl</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['PurchaseOrderNumber']}</td>
            <td>${row['VendorID']}</td>
             <td>${row['PurchaseRequestNumber']}</td>
            <td>${row['ApprovedByEmpl']}</td>
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
      </html>
    `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };
    const [getdata, setgetdata] = useState([])
    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/PurchaseOrder_GET_List`, {
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
        { field: 'id', headerName: 'SEQ.', width: 100 },
        { field: 'PurchaseOrderNumber', headerName: 'Purchase Order Number', width: 200 },
        { field: 'PurchaseRequestNumber', headerName: 'Purchase Request Number', width: 200 },
        { field: 'ApprovedByEmpl', headerName: 'Approved ByEmployeeID', width: 200 },
        { field: 'VendorID', headerName: 'Vendor ID', width: 200 },
        { field: 'RequestDate', headerName: 'Request Date', width: 200 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    // Deleted api section
    const Deletedapi = (PurchaseOrderNumber) => {
        console.log(PurchaseOrderNumber);
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
            text: `You want to delete this ${PurchaseOrderNumber} Purchase Order  `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/PurchaseOrder_DELETE_BYID/${PurchaseOrderNumber}`)
                    .then((res) => {
                        getapi()
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            `Purchase Order ${PurchaseOrderNumber} has been deleted.`,
                            'success'
                        )
                        getapi()
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Error deleting', err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    });

            }
        })

    };

    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

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
                    <MenuItem onClick={() => navigate(`/View/Purachaseorder/${params.row.PurchaseOrderNumber}`)} >
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={() => navigate(`/Update/Purachaseorder/${params.row.PurchaseOrderNumber}`)}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        Deletedapi(params.row.PurchaseOrderNumber)
                        handleMenuClose();
                    }}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }
    const [requestByEmployee, setrequestByEmployee] = useState('');

    const filteredRows = getdata && getdata.filter(row => (
        (!requestByEmployee || (row.EmployeeID && row.EmployeeID.includes(requestByEmployee)))
    )).map((row, index) => ({
        ...row,
        id: index + 1,
        PurchaseOrderNumber: row.PurchaseOrderNumber,
        VendorID: row.VendorID,
        PurchaseRequestNumber: row.PurchaseRequestNumber,
        ApprovedByEmpl: row.ApprovedByEmpl,
        RequestDate: moment(row.RequestDate).isValid() ? moment(row.RequestDate).format('DD/MM/YYYY') : ''
    }))


    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [statuscheck, setstatuscheck] = useState()
    const handleAddToWorkRequest = () => {
        if (!selectedRow || selectedRow.length === 0) {
            Swal.fire({
                title: "Error",
                text: `Select a Purchase Orders by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }
        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            navigate(`/Update/Purachaseorder/${firstSelectedRow.PurchaseOrderNumber}`);
        }
    };

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
                                        <p className="text-center my-auto ms-5">Purchasing Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                          Purchase Orders<span className='star'>*</span></p>
                                        <div className="d-flex">
                                            <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Order is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"
                                                onClick={(() => {
                                                    navigate('/Create/Purachaseorder')
                                                })}
                                            ><AddCircleOutlineIcon className='me-1' />Create</button>
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredRows)}>
                                                <PrintIcon className="me-1" />
                                                Print
                                            </button>
                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />
                                    {/* Search Fields */}
                                    <div style={{ height: 400, width: '100%' }} className=' mt-5'>
                                        <DataGrid
                                            rows={filteredRows}
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
                                                // console.log(newRowSelectionModel); // Logs the ids of selected rows
                                                const selectedRows = filteredRows.filter((row) => newRowSelectionModel.includes(row.id));
                                                console.log(selectedRows)
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

export default MainPurachase;