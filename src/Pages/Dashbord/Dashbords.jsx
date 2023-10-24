import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Siderbar from '../../Component/Siderbar/Siderbar';
import { useNavigate } from 'react-router-dom';
import SpaceOccupancy from "../../Image/SpaceManagement.png"
import WorkRequest from "../../Image/WorkRequest.png"
import Workorder from "../../Image/WorkOrder.png"
import PreventiveMaintenance from "../../Image/Preventive Maintenance.png"
import Cleaningwork from "../../Image/Cleaning Works.png"
import PurchaseRequest from '../../Image/Purchasing  Management.png'
import "./Dashbord.css"
import axios from 'axios';
import moment from 'moment'
import { Slider } from 'antd';

function Dashbords() {
    const navigate = useNavigate();

    const [getdata, setgetdata] = useState([])
    const [LastPurchase, setLastPurchase] = useState([])
    const [totalpurachaserequuest, settotalpurachaserequuest] = useState([])
    const [lastcreatpurachaserquest, setlastcreatpurachaserquest] = useState([])
    const [TotalCreated, setTotalCreated] = useState([])
    const [cleaningdatalast, setcleaningdatalast] = useState([])
    const [preventivelength, setpreventivelength] = useState([])
    const [datapreventlast, setdatapreventlast] = useState([])
    const [workorderlength, setworkorderlength] = useState([])
    const [workroderopen, setworkroderopen] = useState([])
    const [Latestworkorderpost, setLatestworkorderpost] = useState([])
    const [oldestdata, setoldestdata] = useState([])
    const [Latestworkorderopen, setLatestworkorderopen] = useState([])
    const [workrrequest, setworkrrequest] = useState([])
    const [workrequesttotalopen, setworkrequesttotalopen] = useState([])
    const [LatestworkrequestOpen, setLatestworkrequestOpen] = useState([])
    const [OldestworkrequestOpen, setOldestworkrequestOpen] = useState([])
    const [Latestpost, setLatestpost] = useState([])
    const [TotalCapacity, setTotalCapacity] = useState([])
    const [totalOccupancy, settotalOccupancy] = useState([])
    const [TotalEmployees, setTotalEmployees] = useState([])

    const [worrkrequestopenlastweek, setworrkrequestopenlastweek] = useState([])
    const [worrkrequestopenlastmonth, setworrkrequestopenlastmonth] = useState([])
    const [worrkrequestopenlastyear, setworrkrequestopenlastyear] = useState([])
    const [worrkrequestlastweek, setworrkrequestlastweek] = useState([])
    const [worrkrequestlastmonth, setworrkrequestlastmonth] = useState([])
    const [worrkrequestlastyear, setworrkrequestlastyear] = useState([])
    const [worrorderopenlastweek, setworrorderopenlastweek] = useState([])
    const [worrorderopenlastmonth, setworkorderopenlastmonth] = useState([])
    const [worrorderopenlastyear, setworrorderopenlastyear] = useState([])
    const [worrkorderlastweek, setworrkorderlastweek] = useState([])
    const [worrkorderlastmonth, setworkrordertlastmonth] = useState([])
    const [worrkorderlastyear, setworrkorderlastyear] = useState([])
    const [PreventiveMaintenancelastweek, setPreventiveMaintenancelastweek] = useState([])
    const [PreventiveMaintenancelastmonth, setPreventiveMaintenancelastmonth] = useState([])
    const [PreventiveMaintenancelastyear, setPreventiveMaintenancelastyear] = useState([])
    const [CleaningWorkslastweek, setCleaningWorkslastweek] = useState([])
    const [CleaningWorkslastmonth, setCleaningWorkslastmonth] = useState([])
    const [CleaningWorkslastyear, setCleaningWorkslastyear] = useState([])
    const [Purchaserequestlastweek, setPurchaserequestlastweek] = useState([])
    const [Purchaserequestlastmonth, setPurchaserequestlastmonth] = useState([])
    const [Purchaserequestlastyear, setPurchaserequestlastyear] = useState([])
    const [Purchaseorderlastweek, setPurchaseorderlastweek] = useState([])
    const [Purchaseorderlastmonth, setPurchaseorderlastmonth] = useState([])
    const [Purchaseorderlastyear, setPurchaseorderlastyear] = useState([])

    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])

    const [value, setvalue] = useState({
        Floor: '', BuildingCodefiltervalue: '', LocationCodefiltervalue:''
    })


    useEffect(() => {
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
            // Floor list
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloor(res.data.data)
        })
            .catch((err) => {
                console.log(err);
            });

        // Total employee
        axios.get(`/api/EmployeeMaster_GET_LIST`)
            .then((res) => {
                setTotalEmployees(res.data.recordset)
            })
            .catch((err) => {
                console.log(err);
            });
        // total Vacancy
        axios.get(`/api/Total_Occupants`)
            .then((res) => {
                settotalOccupancy(res.data.data[0].total_Occupants)
            })
            .catch((err) => {
                console.log(err);
            });
        // Total_Capacity
        axios.get(`/api/Total_Capacity`)
            .then((res) => {
                setTotalCapacity(res.data.data[0].total_Capacity)
            })
            .catch((err) => {
                console.log(err);
            });
        // workRequest_GET_LIST 
        axios.get(`/api/workRequest_GET_LIST`)
            .then((res) => {
                const workOrders = res.data.recordset
                const closeWorkOrders = workOrders.filter(workOrder => workOrder.RequestStatus === "Closed");
                setworkrrequest(closeWorkOrders)
                const openWorkOrders = workOrders.filter(workOrder => workOrder.RequestStatus === "Open");
                setworkrequesttotalopen(openWorkOrders);
                const workRequests = res.data.recordset;
                if (workRequests.length > 0) {
                    const lastWorkRequest = workRequests[workRequests.length - 1];
                    setLatestpost(lastWorkRequest)
                    if (closeWorkOrders.length > 0) {
                    const today = new Date();
                    const lastWeek = new Date(today);
                    // lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago
                    lastWeek.setDate(today.getDate() + 7); // Calculate the date one week from today

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = closeWorkOrders.filter(item => {
                        const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                        // return itemDate >= lastWeek && itemDate <= today;
                        return itemDate >= today && itemDate <= lastWeek;

                    });

                    const dataLastMonth =closeWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                    const dataLastYear = closeWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                    setworrkrequestlastyear(dataLastYear)
                    setworrkrequestlastmonth(dataLastMonth)
                    setworrkrequestlastweek(dataWithinLastWeek)
                    }

                } else {
                    console.log("No Date is");
                }
                if (openWorkOrders.length > 0) {
                    // Find the latest "Open" work request
                    const latestOpenWorkRequest = openWorkOrders.reduce((latest, current) => {
                        return new Date(current.RequestDateTime) > new Date(latest.RequestDateTime) ? current : latest;
                    });
                    // Find the oldest "Open" work request
                    const oldestOpenWorkRequest = openWorkOrders.reduce((oldest, current) => {
                        return new Date(current.RequestDateTime) < new Date(oldest.RequestDateTime) ? current : oldest;
                    });
                    setLatestworkrequestOpen(latestOpenWorkRequest);
                    setOldestworkrequestOpen(oldestOpenWorkRequest);
                    
                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago
                    lastWeek.setDate(today.getDate() + 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = openWorkOrders.filter(item => {
                        const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                        // return itemDate >= lastWeek && itemDate <= today;
                        return itemDate >= today && itemDate <= lastWeek;

                    });

                    const dataLastMonth = openWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                    const dataLastYear = openWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                    setworrkrequestopenlastyear(dataLastYear)
                    setworrkrequestopenlastmonth(dataLastMonth)
                    setworrkrequestopenlastweek(dataWithinLastWeek)

                } else {
                    console.log("No open work requests found");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // Work Orders
        axios.get(`/api/WorkOrders_GET_LIST`)
            .then((res) => {
                const workOrders = res.data.recordset
                const closeWorkOrders = workOrders.filter(workOrder => workOrder.WorkStatus === "Closed");
                setworkorderlength(closeWorkOrders)
               const openWorkOrders = workOrders.filter(workOrder => workOrder.WorkStatus === "Open");
               const Latestworkorder = workOrders[workOrders.length - 1];
               setLatestworkorderpost(Latestworkorder)
                if (closeWorkOrders.length > 0) {
                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = closeWorkOrders.filter(item => {
                        const itemDate = new Date(item.StartWorkOrderDateTime); // Replace "date" with your date field name
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = closeWorkOrders.filter(item => new Date(item.StartWorkOrderDateTime) >= lastMonthDate);
                    const dataLastYear = closeWorkOrders.filter(item => new Date(item.StartWorkOrderDateTime) >= lastYearDate);
                    setworrkorderlastyear(dataLastYear)
                    setworkrordertlastmonth(dataLastMonth)
                    setworrkorderlastweek(dataWithinLastWeek)

                } else {
                    console.log("No Date is");
                }
                setworkroderopen(openWorkOrders);
                if (openWorkOrders.length > 0) {
                    // Find the latest "Open" work request
                    const latestOpenWorkRequest = openWorkOrders.reduce((latest, current) => {
                        return new Date(current.StartWorkOrderDateTime) > new Date(latest.StartWorkOrderDateTime) ? current : latest;
                    });
                    // Find the oldest "Open" work request
                    const oldestOpenWorkRequest = openWorkOrders.reduce((oldest, current) => {
                        return new Date(current.StartWorkOrderDateTime) < new Date(oldest.StartWorkOrderDateTime) ? current : oldest;
                    });
                    setLatestworkorderopen(latestOpenWorkRequest);
                    setoldestdata(oldestOpenWorkRequest);
                    // Weeke month and years
                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = openWorkOrders.filter(item => {
                        const itemDate = new Date(item.StartWorkOrderDateTime); // Replace "date" with your date field name
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = openWorkOrders.filter(item => new Date(item.StartWorkOrderDateTime) >= lastMonthDate);
                    const dataLastYear = openWorkOrders.filter(item => new Date(item.StartWorkOrderDateTime) >= lastYearDate);
                    setworrorderopenlastyear(dataLastYear)
                    setworkorderopenlastmonth(dataLastMonth)
                    setworrorderopenlastweek(dataWithinLastWeek)
                } else {
                    console.log("No open work requests found");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // Preventive Maintenance
        axios.get(`/api/PreventiveMaintenance_GET_LIST`)
            .then((res) => {
                setpreventivelength(res.data.recordset)
                if (res.data.recordset.length > 0) {
                    const lastItem = res.data.recordset[res.data.recordset.length - 1];
                    setdatapreventlast(lastItem)

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = res.data.recordset.filter(item => {
                        const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = res.data.recordset.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                    const dataLastYear = res.data.recordset.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                    setPreventiveMaintenancelastyear(dataLastYear)
                    setPreventiveMaintenancelastmonth(dataLastMonth)
                    setPreventiveMaintenancelastweek(dataWithinLastWeek)

                } else {
                    console.log('The array is empty.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // CleaningWorks_GET_LIST
        axios.get(`/api/CleaningWorks_GET_LIST`)
            .then((res) => {
                setTotalCreated(res.data.recordset)
                if (res.data.recordset.length > 0) {
                    const lastItem = res.data.recordset[res.data.recordset.length - 1];
                    setcleaningdatalast(lastItem)
                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = res.data.recordset.filter(item => {
                        const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = res.data.recordset.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                    const dataLastYear = res.data.recordset.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                    setCleaningWorkslastyear(dataLastYear)
                    setCleaningWorkslastmonth(dataLastMonth)
                    setCleaningWorkslastweek(dataWithinLastWeek)

                } else {
                    console.log('The array is empty.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // PurchaseRequest_GET_List
        axios.get(`/api/PurchaseRequest_GET_List`)
            .then((res) => {
                settotalpurachaserequuest(res.data.recordset)
                if (res.data.recordset.length > 0) {
                    const lastItem = res.data.recordset[res.data.recordset.length - 1];
                    setlastcreatpurachaserquest(lastItem)

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = res.data.recordset.filter(item => {
                        const itemDate = new Date(item.RequestDate); // Replace "date" with your date field name
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = res.data.recordset.filter(item => new Date(item.RequestDate) >= lastMonthDate);
                    const dataLastYear = res.data.recordset.filter(item => new Date(item.RequestDate) >= lastYearDate);
                    setPurchaserequestlastyear(dataLastYear)
                    setPurchaserequestlastmonth(dataLastMonth)
                    setPurchaserequestlastweek(dataWithinLastWeek)

                } else {
                    console.log('The array is empty.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // PurchaseOrder_GET_List
        axios.get(`/api/PurchaseOrder_GET_List`)
            .then((res) => {
                if (res.data.recordset.length > 0) {
                    const lastItem = res.data.recordset[res.data.recordset.length - 1];
                    setLastPurchase(lastItem)

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = res.data.recordset.filter(item => {
                        const itemDate = new Date(item.PODate); // Replace "date" with your date field name
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = res.data.recordset.filter(item => new Date(item.PODate) >= lastMonthDate);
                    const dataLastYear = res.data.recordset.filter(item => new Date(item.PODate) >= lastYearDate);
                    setPurchaseorderlastyear(dataLastYear)
                    setPurchaseorderlastmonth(dataLastMonth)
                    setPurchaseorderlastweek(dataWithinLastWeek)
                } else {
                    console.log('The array is empty.');
                }
                setgetdata(res.data.recordset);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    const totaleTotalVacancy = TotalCapacity - totalOccupancy

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
                                        <p className="text-center my-auto ms-5">Dashbord</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className="my-5 container">
                               
                                {/* Search Fields */}
                                <div className="row formsection my-5">

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Datetime' className='lablesection color3 text-start mb-3'>
                                                Date Period* MM/DD/YY to MM/DD/YY
                                            </label>
                                            <Slider
                                                range={{
                                                    draggableTrack: true,
                                                }}
                                                style={{ color: 'black' }}
                                                defaultValue={[20, 50]}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 offset-md-4 offset-md-1 offset-lg-3 offset-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example"
                                                value={value.BuildingCodefiltervalue}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCodefiltervalue: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value=''>Select Dept Code</option>
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 ">
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

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                                Location
                                            </label>

                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                value={value.LocationCodefiltervalue}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCodefiltervalue: e.target.value
                                                    }))
                                                }}
                                            >
                                                <option className='inputsectiondropdpwn' value=''>Select Location</option>
                                                {
                                                    dropdownLocation && dropdownLocation.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.LocationCode}>{itme.LocationCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <hr className='color3 line' />
                                <div className="">
                                    <h6 className='fs-4 text-center my-3 fw-bold'>Space Occupancy</h6>
                                    <div className="bordercolor rounded bgupdata  ">
                                        {/* SPace section */}
                                        <div className="topmain p-3">
                                            <div className="d-flex my-auto">
                                                <img src={SpaceOccupancy} alt="Space Occupancy" className=' me-2' />
                                                <div className="my-auto">
                                                    <h6 className='headingdashbord text-center ms-2'>Total Employees</h6>
                                                    <p className='propdashbord text-center'>{TotalEmployees.length}</p>
                                                </div>
                                            </div>
                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Capacity</h6>
                                                <p className='propdashbord text-center'>{TotalCapacity}</p>
                                            </div>

                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Occupancy</h6>
                                                <p className='propdashbord text-center'>{totalOccupancy}&nbsp; &nbsp; {(totalOccupancy / TotalCapacity) * 100}%</p>
                                            </div>

                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Vacancy</h6>
                                                <p className='propdashbord text-center ms-2'>{totaleTotalVacancy} &nbsp; &nbsp;{(totaleTotalVacancy / TotalCapacity) * 100 }%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row mx-auto formsection" >
                                    {/* Work Request */}
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className='fs-4 text-center my-3 fw-bold'>Work Request</h6>
                                        <div className="bgupdata bordercolor rounded p-3">
                                            <div className="d-flex justify-content-between w-100">

                                                <div className="d-flex mb-auto">
                                                    <img src={WorkRequest} alt="Space Occupancy" className='pointerss me-2' onClick={(() => {
                                                        navigate('/workrequest')
                                                    })} />
                                                    <div className="my-auto">
                                                        <h6 className='headingdashbord text-center ms-2'> Total Open</h6>
                                                        <p className='propdashbord text-center'>{workrequesttotalopen.length}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - {worrkrequestopenlastweek.length}</p>
                                                    <p className='insdieborder'>MTD - {worrkrequestopenlastmonth.length}</p>
                                                    <p className='insdieborder'>YTD - {worrkrequestopenlastyear.length}</p>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="">
                                                    <h6 className='headingdashbord text-center ms-2'>Total Posted</h6>
                                                    <p className='propdashbord text-center'>{workrrequest.length}</p>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - {worrkrequestlastweek.length}</p>
                                                    <p className='insdieborder'>MTD - {worrkrequestlastmonth.length}</p>
                                                    <p className='insdieborder'>YTD - {worrkrequestlastyear.length}</p>
                                                </div>

                                            </div>
                                            <div className='text-center mt-2 lastpro'>
                                                <p className='fs-6 my-1'>Latest - Open : {moment(LatestworkrequestOpen.RequestDateTime).isValid() ? moment(LatestworkrequestOpen.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WR-{LatestworkrequestOpen.RequestNumber}</p>
                                                <p className='fs-6 my-1'>Oldest - Open : {moment(OldestworkrequestOpen.RequestDateTime).isValid() ? moment(OldestworkrequestOpen.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WR-{OldestworkrequestOpen.RequestNumber}</p>
                                                <p className='fs-6 my-1'>Latest - Post : {moment(Latestpost.RequestDateTime).isValid() ? moment(Latestpost.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WR-{Latestpost.RequestNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Work Orders */}
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className='emailsection  d-grid'>
                                            <h6 className='fs-4 text-center my-3 fw-bold'>Work Orders</h6>
                                            <div className="bgupdata bordercolor rounded p-3">
                                                <div className="d-flex justify-content-between w-100">

                                                    <div className="d-flex mb-auto">
                                                        <img src={Workorder} alt="Space Occupancy" className=' me-2 pointerss' onClick={(() => {
                                                            navigate('/workorder')
                                                        })} />
                                                        <div className="my-auto">
                                                            <h6 className='headingdashbord text-center ms-2'>Total Open</h6>
                                                            <p className='propdashbord text-center'>{workroderopen.length}</p>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <p className='insdieborder'>WTD - {worrorderopenlastweek.length}</p>
                                                        <p className='insdieborder'>MTD - {worrorderopenlastmonth.length}</p>
                                                        <p className='insdieborder'>YTD - {worrorderopenlastyear.length}</p>
                                                    </div>

                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between w-100">
                                                    <div className="">
                                                        <h6 className='headingdashbord text-center ms-2'>Total Posted</h6>
                                                        <p className='propdashbord text-center'>{workorderlength.length}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className='insdieborder'>WTD - {worrkorderlastweek.length}</p>
                                                        <p className='insdieborder'>MTD - {worrkorderlastmonth.length}</p>
                                                        <p className='insdieborder'>YTD - {worrkorderlastyear.length}</p>
                                                    </div>

                                                </div>
                                                <div className='text-center mt-2 lastpro'>
                                                    <p className='fs-6 my-1'>Latest - Open : {moment(Latestworkorderopen.StartWorkOrderDateTime).isValid() ? moment(Latestworkorderopen.StartWorkOrderDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WO-{Latestworkorderopen.WorkOrderNumber}</p>
                                                    <p className='fs-6 my-1'>Oldest - Open : {moment(oldestdata.StartWorkOrderDateTime).isValid() ? moment(oldestdata.StartWorkOrderDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WO-{oldestdata.WorkOrderNumber}</p>
                                                    <p className='fs-6 my-1'>Latest - Post :{moment(Latestworkorderpost.StartWorkOrderDateTime).isValid() ? moment(Latestworkorderpost.StartWorkOrderDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WO-{Latestworkorderpost.WorkOrderNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Preventive Maintenance */}
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className='fs-4 text-center my-3 fw-bold'>Preventive Maintenance</h6>
                                        <div className="bgupdata bordercolor rounded p-3">
                                            <div className="d-flex justify-content-between w-100">

                                                <div className="d-flex mb-auto">
                                                    <img src={PreventiveMaintenance} alt="Space Occupancy" className=' me-2 pointerss' onClick={(() => {
                                                        navigate('/Preventive')
                                                    })} />
                                                    <div className="my-auto">
                                                        <h6 className='headingdashbord text-center ms-2'>Total Created</h6>
                                                        <p className='propdashbord text-center'>{preventivelength.length}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - {PreventiveMaintenancelastweek.length}</p>
                                                    <p className='insdieborder'>MTD - {PreventiveMaintenancelastmonth.length}</p>
                                                    <p className='insdieborder'>YTD - {PreventiveMaintenancelastyear.length}</p>
                                                </div>

                                            </div>

                                            <div className='text-center mt-2 lastpro'>
                                                <p className='fs-6 my-1'>Last Created :{moment(datapreventlast.RequestDateTime).isValid() ? moment(datapreventlast.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} RN-{datapreventlast.RequestNumber}</p>
                                                <p className='fs-6 my-1'>Warranty Ends : DD/MM/YYYY XXXXXXXXXXXXXXXXXXXXXXXX</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Cleaningwork */}
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className='fs-4 text-center my-3 fw-bold'>Cleaning Works</h6>
                                        <div className="bgupdata bordercolor rounded p-3">
                                            <div className="d-flex justify-content-between w-100">

                                                <div className="d-flex mb-auto">
                                                    <img src={Cleaningwork} alt="PurchaseRequest" className='pointerss me-2' onClick={(() => {
                                                        navigate('/Cleaning')
                                                    })} />
                                                    <div className="my-auto">
                                                        <h6 className='headingdashbord text-center ms-2'>Total Created</h6>
                                                        <p className='propdashbord text-center'>{TotalCreated.length}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - {CleaningWorkslastweek.length}</p>
                                                    <p className='insdieborder'>MTD - {CleaningWorkslastmonth.length}</p>
                                                    <p className='insdieborder'>YTD - {CleaningWorkslastyear.length}</p>
                                                </div>

                                            </div>

                                            <div className='text-center mt-2 lastpro'>
                                                <p className='fs-6 my-1'>Last Request :{moment(cleaningdatalast.RequestDateTime).isValid() ? moment(cleaningdatalast.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} PR-{cleaningdatalast.RequestNumber}</p>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Purchase Request*  */}
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className='fs-4 text-center my-3 fw-bold'>Purchase Request</h6>
                                        <div className="bgupdata bordercolor rounded p-3">
                                            <div className="d-flex justify-content-between w-100">

                                                <div className="d-flex mb-auto">
                                                    <img src={PurchaseRequest} alt="Space Occupancy" className='pointerss me-2' onClick={(() => {
                                                        navigate('/PurchaserequestView')
                                                    })} />
                                                    <div className="my-auto">
                                                        <h6 className='headingdashbord text-center ms-2'>Total Request</h6>
                                                        <p className='propdashbord text-center'>{totalpurachaserequuest.length}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - {Purchaserequestlastweek.length}</p>
                                                    <p className='insdieborder'>MTD - {Purchaserequestlastmonth.length}</p>
                                                    <p className='insdieborder'>YTD - {Purchaserequestlastyear.length}</p>
                                                </div>

                                            </div>

                                            <div className='text-center mt-2 lastpro'>
                                                <p className='fs-6 my-1'>Last Created : {moment(lastcreatpurachaserquest.RequestDate).isValid() ? moment(lastcreatpurachaserquest.RequestDate).format('DD-MM-YYYY') : 'DD/MM/YYYY'} WO-{lastcreatpurachaserquest.PurchaseRequestNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Purchase Orders  */}
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                        <h6 className='fs-4 text-center my-3 fw-bold'>Purchase Order</h6>
                                        <div className="bgupdata bordercolor rounded p-3">
                                            <div className="d-flex justify-content-between w-100">

                                                <div className="d-flex mb-auto">
                                                    <img src={PurchaseRequest} alt="Space Occupancy" className='pointerss me-2' onClick={(() => {
                                                        navigate('/Purachaseorderview')
                                                    })} />
                                                    <div className="my-auto">
                                                        <h6 className='headingdashbord text-center ms-2'>Total Purchases</h6>
                                                        <p className='propdashbord text-center'>{getdata.length}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - {Purchaseorderlastweek.length}</p>
                                                    <p className='insdieborder'>MTD - {Purchaseorderlastmonth.length}</p>
                                                    <p className='insdieborder'>YTD - {Purchaseorderlastyear.length}</p>
                                                </div>

                                            </div>

                                            <div className='text-center mt-2 lastpro'>
                                                <p className='fs-6 my-1'>Last Purchase :  {moment(LastPurchase.PODate).isValid() ? moment(LastPurchase.PODate).format('DD-MM-YYYY') : 'DD/MM/YYYY'} PO-{LastPurchase.PurchaseOrderNumber}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashbords