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
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";

function Createpurachaseorder() {

    const navigate = useNavigate();
    const getRequestDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [value, setvalue] = useState({
        PurchaseRequest: '', PODate: getRequestDate(), ProposedDeliveryDate: '', PurchaseOrder: '',
        ReviewProcessedby: '', EmployeeName: '',
        Approvedby: '', ApprovalDate: '', EmployeeName2: '', VATInclusive: '',
        UBTOTALAMOUNT: '', VAT: '', TOTALAMOUNT: '',
        VendorCode: '', VendorName: '',
        VendorConfirm: '', Comments: '', ConfirmationDate: '',
    })

    const [getdata, setgetdata] = useState([])
    const [datanumber, setdatanumber] = useState([])

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'PurchaseRequest', headerName: 'MATERIAL /STOCK CODE', width: 200 },
        { field: 'AssetItemDescription', headerName: 'DESCRIPTION', width: 200 },
        { field: 'AssetQty', headerName: 'QAT', width: 180 },
        { field: 'PurchaseAmount', headerName: 'UNITY PRICE', width: 200 },
        { field: 'TOTAL_PRICE', headerName: 'TOTAL PRICE', width: 180 },
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
                    <MenuItem onClick={handleDeleteButtonClick}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }

    const apiget = () => {
        axios.get(`/api/AssetsMaster_GET_LIST`)
            .then((res) => {
                console.log('AssetsMaster_GET_LIST', res.data.recordset);
                console.log('length', res.data.recordset.length);
                const AssetItemDescriptionsssss = res.data.recordset
                // setgetdata(res.data.recordset);
                const SAQ = res.data.recordset.map((item) => item.seq);
                const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                // console.log('AssetItemDescriptionsssss', AssetItemDescriptionsssss);

                const promises = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    console.log(itid);

                    return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`)
                        .then((res) => {
                            console.log('=====', res.data.recordset);
                            return {
                                item,
                                data: res.data.recordset,// Store API response data here
                            };

                        })
                        .catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: null // Handle error case here
                            };
                        });

                });

                const assetItemTagIDs = [];

                // Create an array of promises for fetching data and updating assetItemTagIDs
                const promisesNumber = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    console.log(itid);

                    return axios.get(`/api/AssetTransactions_GET_ItemDescription/${itid}`)
                        .then((res) => {
                            return {
                                item,
                                data: res.data.recordset,// Store API response data here
                            };

                        })


                        .catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: null // Handle error case here
                            };
                        });
                });

                Promise.all([Promise.all(promises), Promise.all(promisesNumber)])
                    .then(([results1, results2]) => {


                        // console.log('dfrfdf---------------------',results1);
                        // console.log('-------------------------------', results2);
                        results1.forEach((itemRecords, index) => {
                            console.log(`Records for ${AssetItemDescriptionsss[index]}:`, itemRecords.data);
                            // setgetdata(results);
                            const recordsWithDescriptions = AssetItemDescriptionsss.map((description, index) => ({
                                description: description,
                                records: results1[index],
                                saq: SAQ[index],
                            }));

                            const recordsWithSAQ = SAQ.map((saq, index) => ({
                                saq: SAQ[index],
                                records: results1[index],
                            }));


                            setgetdata(recordsWithDescriptions, recordsWithSAQ);


                        });
                        results2.forEach((itemRecords, index) => {
                            // const assetItemTagID = itemRecords.data[0].AssetItemTagID;
                            // console.log("---------------------------------",assetItemTagID);
                            const assetItemTagID = AssetItemDescriptionsss.map((assetItemTagID, index) => ({
                                assetItemTagID: assetItemTagID,
                                records: results2[index],
                                saq: SAQ[index],
                            }));
                            setdatanumber(assetItemTagID);

                        });

                    });





            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        apiget()
    }, [])

    const countDuplicates = (array, key) => {
        const counts = {};
        array.forEach(item => {
            const value = item[key];
            counts[value] = (counts[value] || 0) + 1;
        });
        return counts;
    };

    const duplicatesCount = countDuplicates(getdata, 'description');
    const uniqueDescriptions = Array.from(new Set(getdata.map(row => row.description)));

    const filteredRows = uniqueDescriptions.map((description, index) => {
        const assetQty = duplicatesCount[description] || 0;
        const purchaseAmount = getdata[index].records ? parseFloat(getdata[index].records.data[0].PurchaseAmount) : '';
        let totalPrice;

        if (!isNaN(purchaseAmount)) {
            if (assetQty === 1) {
                totalPrice = purchaseAmount;
            } else if (assetQty > 1) {
                totalPrice = purchaseAmount * assetQty;
            } else {
                totalPrice = 0; // Handle cases where AssetQty is negative or invalid
            }
        } else {
            totalPrice = 0; // Handle cases where PurchaseAmount is not a valid number
        }

        return {
            id: index + 1,
            AssetItemDescription: description,
            PurchaseRequest: datanumber[index].records ? datanumber[index].records.data[0].AssetItemTagID : '',
            ASQS: getdata.find(row => row.description === description)?.saq || 0,
            AssetQty: assetQty,
            PurchaseAmount: purchaseAmount,
            TOTAL_PRICE: totalPrice,
        };
    });

    //VendorCode
    const [unitCodeVendorCode, setUnitCodeVendorCode] = useState([]);
    const [openVendorCode, setOpenVendorCode] = useState(false);
    const [autocompleteLoadingVendorCode, setAutocompleteLoadingVendorCode] = useState(false);
    const abortControllerRefVendorCode = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/Filter_WR')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------", data);
                const unitNameList = data.map((requestdata) => ({
                    VendorID: requestdata?.VendorID,
                    VendorName: requestdata?.VendorName,
                }));
                setUnitCodeVendorCode(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputVendorCode = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)

        if (reason === 'reset' || reason === 'clear') {
            setUnitCodeVendorCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            setUnitCodeVendorCode([])
            return;
        }
        if (newInputValue === null) {
            setUnitCodeVendorCode([])
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingVendorCode(true);
        setOpenVendorCode(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefVendorCode.current) {
                abortControllerRefVendorCode.current.abort();
            }
            // Create a new AbortController
            abortControllerRefVendorCode.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_VendorMaster')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    setUnitCodeVendorCode(data ?? [])
                    setOpenVendorCode(true);
                    setAutocompleteLoadingVendorCode(false);
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
                    VendorID: []
                }))
                setAutocompleteLoadingVendorCode(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeVendorCode([])
            setOpenVendorCode(false);
            setAutocompleteLoadingVendorCode(false);
        }

    }

    const handleGPCAutoVendorCode = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: [],
                VendorName: []
            }));
        }

        if (value && value.VendorID) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: value.VendorID,
                VendorName: value.VendorName
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const Postapi = async () => {
        axios.post(`/api/PurchaseOrder_post`, {
            PurchaseOrderNumber: value.PurchaseRequest,
            PurchaseRequestNumber: value.PurchaseOrder,
            PODate: value.PODate,
            DeliveryDate: value.ProposedDeliveryDate,
            ProcessedByEmployeeID: value.ReviewProcessedby,
            VATInclude: value.VATInclusive,
            ApprovedByEmpl: value.Approvedby,
            ApprovalDate: value.ApprovalDate,
            VendorID: value.VendorID,
            VendorConfirm: value.VendorConfirm,
            ConfirmationDate: value.ConfirmationDate,
            Comments: value.Comments,

        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Purchase Order ${value.PurchaseRequest} has been created successfully`,
                    'success'
                )
                navigate('/Purachaseorderview')

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

    const Createapi = () => {
        Postapi()
    }

    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={() => navigate('/Purachaseorderview')} />
                                    <p className="text-center my-auto mx-auto">Purchasing Management </p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Create Purchase Orders</p>
                                  
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
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='PurchaseOrder' className='lablesection color3 text-start mb-1'>
                                                Purchase Order#<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='PurchaseOrder'
                                                value={value.PurchaseOrder}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        PurchaseOrder: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter PO Number'
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
                                            <label htmlFor='PODate' className='lablesection color3 text-start mb-1'>
                                                PO Date<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="PODate"

                                                value={value.PODate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        PODate: e.target.value
                                                    }))
                                                }}
                                                name="RequestDate" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ProposedDeliveryDate' className='lablesection color3 text-start mb-1'>
                                                Proposed Delivery Date<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="ProposedDeliveryDate"

                                                value={value.ProposedDeliveryDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ProposedDeliveryDate: e.target.value
                                                    }))
                                                }}
                                                name="ProposedDeliveryDate" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                </div>

                                {/* Row Two */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='ReviewProcessedby' className='lablesection color3 text-start mb-1'>
                                                Review/Processed by<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='ReviewProcessedby'
                                                value={value.ReviewProcessedby}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ReviewProcessedby: e.target.value
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 mt-auto">
                                        <div className='emailsection d-flex my-2'>
                                            <label htmlFor='VATInclusive' className='lablesection my-auto color3 text-start'>
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

                                {/* Row 3rd */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Approvedby' className='lablesection color3 text-start mb-1'>
                                                RApproved by<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Approvedby'
                                                value={value.Approvedby}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Approvedby: e.target.value
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 mt-auto">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ApprovalDate' className='lablesection color3 text-start mb-1'>
                                                Approval Date<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="PODate"

                                                value={value.ApprovalDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ApprovalDate: e.target.value
                                                    }))
                                                }}
                                                name="RequestDate" className='rounded inputsection py-2' />
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
                                        <PlusOutlined className='mt-3' />
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
                                                Vendor Code
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeVendorCode} // Use the formattedGpcList here
                                                getOptionLabel={(option) =>
                                                    option?.VendorID
                                                        ? option.VendorID + ' - ' + option.VendorName
                                                        : ''
                                                }
                                                onChange={handleGPCAutoVendorCode}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.VendorID} - {option.VendorName}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputVendorCode(event, newInputValue, params)}
                                                loading={autocompleteLoadingVendorCode}
                                                open={openVendorCode}
                                                onOpen={() => {
                                                    // setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpenVendorCode(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingVendorCode ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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
                                            <label htmlFor='VendorConfirm' className='lablesection color3 text-start mb-1'>
                                                Vendor Confirm<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="VendorConfirm" aria-label="Floating label select example" value={value.VendorConfirm}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        VendorConfirm: e.target.value
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ConfirmationDate' className='lablesection color3 text-start mb-1'>
                                                Confirmation Date<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="ConfirmationDate"

                                                value={value.ConfirmationDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ConfirmationDate: e.target.value
                                                    }))
                                                }}
                                                name="ConfirmationDate" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Comments' className='lablesection color3 text-start mb-1'>
                                                Comments<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='Comments'
                                                value={value.Comments}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Comments: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Confirmed by/Additonal Notes/Terms/Contracts'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>



                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/Purachaseorderview')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>

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

export default Createpurachaseorder