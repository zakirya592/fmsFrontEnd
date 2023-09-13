import React, { useState, useEffect, useRef } from 'react'
import Siderbar from '../../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { SearchOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
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
import Swal from "sweetalert2";
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';

function Createpurchaserequest() {

    const navigate = useNavigate();
    const [value, setvalue] = useState({
        PurchaseRequest: '', RequestDate: '', DateRequired: '',
        EmployeeID: null, Firstname: '',
        Purpose: '', VATInclusive: '',
        UBTOTALAMOUNT: '', VAT: '', TOTALAMOUNT: '',
        VendorID: null, VendorName: '',
        Verifiedby: '', EmployeeName2: '',
    })

    // Employe ID
    const [unitCode, setUnitCode] = useState([]);
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const abortControllerRef = useRef(null);

    // EmployeeID
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {

            const {
                Firstname,
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname,
            }));
        })
            .catch((err) => {
                //// console.log(err);;
            });
    }
    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)
        if (reason === 'reset' || reason === 'clear') {
            setUnitCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setUnitCode([])
            return;
        }
        if (newInputValue === null) {
            setUnitCode([])
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoading(true);
        setOpen(true);
        try {
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            // Create a new AbortController
            abortControllerRef.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    setUnitCode(data ?? [])
                    setOpen(true);
                    setAutocompleteLoading(false);
                    // 
                })
                .catch((error) => {
                    console.log('-----', error);

                }
                );

        }


        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setvalue(prevValue => ({
                    ...prevValue,
                    EmployeeID: []
                }))
                setAutocompleteLoading(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCode([])
            setOpen(false);
            setAutocompleteLoading(false);
        }

    }

    const handleGPCAutoCompleteChange = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === ' -') {
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }));
        }
        if (value && value.EmployeeID) {
            postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: value.EmployeeID,
                Firstname: value.Firstname
            }));
            console.log('Received value----------:', value.EmployeeID);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }


    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const abortControllerRefcompleteemployee = useRef(null);
    const handleAutoCompleteInputChangecompleteemployee = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        if (reason === 'reset' || reason === 'clear') {
            setUnitCodecompleteemployee([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValuecompleteemployee || newInputValuecompleteemployee.trim() === '') {
            setUnitCodecompleteemployee([])
            return;
        }
        if (newInputValuecompleteemployee === null) {
            setUnitCodecompleteemployee([])
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: [],
                VendorName:[],
            }))
            return;
        }

        setAutocompleteLoadingcompleteemployee(true);
        setOpencompleteemployee(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefcompleteemployee.current) {
                abortControllerRefcompleteemployee.current.abort();
            }
            // Create a new AbortController
            abortControllerRefcompleteemployee.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_VendorMaster')
                .then((response) => {
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodecompleteemployee(data ?? [])
                    setOpencompleteemployee(true);
                    setUnitCodecompleteemployee(data)
                    setAutocompleteLoadingcompleteemployee(false);
                    // 
                })
                .catch((error) => {
                    console.log('-----', error);

                }
                );

        }


        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setvalue(prevValue => ({
                    ...prevValue,
                    VendorID: [],
                    VendorName:[]
                }))
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodecompleteemployee([])
            setOpencompleteemployee(false);
            setAutocompleteLoadingcompleteemployee(false);
        }

    }
    const handleGPCAutoCompleteChangecompleteemployee = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: [],
                VendorName:[]
            }));
        }

        if (value && value.VendorID) {
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: value.VendorID,
                VendorName:value.VendorName
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

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

    const Createapi = async () => {
        axios.post(`/api/PurchaseRequest_post`, {
            PurchaseRequestNumber: value.PurchaseRequest,
            RequestDate: value.RequestDate,
            RequiredDate: value.DateRequired,
            RequestByEmployeeID: value.EmployeeID,
            Purpose: value.Purpose,
            VATInclude: value.VATInclusive,
            VendorID: value.VendorID,
            VerifiedByEmpl: value.Verifiedby,

        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Purchase Requests ${value.PurchaseRequest} has been created successfully`,
                    'success'
                )
                navigate('/PurchaserequestView')

            })
            .catch((err) => {
                console.log(err);
                const statuss = err.response.data.error

                Swal.fire(
                    'Error!',
                    ` ${statuss} `,
                    'error'
                )
            });

    };

    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={() => navigate('/PurchaserequestView')} />
                                    <p className="text-center my-auto mx-auto">Purchasing Management </p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Create Purchase Requests</p>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='PurchaseRequest' className='lablesection color3 text-start mb-1'>
                                                Purchase Request # <span className='star'>*</span>
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
                                                Request Date
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
                                                Date Required
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
                                                Requested by
                                            </label>

                                            <Autocomplete
                                                id="EmployeeID"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCode} // Use the formattedGpcList here
                                                // getOptionLabel={(option) => option?.EmployeeID + ' - ' + option?.Firstname}
                                                getOptionLabel={(option) =>
                                                    option?.EmployeeID
                                                        ? option.EmployeeID + ' - ' + option.Firstname
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID} // This determines which value gets sent to the API
                                                onChange={handleGPCAutoCompleteChange}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmployeeID} - {option.Firstname}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                                                loading={autocompleteLoading}
                                                open={open}
                                                onOpen={() => {
                                                    // setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpen(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoading ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            '& label.Mui-focused': {
                                                                color: '#000000',
                                                            },
                                                            '& .MuiInput-underline:after': {
                                                                borderBottomColor: '#00006a',
                                                                color: '#000000',
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&:hover fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeName' className='lablesection color3 text-start mb-1'>
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeName'
                                                value={value.Firstname}
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
                                                Purpose
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
                                                VAT Inclusive(Y/N)?
                                            </label>
                                           
                                            <select className='rounded inputsectiondropdpwn py-2 color2 ' id="VendorConfirm" aria-label="Floating label select example"
                                            value={value.VATInclusive}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        VATInclusive: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Y/N</option>

                                                <option value='N'>No </option>
                                                <option value='Y'>Yes</option>

                                            </select>
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
                                            SUB TOTAL AMOUNT
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
                                        <PlusOutlined className='mt-3' />
                                    </span>
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='VAT' className='lablesection color3 text-start mb-1'>
                                            VAT
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
                                            TOTAL AMOUNT
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
                                                Vendor Code
                                            </label>
                                            <Autocomplete
                                                id="UserAuthority"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodecompleteemployee}
                                                getOptionLabel={(option) =>
                                                    option?.VendorID
                                                        ? option.VendorID + ' - ' + option.VendorName
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.VendorID === value.VendorID}
                                                onChange={handleGPCAutoCompleteChangecompleteemployee}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.VendorID}- {option.VendorName}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventcompleteemployee, newInputValuecompleteemployee, params) =>
                                                    handleAutoCompleteInputChangecompleteemployee(eventcompleteemployee, newInputValuecompleteemployee, params)
                                                }
                                                loading={autocompleteLoadingcompleteemployee}
                                                open={opencompleteemployee} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setOpenID(true);
                                                }}
                                                onClose={() => {
                                                    setOpencompleteemployee(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='User Authority'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingcompleteemployee ? (
                                                                        <CircularProgress style={{ color: 'black' }} size={20} />
                                                                    ) : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            '& label.Mui-focused': {
                                                                color: '#000000',
                                                            },
                                                            '& .MuiInput-underline:after': {
                                                                borderBottomColor: '#00006a',
                                                                color: '#000000',
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&:hover fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='VendorName' className='lablesection color3 text-start mb-1'>
                                                Vendor Name
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
                                                Verified by
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
                                                Employee Name
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
                                    <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/PurchaserequestView')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>

                                    <button type="button" class="border-0 px-3 mx-2  savebtn py-2" onClick={Createapi}><SaveIcon className='me-2' />SAVE</button>

                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Createpurchaserequest