import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
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
import { SearchOutlined } from '@ant-design/icons';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';

function Employeeroomtransfer() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])

    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'TransferRequestNumber': row.TransferRequestNumber,
            'TransferRequestDate': row.TransferRequestDate,
            'EmployeeID': row.EmployeeID,
            'FROM_RoomCode': row.FROM_RoomCode,
            'TO_RoomCode': row.TO_RoomCode,
            'EmployeeID_Approval_1': row.EmployeeID_Approval_1,
            'EmployeeID_Approval_2': row.EmployeeID_Approval_2,
            'EmployeeID_Approval_3': row.EmployeeID_Approval_3,

        }));

        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table  style='width:100% ;text-align: left;margin: 30px 0px; border: 1px solid black;
  border-collapse: collapse;'>
        <tr style='background:#3d41cf; color:white; '>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">Transfer Request Number</th>
          <th style="${headerStyle}">Transfer RequestDate </th>
           <th style="${headerStyle}">Employee ID</th>
          <th style="${headerStyle}">FROM RoomCode</th>
          <th style="${headerStyle}">To RoomCode Code</th>
          <th style="${headerStyle}">1st Level - Emp. Code</th>
          <th style="${headerStyle}">2nd Level - Emp. Code</th>
          <th style="${headerStyle}">3rd Level - Emp. Code</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['SEQ']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['TransferRequestNumber']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['TransferRequestDate']}</td>
             <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['EmployeeID']}</td>
             <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['FROM_RoomCode']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['TO_RoomCode']}</td>
   <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['EmployeeID_Approval_1']}</td>
   <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['EmployeeID_Approval_2']}</td>
   <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['EmployeeID_Approval_3']}</td>
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
        axios.get(`/api/EmployeeRoomTransfers_GET_List`, {
        },)
            .then((res) => {
                console.log('---------------', res.data);
                setgetdata(res.data.data)
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
        { field: 'TransferRequestNumber', headerName: 'Transfer Number', width: 160 },
        { field: 'TransferRequestDate', headerName: 'Request Date ', width: 190 },
        { field: 'EmployeeID', headerName: 'Employee Number ', width: 190 },
        { field: 'FROM_RoomCode', headerName: 'FROM-Room Code', width: 190 },
        { field: 'TO_RoomCode', headerName: 'TO-Room Code', width: 190 },
        { field: 'EmployeeID_Approval_1', headerName: '1st Level - Emp. Code', width: 190 },
        { field: 'EmployeeID_Approval_2', headerName: '2nd Level - Emp. Code', width: 190 },
        { field: 'EmployeeID_Approval_3', headerName: '3rd Level - Emp. Code', width: 190 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

        const Deletedapi = (TransferRequestNumber) => {
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
                text: `Do you really want to Delete ${TransferRequestNumber} Employee Room Transfers record! `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/EmployeeRoomTransfers_DELETE_BYID/${TransferRequestNumber}`)
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
                        `Employee Room Transfers  ${TransferRequestNumber} has been deleted.`,
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
                        navigate(`/View/Employee/RoomTransfers/${params.row.TransferRequestNumber}`)
                    })}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={(() => {
                        navigate(`/Update/Employee/RoomTransfers/${params.row.TransferRequestNumber}`)
                    })}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => Deletedapi(params.row.TransferRequestNumber)}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }

    const [TransferRequestNumberfilter, setTransferRequestNumberfilter] = useState('');
    const [EmployeeIDfilter, setEmployeeIDfilter] = useState('')

    const filteredData = getdata && getdata.filter(row => (
        (!TransferRequestNumberfilter || (row.TransferRequestNumber && row.TransferRequestNumber.includes(TransferRequestNumberfilter))) &&
        (!EmployeeIDfilter || row.EmployeeID.toLowerCase().includes(EmployeeIDfilter.toLowerCase()))
    )).map((row, index) => {
        return {
            ...row,
            id: index + 1,
            TransferRequestNumber: row.TransferRequestNumber,
            TransferRequestDate: moment(row.TransferRequestDate).isValid() ? moment(row.TransferRequestDate).format('DD/MM/YYYY') : '',
            EmployeeID: row.EmployeeID,
            FROM_RoomCode: row.FROM_RoomCode,
            TO_RoomCode: row.TO_RoomCode,
            EmployeeID_Approval_1: row.EmployeeID_Approval_1,
            EmployeeID_Approval_2: row.EmployeeID_Approval_2,
            EmployeeID_Approval_3: row.EmployeeID_Approval_3,
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
                text: `Select a Employee Room Transfers by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }

        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            navigate(`/Update/Employee/RoomTransfers/${firstSelectedRow.TransferRequestNumber}`)
        }

        const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
        setSelectedRowIds(selectedRowData);
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
                                        <p className="text-center my-auto ms-5">Space Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            Employee Room Transfers </p>
                                        <div className="d-flex">
                                            <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Request is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/Create/Employee/RoomTransfers')
                                            })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredData)}>
                                                <PrintIcon className="me-1" />
                                                Print
                                            </button>
                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export  <FileUploadIcon />
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />
                                    {/* Search Fields */}
                                    <div className="row mx-auto formsection">
                                        <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    Transfer Number
                                                </label>
                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select Transfer Number"
                                                    value={TransferRequestNumberfilter}
                                                    className='rounded inputsection py-2'
                                                    onChange={(e) => setTransferRequestNumberfilter(e.target.value)}
                                                ></input>
                                                <p
                                                    className='position-absolute text-end serachicon'
                                                >
                                                    <SearchOutlined className=' serachicon' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-10 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                   Employee ID </label>
                                                <input
                                                    types='text'
                                                    id='Asset'
                                                    placeholder="Select filter Asset Item Description"
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

export default Employeeroomtransfer;
