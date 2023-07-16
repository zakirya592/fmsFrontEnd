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

function Maintransactiontable() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])
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
        { field: 'ASSETITEMDESCRIPTION', headerName: 'ASSET TAG/STOCK NUMBER', width: 220 },
        { field: 'ASSETITEMGROUP', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'ASSETCATGORY', headerName: 'ASSET CATGORY', width: 180 },
        { field: 'ASSETsbuCATGORY', headerName: 'ASSET SUB_CATGORY', width: 180 },
        { field: 'RequestDateTime', headerName: 'ON-HAND QTY', width: 150 },
        { field: 'workTypeDesc', headerName: 'LAST PURCHASE DATE', width: 200 },
        { field: 'BUILDING', headerName: 'BUILDING', width: 200 },
        { field: 'LOACTION', headerName: 'LOACTION', width: 200 },
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
                    <MenuItem onClick={() => navigate('/View/transaction')}>
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
    //   RequestDateTime:row.RequestDateTime,
    //   WorkType: row.WorkType,
    //   workTypeDesc: row.workTypeDesc //this Both id  is to display a work types desc //ok
    // }))

    const filteredRows = Array.from({ length: 10 }).map((_, index) => {
        return {
            id: index + 1,
            ASSETITEMDESCRIPTION: `ASSET ITEM DESCRIPTION-${index + 1}`,
            ASSETITEMGROUP: `ASSET ITEM GROUP-${index + 1}`,
            ASSETCATGORY: `ASSET CATGORY-${index + 1}`,
            ASSETsbuCATGORY: `ASSET SUB-CATGORY-${index + 1}`,
            RequestDateTime: `ASSET ITEM GROUP-${index + 1}`,
            WorkType: `ASSET ITEM GROUP-${index + 1}`,
            workTypeDesc: `Work Type Desc ${index + 1}`,
            BUILDING: `BUILDING-${index + 1}`,
            LOACTION: `LOACTION ${index + 1}`,
        };
    });


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
                                        <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                   EMPLOYEE ID#<span className='star'>*</span>
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

export default Maintransactiontable;
