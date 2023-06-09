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
import moment from 'moment';

function WorkRequest() {
  const navigate = useNavigate();
  const [getdata, setgetdata] = useState([])
  const [WorkTypes, setWorkTypes] = useState()
  const [wordecss, setwordecss] = useState()
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
          <MenuItem>
            <span style={{ paddingRight: '18px' }}>View</span>
            <VisibilityIcon />
          </MenuItem>
          <MenuItem onClick={handleUpdate}>
            <span style={{ paddingRight: '3px' }}>Update</span>
            <EditIcon />
          </MenuItem>
          <MenuItem onClick={handleDeleteButtonClick}>
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
    const filteredRows = getdata && getdata.filter(row => (
      (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
      (!requestByEmployee || row.EmployeeID[0] === requestByEmployee)
    )).map((row, indes) => ({
      ...row,
      id: indes + 1,
      RequestNumber: row.RequestNumber,
      RequestStatus: row.RequestStatus,
      EmployeeID: row.EmployeeID[0],
      WorkPriority: row.WorkPriority,
      RequestDateTime: moment(row.RequestDateTime).format('DD/MM/YYYY'),
      WorkType: row.WorkType,
      workTypeDesc: row.workTypeDesc, //this Both id  is to display a work types desc //ok
      WorkTrade: row.WorkTrade,
      worktradeDesc: row.worktradeDesc,
    }))
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
                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" />
                    <p className="text-center my-auto ms-5">Work Request</p>
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className="topermaringpage mb- container">
                <div className="py-3">
                  <div className="d-flex justify-content-between my-auto">
                    <p className="color1 workitoppro my-auto">
                      Work Request Transactions<span className='star'>*</span></p>
                    <div className="d-flex">
                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                        navigate('/createworkrequest')
                      })}><AddCircleOutlineIcon className='me-1' />Create</button>
                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                        <PrintIcon className="me-1" />
                        Print
                      </button>
                      <button type="button" className="btn btn-outline-primary color2">
                        <img src={excel} alt="export" /> Export
                      </button>
                    </div>
                  </div>
                 
                  <hr className="color3 line" />
                  {/* Search Fields */}
                  <div className="row mx-auto formsection">
                    <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Employee Number<span className='star'>*</span>                                        </label>

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
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-4 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Employee Name<span className='star'>*</span>                                        </label>

                        <input
                          types='text'
                          id='Employeenumber'
                          placeholder="Firstname Middlename Lastname"
                          // value={locationFilterValue}
                          className='rounded inputsection py-2'
                        ></input>
                        <p
                          className='position-absolute text-end serachicon'
                        >
                          <SearchOutlined className=' serachicon' />
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Request Status<span className='star'>*</span>
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
                      rowsPerPageOptions={[10, 25, 50]} // Optional: Set available page size options
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      checkboxSelection
                      disableRowSelectionOnClick
                      disableMultipleSelection
                    />

                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button type="button" className="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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
