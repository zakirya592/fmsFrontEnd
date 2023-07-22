import React, { useState, useEffect } from 'react'
import Siderbar from '../../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from "react-router-dom";
import excel from "../../../../Image/excel.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { SearchOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
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
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
function PurchaserequestView() {

    const navigate = useNavigate();
    const [value, setvalue] = useState({
        PurchaseRequest:'', RequestDate: '', DateRequired: '',
        Requestedby: '', EmployeeName:'',
        Purpose:'', VATInclusive:'',
        UBTOTALAMOUNT: '', VAT: '', TOTALAMOUNT:'',
        VendorCode:'', VendorName:'',
        Verifiedby: '', EmployeeName2: '',
    })

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'PurchaseRequest', headerName: 'Purchase Request', width: 200 },
        { field: 'PurchaseRequestDetail', headerName: 'Purchase RequestDetail', width: 200 },
        { field: 'MaterialMaster', headerName: 'Material Master', width: 180 },
        { field: 'VendorMaster', headerName: 'Vendor Master', width: 200 },
        { field: 'EmployeeMaster', headerName: 'Employee Master', width: 180 },
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
    const filteredRows = Array.from({ length: 100 }).map((_, index) => {
        return {
            id: index + 1,
            PurchaseRequest: `PurchaseRequest-${index + 1}`,
            PurchaseRequestDetail: `PurchaseRequestDetail-${index + 1}`,
            MaterialMaster: `MaterialMaster-${index + 1}`,
            VendorMaster: `VendorMaster-${index + 1}`,
            EmployeeMaster: `EmployeeMaster-${index + 1}`,
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" />
                                    <p className="text-center my-auto mx-auto">Purchasing Management </p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>View/Modify Purchase Requests</p>
                                    <div className="d-flex">
                                        
                                        {/* create */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                            navigate('/createworkrequest')
                                        })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                        {/* print  */}
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"><PrintIcon className='me-1' />Print</button>
                                        {/* excel  */}
                                        <button type="button" className="btn btn-outline-primary color2"><img src={excel} /> Export</button>
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='PurchaseRequest' className='lablesection color3 text-start mb-1'>
                                                Purchase Request #<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='PurchaseRequest'
                                                value={value.PurchaseRequest}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        PurchaseRequest: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter PR Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='RequestDate' className='lablesection color3 text-start mb-1'>
                                                Request Date<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="RequestDate"

                                                value={value.RequestDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestDate: e.target.value
                                                    }))
                                                }}
                                                name="RequestDate" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='DateRequired' className='lablesection color3 text-start mb-1'>
                                                Date Required<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="Employdata"

                                                value={value.DateRequired}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        DateRequired: e.target.value
                                                    }))
                                                }}
                                                name="DateRequired" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                </div>

                                {/* Row Two */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Requestedby' className='lablesection color3 text-start mb-1'>
                                                Requested by<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Requestedby'
                                                value={value.Requestedby}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Requestedby: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Employee Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeName' className='lablesection color3 text-start mb-1'>
                                                Employee Name<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeName'
                                                value={value.EmployeeName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        EmployeeName: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mx-auto formsection justify-content-between">
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Purpose' className='lablesection color3 text-start mb-1'>
                                                Purpose<span className='star'>*</span>
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Please provide nature or purpose of the request " id="Purpose"
                                                    value={value.Purpose}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            Purpose: e.target.value
                                                        }))
                                                    }}
                                                ></textarea>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 mt-auto">
                                        <div className='emailsection d-flex my-2'>
                                            <label htmlFor='VATInclusive' className='lablesection my-auto color3 text-start mb-1'>
                                                VAT Inclusive(Y/N)?<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='VATInclusive'
                                                value={value.VATInclusive}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        VATInclusive: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection w-25 py-2'
                                                placeholder='Y'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <hr className='color3 line' />
{/* table section */}
                                <div style={{ height: 350, width: '100%' }}>
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

                                <div className="d-flex justify-content-end">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='UBTOTALAMOUNT' className='lablesection color3 text-start mb-1'>
                                            SUB TOTAL AMOUNT<span className='star'>*</span>
                                        </label>

                                        <input
                                            types='text'
                                            id='UBTOTALAMOUNT'
                                            value={value.UBTOTALAMOUNT}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    UBTOTALAMOUNT: e.target.value
                                                }))
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='SUB TOTAL AMOUNT'
                                            required
                                        ></input>

                                    </div>
                                    <span className='my-auto mx-3'>
                                        <PlusOutlined className='mt-3'/>
                                    </span>
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='VAT' className='lablesection color3 text-start mb-1'>
                                            VAT<span className='star'>*</span>
                                        </label>

                                        <input
                                            types='text'
                                            id='VAT'
                                            value={value.VAT}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    VAT: e.target.value
                                                }))
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='VAT'
                                            required
                                        ></input>

                                    </div>
                                    <span className='my-auto mx-3'>
                                        =
                                    </span>
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='TOTALAMOUNT' className='lablesection color3 text-start mb-1'>
                                            TOTAL AMOUNT<span className='star'>*</span>
                                        </label>

                                        <input
                                            types='text'
                                            id='TOTALAMOUNT'
                                            value={value.TOTALAMOUNT}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    TOTALAMOUNT: e.target.value
                                                }))
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='TOTAL AMOUNT'
                                            required
                                        ></input>

                                    </div>
                                </div>


                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='VendorCode' className='lablesection color3 text-start mb-1'>
                                                Vendor Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="VendorCode" aria-label="Floating label select example" value={value.VendorCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        VendorCode: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='inputsectiondropdpwn'>Vendor Code</option>
                                             
                                                            <option value='1'>Vendor Code1</option>
                                                            <option value='2'>Vendor Code1w</option>
                                                     
                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='VendorName' className='lablesection color3 text-start mb-1'>
                                                Vendor Name<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='VendorName'
                                                value={value.VendorName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        VendorName: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Vendor Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Verifiedby' className='lablesection color3 text-start mb-1'>
                                                Verified by<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Verifiedby'
                                                value={value.Verifiedby}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Verifiedby: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Employee Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeName2' className='lablesection color3 text-start mb-1'>
                                                Employee Name<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeName2'
                                                value={value.EmployeeName2}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        EmployeeName2: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/AssetTransaction')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                   
                                        <button type="button" class="border-0 px-3 mx-2  savebtn py-2"><SaveIcon className='me-2' />SAVE</button>
                                      
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default PurchaserequestView