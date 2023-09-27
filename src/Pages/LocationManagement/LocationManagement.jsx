import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
import excel from '../../Image/excel.png';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from "react-csv";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import './locationmanagement.css';

function LocationManagement() {
  const navigate = useNavigate();
  const [getdata, setgetdata] = useState([])
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [dropdownLocation, setdropdownLocation] = useState([])
  const [LocationCodefiltervalue, setLocationCodefiltervalue] = useState('')
  const [DepartmentCodefilter, setDepartmentCodefilter] = useState()
  const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
  const [BuildingCodefiltervalue, setBuildingCodefiltervalue] = useState('')
  const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
  const [BuildingCode, setBuildingCode] = useState('')
  const [DepartmentCode, setDepartmentCode] = useState('')
  const [LocationCode, setLocationCode] = useState('')

  const [Model, setModel] = useState(""); 

  useEffect(() => {
    // Location
    axios.get(`/api/Location_LIST`).then((res) => {
      setdropdownLocation(res.data.recordsets[0])
    })
      .catch((err) => {
        console.log(err);
      });
    // Department_LIST
    axios.get(`/api/Department_LIST`).then((res) => {
      setdropdownDepartmentLIST(res.data.recordsets[0])
    })
      .catch((err) => {
        console.log(err);
      });
    // Building_LIST
    axios.get(`/api/Building_LIST`).then((res) => {
      setdropdownBuildingLIST(res.data.recordsets[0])
    })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  const handlePrintTable = (tableData) => {
    const printWindow = window.open('', '_blank');
    const selectedData = tableData.map((row, index) => ({
      'SEQ': index + 1,
      'WorkOrderNumber': row.WorkOrderNumber,
      "WorkStatus": row.WorkStatus,
      'WorkType': row.WorkType,
      'WorkPriority': row.WorkPriority,
      'Failure Code': row.FailureCode,
      'Scheduled DateTime': row.ScheduledDateTime,
      'Building Code': row.BuildingCode,
      'Location Code': row.LocationCode,
      'Department Code': row.DepartmentCode,
    }));
    const headerStyle = 'font-weight: bold;';

    const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">WorkOrderNumber</th>
          <th style="${headerStyle}">WorkStatus</th>
          <th style="${headerStyle}">WorkType</th>
          <th style="${headerStyle}">'WorkPriority</th>
          <th style="${headerStyle}">Failure Code</th>
          <th style="${headerStyle}">Scheduled DateTime</th>
           <th style="${headerStyle}">'Building Code</th>
          <th style="${headerStyle}">Location Code</th>
          <th style="${headerStyle}">Department Code</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['WorkOrderNumber']}</td>
            <td>${row['WorkStatus']}</td>
            <td>${row['WorkType']}</td>
            <td>${row['WorkPriority']}</td>
            <td>${row['Failure Code']}</td>
            <td>${row['Scheduled DateTime']}</td>
               <td>${row['Building Code']}</td>
            <td>${row['Location Code']}</td>
            <td>${row['Department Code']}</td>
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
    axios.get(`/api/location_managment_All`, {
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

  const handleCellClick = (params, event) => {
    const columnField = params.field;
    if (columnField === '__check__') {
      const clickedRow = filteredRows.find((row) => row.id === params.id);
      console.log(params.id);
      if (clickedRow) {
        console.log("Selected row data:", clickedRow);
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

  const columns = [
    { field: 'id', headerName: 'SEQ.', width: 90 },
    { field: 'WorkOrderNumber', headerName: 'WORK ORDER#', width: 150 },
    { field: 'WorkStatus', headerName: 'WORK STATUS', width: 150 },
    { field: 'WorkType', headerName: 'WORK TYPE', width: 150 },
    { field: 'WorkPriority', headerName: 'PRIORITY', width: 150 },
    { field: 'ScheduledDateTime', headerName: 'SCHEDULED DATE', width: 150 },
    { field: 'FailureCode', headerName: 'FAILURE CODE', width: 150 },
    { field: 'AssignedtoEmployeeID', headerName: 'ASSIGNED TO EMP#', width: 150 },
    { field: 'DepartmentCode', headerName: 'DEPARTMENT', width: 150 },
    { field: 'BuildingCode', headerName: 'BUILDING', width: 150 },
    { field: 'LocationCode', headerName: 'LOCATION', width: 150 },
  ];

  const filteredRows = getdata && getdata.filter(row => (
    (!BuildingCodefiltervalue || row.BuildingCode === BuildingCodefiltervalue) &&
    (!DepartmentCodefilter || row.DepartmentCode === DepartmentCodefilter) &&
    (!LocationCodefiltervalue || row.LocationCode === LocationCodefiltervalue)
  )).map((row, index) => {
    const isLastPurchaseDateValid = !isNaN(Date.parse(row.ScheduledDateTime));
    return {
      ...row,
      id: index + 1,
      WorkOrderNumber: row.WorkOrderNumber[0],
      WorkStatus: row.WorkStatus,
      WorkType: row.WorkType,
      WorkPriority: row.WorkPriority[0],
      WorkType: row.WorkType,
      FailureCode: row.FailureCode,
      AssignedtoEmployeeID: row.AssignedtoEmployeeID,
      BuildingCode: row.BuildingCode,
      DepartmentCode: row.DepartmentCode,
      LocationCode: row.LocationCode,
      ScheduledDateTime: isLastPurchaseDateValid ? row.ScheduledDateTime : '',
    };

  })

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
                    <p className="text-center my-auto ms-5">Location Management</p>
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className="topermaringpage mb-2 container">
                <div className="py-3">
                  <div className="d-flex justify-content-between my-auto">
                    <p className="color1 workitoppro my-auto">
                      Location Management</p>
                    <div className="d-flex">

                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredRows)}><PrintIcon className='me-1' />Print</button>

                      <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                      </CSVLink>
                    </div>
                  </div>

                  <hr className="color3 line" />

                  {/* Search Fields */}
                  <div className="row mx-auto formsection">

                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                          Building
                        </label>
                        <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example"
                          value={BuildingCodefiltervalue}
                          onChange={(e) => {
                            setBuildingCodefiltervalue(e.target.value)
                          }}>
                          <option className='inputsectiondropdpwn' value=''>Select Dept Code</option>
                          {
                            dropdownBuildingLIST && dropdownBuildingLIST.map((itme, index) => {
                              return (
                                <option key={index} value={itme.BuildingCode}>{itme.BuildingCode}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                          Department Code
                        </label>
                        <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example"
                          value={DepartmentCodefilter}
                          onChange={(e) => {
                            setDepartmentCodefilter(e.target.value)
                          }
                          }
                        >

                          <option className='inputsectiondropdpwn' value=''>Select Dept Code</option>
                          {
                            dropdownDepartmentLIST && dropdownDepartmentLIST.map((itme, index) => {
                              return (
                                <option key={index} value={itme.DepartmentCode}>{itme.DepartmentCode}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                          Location
                        </label>

                        <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                          value={LocationCodefiltervalue}
                          onChange={((e) => {
                            setLocationCodefiltervalue(e.target.value)
                          })}
                        >
                          <option className='inputsectiondropdpwn' value=''>Select Location</option>
                          {
                            dropdownLocation && dropdownLocation.map((itme, index) => {
                              return (
                                <option key={index} value={itme.LocationCode}>{itme.LocationCode}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>

                  </div>
                  <div style={{ height: 420, width: '100%' }}>
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

                  </div>
                </div>
                {/* Location  */}
                <p className="text-start my-2 color3 lablesection fw-bold">Location Management</p>

                <div className="d-flex justify-content-between">
                  <div className="py-2 px-2 border border-dark rounded">
                    <div className="row mx-auto w-100 formsection">

                      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-2'>
                          <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                            Building
                          </label>
                          <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example"
                            value={BuildingCode}
                            onChange={(e) => {
                              setBuildingCode(e.target.value)
                            }}>
                            <option className='inputsectiondropdpwn' value=''>Select Dept Code</option>
                            {
                              dropdownBuildingLIST && dropdownBuildingLIST.map((itme, index) => {
                                return (
                                  <option key={index} value={itme.BuildingCode}>{itme.BuildingCode}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-2'>
                          <label htmlFor='Departmentcode' className='lablesection color3 text-start mb-1'>
                            Department Code
                          </label>
                          <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example"
                            value={DepartmentCode}
                            onChange={(e) => {
                              setDepartmentCode(e.target.value)
                            }
                            }
                          >

                            <option className='inputsectiondropdpwn' value=''>Select Dept Code</option>
                            {
                              dropdownDepartmentLIST && dropdownDepartmentLIST.map((itme, index) => {
                                return (
                                  <option key={index} value={itme.DepartmentCode}>{itme.DepartmentCode}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-2'>
                          <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                            Location
                          </label>

                          <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                            value={LocationCode}
                            onChange={((e) => {
                              setLocationCode(e.target.value)
                            })}
                          >
                            <option className='inputsectiondropdpwn' value=''>Select Location</option>
                            {
                              dropdownLocation && dropdownLocation.map((itme, index) => {
                                return (
                                  <option key={index} value={itme.LocationCode}>{itme.LocationCode}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className='my-auto py-2 '>
                    <div className='emailsection position-relative my-auto'>
                      <label htmlFor='' className='lablesection color3 text-start mb-1'>

                      </label>
                      <input
                        type='text'
                        id='Model'
                        value={Model}
                        onChange={e => {
                          setModel(e.target.value)
                        }}
                        className=' rounded inputsectiondropdpwn color2 py-2 w-75 text-center'
                        placeholder='9999'
                      ></input>
                    </div>
                  </div>

                </div>

                <div className="d-flex justify-content-between my-3">
                  <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                    navigate('/')
                  })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                  <button type="button" class=" px-3 mx-2 proceedbtn py-2"><VideoLibraryIcon className='me-2' />PROCEED TO TRANSFER</button>

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
