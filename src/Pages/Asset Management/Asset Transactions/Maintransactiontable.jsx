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

function Maintransactiontable() {
    const navigate = useNavigate();
    // print button
    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'AssetItemTag ID': row.AssetItemTagID,
            'AssetItem Description': row.AssetItemDescription,
            'Serial Number': row.SerialNumber,
            'Employee ID': row.EmployeeID,
            'AssetCondition': row.AssetCondition,
            'BuildingCode': row.BuildingCode,
            'LocationCode': row.LocationCode,
        }));

        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">AssetItemTag ID</th>
          <th style="${headerStyle}">AssetItem Description</th>
          <th style="${headerStyle}">Serial Number</th>
          <th style="${headerStyle}">EmployeeID</th>
          <th style="${headerStyle}">AssetCondition</th>
          <th style="${headerStyle}">BuildingCode</th>
          <th style="${headerStyle}">LocationCode</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['AssetItemTag ID']}</td>
            <td>${row['AssetItem Description']}</td>
            <td>${row['Serial Number']}</td>
            <td>${row['Employee ID']}</td>
            <td>${row['AssetCondition']}</td>
            <td>${row['BuildingCode']}</td>
            <td>${row['LocationCode']}</td>
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
    const [getdata, setgetdata] = useState([])
    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/AssetTransactions_GET_LIST`, {
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
        { field: 'AssetItemTagID', headerName: 'ASSET TAG/STOCK NUMBER', width: 200 },
        { field: 'SerialNumber', headerName: 'SERIAL NUMBER', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 200 },
        { field: 'EmployeeID', headerName: 'EMPLOYEE ID', width: 180 },
        { field: 'AssetCondition', headerName: 'ASSET CONDITION', width: 150 },
        { field: 'BuildingCode', headerName: 'BUILDING', width: 200 },
        { field: 'LocationCode', headerName: 'LOACTION', width: 200 },
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
            navigate('/Updata/Assetmaster')
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
                    <MenuItem onClick={() => navigate('/View/transaction')}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/Updata/transaction')}>
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
    const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('')

    const filteredRows = getdata && getdata.filter(row => (
        // (!RequestStatusFilterValue || row.EmployeeID === RequestStatusFilterValue) &&
        (!requestByEmployee || row.AssetItemDescription.toLowerCase().includes(requestByEmployee.toLowerCase()))
    )).map((row, index) => ({
        ...row,
        id: index + 1,
        AssetItemTagID: row.AssetItemTagID,
        SerialNumber: row.SerialNumber,
        AssetItemDescription: row.AssetItemDescription,
        EmployeeID: row.EmployeeID,
        AssetCondition: row.AssetCondition,
        BuildingCode: row.BuildingCode,
        LocationCode: row.LocationCode, //this Both id  is to display a work types desc //ok
        LastPurchaseDate: row.LastPurchaseDate,
        PurchaseAmount: row.PurchaseAmount,
    }))


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
                                        <p className="text-center my-auto ms-5">Asset Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                           Asset Transactions<span className='star'>*</span></p>
                                        <div className="d-flex">
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"
                                             onClick={(() => {
                                                 navigate('/Create/Transaction')
                                            })}
                                            ><AddCircleOutlineIcon className='me-1' />Create</button>
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
                                        <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                   EMPLOYEE ID#<span className='star'>*</span>
                                                </label>
                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select filter Asset Item Description"
                                                    // value={RequestStatusFilterValue}
                                                    className='rounded inputsection py-2'
                                                    // onChange={(e) => RequestStatusFilterValue(e.target.value)}
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
                                                    Asset Item Description<span className='star'>*</span>                                        </label>

                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select filter Asset Item Description"
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

export default Maintransactiontable;
