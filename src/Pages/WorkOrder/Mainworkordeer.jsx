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

function Mainworkordeer() {
    const navigate = useNavigate();

    const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('');
    const [requestByEmployee, setrequestByEmployee] = useState('');
    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'OrdeerNumber', headerName: 'ORDER NUMBER#', width: 160 },
        { field: 'OrderStatus', headerName: 'ORDER STATUS', width: 160 },
        { field: 'EmployeeID', headerName: 'ORDER BY EMP#', width: 160 },
        { field: 'OrderPriority', headerName: 'PRIORITY', width: 150 },
        { field: 'OrderDateTime', headerName: 'ORDER DATE', width: 200 },
        { field: 'OrdertypeDesc', headerName: 'ORDER TYPE DESC', width: 160 },
        { field: 'ordertradeDesc', headerName: 'ORDER TRADE DESC', width: 160 },

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
                    <MenuItem onClick={() => navigate('/workorder/view')}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/workorder/view')}>
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
    const filteredRows = Array.from({ length: 100 }).map((_, index) => {
        return {
            id: index + 1,
            OrdeerNumber: `OrdeerNumber-${index + 1}`,
            OrderStatus: `OrderStatus-${index + 1}`,
            EmployeeID: `EmployeeID-${index + 1}`,
            OrderPriority: `OrderPriority-${index + 1}`,
            OrderDateTime: `OrderDateTime-${index + 1}`,
            OrdertypeDesc: `OrdertypeDesc-${index + 1}`,
            ordertradeDesc: `ordertradeDesc-${index + 1}`,
        };
    });


    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
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
                                  <p className="text-center my-auto mx-auto">Work Order</p>
                              </Typography>
                          </Toolbar>
                      </AppBar>
                      <div className="topermaringpage mb-4 container">
                          <div className="py-3">


                              {/* Top section */}
                              <div className="d-flex justify-content-between my-auto">
                                  <p className='color1 workitoppro my-auto'>Work Order<span className='star'>*</span></p>
                                  <div className="d-flex">
                                      {/* create */}
                                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                          navigate('/workorder/view')
                                      })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                      {/* print  */}
                                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
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
                          Order Number</label>

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
                          Order Status
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
                              {/* table section */}
                              <div style={{ height: 400, width: '100%' }}>
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

export default Mainworkordeer