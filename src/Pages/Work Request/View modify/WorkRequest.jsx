import React, { useState } from 'react';
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
function WorkRequest() {
    const navigate = useNavigate();   

  const columns = [
    { field: 'SEQ.', headerName: 'SEQ.', width: 90 },
    { field: 'WORK REQUEST#', headerName: 'WORK REQUEST#', width: 160 },
    { field: 'REQUEST STATUS', headerName: 'REQUEST STATUS', width: 160 },
    { field: 'REQUEST BY EMP#', headerName: 'REQUEST BY EMP#', width: 160 },
    { field: 'PRIORITY', headerName: 'PRIORITY', width: 150 },
    { field: 'REQUEST DATE', headerName: 'REQUEST DATE', width: 150 },
    { field: 'WORK TYPE DESC', headerName: 'WORK TYPE DESC', width: 160 },
    { field: 'WORK TRADE DESC', headerName: 'WORK TRADE DESC', width: 160 },
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
  <Button className='actionBtn' onClick={handleMenuOpen} style={{color: "black"}}>
    <span style={{paddingRight: '10px'}}>Action</span>
    <ArrowDropDownIcon />
  </Button>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
  >
    <MenuItem>
      <span style={{paddingRight: '18px'}}>View</span>
      <VisibilityIcon />
    </MenuItem>
    <MenuItem onClick={handleUpdate}>
      <span style={{paddingRight: '3px'}}>Update</span>
      <EditIcon />
    </MenuItem>
    <MenuItem onClick={handleDeleteButtonClick}>
      <span style={{paddingRight: '10px'}}>Delete</span>
      <DeleteIcon />
    </MenuItem>
  </Menu>
</div>


      );
    }

  const generateRandomData = () => {
    const rows = [];
    for (let i = 1; i <= 10; i++) {
      rows.push({
        id: i,
        'SEQ.': i,
        'WORK REQUEST#': `Work Request-${i}`,
        'REQUEST STATUS': Math.random() < 0.5 ? 'Pending' : 'Completed',
        'REQUEST BY EMP#': `EMPNO-${i}`,
        'PRIORITY': Math.random()<0.5 ? "High" :"Low",
        'REQUEST DATE': new Date().toLocaleDateString(),
        'WORK TYPE DESC': `work type desc-${i}`,
        'WORK TRADE DESC': `work type desc-${i}`,
        'ACTION': `Building ${i}`,
      });
    }
    return rows;
  };

  const rows = generateRandomData();

  const [requestByEmployee, setrequestByEmployee] = useState('');
  const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('');

  const filteredRows = rows.filter((row) =>
    row['REQUEST BY EMP#'].toLowerCase().includes(requestByEmployee.toLowerCase()) &&
    row['REQUEST STATUS'].toLowerCase().includes(RequestStatusFilterValue.toLowerCase())
  );

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
                                        <label  className='lablesection color3 text-start mb-1 filter-label'>
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
                                        <label  className='lablesection color3 text-start mb-1 filter-label'>
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
      <option value='completed'>Completed</option>
      <option value='pending'>Pending</option>
    </select>

  </div>
</div>

                    </div>
                  <div style={{ height: 420, width: '100%' }}>
                    <DataGrid
                      rows={filteredRows}
                      columns={columns}
                      pageSize={5}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                                <button type="button" class="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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
