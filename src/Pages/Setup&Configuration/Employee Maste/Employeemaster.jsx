import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
import { SearchOutlined } from '@ant-design/icons';
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
        const selectedData = tableData.map((row, index) => ({
            'id': index + 1,
            'EmployeeID': row.EmployeeID,
            'NationalityCode': row.NationalityCode,
            'BuildingCode': row.BuildingCode,
            'DepartmentCode': row.DepartmentCode,
            'Gender': row.Gender,
        }));

        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
      <tr>
      <th style="${headerStyle}">SEQ</th>
      <th style="${headerStyle}">EmployeeID#</th>
      <th style="${headerStyle}">Nationality Code</th>
      <th style="${headerStyle}">Building Code#</th>
      <th style="${headerStyle}">DepartmentCode</th>
      <th style="${headerStyle}">Gender</th>
  </tr>
  ${selectedData.map(row => `
  <tr>
      <td>${row['id']}</td>
      <td>${row['EmployeeID']}</td>
      <td>${row['NationalityCode']}</td>
      <td>${row['BuildingCode']}</td>
      <td>${row['DepartmentCode']}</td>
      <td>${row['Gender']}</td>
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
    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/EmployeeMaster_GET_LIST`, {
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
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'EmployeeID', headerName: 'EmployeeID#', width: 160 },
        { field: 'FullName', headerName: 'Name', width: 200 },
        { field: 'NationalityCode', headerName: 'Nationality Code', width: 160 },
        { field: 'BuildingCode', headerName: 'Building Code#', width: 160 },
        { field: 'DepartmentCode', headerName: 'DepartmentCode', width: 150 },
        { field: 'Gender', headerName: 'Gender', width: 160 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

        const Deletedapi = (EmployeeID) => {
            handleMenuClose();
            console.log(EmployeeID);
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
                text: `Do you want to deleting ${EmployeeID} Employee Master !`,
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
                            // Refresh the table data if needed
                            // You can call the API again or remove the deleted row from the state
                        })
                        .catch((err) => {
                            // Handle delete error
                            console.log('Error deleting', err);
                        });
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        `Employee Master ${EmployeeID}  has been deleted.`,
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
        console.log(fullName);
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

    const handleAddToWorkRequest = () => {
        console.log("rozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", selectedRow);
        if (!selectedRow || selectedRow.length === 0) {
            console.log('Select a Employee Master by checking the check box');
            Swal.fire({
                title: "Error",
                text: `Select a Employee Master by checking the check box`,
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
        console.log('Selected Row Data:', selectedRowData);

        setSelectedRowIds(selectedRowData);


        // Perform your logic to add to work request using selectedRowData
        // Example: sendToWorkRequest(selectedRowData);
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
                                        <p className="text-center my-auto ms-5">Employee Master</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            Employee Master </p>
                                        <div className="d-flex">
                                            <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Request is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/Create/Employeemaster')
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
                                    <div className="row mx-auto my-auto formsection">
                                        <div className="col-sm-10 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    Employee ID</label>

                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select Employee ID"
                                                    value={EmployeeIDfilter}
                                                    className='rounded inputsection py-2'
                                                    onChange={(e) => setEmployeeIDfilter(e.target.value)}
                                                ></input>
                                                <p
                                                    className='position-absolute text-end serachicon'
                                                >
                                                    <SearchOutlined className=' serachicon' />
                                                </p>
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
                                                // console.log(newRowSelectionModel); // Logs the ids of selected rows
                                                const selectedRows = filteredData.filter((row) => newRowSelectionModel.includes(row.id));
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

export default Employeemaster;
