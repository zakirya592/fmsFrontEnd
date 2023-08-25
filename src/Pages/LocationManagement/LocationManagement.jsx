import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import '../Work Request/View modify/Viewmodify.css';
import '../../Component/Siderbar/Sidebar.css';
import PrintIcon from '@mui/icons-material/Print';
import { SearchOutlined } from '@ant-design/icons';
import excel from '../../Image/excel.png';
import './locationmanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate } from 'react-router-dom';


function LocationManagement() {

  const columns = [
    { field: 'SEQ.', headerName: 'SEQ.', width: 90 },
    { field: 'WORK ORDER#', headerName: 'WORK ORDER#', width: 150 },
    { field: 'WORK STATUS', headerName: 'WORK STATUS', width: 150 },
    { field: 'WORK TYPE', headerName: 'WORK TYPE', width: 150 },
    { field: 'PRIORITY', headerName: 'PRIORITY', width: 150 },
    { field: 'SCHEDULED DATE', headerName: 'SCHEDULED DATE', width: 150 },
    { field: 'FINDING CODE', headerName: 'FINDING CODE', width: 150 },
    { field: 'ASSIGNED TO EMP#', headerName: 'ASSIGNED TO EMP#', width: 150 },
    { field: 'DEPARTMENT', headerName: 'DEPARTMENT', width: 150 },
    { field: 'BUILDING', headerName: 'BUILDING', width: 150 },
    { field: 'LOCATION', headerName: 'LOCATION', width: 150 },
  ];
  const navigate = useNavigate();

  const generateRandomData = () => {
    const rows = [];
    for (let i = 1; i <= 10; i++) {
      rows.push({
        id: i,
        'SEQ.': i,
        'WORK ORDER#': `WO-${i}`,
        'WORK STATUS': Math.random() < 0.5 ? 'Pending' : 'Completed',
        'WORK TYPE': Math.random() < 0.5 ? 'Repair' : 'Maintenance',
        'PRIORITY': Math.floor(Math.random() * 10) + 1,
        'SCHEDULED DATE': new Date().toLocaleDateString(),
        'FINDING CODE': `FC-${i}`,
        'ASSIGNED TO EMP#': `EMP-${i}`,
        'DEPARTMENT': `Department ${i}`,
        'BUILDING': `Building ${i}`,
        'LOCATION': `Location ${i}`,
      });
    }
    return rows;
  };

  const rows = generateRandomData();

  const [filterValue, setFilterValue] = useState('');
  const [locationFilterValue, setLocationFilterValue] = useState('');
  const [departmentFilterValue, setDepartmentFilterValue] = useState('');

  const filteredRows = rows.filter((row) =>
    row['BUILDING'].toLowerCase().includes(filterValue.toLowerCase()) &&
    row['LOCATION'].toLowerCase().includes(locationFilterValue.toLowerCase()) &&
    row['DEPARTMENT'].toLowerCase().includes(departmentFilterValue.toLowerCase())
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
                  <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                      navigate('/')
                    })} />                    <p className="text-center my-auto ms-5">Location Management</p>
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className="topermaringpage mb- container">
                <div className="py-3">
                  <div className="d-flex justify-content-between my-auto">
                    <p className="color1 workitoppro my-auto">Location Management<span className='star'>*</span></p>
                    <div className="d-flex">
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
                                        Building<span className='star'>*</span>                                        </label>

                                        <input
                                            types='text'
                                            id='Employeenumber'
                                            placeholder="Select Building "
                                            value={filterValue}
                                            className='rounded inputsection py-2'
                                            onChange={(e) => setFilterValue(e.target.value)}
                                        ></input>
                                        <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                    </div>
                    </div>
                  <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label  className='lablesection color3 text-start mb-1 filter-label'>
                                        Location<span className='star'>*</span>                                        </label>

                                        <input
                                            types='text'
                                            id='Employeenumber'
                                            placeholder="Select Building "
                                            value={locationFilterValue}
                                            className='rounded inputsection py-2'
                                            onChange={(e) => setLocationFilterValue(e.target.value)}
                                        ></input>
                                        <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                    </div>
                    </div>
                  <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label  className='lablesection color3 text-start mb-1 filter-label'>
                                        Department<span className='star'>*</span>                                        </label>

                                        <input
                                            types='text'
                                            id='Employeenumber'
                                            placeholder="Select Dept Code"
                                            value={departmentFilterValue}
                                            className='rounded inputsection py-2'
                                            onChange={(e) => setDepartmentFilterValue(e.target.value)}
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
                      rows={filteredRows}
                      columns={columns}
                      pageSize={5}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                  <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                      navigate('/')
                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                <button type="button" class="border-0 px-3  proceedbtn py-2"><VideoLibraryIcon className='me-2'/>Proceed to Transfer</button>
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

export default LocationManagement;
