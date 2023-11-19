import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
import { SearchOutlined } from '@ant-design/icons';
import excel from '../../Image/excel.png';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import Siderbar from '../Siderbar/Siderbar';

function Addsystemmodule() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'System Module Codes': row.SystemModuleCode,
            'System Module Desc': row.SystemModuleDesc,
            'System Module Seq': row.SystemModuleSeq,
        }));
        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">System Module Codes</th>
          <th style="${headerStyle}">System Module Desc</th>
          <th style="${headerStyle}">System Module Seq</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['System Module Codes']}</td>
            <td>${row['System Module Desc']}</td>
            <td>${row['System Module Seq']}</td>
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
        axios.get(`/api/SystemModules_GET_LIST`)
            .then((res) => {
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
           if (clickedRow) {
                setSelectedRowIds((prevSelected) => ({
                    ...prevSelected,
                    [params.id]: !prevSelected[params.id] // Toggle the selection
                }));
            }
        }
    };

    const handleAddToWorkRequest = () => {
        const selectedRowData = selectedRow?.map((row) => row?.SystemModuleCode);
        setSelectedRowIds(selectedRowData)
        let oneDesc = selectedRowData;
        putapi(oneDesc)
    };

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 110 },
        { field: 'SystemModuleCode', headerName: 'System Module Code', width: 250 },
        { field: 'SystemModuleDesc', headerName: 'System Module Desc', width: 400 },
        { field: 'SystemModuleSeq', headerName: 'System Module Seq', width: 250 },
    ];

    const putapi = (SystemModuleCode) => {
        const assetcodeid = localStorage.getItem('EmployeeIDusemoduule') || localStorage.getItem('updataEmployeeIDusemoduule');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2',
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You want to Add ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/api/systemaccess_ADD_post`, {
                    EmployeeID: assetcodeid,
                    SystemModuleCodes: SystemModuleCode
                })
                    .then((res) => {
                        getapi()
                        setSelectedRowIds([]); // Clear selected row IDs
                        setRowSelectionModel([]); // Clear row selection model
                        swalWithBootstrapButtons.fire(
                            'Add!',
                            `The selected records are added to the User Access :${localStorage.getItem('EmployeeIDusemoduule') || localStorage.getItem('updataEmployeeIDusemoduule')} `,
                            'success'
                        )
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Add Asset Code Error:', err);
                        swalWithBootstrapButtons.fire(
                            'Error!',
                            `${err.response.data.error}`,
                            'error'
                        )
                    });

            }
        })

    };

    const [requestByEmployee, setrequestByEmployee] = useState('');

    const filteredRows = getdata && getdata.filter(row => (
        (!requestByEmployee || row.SystemModuleCode.toLowerCase().includes(requestByEmployee.toLowerCase()))
    )).map((row, index) => {
        return {
            ...row,
            id: index + 1,
            SystemModuleCode: row.SystemModuleCode,
            SystemModuleDesc: row.SystemModuleDesc,
            SystemModuleSeq: row.SystemModuleSeq,
        };
    });

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const Navigatepage = () => {
        const employeeIDss = localStorage.getItem('EmployeeIDusemoduule');

        if (employeeIDss) {
            navigate('/Create/usersystemaccess');
        } else {

            navigate(-1);

        }
    };

    return (
        <>
            <div className="bg">
                <div className="">
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={Navigatepage} />
                                    <p className="text-center my-auto ms-5">User Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div className="topermaringpage mb- container">
                            <div className="py-3">
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        User Access</p>
                                    <div className="d-flex">
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
                                <div style={{ height: 420, width: '83%', margin: 'auto' }}>
                                    <div className="row my-auto formsection">
                                        <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    System Module Code</label>
                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select filter System Module Code"
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

                                        <div className="col-sm-2 col-md-3 col-lg-3 col-xl-3 my-auto">
                                            <button type="button" className="border-0 px-3 mt-4 savebtn py-2" onClick={handleAddToWorkRequest}><AddCircleOutlineIcon className='me-2' />Add System Module</button>
                                        </div>

                                        <div className="col-sm-2 col-md-4 col-lg-4 text-end col-xl-4 my-auto">
                                            <p className='mt-4 fs-5 fw-bolder color3 font-monospace me-3'>{localStorage.getItem('EmployeeIDusemoduule') || localStorage.getItem('updataEmployeeIDusemoduule')}</p>
                                        </div>

                                    </div>
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
                                            setRowSelectionModel(newRowSelectionModel);
                                            const selectedRows = filteredRows.filter((row) => newRowSelectionModel.includes(row.id));
                                            setSelectedRow(selectedRows);
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={Navigatepage}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Addsystemmodule;
