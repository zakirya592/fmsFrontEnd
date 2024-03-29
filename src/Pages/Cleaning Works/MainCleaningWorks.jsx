import React, { useState, useEffect } from 'react'
import Siderbar from '../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from "react-router-dom";
import excel from "../../Image/excel.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import 'react-phone-input-2/lib/style.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { SearchOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Swal from "sweetalert2";
import moment from 'moment'
function MainCleaningWork() {

    const navigate = useNavigate();
    const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('');
    const [requestByEmployee, setrequestByEmployee] = useState('');
    const [getdata, setgetdata] = useState([])
    // print button
    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'Work Request Number': row.RequestNumber,
            "Employee id":row.EmployeeID,
            'Work Type': row.WorkType,
            'Cleaning Group': row.CleaningGroup,
            'Work Priority': row.WorkPriority,
            'Request Date': row.RequestDateTime,
            'Department Code': row.DepartmentCode,
            'Building Code': row.BuildingCode,
        }));
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">Work Request Number</th>
          <th style="${headerStyle}">Employee Id</th>
          <th style="${headerStyle}">Work Type</th>
          <th style="${headerStyle}">Cleaning Group</th>
          <th style="${headerStyle}">Work Priority</th>
          <th style="${headerStyle}">Request Date</th>
          <th style="${headerStyle}">Department Code </th>
          <th style="${headerStyle}">Building Code</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['Work Request Number']}</td>
            <td>${row['Employee id']}</td>
            <td>${row['Work Type']}</td>
            <td>${row['Cleaning Group']}</td>
            <td>${row['Work Priority']}</td>
            <td>${row['Request Date']}</td>
            <td>${row['Department Code']}</td>
            <td>${row['Building Code']}</td>
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
        axios.get(`/api/CleaningWorks_GET_LIST`, {
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
    const Deletedapi = (RequestNumber) => {
        console.log(RequestNumber);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2',
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: `You want to delete this ${RequestNumber} Work Request Number`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/CleaningWorks_DELETE_BYID/${RequestNumber}`)
                    .then((res) => {
                        getapi()
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            `Work Request Number ${RequestNumber} has been deleted.`,
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

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'RequestNumber', headerName: 'WORK REQUEST NUMBER#', width: 200 },
        {field:"EmployeeID", headerName:"EMPLOYEE ID" , width:160},
        { field: 'WorkType', headerName: 'WORK TYPE', width: 160 },
        { field: 'CleaningGroup', headerName: 'CLEANING GROUP#', width: 160 },
        { field: 'WorkPriority', headerName: 'PRIORITY', width: 150 },
        { field: 'RequestDateTime', headerName: 'REQUEST DATE', width: 200 },
        { field: 'DepartmentCode', headerName: 'DEPARTMENT CODE ', width: 160 },
        { field: 'BuildingCode', headerName: 'BUILDING CODE ', width: 160 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

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
                    <MenuItem onClick={(() => {
                        navigate(`/cleaning/view/${params.row.RequestNumber}`)
                    })}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem disabled={params.row.WorkStatus === 'This Work Order is already closed..'} onClick={(() => {
                        navigate(`/Cleaning/update/${params.row.RequestNumber}`)
                    })}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        Deletedapi(params.row.RequestNumber)
                        handleMenuClose();
                    }}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>
        );
    }
    const [filteredRows, setFilteredRows] = useState([]);


    useEffect(() => {
        const filteredRows = (getdata || []).filter(row => (
            (!RequestStatusFilterValue || row.WorkStatus === RequestStatusFilterValue) &&
            (!requestByEmployee || (row.RequestNumber && row.RequestNumber.includes(requestByEmployee)))
        )).sort((a, b) => a.RequestNumber - b.RequestNumber).map((row, index) => {
            const isClosed = row.WorkStatus === "Closed";

            if (isClosed) {
                // If the request is closed, return a modified row with the closed message
                return {
                    ...row,
                    id: index + 1,
                    RequestNumber: row.RequestNumber,
                    WorkType: isClosed ? "This Work Type is already closed.." : row.WorkType,
                    CleaningGroup: row.CleaningGroup,
                    WorkPriority: row.WorkPriority,
                    RequestDateTime: moment(row.RequestDateTime).isValid() ? moment(row.RequestDateTime).format('DD/MM/YYYY') : '',
                    DepartmentCode: row.DepartmentCode,
                    BuildingCode: row.BuildingCode,
                };
            } else {
                // If the request is not closed, return the row as is
                return {
                    ...row,
                    id: index + 1,
                    RequestNumber: row.RequestNumber,
                    WorkType: isClosed ? "This Work Type is already closed.." : row.WorkType,
                    CleaningGroup: row.CleaningGroup,
                    WorkPriority: row.WorkPriority,
                    RequestDateTime: moment(row.RequestDateTime).isValid() ? moment(row.RequestDateTime).format('DD/MM/YYYY') : '',
                    DepartmentCode: row.DepartmentCode,
                    BuildingCode: row.BuildingCode,
                };
            }
        });

        const uniqueWorkTypes = [...new Set(filteredRows.map(row => row.WorkType))];
        const uniqueWorkTrade = [...new Set(filteredRows.map(row => row.WorkTrade))];

        const workTypePromises = uniqueWorkTypes.map(workType =>
            axios.get(`/api/WorkType_descri_LIST/${workType}`)
                .then(res => ({
                    workType,
                    descriptions: res.data.recordset[0].WorkTypeDesc,
                }))
                .catch(err => {
                    console.log(err);
                    return null;
                })
        );

        // Fetch work trade descriptions for all unique work trades
        const workTradePromises = uniqueWorkTrade.map(workTrade =>
            axios.get(`/api/WorkTrade_descri_LIST/${workTrade}`)
                .then(res => ({
                    workTrade,
                    descriptionsTrade: res.data.recordset[0].WorkTradeDesc,
                }))
                .catch(err => {
                    console.log(err);
                    return null;
                })
        );

        Promise.all([...workTypePromises, ...workTradePromises])
            .then(results => {
                const updatedRows = filteredRows.map(row => {
                    let newRow = { ...row };
                    results.forEach(result => {
                        if (result && result.workType === row.WorkType) {
                            newRow = { ...newRow, workTypeDesc: result.descriptions };
                        }
                        if (result && result.workTrade === row.WorkTrade) {
                            newRow = { ...newRow, worktradeDesc: result.descriptionsTrade };
                        }
                    });
                    return newRow;
                });
                setFilteredRows(updatedRows);
            })
            .catch(err => {
                console.log(err);
            });
    }, [getdata, RequestStatusFilterValue, requestByEmployee]);


    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    useEffect(() => {
        console.log(selectedRow) // when ever you select row or disselect it this selectedRow contains all the data..
        console.log(rowSelectionModel)  // ....clear....???
    }, [])

    const [statuscheck, setstatuscheck] = useState()
    const handleCellClick = (params, event) => {
        const columnField = params.field;
        if (columnField === '__check__') {
            // This condition checks if the clicked cell is a checkbox cell
            // Retrieve the entire data of the clicked row using its ID
            const clickedRow = filteredRows.find((row) => row.id === params.id);

            console.log(params.id);
            if (clickedRow) {
                console.log("Selected row data:", clickedRow);

                console.log(clickedRow.WorkType);
                setstatuscheck(clickedRow.WorkStatus)
                // setSelectedRowIds([params.id])
                setSelectedRowIds(clickedRow)
            }
            //    =======
            if (clickedRow) {
                setSelectedRowIds((prevSelected) => ({
                    ...prevSelected,
                    [params.id]: !prevSelected[params.id] // Toggle the selection
                }));
            }
        }
    };
    const handleAddToWorkRequest = () => {
        console.log("rozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", selectedRow);
        if (!selectedRow || selectedRow.length === 0) {
            console.log('Select a Cleaning Work by checking the check box');
            Swal.fire({
                title: "Error",
                text: `Select a Cleaning Work  by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }
        if (statuscheck === 'Closed') {
            console.log('This Work Order is already closed..');
            Swal.fire({
                title: "Error",
                text: `This Work Order No. ${selectedRow[0].RequestNumber}  is already closed..`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }

        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            console.log('Post the Data:', firstSelectedRow.WorkStatus);
            navigate(`/Cleaning/update/${firstSelectedRow.RequestNumber}`);
        }


        const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
        console.log('Selected Row Data:', selectedRowData);

        setSelectedRowIds(selectedRowData);


        // Perform your logic to add to work request using selectedRowData
        // Example: sendToWorkRequest(selectedRowData);
    };

  return (
      <div>
          <div className='bg'>
              <div className=''>
                  <Box sx={{ display: 'flex' }}>
                      <Siderbar />
                      <AppBar className="fortrans locationfortrans" position="fixed">
                          <Toolbar>
                              <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                  <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={() => navigate('/')} />
                                  <p className="text-center my-auto mx-auto">Cleaning Works</p>
                              </Typography>
                          </Toolbar>
                      </AppBar>
                      <div className="topermaringpage mb-4 container">
                          <div className="py-3">


                              {/* Top section */}
                              <div className="d-flex justify-content-between my-auto">
                                  <p className='color1 workitoppro my-auto'>Cleaning Works<span className='star'>*</span></p>
                                  <div className="d-flex">
                                      {/* create */}
                                      <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Order is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                          navigate('/CreateCleaningWork')
                                      })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                      {/* print  */}
                                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredRows)}><PrintIcon className='me-1' />Print</button>
                                      {/* excel  */}
                                      <CSVLink data={filteredRows} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                      </CSVLink>
                                  </div>
                              </div>

                              <hr className='color3 line' />
                               {/* Search Fields */}
                  <div className="row mx-auto formsection">
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Work Request #</label>

                        <input
                          types='text'
                          id='Employeenumber'
                          placeholder="Select Work Request # "
                          value={requestByEmployee}
                          className='rounded inputsection py-2'
                          onChange={(e) => setrequestByEmployee(e.target.value)}
                        ></input>
                        <p
                          className='position-absolute text-end serachicon'
                        >
                          <SearchOutlined className=' serachicon' />
                        </p>
                      </div>
                    </div>
                  </div>
                              {/* table section */}
                              <div style={{ height: 400, width: '100%' }}>
                                  <DataGrid
                                      rows={filteredRows}
                                      columns={columns}
                                      pagination
                                      rowsPerPageOptions={[10, 25, 50]}
                                      paginationModel={paginationModel}
                                      onPaginationModelChange={setPaginationModel}
                                      onCellClick={handleCellClick}
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
                                  <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                              </div>
                          </div>
                      </div>
                  </Box>
              </div>
          </div>
      </div>
  )
}

export default MainCleaningWork