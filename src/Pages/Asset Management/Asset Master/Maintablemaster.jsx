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
            // This condition checks if the clicked cell is a checkbox cell
            // Retrieve the entire data of the clicked row using its ID
            const clickedRow = filteredRows.find((row) => row.id === params.id);
            if (clickedRow) {
                console.log("Selected row data:", clickedRow);
            }
        }
    };

    const handleButtonAddToWorkRequest = (rowId) => {
        const selectedData = filteredRows.filter((row) => row.id === rowId);
        console.log("Selected rows data:", selectedData);
    };
    
    


    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetCategory', headerName: 'ASSET CATGORY', width: 180 },
        { field: 'AssetSubCategory', headerName: 'ASSET SUB_CATGORY', width: 180 },
        { field: 'RequestDateTime', headerName: 'ON-HAND QTY', width: 150 },
        { field: 'workTypeDesc', headerName: 'LAST PURCHASE DATE', width: 200 },
        { field: 'BUILDING', headerName: 'BUILDING', width: 200 },
        { field: 'LOACTION', headerName: 'LOACTION', width: 200 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
        {
            field: 'addToWorkRequest',
            headerName: 'Add To Work Request',
            width: 180,
            renderCell: (params) => (
                <button
                    type="button"
                    className="border-0 px-3 savebtn py-2"
                    onClick={() => handleButtonAddToWorkRequest(params.id)}
                >
                    Add To Work Request
                </button>
            ),
        }
        
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
            text: "You won't be able to revert this!",
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
                    'User has been deleted.',
                    'success'
                )
            }
        })

    };

const [getemplodata, setgetemplodata] = useState([])
    const putapi = (AssetItemDescription) => {
        const assetcodeid = localStorage.getItem('requestnumber') || localStorage.getItem('EmployeeIDsetss');
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
                axios.post(`/api/assetworkrequest_post`,{
                    EmployeeID: assetcodeid,
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

                    <MenuItem onClick={(e) => {
                        putapi(params.row.AssetItemDescription);
                        handleMenuClose();
                    }}>
                        <span style={{ paddingRight: '10px' }}>ADD TO WORK REQUEST</span>
                    </MenuItem>
                </Menu>
            </div>


        );
    }
    const [requestByEmployee, setrequestByEmployee] = useState('');
    const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('')


    const filteredRows = getdata && getdata.filter(row => (
        (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
        (!requestByEmployee || row.AssetItemDescription === requestByEmployee) 
      )).map((row, index) => ({
        ...row,
        id: index + 1,
      AssetItemDescription: row.AssetItemDescription,
      AssetItemGroup: row.AssetItemGroup ,
      AssetCategory: row.AssetCategory,
      AssetSubCategory: row.AssetSubCategory,
      RequestDateTime:row.RequestDateTime,
      WorkType: row.WorkType,
      workTypeDesc: row.workTypeDesc //this Both id  is to display a work types desc //ok
    }))

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const handlePrint = () => {
        window.print(); // This triggers the browser's print dialog
    };
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
                                            navigate('/workrequest')
                                        })} />
                                        <p className="text-center my-auto ms-5">Asset Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            Asset Master List<span className='star'>*</span></p>
                                        <div className="d-flex">
                                            {/* <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                                navigate('/createworkrequest')
                                            })}>
                                          <AddCircleOutlineIcon className='me-1' />Create
                                          </button> */}

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={handlePrint}>
                                                <PrintIcon className="me-1" />
                                                Print
                                            </button>
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
                                        <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    Asset Item Group<span className='star'>*</span>
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
                    onSelectionModelChange={(newSelection) => {
                        setSelectedRowIds(newSelection);
                        console.log("Selected rows:", newSelection);
                    }}
                />

                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                            navigate('/workrequest')
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
