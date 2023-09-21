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
import Swal from "sweetalert2";
function Maintablemaster() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'Asset Item Description': row.AssetItemDescription,
            "AssetItem Group": row.AssetItemGroup,
            'Asset Category': row.AssetCategory,
            'Asset SubCategory': row.AssetSubCategory,
            'OnHandQty': row.OnHandQty,
            'LastPurchase Date': row.LastPurchaseDate,
        }));
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">Asset Item Description</th>
          <th style="${headerStyle}">AssetItem Group</th>
          <th style="${headerStyle}">Asset Category</th>
          <th style="${headerStyle}">'Asset SubCategory</th>
          <th style="${headerStyle}">OnHandQty</th>
          <th style="${headerStyle}">LastPurchase Date</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['Asset Item Description']}</td>
            <td>${row['AssetItem Group']}</td>
            <td>${row['Asset Category']}</td>
            <td>${row['Asset SubCategory']}</td>
            <td>${row['OnHandQty']}</td>
            <td>${row['LastPurchase Date']}</td>
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

    useEffect(() => {
        console.log("Testing.....")
        console.log(selectedRow) // when ever you select row or disselect it this selectedRow contains all the data..
        console.log(rowSelectionModel)  // ....clear....???
    }, [])

    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/AssetsMaster_GET_LIST`, {
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

    const [statuscheck, setstatuscheck] = useState()

    const handleAddToWorkRequest = () => {
        console.log("rozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", selectedRow);
        if (!selectedRow || selectedRow.length === 0) {
            Swal.fire({
                title: "Error",
                text: `Select a Asset Master  by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }

        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            navigate(`/Updata/Assetmaster/${firstSelectedRow.AssetItemDescription}`);
        }


        const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
        console.log('Selected Row Data:', selectedRowData);

        setSelectedRowIds(selectedRowData);
    };


    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetCategory', headerName: 'ASSET CATGORY', width: 180 },
        { field: 'AssetSubCategory', headerName: 'ASSET SUB_CATGORY', width: 180 },
        { field: 'OnHandQty', headerName: 'ON-HAND QTY', width: 150 },
        { field: 'LastPurchaseDate', headerName: 'LAST PURCHASE DATE', width: 200 },
        { field: 'PurchaseAmount', headerName: ' PURCHASE AMOUNT', width: 200 },
        // { field: 'LOACTION', headerName: 'LOACTION', width: 200 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
      
    ];

    // Deleted api section
    const Deletedapi = (AssetItemDescription) => {
        console.log(AssetItemDescription);
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
            text: "You want to delete this Asset Master",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/AssetsMaster_DELETE_BYID/${AssetItemDescription}`)
                    .then((res) => {
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        getapi()
                        // Refresh the table data if needed
                        // You can call the API again or remove the deleted row from the state
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Error deleting', err);
                    });
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    `Asset Master ${AssetItemDescription} has been deleted.`,
                    'success'
                )
            }
        })

    };

    const [getemplodata, setgetemplodata] = useState([])
    const putapi = (AssetItemDescription) => {
        const assetcodeid = localStorage.getItem('EmployeeIDsetss') || localStorage.getItem('requestnumber');
        console.log(localStorage.getItem('requestnumber'));
        console.log(AssetItemDescription);
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
            text: "You won't to Add !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/api/assetworkrequest_post`, {
                    RequestNumber: assetcodeid,
                    AssetItemDescription: AssetItemDescription
                })
                    .then((res) => {
                        console.log('Asset desc Add  successfully', res);
                        setgetemplodata(res.data.recordset)
                        console.log();
                        getapi()

                        swalWithBootstrapButtons.fire(
                            'Add!',
                            'The AssetCode is successfully Add to the Work request.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Add Asset work Request Error :', err);
                    });

            }
        })

    };


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
                    <MenuItem onClick={() => navigate(`/View/Assetmaster/${params.row.AssetItemDescription}`)}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={() => navigate(`/Updata/Assetmaster/${params.row.AssetItemDescription}`)}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        Deletedapi(params.row.AssetItemDescription)
                        handleMenuClose();
                    }}  >
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
        (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
            (!requestByEmployee || row.AssetItemDescription.toLowerCase().includes(requestByEmployee.toLowerCase()))
    )).map((row, index) => {
        const isLastPurchaseDateValid = !isNaN(Date.parse(row.LastPurchaseDate));
        return {
            ...row,
            id: index + 1,
            AssetItemDescription: row.AssetItemDescription,
            AssetItemGroup: row.AssetItemGroup,
            AssetCategory: row.AssetCategory,
            AssetSubCategory: row.AssetSubCategory,
            RequestDateTime: row.RequestDateTime,
            WorkType: row.WorkType,
            OnHandQty: row.OnHandQty, //this Both id  is to display a work types desc //ok
            LastPurchaseDate: isLastPurchaseDateValid ? row.LastPurchaseDate : '',
            PurchaseAmount: row.PurchaseAmount,
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
                                        <p className="text-center my-auto ms-5">Asset Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            Asset Master List</p>
                                        <div className="d-flex">
                                            <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Order is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                         <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/createAssetMaster')
                                            })}><AddCircleOutlineIcon className='me-1' />Create</button>

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredRows)}><PrintIcon className='me-1' />Print</button>

                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />
                                    {
                                        getemplodata && getemplodata.map((item, index) => (
                                            <p key={index}>{localStorage.setItem('postemployid', item.EmployeeID)}</p>

                                        ))
                                    }
                                    {/* Search Fields */}
                                    <div className="row mx-auto formsection">
                                        <div className="col-sm-10 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    Asset Item Description                                       </label>

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
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Maintablemaster;
