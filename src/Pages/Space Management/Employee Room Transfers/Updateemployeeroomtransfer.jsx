import React, { useState, useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios'
import Swal from "sweetalert2";
import Printer from "../../../Image/Roomassesct.png"
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

function Updateemployeeroomtransfer() {
    const navigate = useNavigate();
    let { userId } = useParams();

    const [value, setvalue] = useState({
        TransferRequestNumber: '', RequestDateTime: '',
        EmployeeID: null, Firstname: '',
        RoomCode1: null, RoomName: '', Area: '', Floor: '',
        BuildingCode: '', Buildiingname: '',
        RoomCode: null, RoomDesc: '', AreaTable: '', Floorcode: '', Buildiing: '',
        EmpCode1stLevel: null, Fullname: '', ApprovalDate: '', Flag: '',
        EmpCode2ndLevel: null, Fullname2: '', ApprovalDate2: '', Flag2: '',
        EmpCode3rdLevel: null, Fullname3: '', ApprovalDate3: '', Flag3: '',
    })

    const [Purchaselasdatass, setPurchaselasdatass] = useState([])
    const getapi = () => {
        axios.get(`/api/EmployeeRoomTransfers_GET_BYID/${userId}`)
            .then((res) => {
                console.log('TO EmployeeRoom Transfers GET_BYID By ID', res.data);
                setvalue((prevValue) => ({
                    ...prevValue,
                    TransferRequestNumber: res.data.data[0].TransferRequestNumber,
                    EmployeeID: res.data.data[0].EmployeeID,
                    RoomCode1: res.data.data[0].FROM_RoomCode,
                    RoomCode: res.data.data[0].TO_RoomCode,
                    EmpCode1stLevel: res.data.data[0].EmployeeID_Approval_1,
                    EmpCode2ndLevel: res.data.data[0].EmployeeID_Approval_2,
                    EmpCode3rdLevel: res.data.data[0].EmployeeID_Approval_3,
                    ApprovalDate: res.data.data[0].DateApproved_Approval_1,
                    ApprovalDate2: res.data.data[0].DateApproved_Approval_2,
                    ApprovalDate3: res.data.data[0].DateApproved_Approval_3,
                    Flag: res.data.data[0].ApprovedFlag_Approval_1,
                    Flag2: res.data.data[0].ApprovedFlag_Approval_2,
                    Flag3: res.data.data[0].ApprovedFlag_Approval_3,
                }));

                const RequestDateTimeget = res.data.data[0].TransferRequestDate
                const Purchasedatas = moment(RequestDateTimeget).format('YYYY-MM-DD h:mm A')
                setPurchaselasdatass(Purchasedatas)
                setvalue(prevValue => ({
                    ...prevValue,
                    RequestDateTime: RequestDateTimeget
                }))
                // EmployeeID
                const EmployeeID = res.data.data[0].EmployeeID
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
                        console.log(err);
                    });

                // FROM_RoomCode,
                const FROM_RoomCode = res.data.data[0].FROM_RoomCode
                axios.get(`/api/Rooms_newpage_GET_BYID/${FROM_RoomCode}`)
                    .then((res) => {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            RoomName: res.data.data[0].RoomDesc,
                            Area: res.data.data[0].Area,
                            Floor: res.data.data[0].FloorCode,
                            BuildingCode: res.data.data[0].BuildingCode,
                        }));
                        const RoomCodes = res.data.data[0].RoomCode
                        axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                            .then((res) => {
                                setBuildingDesc(res.data.recordset[0].BuildingDesc)
                                setimageshow(res.data.recordset[0].BuildingImage)
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        // console.log(err);;
                    });

                // TO_RoomCode,
                const TO_RoomCode = res.data.data[0].TO_RoomCode
                axios.get(`/api/Rooms_newpage_GET_BYID/${TO_RoomCode}`)
                    .then((res) => {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            RoomDesc: res.data.data[0].RoomDesc,
                            AreaTable: res.data.data[0].Area,
                            Floorcode: res.data.data[0].FloorCode,
                            Buildiing: res.data.data[0].BuildingCode,
                        }));
                        const RoomCodes = res.data.data[0].RoomCode
                        axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                            .then((res) => {
                                setBuildiingname2(res.data.recordset[0].BuildingDesc)
                            })
                            .catch((err) => {
                                console.log(err);
                            });
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

    const [Buildiingname2, setBuildiingname2] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])
    const [dropdownRoomLIST, setdropdownRoomLIST] = useState([])

    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_GET_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Location_LIST
        axios.get(`/api/Location_GET_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Floor
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloor(res.data.data)
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Rooms_newpage_GET_List`).then((res) => {
            setdropdownRoomLIST(res.data.data)

        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const [imageshow, setimageshow] = useState()
    // Building
    const [BuildingDesc, setBuildingDesc] = useState([])
    const RoomCodehandleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            RoomCode1: e.target.value,
        }));

        axios.get(`/api/Rooms_newpage_GET_BYID/${Deptnale}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomName: res.data.data[0].RoomDesc,
                    Area: res.data.data[0].Area,
                    Floor: res.data.data[0].FloorCode,
                    BuildingCode: res.data.data[0].BuildingCode,
                }));
                const RoomCodes = res.data.data[0].RoomCode
                axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                    .then((res) => {
                        setBuildingDesc(res.data.recordset[0].BuildingDesc)
                        setimageshow(res.data.recordset[0].BuildingImage)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                // console.log(err);;
            });
    }

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
        if (reason === 'reset' || reason === 'clear') {
            setUnitCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
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
                    const data = response?.data?.recordset;
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
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    // Transfer RoomCode Logic.
    const [unitCodeTransferRoomCode, setunitCodeTransferRoomCode] = useState([]);
    const [openTransferRoomCode, setOpenTransferRoomCode] = useState(false);
    const [autocompleteLoadingTransferRoomCode, setAutocompleteLoadingTransferRoomCode] = useState(false);
    const abortControllerRefTransferRoomCode = useRef(null);

    function getroomcode(RoomCode) {
        axios.get(`/api/Rooms_newpage_GET_BYID/${RoomCode}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomDesc: res.data.data[0].RoomDesc,
                    AreaTable: res.data.data[0].Area,
                    Floorcode: res.data.data[0].FloorCode,
                    Buildiing: res.data.data[0].BuildingCode,
                }));
                const RoomCodes = res.data.data[0].RoomCode
                axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                    .then((res) => {
                        setBuildiingname2(res.data.recordset[0].BuildingDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                // console.log(err);;
            });
    }
    const handleAutoCompleteInputChangeTransferRoomCode = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        if (reason === 'reset' || reason === 'clear') {
            setunitCodeTransferRoomCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValuecompleteemployee || newInputValuecompleteemployee.trim() === '') {
            // perform operation when input is cleared
            setunitCodeTransferRoomCode([])
            return;
        }
        if (newInputValuecompleteemployee === null) {
            // perform operation when input is cleared
            setunitCodeTransferRoomCode([])
            setvalue(prevValue => ({
                ...prevValue,
                RoomCode: [],
                RoomDesc: []
            }))
            return;
        }

        setAutocompleteLoadingTransferRoomCode(true);
        setOpenTransferRoomCode(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefTransferRoomCode.current) {
                abortControllerRefTransferRoomCode.current.abort();
            }
            // Create a new AbortController
            abortControllerRefTransferRoomCode.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_Rooms')
                .then((response) => {
                    const data = response?.data?.data;
                    setunitCodeTransferRoomCode(data ?? [])
                    setOpenTransferRoomCode(true);
                    setunitCodeTransferRoomCode(data)
                    setAutocompleteLoadingTransferRoomCode(false);
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
                    RoomCode: [],
                    RoomDesc: []
                }))
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setunitCodeTransferRoomCode([])
            setOpenTransferRoomCode(false);
            setAutocompleteLoadingTransferRoomCode(false);
        }

    }

    const handleGPCAutoTransferRoomCode = (event, value) => {
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                RoomCode: [],
                RoomDesc: []
            }));
        }

        if (value && value.RoomCode) {

            getroomcode(value.RoomCode);
            setvalue(prevValue => ({
                ...prevValue,
                RoomCode: value.RoomCode,
                RoomDesc: value.RoomDesc
            }));
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    //  1st Level - Emp. Code Logic.
    const [unitEmpCode1stLevel, setUnitEmpCode1stLevel] = useState([]);
    const [openIDEmpCode1stLevel, setopenIDEmpCode1stLevel] = useState(false);
    const [autocompleteLoadingEmpCode1stLevel, setautocompleteLoadingEmpCode1stLevel] = useState(false);
    const abortControllerRefIDEmpCode1stLevel = useRef(null);
    const handleAutoCompleteInputEmpCode1stLevel = async (eventID, newInputValueID, reason) => {

        if (reason === 'reset' || reason === 'clear') {
            setUnitEmpCode1stLevel([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValueID || newInputValueID.trim() === '') {
            // perform operation when input is cleared
            setUnitEmpCode1stLevel([])
            return;
        }
        if (newInputValueID === null) {
            setUnitEmpCode1stLevel([])
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode1stLevel: [],
                Fullname: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setautocompleteLoadingEmpCode1stLevel(true);
        setopenIDEmpCode1stLevel(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefIDEmpCode1stLevel.current) {
                abortControllerRefIDEmpCode1stLevel.current.abort();
            }
            // Create a new AbortController
            abortControllerRefIDEmpCode1stLevel.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_Approval_Employees')
                .then((response) => {
                    console.log('Dropdown me', response.data.data)
                    const data = response?.data?.data;
                    const dataget = data.map((requestdata) => ({
                        EmpCode1stLevel: requestdata?.EmployeeID,
                        Fullname: requestdata?.Fullname,
                    }))
                    setUnitEmpCode1stLevel(dataget ?? [])
                    setopenIDEmpCode1stLevel(true);
                    setautocompleteLoadingEmpCode1stLevel(false);
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
                    EmpCode1stLevel: [],
                    Fullname: []
                }))
                setautocompleteLoadingEmpCode1stLevel(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitEmpCode1stLevel([])
            setopenIDEmpCode1stLevel(false);
            setautocompleteLoadingEmpCode1stLevel(false);
        }

    }

    const handleGPCAutoEmpCode1stLevel = (event, value) => {

        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode1stLevel: [],
                Fullname: []
            }));
        }

        if (value && value.EmpCode1stLevel) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode1stLevel: value.EmpCode1stLevel,
                Fullname: value.Fullname
            }));
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    //  2nd Level - Emp. Code Logic.
    const [unitEmpCode2stLevel, setUnitEmpCode2ndLevel] = useState([]);
    const [openIDEmpCode2ndLevel, setopenIDEmpCode2ndLevel] = useState(false);
    const [autocompleteLoadingEmpCode2ndLevel, setautocompleteLoadingEmpCode2ndLevel] = useState(false);
    const abortControllerRefIDEmpCode2ndLevel = useRef(null);
    const handleAutoCompleteInputEmpCode2ndLevel = async (eventID, newInputValueID, reason) => {

        if (reason === 'reset' || reason === 'clear') {
            setUnitEmpCode2ndLevel([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValueID || newInputValueID.trim() === '') {
            // perform operation when input is cleared
            setUnitEmpCode2ndLevel([])
            return;
        }
        if (newInputValueID === null) {
            setUnitEmpCode2ndLevel([])
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode2ndLevel: [],
                Fullname2: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setautocompleteLoadingEmpCode2ndLevel(true);
        setopenIDEmpCode2ndLevel(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefIDEmpCode2ndLevel.current) {
                abortControllerRefIDEmpCode2ndLevel.current.abort();
            }
            // Create a new AbortController
            abortControllerRefIDEmpCode2ndLevel.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_Approval_Employees')
                .then((response) => {
                    console.log('Dropdown me', response.data.data)
                    const data = response?.data?.data;
                    const dataget = data.map((requestdata) => ({
                        EmpCode2ndLevel: requestdata?.EmployeeID,
                        Fullname2: requestdata?.Fullname,
                    }))
                    setUnitEmpCode2ndLevel(dataget ?? [])
                    setopenIDEmpCode2ndLevel(true);
                    setautocompleteLoadingEmpCode2ndLevel(false);
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
                    EmpCode2ndLevel: [],
                    Fullname2: []
                }))
                setautocompleteLoadingEmpCode1stLevel(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitEmpCode2ndLevel([])
            setopenIDEmpCode2ndLevel(false);
            setautocompleteLoadingEmpCode2ndLevel(false);
        }

    }

    const handleGPCAutoEmpCode2ndLevel = (event, value) => {

        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode2ndLevel: [],
                Fullname2: []
            }));
        }

        if (value && value.EmpCode2ndLevel) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode2ndLevel: value.EmpCode2ndLevel,
                Fullname2: value.Fullname2
            }));
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    //  2nd Level - Emp. Code Logic.
    const [unitEmpCode3rdLevel, setUnitEmpCode3rdLevel] = useState([]);
    const [openIDEmpCode3rdLevel, setopenIDEmpCode3rdLevel] = useState(false);
    const [autocompleteLoadingEmpCode3rdLevel, setautocompleteLoadingEmpCode3rdLevel] = useState(false);
    const abortControllerRefIDEmpCode3rdLevel = useRef(null);
    const handleAutoCompleteInputEmpCode3rdLevel = async (eventID, newInputValueID, reason) => {

        if (reason === 'reset' || reason === 'clear') {
            setUnitEmpCode3rdLevel([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValueID || newInputValueID.trim() === '') {
            // perform operation when input is cleared
            setUnitEmpCode3rdLevel([])
            return;
        }
        if (newInputValueID === null) {
            setUnitEmpCode3rdLevel([])
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode3rdLevel: [],
                Fullname3: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setautocompleteLoadingEmpCode3rdLevel(true);
        setopenIDEmpCode3rdLevel(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefIDEmpCode3rdLevel.current) {
                abortControllerRefIDEmpCode3rdLevel.current.abort();
            }
            // Create a new AbortController
            abortControllerRefIDEmpCode3rdLevel.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_Approval_Employees')
                .then((response) => {
                    console.log('Dropdown me', response.data.data)
                    const data = response?.data?.data;
                    const dataget = data.map((requestdata) => ({
                        EmpCode3rdLevel: requestdata?.EmployeeID,
                        Fullname3: requestdata?.Fullname,
                    }))
                    setUnitEmpCode3rdLevel(dataget ?? [])
                    setopenIDEmpCode3rdLevel(true);
                    setautocompleteLoadingEmpCode3rdLevel(false);
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
                    EmpCode3rdLevel: [],
                    Fullname3: []
                }))
                setautocompleteLoadingEmpCode3rdLevel(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitEmpCode3rdLevel([])
            setopenIDEmpCode3rdLevel(false);
            setautocompleteLoadingEmpCode3rdLevel(false);
        }

    }

    const handleGPCAutoEmpCode3rdLevel = (event, value) => {

        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode3rdLevel: [],
                Fullname2: []
            }));
        }

        if (value && value.EmpCode3rdLevel) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                EmpCode3rdLevel: value.EmpCode3rdLevel,
                Fullname3: value.Fullname3
            }));
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const addapi = async () => {
        axios.put(`/api/EmployeeRoomTransfers_Put/${userId}`, {
            TransferRequestDate: value.RequestDateTime,
            EmployeeID: value.EmployeeID,
            FROM_RoomCode: value.RoomCode1,
            TO_RoomCode: value.RoomCode,
            EmployeeID_Approval_1: value.EmpCode1stLevel,
            DateApproved_Approval_1: value.ApprovalDate,
            ApprovedFlag_Approval_1: value.Flag,
            EmployeeID_Approval_2: value.EmpCode2ndLevel,
            DateApproved_Approval_2: value.ApprovalDate2,
            ApprovedFlag_Approval_2: value.Flag2,
            EmployeeID_Approval_3: value.EmpCode3rdLevel,
            DateApproved_Approval_3: value.ApprovalDate3,
            ApprovedFlag_Approval_3: value.Flag3,

        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Update!',
                    `Employee Room Transfers ${userId} has been Update`,
                    'success'
                )
                navigate('/Employee/RoomTransfers')

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

    const addtransaction = async () => {
        addapi()
    };

    return (
        <>
            <div className="bg">
                <div className="">
                    <Box sx={{ display: "flex" }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/Employee/RoomTransfers')} />
                                    <p className="text-center my-auto ms-5">Space Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        Modify Employee Room Transfers
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-12 col-lg-2 col-xl-2 ">
                                        <img src={imageshow != null ? imageshow : Printer} alt="" className="printerpic w-100 h-100 my-1" />
                                    </div>

                                    {/*  Employee Number */}
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-3 ms-3">

                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor=' TransferRequestNumber' className='lablesection color3 text-start mb-1'>
                                                Transfer Request Number<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='TransferRequestNumber'
                                                value={value.TransferRequestNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        TransferRequestNumber: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder=' Transfer Request Number'
                                            ></input>
                                        </div>

                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee Number
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
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
                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        {/* Employee Name */}

                                        <div className='emailsection position-relative d-grid my-2 w-50'>
                                            <label htmlFor='RequestDateTime' className='lablesection color3 text-start mb-1'>
                                                Request Date / Time
                                            </label>

                                            {Purchaselasdatass !== 'Invalid date' ? (
                                                <input type="datetime-local" id="RequestDateTime" name="birthdaytime" className='rounded inputsection py-2'
                                                    value={value.RequestDateTime}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            RequestDateTime: e.target.value
                                                        }))
                                                    }} />
                                            ) : (

                                                <input type="datetime-local" id="RequestDateTime" name="birthdaytime" className='rounded inputsection py-2'
                                                    value={value.RequestDateTime}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            RequestDateTime: e.target.value
                                                        }))
                                                    }} />
                                            )}
                                        </div>

                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={value.Firstname}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Break Line */}
                                <hr className="color3 line" />
                                {/* Room Code */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='RoomCode' className='lablesection color3 text-start mb-1'>
                                                Room Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="RoomCode" aria-label="Floating label select example" value={value.RoomCode1}
                                                onChange={RoomCodehandleProvinceChange}>
                                                <option className='inputsectiondropdpwn' value=''>Select Room Code</option>
                                                {
                                                    dropdownRoomLIST && dropdownRoomLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.RoomCode}>{itme.RoomCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='RoomName' className='lablesection color3 text-start mb-1'>
                                                Room Name
                                            </label>

                                            <input
                                                types='text'
                                                id='RoomName'
                                                value={value.RoomName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RoomName: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Room Name'
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Area' className='lablesection color3 text-start mb-1'>
                                                Area/Table
                                            </label>

                                            <input
                                                types='text'
                                                id='Area'
                                                value={value.Area}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Area: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Area / Table '
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid'>
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label htmlFor='Floor' className='lablesection color3 text-start mb-1'>
                                                    Floor
                                                </label>
                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                    value={value.Floor}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            Floor: e.target.value
                                                        }))
                                                    }}
                                                >
                                                    <option className='inputsectiondropdpwn my-1'>Select Floor </option>
                                                    {
                                                        dropdownFloor && dropdownFloor.map((itme, index) => {
                                                            return (
                                                                <option key={index} value={itme.FloorCode}>{itme.FloorCode}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}
                                                // onChange={buildinghandleProvinceChange}
                                                readOnly
                                            >
                                                <option className='inputsectiondropdpwn'>Select Building Code</option>
                                                {
                                                    dropdownBuildingLIST && dropdownBuildingLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.BuildingCode}>{itme.BuildingCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Buildiing Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Departmentname'
                                                value={BuildingDesc}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Buildiing Name'
                                            ></input>
                                        </div>
                                    </div>

                                </div>
                                {/* Break Line */}
                                <hr className="color3 line" />
                                {/* Transfer - Room Code */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                                Transfer - Room Code
                                            </label>

                                            <Autocomplete
                                                id="completeemployee"
                                                required
                                                className='rounded inputsection py-0 mt-0'
                                                options={unitCodeTransferRoomCode}
                                                getOptionLabel={(option) =>
                                                    option?.RoomCode
                                                        ? option.RoomCode + ' - ' + option.RoomDesc
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.RoomCode === value.RoomCode}
                                                onChange={handleGPCAutoTransferRoomCode}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.RoomCode} - {option.RoomDesc}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventcompleteemployee, newInputValuecompleteemployee, params) =>
                                                    handleAutoCompleteInputChangeTransferRoomCode(eventcompleteemployee, newInputValuecompleteemployee, params)
                                                }
                                                loading={autocompleteLoadingTransferRoomCode}
                                                open={openTransferRoomCode} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setopenIDEmpCode1stLevel(true);
                                                }}
                                                onClose={() => {
                                                    setOpenTransferRoomCode(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder=' Transfer - Room Code'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingTransferRoomCode ? (
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='RoomName' className='lablesection color3 text-start mb-1'>
                                                Room Name
                                            </label>

                                            <input
                                                types='text'
                                                id='RoomName'
                                                value={value.RoomDesc}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RoomDesc: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Room Name'
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='AreaTable' className='lablesection color3 text-start mb-1'>
                                                Area/Table
                                            </label>

                                            <input
                                                types='text'
                                                id='AreaTable'
                                                value={value.AreaTable}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AreaTable: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Area / Table '
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid'>
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label htmlFor='Floorcode' className='lablesection color3 text-start mb-1'>
                                                    Floor
                                                </label>
                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="Floorcode" aria-label="Floating label select example"
                                                    value={value.Floorcode}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            Floorcode: e.target.value
                                                        }))
                                                    }}
                                                >
                                                    <option className='inputsectiondropdpwn my-1'>Select Floor Code </option>
                                                    {
                                                        dropdownFloor && dropdownFloor.map((itme, index) => {
                                                            return (
                                                                <option key={index} value={itme.FloorCode}>{itme.FloorCode}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='BuildingCode' className='lablesection color3 text-start mb-1'>
                                                Building Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="BuildingCode" aria-label="Floating label select example" value={value.Buildiing}
                                                // onChange={buildinghandleProvinceChange}
                                                readOnly
                                            >
                                                <option className='inputsectiondropdpwn'>Select Building Code</option>
                                                {
                                                    dropdownBuildingLIST && dropdownBuildingLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.BuildingCode}>{itme.BuildingCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Buildiingname2' className='lablesection color3 text-start mb-1'>
                                                Buildiing Name
                                            </label>

                                            <input
                                                types='text'
                                                id='Buildiingname2'
                                                value={Buildiingname2}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Buildiing Name'
                                            ></input>
                                        </div>
                                    </div>

                                </div>
                                {/* Break Line */}
                                <hr className="color3 line" />
                                <p className="color1 workitoppro fw-bold my-3">
                                    APPROVING OFFICERS
                                </p>
                                {/* 1st Level - Emp. Code */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-2 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmpCode' className='lablesection color3 text-start mb-1'>
                                                1st Level - Emp. Code
                                            </label>
                                            <Autocomplete
                                                id="EmpCode"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitEmpCode1stLevel}
                                                getOptionLabel={(option) =>
                                                    option?.EmpCode1stLevel
                                                        ? option.EmpCode1stLevel + ' - ' + option.Fullname
                                                        : ''
                                                }
                                                onChange={handleGPCAutoEmpCode1stLevel}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmpCode1stLevel} - {option.Fullname}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventID, newInputValueID, params) =>
                                                    handleAutoCompleteInputEmpCode1stLevel(eventID, newInputValueID, params)
                                                }
                                                loading={autocompleteLoadingEmpCode1stLevel}
                                                open={openIDEmpCode1stLevel} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setopenIDEmpCode1stLevel(true);
                                                }}
                                                onClose={() => {
                                                    setopenIDEmpCode1stLevel(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Emp. Code'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingEmpCode1stLevel ? (
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        {/* Employee Name */}

                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="Fullname"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='Fullname'
                                                value={value.Fullname}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2 ">
                                        {/* Employee Name */}
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='ApprovalDate' className='lablesection color3 text-start mb-1'>
                                                Approval Date
                                            </label>
                                            <input type="date" id="RequestDateTime" name="ApprovalDate" className='rounded inputsection py-2'
                                                value={value.ApprovalDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ApprovalDate: e.target.value
                                                    }))
                                                }} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-1 col-xl-1 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Flag' className='lablesection color3 text-start mb-1'>
                                                Flag
                                            </label>
                                            <input
                                                types='text'
                                                id='Fullname'
                                                value={value.Flag}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Flag: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='X'
                                                required
                                            ></input>
                                        </div>
                                    </div>


                                </div>
                                {/* 2nd Level - Emp. Code */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-2 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor=' 2ndLevelEmpCode' className='lablesection color3 text-start mb-1'>
                                                2nd Level - Emp. Code
                                            </label>
                                            <Autocomplete
                                                id="2ndLevelEmpCode"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitEmpCode2stLevel}
                                                getOptionLabel={(option) =>
                                                    option?.EmpCode2ndLevel
                                                        ? option.EmpCode2ndLevel + ' - ' + option.Fullname2
                                                        : ''
                                                }
                                                onChange={handleGPCAutoEmpCode2ndLevel}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmpCode2ndLevel} - {option.Fullname2}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventID, newInputValueID, params) =>
                                                    handleAutoCompleteInputEmpCode2ndLevel(eventID, newInputValueID, params)
                                                }
                                                loading={autocompleteLoadingEmpCode2ndLevel}
                                                open={openIDEmpCode2ndLevel} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setopenIDEmpCode1stLevel(true);
                                                }}
                                                onClose={() => {
                                                    setopenIDEmpCode2ndLevel(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Emp. Code'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingEmpCode1stLevel ? (
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        {/* Employee Name */}

                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="Fullname"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='Fullname'
                                                value={value.Fullname2}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                                readOnly
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2 ">
                                        {/* Employee Name */}
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='ApprovalDate' className='lablesection color3 text-start mb-1'>
                                                Approval Date
                                            </label>
                                            <input type="date" id="RequestDateTime" name="ApprovalDate" className='rounded inputsection py-2'
                                                value={value.ApprovalDate2}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ApprovalDate2: e.target.value
                                                    }))
                                                }} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-1 col-xl-1 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Flag2' className='lablesection color3 text-start mb-1'>
                                                Flag
                                            </label>
                                            <input
                                                types='text'
                                                id='Fullname2'
                                                value={value.Flag2}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Flag2: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='X'
                                                required
                                            ></input>
                                        </div>
                                    </div>


                                </div>

                                {/* 3rd Level - Emp. Code */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-2 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='3rdLevelEmpCode' className='lablesection color3 text-start mb-1'>
                                                3rd Level - Emp. Code
                                            </label>
                                            <Autocomplete
                                                id="3rdLevelEmpCode"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitEmpCode3rdLevel}
                                                getOptionLabel={(option) =>
                                                    option?.EmpCode3rdLevel
                                                        ? option.EmpCode3rdLevel + ' - ' + option.Fullname3
                                                        : ''
                                                }
                                                onChange={handleGPCAutoEmpCode3rdLevel}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmpCode3rdLevel} - {option.Fullname3}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventID, newInputValueID, params) =>
                                                    handleAutoCompleteInputEmpCode3rdLevel(eventID, newInputValueID, params)
                                                }
                                                loading={autocompleteLoadingEmpCode3rdLevel}
                                                open={openIDEmpCode3rdLevel} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setopenIDEmpCode1stLevel(true);
                                                }}
                                                onClose={() => {
                                                    setopenIDEmpCode3rdLevel(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Emp. Code'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingEmpCode1stLevel ? (
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        {/* Employee Name */}

                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="Fullname"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='Fullname'
                                                value={value.Fullname3}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                                readOnly
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-2 col-xl-2 ">
                                        {/* Employee Name */}
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='ApprovalDate3' className='lablesection color3 text-start mb-1'>
                                                Approval Date
                                            </label>
                                            <input type="date" id="RequestDateTime3" name="ApprovalDate" className='rounded inputsection py-2'
                                                value={value.ApprovalDate3}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ApprovalDate3: e.target.value
                                                    }))
                                                }} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-1 col-xl-1 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Flag3' className='lablesection color3 text-start mb-1'>
                                                Flag
                                            </label>
                                            <input
                                                types='text'
                                                id='Flag3'
                                                value={value.Flag3}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Flag3: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='X'
                                                required
                                            ></input>
                                        </div>
                                    </div>


                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={() => navigate('/Employee/RoomTransfers')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <button type="button" className="border-0 px-3 mx-2  savebtn py-2" onClick={addtransaction}><SaveIcon className='me-2' />SAVE</button>
                                </div>

                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Updateemployeeroomtransfer;
