import React, { useState, useEffect, useRef } from 'react'
import Siderbar from '../../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { SearchOutlined, CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import 'react-phone-input-2/lib/style.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import moment from 'moment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Purachaseview() {
    let { userId } = useParams();
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
        VendorConfirm: '', Comments: '', ConfirmationDate: '', PurchaseRequestNumber:null,
        assignEmployee: null, EmployeeName: '',
        completeEmployee: null, CompleteEmployeeName: ''
    })

    const [vatget, setvatget] = useState([])
    const getapi = () => {
        axios.get(`/api/PurchaseOrder_GET_BYID/${userId}`, {
        },)
            .then((res) => {
                console.log('TO PurchaseOrder_GET_BYID By ID', res.data);

                const completeEmployee = res.data.recordset[0].ProcessedByEmployeeID
                const assignEmployee = res.data.recordset[0].ApprovedByEmpl
                
                setvalue((prevValue) => ({
                    ...prevValue,
                    Purpose: res.data.recordset[0].Purpose,
                    VATInclusive: res.data.recordset[0].VATInclude,
                    PurchaseOrder: res.data.recordset[0].PurchaseOrderNumber,
                    PurchaseRequestNumber: res.data.recordset[0].PurchaseRequestNumber,
                    VendorID: res.data.recordset[0].VendorID,
                    assignEmployee,
                    completeEmployee,
                    VendorConfirm: res.data.recordset[0].VendorConfirm,
                    Comments: res.data.recordset[0].Comments,
                    VAT: res.data.recordset[0].VAT,
                }));
                
                setvatget(res.data.recordset[0].VAT)
                const ConfirmationDateever = res.data.recordset[0].ConfirmationDate
                const RequestedDateverered = moment(ConfirmationDateever).format('YYYY-MM-DD')

                const ApprovalDateeever = res.data.recordset[0].ApprovalDate
                const ApprovalDateverered = moment(ApprovalDateeever).format('YYYY-MM-DD')

                const DeliveryDateeever = res.data.recordset[0].DeliveryDate
                const DeliveryDateverered = moment(DeliveryDateeever).format('YYYY-MM-DD')

                const PODateeeever = res.data.recordset[0].PODate
                const PODateDateverered = moment(PODateeeever).format('YYYY-MM-DD')

                setvalue((prevValue) => ({
                    ...prevValue,
                    ConfirmationDate: RequestedDateverered,
                    ApprovalDate: ApprovalDateverered,
                    ProposedDeliveryDate: DeliveryDateverered,
                    PODate: PODateDateverered,
                }));

                axios.post(`/api/getworkRequest`, {
                    "EmployeeID": completeEmployee
                }).then((res) => {
                    console.log('asdfaf=====================================', res);
                    const CompleteddEmployeeName = res.data.recordset[0].Firstname
                    const {
                        EmployeeID,
                        Firstname
                    } = res.data.recordsets[0][0];

                    setvalue((prevValue) => ({
                        ...prevValue,
                        EmployeeID,
                        Firstname,
                        CompleteEmployeeName: CompleteddEmployeeName,
                    }));

                })
                    .catch((err) => {
                        //// console.log(err);;
                    });

                axios.post(`/api/getworkRequest`, {
                    "EmployeeID": assignEmployee
                }).then((res) => {
                    console.log('asdfaf=====================================', res);
                    const Employee = res.data.recordsets[0][0].EmployeeID
                    const CompleteEmployee = res.data.recordsets[0][0].Firstname
                    console.log(Employee);

                    setvalue((prevValue) => ({
                        ...prevValue,
                        assignEmployee: Employee,
                        EmployeeName: CompleteEmployee,
                    }));

                })
                    .catch((err) => {
                        //// console.log(err);;
                    });
                const vendorcode = res.data.recordset[0].VendorID;
                axios.get(`/api/VendorMaster_GET_BYID/${vendorcode}`)
                    .then((res) => {
                        if (res.data && res.data.recordset && res.data.recordset[0] && res.data.recordset[0].VendorName) {
                            console.log('VendorName:', res.data.recordset[0].VendorName);
                            setvalue((prevValue) => ({
                                ...prevValue,
                                VendorName: res.data.recordset[0].VendorName
                            }));
                        } else {
                            console.log('VendorName not found in the response data');
                            // Handle the case when 'VendorName' is not available in the response data.
                        }
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
    useEffect(() => {
        getapi()
    }, [])


    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const abortControllerRefcompleteemployee = useRef(null);

    const handleAutoCompleteInputChangecompleteemployee = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        console.log('==========+++++++======', newInputValuecompleteemployee)

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
                completeEmployee: [],
                CompleteEmployeeName: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
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
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    // const data = response?.data?.recordset;
                    const data = response?.data?.recordset.map(item => ({
                        ...item,
                        completeEmployee: item.EmployeeID, // Change EmployeeID to assignEmployee
                        CompleteEmployeeName: item.Firstname
                    }));
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
                    completeEmployee: [],
                    CompleteEmployeeName: []
                }))
                setAutocompleteLoadingID(true);
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
                completeEmployee: [],
                CompleteEmployeeName: []
            }));
        }

        if (value && value.completeEmployee) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                completeEmployee: value.completeEmployee,
                CompleteEmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }


    // Assign to Employee Logic.
    const [unitCodeID, setUnitCodeID] = useState([]);
    const [openID, setOpenID] = useState(false);
    const [autocompleteLoadingID, setAutocompleteLoadingID] = useState(false);
    const abortControllerRefID = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------", data);
                const dataget = data.map((requestdata) => ({
                    RequestNumber: requestdata?.RequestNumber,
                    RequestStatus: requestdata?.RequestStatus,
                }));
                // setUnitCodeID(dataget)
                setOpenID(false)
            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputChangeID = async (eventID, newInputValueID, reason) => {
        console.log('==========+++++++======', newInputValueID)

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
                assignEmployee: [],
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
                    console.log('Dropdown me', response.data.recordset)
                    // const data = response?.data?.recordset;
                    const data = response?.data?.recordset.map(item => ({
                        ...item,
                        assignEmployee: item.EmployeeID, // Change EmployeeID to assignEmployee
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
                    assignEmployee: [],
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

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: [],
                EmployeeName: []
            }));
        }

        if (value && value.assignEmployee) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: value.assignEmployee,
                EmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

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
            text: "You want to delete this Purchase Order",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/PurchaseOrderAsset_DELETE_BYID/${ASQS}`)
                    .then((res) => {
                        apiget()
                        // Workrequestget()
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Purchase Order has been deleted.',
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
        axios.get(`/api/PurchaseRequestDetail_GET_BY_PurchaseOrderNumber/${userId}`)
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
            PurchaseRequest: datanumber[index]?.records?.data[0]?.AssetItemTagID || "",
            ASQS: getdata.find(row => row.description === description)?.saq || 0,
            AssetQty: assetQty,
            PurchaseAmount: purchaseAmount,
            TOTAL_PRICE: totalPrice,
        };
    });
    // Calculate the overall TOTAL_PRICE
    const overallTotalPrice = filteredRows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    // Calculate the initial overallTotalPrice

    const initialOverallTotalPrice = calculateOverallTotalPrice(filteredRows);
    const [overallTotalPricess, setOverallTotalPricess] = useState(initialOverallTotalPrice);
    // Function to calculate the overallTotalPrice
    function calculateOverallTotalPrice(rows) {
        return rows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    }
    // Update overallTotalPrice when the VAT input changes
    function handleVATChange(e) {
        const newVAT = parseFloat(e.target.value) || 0; // Parse the VAT input as a number
        const newOverallTotalPrice = initialOverallTotalPrice + newVAT;
        console.log(newVAT);
        setOverallTotalPricess(newOverallTotalPrice);

        setvalue(prevValue => ({
            ...prevValue,
            VAT: newVAT,
        }));
    }
    useEffect(() => {
        setOverallTotalPricess(initialOverallTotalPrice + vatget);
    }, [initialOverallTotalPrice])

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
    // post api for the data  PurchaseRequestNumber
    function postRequestNumber(PurchaseRequestNumber) {
        axios.get(`/api/PurchaseRequest_GET_BYID/${PurchaseRequestNumber}`).then((res) => {
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
    const [unitCoderequestnumber, setUnitCoderequestnumber] = useState([]);
    const [openrequestnumber, setOpenrequestnumber] = useState(false);
    const [autocompleteLoadingrequestnumer, setAutocompleteLoadingrequestnumber] = useState(false);
    const abortControllerRefrequestnumber = useRef(null);

    const handleAutoCompleteInputrequestnumber = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)

        if (reason === 'reset' || reason === 'clear') {
            setUnitCoderequestnumber([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            setUnitCoderequestnumber([])
            return;
        }
        if (newInputValue === null) {
            setUnitCoderequestnumber([])
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseRequestNumber: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingrequestnumber(true);
        setOpenrequestnumber(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefrequestnumber.current) {
                abortControllerRefrequestnumber.current.abort();
            }
            // Create a new AbortController
            abortControllerRefrequestnumber.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_PurchaseRequestNumber')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    setUnitCoderequestnumber(data ?? [])
                    setOpenrequestnumber(true);
                    setAutocompleteLoadingrequestnumber(false);
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
                    PurchaseRequestNumber: []
                }))
                setAutocompleteLoadingrequestnumber(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCoderequestnumber([])
            setOpenrequestnumber(false);
            setAutocompleteLoadingrequestnumber(false);
        }

    }

    const handleGPCAutorequestnumber = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseRequestNumber: [],
            }));
        }

        if (value && value.PurchaseRequestNumber) {
            postRequestNumber(value.PurchaseRequestNumber);
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseRequestNumber: value.PurchaseRequestNumber,
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
                                    <p className='color1 workitoppro my-auto'>View Purchase Orders</p>

                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='PurchaseRequest' className='lablesection color3 text-start mb-1'>
                                                Purchase Request #
                                            </label>

                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCoderequestnumber} // Use the formattedGpcList here
                                                getOptionLabel={(option) =>
                                                    option?.PurchaseRequestNumber
                                                        ? option.PurchaseRequestNumber
                                                        : ''
                                                }
                                                onChange={handleGPCAutorequestnumber}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.PurchaseRequestNumber}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputrequestnumber(event, newInputValue, params)}
                                                loading={autocompleteLoadingrequestnumer}
                                                open={openrequestnumber}
                                                onOpen={() => {
                                                    // setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpenrequestnumber(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Purchase Request Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingrequestnumer ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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
                                            <label htmlFor='PurchaseOrder' className='lablesection color3 text-start mb-1'>
                                                Purchase Order# <span className='star'>*</span>
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
                                                readOnly
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
                                                PO Date
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
                                                Proposed Delivery Date
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
                                                Review/Processed by
                                            </label>

                                            <Autocomplete
                                                id="completeemployee"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodecompleteemployee}
                                                getOptionLabel={(option) =>
                                                    option?.completeEmployee
                                                        ? option.completeEmployee + ' - ' + option.CompleteEmployeeName
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.completeEmployee === value.completeEmployee}
                                                onChange={handleGPCAutoCompleteChangecompleteemployee}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.completeEmployee} - {option.CompleteEmployeeName}
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
                                                        placeholder='complete employee Number'
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
                                            <label htmlFor='EmployeeName' className='lablesection color3 text-start mb-1'>
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeName'
                                                value={value.CompleteEmployeeName}
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
                                                RApproved by
                                            </label>
                                            <Autocomplete
                                                id="serachGpcid"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeID}
                                                getOptionLabel={(option) =>
                                                    option?.assignEmployee
                                                        ? option.assignEmployee + ' - ' + option.EmployeeName
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.assignEmployee === value.assignEmployee}
                                                onChange={handleGPCAutoCompleteChangeID}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.assignEmployee} - {option.EmployeeName}
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
                                            <label htmlFor='EmployeeName2' className='lablesection color3 text-start mb-1'>
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeName2'
                                                value={value.EmployeeName}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 mt-auto">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ApprovalDate' className='lablesection color3 text-start mb-1'>
                                                Approval Date
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

                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='bt' className='lablesection color3 text-start mb-1'>
                                            </label>
                                            <button type="button" className="btn btn-outline-primary color2 btnwork" disabled > <AddCircleOutlineIcon className='me-1' />Purachase Order</button>
                                        </div>

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
                                                        placeholder='Vendor Code'
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
                                                Vendor Confirm
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
                                                Confirmation Date
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
                                                Comments
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

                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Purachaseview