import React, { useState, useEffect, useRef } from 'react'
import Siderbar from '../../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { SearchOutlined, CaretDownOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
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
import { useNavigate, useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from 'moment';

function Updatagoodreceipt() {

    let { userId } = useParams();
    const navigate = useNavigate();

    const [value, setvalue] = useState({
        PurchaseOrder: '', InvoiceDate: '', ActualDeliveryDate: '', InvoiceNumber: '',
        Recievedby: '', EmployeeName: '',
        UBTOTALAMOUNT: '', VAT: '', Discounts: '0', TOTALAMOUNT: '',
        VendorID: '', VendorName: '',
        FeedbackComments: '', PurchaseOrderNumber: null,
    })
    const getapi = () => {
        axios.get(`/api/GoodsReceipt_GET_BYID/${userId}`, {
        },)
            .then((res) => {
                const Recievedby = res.data.recordset[0].RecievedByEmployeeID
                const InvoiceDatevalid = res.data.recordset[0].InvoiceDate
                const ActualDeliveryDatevalid = res.data.recordset[0].ActualDeliveryDate
                setvalue((prevValue) => ({
                    ...prevValue,
                    FeedbackComments: res.data.recordset[0].FeedbackOrComments,
                    Discounts: res.data.recordset[0].DiscountAmount,
                    PurchaseRequest: res.data.recordset[0].PurchaseRequestNumber,
                    InvoiceNumber: res.data.recordset[0].InvoiceNumber,
                    VendorID: res.data.recordset[0].VendorID,
                    PurchaseOrderNumber: res.data.recordset[0].PurchaseOrderNumber,
                    Recievedby,
                    InvoiceDate: InvoiceDatevalid,
                    ActualDeliveryDate: ActualDeliveryDatevalid,
                }));


                axios.post(`/api/getworkRequest`, {
                    "EmployeeID": Recievedby
                }).then((res) => {
                    console.log('asdfaf=====================================', res);
                    const Employee = res.data.recordsets[0][0].EmployeeID
                    const CompleteEmployee = res.data.recordsets[0][0].Firstname
                    setvalue((prevValue) => ({
                        ...prevValue,
                        Recievedby: Employee,
                        EmployeeName: CompleteEmployee,
                    }));

                })
                    .catch((err) => {
                        console.log(err);
                    });
                const vendorcode = res.data.recordset[0].VendorID
                axios.get(`/api/VendorMaster_GET_BYID/${vendorcode}`).then((res) => {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        VendorName: res.data.recordset[0].VendorName
                    }));
                })
                    .catch((err) => {
                        console.log(err);
                    });



            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    // Table section 
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

    const Deletedapi = (ASQS) => {
        console.log(ASQS);
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
            text: "You want to delete this Goods Receipts",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/PurchaseGOODSAsset_DELETE_BYID/${ASQS}`)
                    .then((res) => {
                        apiget()
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Goods Receipts has been deleted.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log('Error deleting', err);
                    });

            }
        })

    };
    // Button section
    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <MenuItem onClick={() => {
                    Deletedapi(params.row.ASQS)
                    handleMenuClose();
                }}>
                    <span style={{ paddingRight: '10px' }}>Delete</span>
                    <DeleteIcon />
                </MenuItem>
            </div>
        );
    }


    const apiget = () => {
        axios.get(`/api/GET_BY_PurchaseOrderNumber_GoodsReceiptDetail/${userId}`)
            .then((res) => {
                const AssetItemDescriptionsssss = res.data.recordset
                // setgetdata(res.data.recordset);
                const SAQ = res.data.recordset.map((item) => item.seq);
                const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                const promises = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`)
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

                const assetItemTagIDs = [];

                // Create an array of promises for fetching data and updating assetItemTagIDs
                const promisesNumber = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;

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
            PurchaseRequest: datanumber[index]?.records?.data[0]?.AssetItemTagID || "",
            ASQS: getdata.find(row => row.description === description)?.saq || 0,
            AssetQty: assetQty,
            PurchaseAmount: purchaseAmount,
            TOTAL_PRICE: totalPrice,
        };
    });

    const overallTotalPrice = filteredRows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    // Calculate the initial overallTotalPrice
    const initialOverallTotalPrice = calculateOverallTotalPrice(filteredRows);
    const [overallTotalPricess, setOverallTotalPricess] = useState(initialOverallTotalPrice);
    // Function to calculate the overallTotalPrice

    function calculateOverallTotalPrice(rows) {
        return rows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    }
    const [toaldis, settoaldis] = useState()
    // Update overallTotalPrice when the VAT input changes
    function handleVATChange(e) {
        const newVAT = parseFloat(e.target.value) || 0; // Parse the VAT input as a number
        const newOverallTotalPrice = initialOverallTotalPrice + newVAT;
        console.log(newVAT);
        setOverallTotalPricess(newOverallTotalPrice);
        settoaldis(newOverallTotalPrice)

        setvalue(prevValue => ({
            ...prevValue,
            VAT: newVAT,
        }));
    }
    function handlediscountChange(e) {
        const newdount = parseFloat(e.target.value) || 0; // Parse the VAT input as a number
        const newOverallTotalPricedis = toaldis - newdount;
        console.log(newdount);
        console.log('newdount', newOverallTotalPricedis);
        setOverallTotalPricess(newOverallTotalPricedis);


        setvalue(prevValue => ({
            ...prevValue,
            Discounts: e.target.value,
        }));
    }

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    function PurchaseOrderNumbergetapi(PurchaseOrderNumber) {
        axios.get(`/api/PurchaseOrder_GET_BYID/${PurchaseOrderNumber}`).then((res) => {
            console.log(res.data)
            setvalue((prevValue) => ({
                ...prevValue,
                VendorID: res.data.recordset[0].VendorID,
            }));
            const vendorcode = res.data.recordset[0].VendorID;
            axios.get(`/api/VendorMaster_GET_BYID/${vendorcode}`)
                .then((res) => {
                    console.log('VendorName:', res.data.recordset[0].VendorName);
                    setvalue((prevValue) => ({
                        ...prevValue,
                        VendorName: res.data.recordset[0].VendorName
                    }));

                })
                .catch((err) => {
                    console.log(err);
                    // Handle any errors that occur during the API request.
                });

        })
            .catch((err) => {
                console.log(err);
            });
    }

    //VendorCode
    const [unitCodeVendorCode, setUnitCodeVendorCode] = useState([]);
    const [openVendorCode, setOpenVendorCode] = useState(false);
    const [autocompleteLoadingVendorCode, setAutocompleteLoadingVendorCode] = useState(false);
    const abortControllerRefVendorCode = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/Filter_WR')
            .then((response) => {
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


    // Recievedby to Employee Logic.
    const [unitCodeID, setUnitCodeID] = useState([]);
    const [openID, setOpenID] = useState(false);
    const [autocompleteLoadingID, setAutocompleteLoadingID] = useState(false);
    const abortControllerRefID = useRef(null);

    const handleAutoCompleteInputChangeID = async (eventID, newInputValueID, reason) => {

        if (reason === 'reset' || reason === 'clear') {
            setUnitCodeID([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValueID || newInputValueID.trim() === '') {
            setUnitCodeID([])
            return;
        }
        if (newInputValueID === null) {
            setUnitCodeID([])
            setvalue(prevValue => ({
                ...prevValue,
                Recievedby: [],
                EmployeeName: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingID(true);
        setOpenID(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefID.current) {
                abortControllerRefID.current.abort();
            }
            // Create a new AbortController
            abortControllerRefID.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    const data = response?.data?.recordset.map(item => ({
                        ...item,
                        Recievedby: item.EmployeeID, // Change EmployeeID to assignEmployee
                        EmployeeName: item.Firstname
                    }));
                    setUnitCodeID(data ?? [])
                    setOpenID(true);
                    setUnitCodeID(data)
                    setAutocompleteLoadingID(false);
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
                    Recievedby: [],
                    EmployeeName: []
                }))
                setAutocompleteLoadingID(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeID([])
            setOpenID(false);
            setAutocompleteLoadingID(false);
        }

    }

    const handleGPCAutoCompleteChangeID = (event, value) => {
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                Recievedby: [],
                EmployeeName: []
            }));
        }

        if (value && value.EmployeeID) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                Recievedby: value.EmployeeID,
                EmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const [unitCodeordernumber, setUnitCodeordernumber] = useState([]);
    const [openordernumber, setOpenordernumber] = useState(false);
    const [autocompleteLoadingordernumer, setAutocompleteLoadingordernumber] = useState(false);
    const abortControllerRefordernumber = useRef(null);

    const handleAutoCompleteInputordernumber = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)

        if (reason === 'reset' || reason === 'clear') {
            setUnitCodeordernumber([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            setUnitCodeordernumber([])
            return;
        }
        if (newInputValue === null) {
            setUnitCodeordernumber([])
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseOrderNumber: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingordernumber(true);
        setOpenordernumber(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefordernumber.current) {
                abortControllerRefordernumber.current.abort();
            }
            // Create a new AbortController
            abortControllerRefordernumber.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_PurchaseOrderNumber')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    setUnitCodeordernumber(data ?? [])
                    setOpenordernumber(true);
                    setAutocompleteLoadingordernumber(false);
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
                    PurchaseOrderNumber: []
                }))
                setAutocompleteLoadingordernumber(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeordernumber([])
            setOpenordernumber(false);
            setAutocompleteLoadingordernumber(false);
        }

    }

    const handleGPCAutoordernumber = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseOrderNumber: [],
            }));
        }

        if (value && value.PurchaseOrderNumber) {

            PurchaseOrderNumbergetapi(value.PurchaseOrderNumber);
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseOrderNumber: value.PurchaseOrderNumber,
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const addpurachrequestbtn = (e) => {
        localStorage.setItem('Updatagoodsreseciption', userId)
        navigate('/AddGoodsReceipts')
    }

    const Postapi = async () => {
        axios.put(`/api/GoodsReceipt_Put/${userId}`, {
            InvoiceNumber: value.InvoiceNumber,
            InvoiceDate: value.InvoiceDate,
            ActualDeliveryDate: value.ActualDeliveryDate,
            RecievedByEmployeeID: value.Recievedby,
            VendorID: value.VendorID,
            FeedbackOrComments: value.FeedbackComments,
            DiscountAmount: value.Discounts,

        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Success!',
                    ` Goods Receipts ${userId} has been updated`,
                    'success'
                )
                navigate('/Goodsreceiptsview')

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
        localStorage.removeItem('Updatagoodsreseciption');
        localStorage.clear();
    }
    const backbtn = (() => {
        localStorage.removeItem('Updatagoodsreseciption');
        localStorage.clear();
        navigate('/Goodsreceiptsview')

    })
    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={backbtn} />
                                    <p className="text-center my-auto mx-auto">Purchasing Management </p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Modify Goods Receipts</p>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='PurchaseOrder' className='lablesection color3 text-start mb-1'>
                                                Purchase Order # <span className='star'>*</span>
                                            </label>

                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeordernumber} // Use the formattedGpcList here
                                                getOptionLabel={(option) =>
                                                    option?.PurchaseOrderNumber
                                                        ? option.PurchaseOrderNumber
                                                        : ''
                                                }
                                                onChange={handleGPCAutoordernumber}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.PurchaseOrderNumber}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputordernumber(event, newInputValue, params)}
                                                loading={autocompleteLoadingordernumer}
                                                open={openordernumber}
                                                onOpen={() => {
                                                    // setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpenordernumber(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Purchase Order Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingordernumer ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='InvoiceNumber' className='lablesection color3 text-start mb-1'>
                                                Invoice Number <span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='InvoiceNumber'
                                                value={value.InvoiceNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        InvoiceNumber: e.target.value
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
                                            <label htmlFor='InvoiceDate' className='lablesection color3 text-start mb-1'>
                                                Invoice Date
                                            </label>
                                            <input type="date" id="InvoiceDate"

                                                value={value.InvoiceDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        InvoiceDate: e.target.value
                                                    }))
                                                }}
                                                name="RequestDate" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ActualDeliveryDate' className='lablesection color3 text-start mb-1'>
                                                Actual Delivery Date
                                            </label>
                                            <input type="date" id="ActualDeliveryDate"

                                                value={value.ActualDeliveryDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ActualDeliveryDate: e.target.value
                                                    }))
                                                }}
                                                name="ActualDeliveryDate" className='rounded inputsection py-2' />
                                        </div>

                                    </div>

                                </div>

                                {/* Row Two */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Recievedby' className='lablesection color3 text-start mb-1'>
                                                Recieved by
                                            </label>

                                            <Autocomplete
                                                id="serachGpcid"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeID}
                                                getOptionLabel={(option) =>
                                                    option?.Recievedby
                                                        ? option.Recievedby + ' - ' + option.EmployeeName
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.Recievedby === value.Recievedby}
                                                onChange={handleGPCAutoCompleteChangeID}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.Recievedby} - {option.EmployeeName}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventID, newInputValueID, params) =>
                                                    handleAutoCompleteInputChangeID(eventID, newInputValueID, params)
                                                }
                                                loading={autocompleteLoadingID}
                                                open={openID} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setOpenID(true);
                                                }}
                                                onClose={() => {
                                                    setOpenID(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingID ? (
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
                                            <label htmlFor='EmployeeName' className='lablesection color3 text-start mb-1'>
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeName'
                                                value={value.EmployeeName}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 my-auto col-md-10 col-lg-3 col-xl-3 ">
                                        <button type="button" className="btn btn-outline-primary color2 btnwork mt-3 btnworkactive" onClick={addpurachrequestbtn}> <AddCircleOutlineIcon className='me-1' />Add Goods Receipts</button>
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
                                            // value={value.UBTOTALAMOUNT}
                                            value={overallTotalPrice}
                                            readOnly
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
                                            type='number'
                                            id='VAT'
                                            value={value.VAT}
                                            onChange={handleVATChange} // Use the updated VAT change handler
                                            className='rounded inputsection py-2'
                                            placeholder='VAT'
                                            required
                                        ></input>

                                    </div>
                                    <span className='my-auto mx-3'>
                                        <MinusOutlined className='mt-3' />
                                    </span>
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='Discounts' className='lablesection color3 text-start'>
                                            Discounts
                                        </label>

                                        <input
                                            types='text'
                                            id='Discounts'
                                            value={value.Discounts}
                                            onChange={handlediscountChange}
                                            className='rounded inputsection'
                                            placeholder='Discounts'
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
                                            value={overallTotalPricess}
                                            onChange={e => {
                                                setvalue(prevValue => ({
                                                    ...prevValue,
                                                    TOTALAMOUNT: e.target.value
                                                }))
                                            }}
                                            readOnly
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
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='FeedbackComments' className='lablesection color3 text-start mb-1'>
                                                Feedback/Comments
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Provide feedback/comments on the items delivered" id="FeedbackComments"
                                                    value={value.FeedbackComments}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            FeedbackComments: e.target.value
                                                        }))
                                                    }}
                                                ></textarea>

                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" class="border-0 px-3  savebtn py-2" onClick={backbtn}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>

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

export default Updatagoodreceipt