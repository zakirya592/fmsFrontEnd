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
import Swal from "sweetalert2";
import moment from 'moment';
import { CSVLink } from "react-csv";
import { Row } from 'jspdf-autotable';

function WorkRequest() {
  const navigate = useNavigate();
  const [getdata, setgetdata] = useState([])
  // print button
  const handlePrintTable = (tableData) => {
    const printWindow = window.open('', '_blank');
    const selectedData = tableData.map((row, index) => ({
      'SEQ': index + 1,
      'Request Number': row.RequestNumber,
      'Request Status': row.RequestStatus,
      'Employee ID': row.EmployeeID,
      'Work Priority': row.WorkPriority,
      'Request Date': row.RequestDateTime,
      'Work Type Desc': row.workTypeDesc,
      'Work Trade Desc': row.worktradeDesc,
    }));

    // Create a bold style for header cells
    const headerStyle = 'font-weight: bold;';

    const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">Request Number</th>
          <th style="${headerStyle}">Request Status</th>
          <th style="${headerStyle}">Employee ID</th>
          <th style="${headerStyle}">Work Priority</th>
          <th style="${headerStyle}">Request Date</th>
          <th style="${headerStyle}">Work Type Desc</th>
          <th style="${headerStyle}">Work Trade Desc</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['Request Number']}</td>
            <td>${row['Request Status']}</td>
            <td>${row['Employee ID']}</td>
            <td>${row['Work Priority']}</td>
            <td>${row['Request Date']}</td>
            <td>${row['Work Type Desc']}</td>
            <td>${row['Work Trade Desc']}</td>
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
    axios.get(`/api/workRequest_GET_LIST`, {
    },)
      .then((res) => {
        console.log('TO get the list', res);
        setgetdata(res.data.recordset)
        // setWorkTypes(res.data.recordset.map((item,ind)=>{
        //   console.log("work desc sing",item.WorkType);
        //   setwordecss(item.WorkType)
        // }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getapi()
  }, [])

  // Deleted api section
  // Deleted api section
  const Deletedapi = (RequestNumber) => {
    console.log(RequestNumber);
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
      text: "You want to delete this workRequest",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/all_work_request_DELETE_BYID/${RequestNumber}`)
          .then((res) => {
            getapi()
              // Handle successful delete response
              console.log('Deleted successfully', res);
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'workrequest has been deleted.',
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
    { field: 'RequestNumber', headerName: 'WORK REQUEST#', width: 160 },
    { field: 'RequestStatus', headerName: 'REQUEST STATUS', width: 160 },
    { field: 'EmployeeID', headerName: 'REQUEST BY EMP#', width: 160 },
    { field: 'WorkPriority', headerName: 'PRIORITY', width: 150 },
    { field: 'RequestDateTime', headerName: 'REQUEST DATE', width: 200 },
    { field: 'workTypeDesc', headerName: 'WORK TYPE DESC', width: 160 },
    { field: 'worktradeDesc', headerName: 'WORK TRADE DESC', width: 160 },
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
            navigate(`/viewworkRequest/${params.row.RequestNumber}`)
            localStorage.setItem('EMpID', params.row.EmployeeID)
          })}>
            <span style={{ paddingRight: '18px' }} >View</span>
            <VisibilityIcon />
          </MenuItem>
          <MenuItem disabled={params.row.RequestStatus === 'This Work Request is already closed..'} onClick={(() => {
            navigate(`/WorkRequest/Updata/${params.row.RequestNumber}`)
            localStorage.setItem('EMpIDUpdata', params.row.EmployeeID)
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
  const [requestByEmployee, setrequestByEmployee] = useState('');
  const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  // const filteredRows = getdata && getdata.filter(row => (
  //   (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
  //   (!requestByEmployee || row.EmployeeID === requestByEmployee) 
  // )).map((row, indes) => ({
  //   ...row,
  //   id: indes + 1,
  //   RequestNumber: row.RequestNumber,
  //   RequestStatus: row.RequestStatus ,
  //   EmployeeID: row.EmployeeID,
  //   WorkPriority: row.WorkPriority,
  //   RequestDateTime: moment(row.RequestDateTime).format('DD/MM/YYYY'),
  //   WorkType: row.WorkType,
  //   workTypeDesc: row.workTypeDesc //this Both id  is to display a work types desc //ok
  // }))

  // workTypeDesc api 
  
  useEffect(() => {
    const filteredRows = (getdata || []).filter(row => (
      (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
      (!requestByEmployee || row.EmployeeID.includes(requestByEmployee))
    )).sort((a, b) => a.RequestNumber - b.RequestNumber).map((row, index) => {
      const isClosed = row.RequestStatus === "Closed";

      if (isClosed) {
        // If the request is closed, return a modified row with the closed message
        return {
          ...row,
          id: index + 1,
          RequestNumber: row.RequestNumber,
          RequestStatus: isClosed ? "This Work Request is already closed.." : row.RequestStatus,
          EmployeeID: row.EmployeeID,
          WorkPriority: row.WorkPriority,
          RequestDateTime: moment(row.RequestDateTime).format('DD/MM/YYYY'),
          WorkType: row.WorkType,
          workTypeDesc: row.workTypeDesc,
          WorkTrade: row.WorkTrade,
          worktradeDesc: row.worktradeDesc,
        };
      } else {
        // If the request is not closed, return the row as is
        return {
          ...row,
          id: index + 1,
          RequestNumber: row.RequestNumber,
          RequestStatus: row.RequestStatus,
          EmployeeID: row.EmployeeID,
          WorkPriority: row.WorkPriority,
          RequestDateTime: moment(row.RequestDateTime).format('DD/MM/YYYY'),
          WorkType: row.WorkType,
          workTypeDesc: row.workTypeDesc,
          WorkTrade: row.WorkTrade,
          worktradeDesc: row.worktradeDesc,
        };
      }
    });

    // Fetch work type descriptions for all unique work types
    const uniqueWorkTypes = [...new Set(filteredRows.map(row => row.WorkType))];
    // uniqueWorkTypes.forEach(workType => {
    //   // console.log(workType);
    //   axios.get(`/api/WorkType_descri_LIST/${workType}`)
    //     .then((res) => {
    //       const descriptions = res.data.recordset[0].WorkTypeDesc// Assuming the response contains the descriptions as an array
    //       const updatedRows = filteredRows.map(row => {
    //         if (row.WorkType === workType) {
    //           return {
    //             ...row,
    //             workTypeDesc: descriptions,
    //           };
    //         }
    //         return row;
    //       });
    //       // Update the filteredRows state with the updated rows
    //       // You might want to set the state using setFilteredRows(updatedRows)
    //       console.log(updatedRows);
    //       setFilteredRows(updatedRows);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });

    const uniqueWorkTrade = [...new Set(filteredRows.map(row => row.WorkTrade))];
    // uniqueWorkTrade.forEach(workTrade => {
    //   // console.log(workTrade);
    //   axios.get(`/api/WorkTrade_descri_LIST/${workTrade}`)
    //     .then((res) => {
    //       const descriptionsTrade = res.data.recordset[0].WorkTradeDesc// Assuming the response contains the descriptions as an array
    //       const updatedRows = filteredRows.map(row => {
    //         if (row.WorkTrade === workTrade) {
    //           return {
    //             ...row,
    //             worktradeDesc: descriptionsTrade,
    //           };
    //         }
    //         return row;
    //       });
    //       // Update the filteredRows state with the updated rows
    //       // You might want to set the state using setFilteredRows(updatedRows)
    //       console.log('work trade desc',updatedRows);
    //       setFilteredRows(updatedRows);
    //     })
    //     .catch((err) => {
    //       // console.log(err);
    //     });
    // });

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
    console.log("Testing.....")
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
        console.log(clickedRow.RequestStatus);
        setstatuscheck(clickedRow.RequestStatus)
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
  if (!selectedRow || selectedRow.length === 0) {
    console.log('Select a Work Request by checking the check box');
    alert('Select a Work Request by checking the check box')
    return;
  }

  const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
  console.log('Selected Row Data:', selectedRowData);

  setSelectedRowIds(selectedRowData);

  // Assuming you want to navigate to the update page of the first selected row
  if (selectedRow.length > 0) {
    const firstSelectedRow = selectedRow[0];
    console.log('Post the Data:', firstSelectedRow.RequestNumber);
    navigate(`/WorkRequest/Updata/${firstSelectedRow.RequestNumber}`);
  }

  // Perform your logic to add to work request using selectedRowData
  // Example: sendToWorkRequest(selectedRowData);
};


    // const handleRowClick = (selectedRows) => {
    //     console.log(selectedRow)
    // }
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
                    <p className="text-center my-auto ms-5">Work Request</p>
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className="topermaringpage mb- container">
                <div className="py-3">
                  <div className="d-flex justify-content-between my-auto">
                    <p className="color1 workitoppro my-auto">
                      Work Request Transactions</p>
                    <div className="d-flex">
                      <button type="button" className="border-0 px-3  savebtn py-2" disabled={statuscheck === 'This Work Request is already closed..'} onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Request is already closed..' ? 'UPDATE' : 'UPDATE'}
</button>

                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                        navigate('/createworkrequest')
                      })}><AddCircleOutlineIcon className='me-1' />Create</button>
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
                  <div className="row mx-auto formsection">
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Request  Number</label>

                        <input
                          types='text'
                          id='Employeenumber'
                          placeholder="Select Employee # "
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
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Request Status
                        </label>

                        <select
                          id='RequestStatus'
                          value={RequestStatusFilterValue}
                          className='rounded inputsection py-2'
                          onChange={(e) => setRequestStatusFilterValue(e.target.value)}
                        >
                          <option value=''>Select Status</option>
                          <option value='Open'>Open</option>
                          <option value='Closed'>Closed</option>
                          <option value='Cancelled'>Cancelled</option>
                        </select>

                      </div>
                    </div>

                  </div>
                  <div style={{ height: 420, width: '100%' }}>
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

export default WorkRequest;
