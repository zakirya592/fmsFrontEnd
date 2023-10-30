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
import { format, addWeeks, addDays, addMonths, addYears } from "date-fns";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the slider styles

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
        Floor: '', BuildingCodefiltervalue: '', LocationCodefiltervalue: ''
    })


    useEffect(() => {
        axios.get(`/api/Rooms_newpage_GET_List`)
            .then((res) => {
                // Assuming res.data.data is an array of objects
                const dataWithinLastWeek = res.data.data;

                // Calculate the total capacity for all data
                const totalCapacity = dataWithinLastWeek.reduce((accumulator, item) => {
                    const itemCapacity = item.Capacity;
                    if (itemCapacity !== undefined && !isNaN(itemCapacity)) {
                        return accumulator + parseFloat(itemCapacity); // Use parseFloat to handle numeric values
                    } else {
                        return accumulator;
                    }
                }, 0);

                const totalOccupancy = dataWithinLastWeek.reduce((accumulator, item) => {
                    const TotalOccupancy = item.Occupants;
                    if (TotalOccupancy !== undefined && !isNaN(TotalOccupancy)) {
                        return accumulator + parseFloat(TotalOccupancy); // Use parseFloat to handle numeric values
                    } else {
                        return accumulator;
                    }
                }, 0);
                setTotalCapacity(totalCapacity)
                settotalOccupancy(totalOccupancy)
                const selectedFloorCode = value.Floor; // Assuming you have a selected floor code

                if (selectedFloorCode) {
                    // Filter data based on the selected FloorCode
                    const filteredData = dataWithinLastWeek.filter((item) =>
                        item.FloorCode === selectedFloorCode,
                    );

                    if (filteredData.length > 0) {
                        // Calculate the total capacity for the filtered data
                        const totalCapacityFiltered = filteredData.reduce((accumulator, item) => {
                            const itemCapacity = item.Capacity;
                            if (itemCapacity !== undefined && !isNaN(itemCapacity)) {
                                return accumulator + parseFloat(itemCapacity);
                            } else {
                                return accumulator;
                            }
                        }, 0);

                        const TotalOccupancyFiltered = filteredData.reduce((accumulator, item) => {
                            const TotalOccupancy = item.Occupants;
                            if (TotalOccupancy !== undefined && !isNaN(TotalOccupancy)) {
                                return accumulator + parseFloat(TotalOccupancy);
                            } else {
                                return accumulator;
                            }
                        }, 0);

                        setTotalCapacity(totalCapacityFiltered)
                        settotalOccupancy(TotalOccupancyFiltered)

                    } else {
                        console.log('No data for the selected FloorCode.');
                        // setTotalCapacity(0)
                        // settotalOccupancy(0)

                    }
                } else {
                    // console.log('No FloorCode selected.');
                }
            })
            .catch((err) => {
                console.log(err);
            });

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

        axios.get(`/api/EmployeeMaster_GET_LIST`)
            .then((res) => {
                // Assuming res.data.recordset is an array of objects
                const preventiveMaintenanceData = res.data.recordset;
                console.log(preventiveMaintenanceData);
                // Find the length of the original array
                const originalArrayLength = preventiveMaintenanceData.length;
                setTotalEmployees(originalArrayLength)

                if (value.BuildingCodefiltervalue || value.LocationCodefiltervalue) {
                    // Create a copy of the original data to filter
                    let filteredData = [...preventiveMaintenanceData];

                    if (value.BuildingCodefiltervalue) {
                        // Filter by BuildingCode if it's selected
                        filteredData = filteredData.filter((item) =>
                            item.BuildingCode === value.BuildingCodefiltervalue
                        );
                    }

                    if (value.LocationCodefiltervalue) {
                        // Filter by LocationCode if it's selected
                        filteredData = filteredData.filter((item) =>
                            item.LocationCode === value.LocationCodefiltervalue
                        );
                    }

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const dataWithinLastWeek = filteredData.filter(item => {
                        const itemDate = item.EmployeeID; // Replace "date" with your field name
                        return itemDate;
                    });

                    // Log the length of the filtered data
                    const filteredArrayLength = dataWithinLastWeek.length;
                    setTotalEmployees(filteredArrayLength);
                } else {
                    console.log("No data in ");
                }
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
                    // if (closeWorkOrders.length > 0) {
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

                        const dataLastMonth = closeWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                        const dataLastYear = closeWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                        setworrkrequestlastyear(dataLastYear)
                        setworrkrequestlastmonth(dataLastMonth)
                        setworrkrequestlastweek(dataWithinLastWeek)


                    if (value.BuildingCodefiltervalue || value.LocationCodefiltervalue) {
                        // Filter preventive maintenance data by location
                        let filteredData = closeWorkOrders; // Initialize with all data
                        if (value.BuildingCodefiltervalue) {
                            // Filter by BuildingCode if it's selected
                            filteredData = filteredData.filter(
                                (item) => item.BuildingCode === value.BuildingCodefiltervalue
                            );
                        }

                        if (value.LocationCodefiltervalue) {
                            // Filter by LocationCode if it's selected
                            filteredData = filteredData.filter(
                                (item) => item.LocationCode === value.LocationCodefiltervalue
                            );
                        }
                        
                        if (filteredData.length > 0) {
                            setworkrrequest(filteredData);
                            const lastItem = filteredData[filteredData.length - 1];
                            setLatestpost(lastItem);

                            const today = new Date();
                            const lastWeek = new Date(today);
                            lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                            const lastMonthDate = new Date(today);
                            lastMonthDate.setMonth(today.getMonth() - 1);

                            const lastYearDate = new Date(today);
                            lastYearDate.setFullYear(today.getFullYear() - 1);

                            const dataWithinLastWeek = filteredData.filter(item => {
                                const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                                return itemDate >= today && itemDate <= lastWeek;
                            });
                            const dataLastMonth = filteredData.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                            const dataLastYear = filteredData.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                            setworrkrequestlastyear(dataLastYear);
                            setworrkrequestlastmonth(dataLastMonth);
                            setworrkrequestlastweek(dataWithinLastWeek);
                        } else {
                            console.log('The array is empty.');
                            setworkrrequest([]);
                            setworrkrequestlastyear([]);
                            setworrkrequestlastmonth([]);
                            setworrkrequestlastweek([]);

                        }
                    } else {
                        console.log('No filters selected.');
                    }

                    // }

                } else {
                    console.log("No Date is");
                }

                if (workRequests.length > 0) {
                    // if (openWorkOrders.length > 0) {
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
                        return itemDate >= today && itemDate <= lastWeek;

                    });

                    const dataLastMonth = openWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                    const dataLastYear = openWorkOrders.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                    setworrkrequestopenlastyear(dataLastYear)
                    setworrkrequestopenlastmonth(dataLastMonth)
                    setworrkrequestopenlastweek(dataWithinLastWeek)
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

                    if (value.BuildingCodefiltervalue || value.LocationCodefiltervalue) {
                        // Filter preventive maintenance data by location
                        const preventiveMaintenanceData = openWorkOrders;

                        let filteredDatas = preventiveMaintenanceData;

                        if (value.BuildingCodefiltervalue) {
                            filteredDatas = filteredDatas.filter((item) =>
                                item.BuildingCode === value.BuildingCodefiltervalue
                            );
                        }

                        if (value.LocationCodefiltervalue) {
                            filteredDatas = filteredDatas.filter((item) =>
                                item.LocationCode === value.LocationCodefiltervalue
                            );
                        }
                        
                        if (filteredDatas.length > 0) {

                            setworkrequesttotalopen(filteredDatas)
                            const lastItem = filteredDatas[filteredDatas.length - 1];
                            const today = new Date();
                            const lastWeek = new Date(today);
                            lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                            const lastMonthDate = new Date(today);
                            lastMonthDate.setMonth(today.getMonth() - 1);

                            const lastYearDate = new Date(today);
                            lastYearDate.setFullYear(today.getFullYear() - 1);
                            let filteredData = [...preventiveMaintenanceData]; // Initialize with all data
                            
                            if (value.BuildingCodefiltervalue) {
                                // Filter by BuildingCode if it's selected
                                filteredData = filteredData.filter(
                                    (item) => item.BuildingCode === value.BuildingCodefiltervalue
                                );
                            }

                            if (value.LocationCodefiltervalue) {
                                // Filter by LocationCode if it's selected
                                filteredData = filteredData.filter(
                                    (item) => item.LocationCode === value.LocationCodefiltervalue
                                );
                            }
                            const dataWithinLastWeek = filteredData.filter(item => {
                                const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                                return itemDate >= today && itemDate <= lastWeek;
                            });
                            const dataLastMonth = filteredData.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                            const dataLastYear = filteredData.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                            setworrkrequestopenlastyear(dataLastYear)
                            setworrkrequestopenlastmonth(dataLastMonth)
                            setworrkrequestopenlastweek(dataWithinLastWeek)
                            // Find the latest "Open" work request
                            const latestOpenWorkRequest = filteredDatas.reduce((latest, current) => {
                                return new Date(current.RequestDateTime) > new Date(latest.RequestDateTime) ? current : latest;
                            });
                            // Find the oldest "Open" work request
                            const oldestOpenWorkRequest = filteredDatas.reduce((oldest, current) => {
                                return new Date(current.RequestDateTime) < new Date(oldest.RequestDateTime) ? current : oldest;
                            });
                            setLatestworkrequestOpen(latestOpenWorkRequest);
                            setOldestworkrequestOpen(oldestOpenWorkRequest);
                            

                        } else {
                            console.log('No matching data found');

                            setworkrequesttotalopen([]);
                            // You can also reset other variables as needed
                            setworrkrequestopenlastyear([]);
                            setworrkrequestopenlastmonth([]);
                            setworrkrequestopenlastweek([]);
                            setLatestworkrequestOpen(null);
                            setOldestworkrequestOpen(null);

                        }
                        
                    }
                    
                }
               else {
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
                // setpreventivelength(res.data.recordset)
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
                if (value.BuildingCodefiltervalue || value.LocationCodefiltervalue) {
                    // Filter preventive maintenance data by location
                    const preventiveMaintenanceData = res.data.recordset;

                    let filteredDatas = preventiveMaintenanceData;

                    if (value.BuildingCodefiltervalue) {
                        filteredDatas = filteredDatas.filter((item) =>
                            item.BuildingCode === value.BuildingCodefiltervalue
                        );
                    }

                    if (value.LocationCodefiltervalue) {
                        filteredDatas = filteredDatas.filter((item) =>
                            item.LocationCode === value.LocationCodefiltervalue
                        );
                    }
                    setpreventivelength(filteredDatas)
                    if (res.data.recordset.length > 0) {
                        const lastItem = filteredDatas[filteredDatas.length - 1];
                        setdatapreventlast(lastItem)

                        const today = new Date();
                        const lastWeek = new Date(today);
                        lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                        const lastMonthDate = new Date(today);
                        lastMonthDate.setMonth(today.getMonth() - 1);

                        const lastYearDate = new Date(today);
                        lastYearDate.setFullYear(today.getFullYear() - 1);
                        let filteredData = [...preventiveMaintenanceData]; // Initialize with all data

                        if (value.BuildingCodefiltervalue) {
                            // Filter by BuildingCode if it's selected
                            filteredData = filteredData.filter(
                                (item) => item.BuildingCode === value.BuildingCodefiltervalue
                            );
                        }

                        if (value.LocationCodefiltervalue) {
                            // Filter by LocationCode if it's selected
                            filteredData = filteredData.filter(
                                (item) => item.LocationCode === value.LocationCodefiltervalue
                            );
                        }
                        const dataWithinLastWeek = filteredData.filter(item => {
                            const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                            return itemDate >= lastWeek && itemDate <= today;
                        });
                        const dataLastMonth = filteredData.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                        const dataLastYear = filteredData.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                        setPreventiveMaintenancelastyear(dataLastYear)
                        setPreventiveMaintenancelastmonth(dataLastMonth)
                        setPreventiveMaintenancelastweek(dataWithinLastWeek)

                    } else {
                        console.log('The array is empty.');
                    }

                }
                else {
                    setpreventivelength(res.data.recordset)
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
                if (value.BuildingCodefiltervalue || value.LocationCodefiltervalue) {
                    // Filter preventive maintenance data by location
                    const preventiveMaintenanceData = res.data.recordset;

                    let filteredDatas = preventiveMaintenanceData;

                    if (value.BuildingCodefiltervalue) {
                        filteredDatas = filteredDatas.filter((item) =>
                            item.BuildingCode === value.BuildingCodefiltervalue
                        );
                    }

                    if (value.LocationCodefiltervalue) {
                        filteredDatas = filteredDatas.filter((item) =>
                            item.LocationCode === value.LocationCodefiltervalue
                        );
                    }
                    setTotalCreated(filteredDatas)
                    if (res.data.recordset.length > 0) {
                        const lastItem = filteredDatas[filteredDatas.length - 1];
                        setcleaningdatalast(lastItem)

                        const today = new Date();
                        const lastWeek = new Date(today);
                        lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                        const lastMonthDate = new Date(today);
                        lastMonthDate.setMonth(today.getMonth() - 1);

                        const lastYearDate = new Date(today);
                        lastYearDate.setFullYear(today.getFullYear() - 1);
                        let filteredData = [...preventiveMaintenanceData]; // Initialize with all data

                        if (value.BuildingCodefiltervalue) {
                            // Filter by BuildingCode if it's selected
                            filteredData = filteredData.filter(
                                (item) => item.BuildingCode === value.BuildingCodefiltervalue
                            );
                        }

                        if (value.LocationCodefiltervalue) {
                            // Filter by LocationCode if it's selected
                            filteredData = filteredData.filter(
                                (item) => item.LocationCode === value.LocationCodefiltervalue
                            );
                        }
                        const dataWithinLastWeek = filteredData.filter(item => {
                            const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                            return itemDate >= lastWeek && itemDate <= today;
                        });
                        const dataLastMonth = filteredData.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                        const dataLastYear = filteredData.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                        setCleaningWorkslastyear(dataLastYear)
                        setCleaningWorkslastmonth(dataLastMonth)
                        setCleaningWorkslastweek(dataWithinLastWeek)

                    } else {
                        console.log('The array is empty.');
                    }

                }
                else {
                    setTotalCreated(res.data.recordset)
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
    }, [value.BuildingCodefiltervalue, value.LocationCodefiltervalue, value.Floor])
    const totaleTotalVacancy = TotalCapacity - totalOccupancy


    const [selectedRange, setSelectedRange] = useState([-2, 100]);
    const [intervalType, setIntervalType] = useState("weeks");
    const [max, setMax] = useState(100);

    const handleRangeChange = (value) => {
        setSelectedRange(value);
    };

    const handleDropdownChange = (e) => {
        setIntervalType(e.target.value);
    };

    useEffect(() => {
        if (intervalType === 'weeks') {
            setMax(6);
        } else if (intervalType === 'months') {
            setMax(11);
        } else if (intervalType === 'years') {
            setMax(10);
        }
    }, [intervalType]);

    useEffect(() => {
        const [minValue, maxValue] = selectedRange;
        const today = new Date();
        const startDate =
            intervalType === 'weeks'
                ? addDays(today, minValue * 7)
                : intervalType === 'months'
                    ? addMonths(today, minValue)
                    : addYears(today, minValue);

        const endDate =
            intervalType === 'weeks'
                ? addDays(today, (maxValue + 1) * 7)
                : intervalType === 'months'
                    ? addMonths(today, maxValue)
                    : addYears(today, maxValue);
        // PurchaseOrder
        axios.get('/api/PurchaseOrder_GET_List', {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }).then((res) => {
            if (res.data.recordset.length > 0) {
                const filteredData = res.data.recordset
                    .filter((item) => item && item.PODate)
                    .filter((item) => {
                        const itemDate = new Date(item.PODate);
                        return itemDate >= startDate && itemDate <= endDate;
                    });

                if (filteredData.length > 0) {
                    const lastItem = filteredData[filteredData.length - 1];
                    setLastPurchase(lastItem);

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = filteredData.filter((item) => {
                        const itemDate = new Date(item.PODate);
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = filteredData.filter((item) => {
                        const itemDate = new Date(item.PODate);
                        return itemDate >= lastMonthDate;
                    });

                    const dataLastYear = filteredData.filter((item) => {
                        const itemDate = new Date(item.PODate);
                        return itemDate >= lastYearDate;
                    });

                    setPurchaseorderlastyear(dataLastYear);
                    setPurchaseorderlastmonth(dataLastMonth);
                    setPurchaseorderlastweek(dataWithinLastWeek);
                    setgetdata(filteredData);
                } else {
                    console.log('The Purchase order filtered array is empty.');
                    // Handle the case where all items were filtered out
                    setgetdata([]); // Reset the data if there are no records
                    setPurchaseorderlastyear([]);
                    setPurchaseorderlastmonth([]);
                    setPurchaseorderlastweek([]);
                    
                }
            } else {
                console.log('The array is empty.');
            }

        })
            .catch((err) => {
                console.log(err);
            });
        // PurchaseRequest
        axios.get('/api/PurchaseRequest_GET_List', {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }).then((res) => {
            if (res.data.recordset.length > 0) {

                console.log(res.data.recordset);
                const filteredData = res.data.recordset
                    .filter((item) => item && item.RequestDate)
                    .filter((item) => {
                        const itemDate = new Date(item.RequestDate);
                        return itemDate >= startDate && itemDate <= endDate;
                    });
                settotalpurachaserequuest(filteredData)

                if (filteredData.length > 0) {
                    const lastItem = filteredData[filteredData.length - 1];
                    setlastcreatpurachaserquest(lastItem);

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDate);
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDate);
                        return itemDate >= lastMonthDate;
                    });

                    const dataLastYear = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDate);
                        return itemDate >= lastYearDate;
                    });

                    setPurchaserequestlastyear(dataLastYear)
                    setPurchaserequestlastmonth(dataLastMonth)
                    setPurchaserequestlastweek(dataWithinLastWeek)
                    settotalpurachaserequuest(filteredData);
                } else {
                    console.log('The Purchase Request filtered array is empty.');
                    setPurchaserequestlastyear([])
                    setPurchaserequestlastmonth([])
                    setPurchaserequestlastweek([])
                    // Handle the case where all items were filtered out
                }
            } else {
                console.log('The array is empty.');
                setgetdata([]); // Reset the data if there are no records
            }

        })
            .catch((err) => {
                console.log(err);
            });
        // CleaningWorks
        axios.get('/api/CleaningWorks_GET_LIST', {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }).then((res) => {
            if (res.data.recordset.length > 0) {
                const filteredData = res.data.recordset
                    .filter((item) => item && item.RequestDateTime)
                    .filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= startDate && itemDate <= endDate;
                    });

                setTotalCreated(filteredData)
                if (filteredData.length > 0) {
                    const lastItem = filteredData[filteredData.length - 1];
                    setcleaningdatalast(lastItem);

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= lastMonthDate;
                    });

                    const dataLastYear = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= lastYearDate;
                    });

                    setCleaningWorkslastyear(dataLastYear)
                    setCleaningWorkslastmonth(dataLastMonth)
                    setCleaningWorkslastweek(dataWithinLastWeek)
                    setTotalCreated(filteredData)

                } else {
                    console.log('The CleaningWorks filtered array is empty.');
                    setCleaningWorkslastyear([])
                    setCleaningWorkslastmonth([])
                    setCleaningWorkslastweek([])
                    setTotalCreated([])
                    // Handle the case where all items were filtered out
                }
            } else {
                console.log('The array is empty.');
                setgetdata([]); // Reset the data if there are no records
            }

        })
            .catch((err) => {
                console.log(err);
            });
        // PreventiveMaintenance
        axios.get('/api/PreventiveMaintenance_GET_LIST', {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }).then((res) => {
            if (res.data.recordset.length > 0) {
                const filteredData = res.data.recordset
                    .filter((item) => item && item.RequestDateTime)
                    .filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= startDate && itemDate <= endDate;
                    });

                if (filteredData.length > 0) {
                    const lastItem = filteredData[filteredData.length - 1];
                    setdatapreventlast(lastItem);

                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    const dataWithinLastWeek = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= lastMonthDate;
                    });

                    const dataLastYear = filteredData.filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= lastYearDate;
                    });

                    setPreventiveMaintenancelastyear(dataLastYear)
                    setPreventiveMaintenancelastmonth(dataLastMonth)
                    setPreventiveMaintenancelastweek(dataWithinLastWeek)
                    setpreventivelength(filteredData)

                } else {
                    // console.log('The filtered array is empty.');

                    setPreventiveMaintenancelastyear([])
                    setPreventiveMaintenancelastmonth([])
                    setPreventiveMaintenancelastweek([])
                    setpreventivelength([])
                    // Handle the case where all items were filtered out
                }
            } else {
                console.log('The array is empty.');
                setgetdata([]); // Reset the data if there are no records
            }
        }).catch((err) => {
                console.log(err);
            });
        // WorkOrders List
        axios.get(`/api/WorkOrders_GET_LIST`, {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }).then((res) => {
                const workOrders = res.data.recordset;
             const closedWorkOrders = workOrders.filter(
                    (workOrder) => workOrder.WorkStatus === "Closed"
                );

                // Filter open work orders
                const openWorkOrders = workOrders.filter(
                    (workOrder) => workOrder.WorkStatus === "Open"
                );

                // Set the latest closed work order
                if (closedWorkOrders.length > 0) {
                    const filteredDatas = res.data.recordset
                        .filter((item) => item && item.StartWorkOrderDateTime)
                        .filter((item) => {
                            const itemDate = new Date(item.StartWorkOrderDateTime);
                            return itemDate >= startDate && itemDate <= endDate;
                        });
                    const lastItem = closedWorkOrders[closedWorkOrders.length - 1];
                    setworkroderopen(lastItem);

                    // Calculate date ranges for filtering
                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                    const lastMonthDate = new Date(today);
                    lastMonthDate.setMonth(today.getMonth() - 1);

                    const lastYearDate = new Date(today);
                    lastYearDate.setFullYear(today.getFullYear() - 1);

                    // Filter data for different date ranges
                    const dataWithinLastWeek = filteredDatas.filter((item) => {
                        const itemDate = new Date(item.StartWorkOrderDateTime);
                        return itemDate >= lastWeek && itemDate <= today;
                    });

                    const dataLastMonth = filteredDatas.filter((item) => {
                        const itemDate = new Date(item.StartWorkOrderDateTime);
                        return itemDate >= lastMonthDate;
                    });

                    const dataLastYear = filteredDatas.filter((item) => {
                        const itemDate = new Date(item.StartWorkOrderDateTime);
                        return itemDate >= lastYearDate;
                    });
                 

                    // Update state variables with filtered data
                    setworrkorderlastyear(dataLastYear);
                    setworkrordertlastmonth(dataLastMonth);
                    setworrkorderlastweek(dataWithinLastWeek);
                    setworkorderlength(filteredDatas);
                } else {
                    console.log("No Closed Work Orders found.");
                }

                if (openWorkOrders.length > 0) {
                    const filteredDatas = openWorkOrders.filter((item) => item && item.StartWorkOrderDateTime)
                        .filter((item) => {
                            const itemDate = new Date(item.StartWorkOrderDateTime);
                            return itemDate >= startDate && itemDate <= endDate;
                        });
                    setworkroderopen(filteredDatas);

                    if (filteredDatas.length > 0) {
                        // Weeke month and years
                        const today = new Date();
                        const lastWeek = new Date(today);
                        lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                        const lastMonthDate = new Date(today);
                        lastMonthDate.setMonth(today.getMonth() - 1);

                        const lastYearDate = new Date(today);
                        lastYearDate.setFullYear(today.getFullYear() - 1);

                        const dataWithinLastWeek = filteredDatas.filter(item => {
                            const itemDate = new Date(item.StartWorkOrderDateTime); // Replace "date" with your date field name
                            return itemDate >= lastWeek && itemDate <= today;
                        });

                        const dataLastMonth = filteredDatas.filter(item => new Date(item.StartWorkOrderDateTime) >= lastMonthDate);
                        const dataLastYear = filteredDatas.filter(item => new Date(item.StartWorkOrderDateTime) >= lastYearDate);
                        setworrorderopenlastyear(dataLastYear)
                        setworkorderopenlastmonth(dataLastMonth)
                        setworrorderopenlastweek(dataWithinLastWeek)
                        // Find the latest "Open" work request
                        const latestOpenWorkRequest = filteredDatas.reduce((latest, current) => {
                            return new Date(current.StartWorkOrderDateTime) > new Date(latest.StartWorkOrderDateTime) ? current : latest;
                        }, filteredDatas[0]); // Provide the initial value as the first item

                        // Find the oldest "Open" work request
                        const oldestOpenWorkRequest = filteredDatas.reduce((oldest, current) => {
                            return new Date(current.StartWorkOrderDateTime) < new Date(oldest.StartWorkOrderDateTime) ? current : oldest;
                        }, filteredDatas[0]); // Provide the initial value as the first item

                        setLatestworkorderopen(latestOpenWorkRequest);
                        setoldestdata(oldestOpenWorkRequest);
                        // Rest of your code for weeks, months, and years
                        // ...
                    } else {
                        console.log("No open work requests found");
                        setworrorderopenlastyear([]);
                        setworkorderopenlastmonth([]);
                        setworrorderopenlastweek([]);
                    }

                } else {
                    console.log("No open work requests found");
                }

            })
            .catch((err) => {
                console.log(err);
            });
        // workRequest
        axios.get(`/api/workRequest_GET_LIST`, {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
        }).then((res) => {
            const workOrders = res.data.recordset;
            const closedWorkOrders = workOrders.filter(
                (workOrder) => workOrder.RequestStatus === "Closed"
            );

            // Filter open work orders
            const openWorkOrders = workOrders.filter(
                (workOrder) => workOrder.RequestStatus === "Open"
            );

            // Set the latest closed work order
            if (closedWorkOrders.length > 0) {
                const filteredDatas = res.data.recordset
                    .filter((item) => item && item.RequestDateTime)
                    .filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= startDate && itemDate <= endDate;
                    });
                const lastItem = closedWorkOrders[closedWorkOrders.length - 1];
                setLatestpost(lastItem);

                // Calculate date ranges for filtering
                const today = new Date();
                const lastWeek = new Date(today);
                lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago

                const lastMonthDate = new Date(today);
                lastMonthDate.setMonth(today.getMonth() - 1);

                const lastYearDate = new Date(today);
                lastYearDate.setFullYear(today.getFullYear() - 1);

                // Filter data for different date ranges
                const dataWithinLastWeek = filteredDatas.filter((item) => {
                    const itemDate = new Date(item.RequestDateTime);
                    return itemDate >= lastWeek && itemDate <= today;
                });

                const dataLastMonth = filteredDatas.filter((item) => {
                    const itemDate = new Date(item.RequestDateTime);
                    return itemDate >= lastMonthDate;
                });

                const dataLastYear = filteredDatas.filter((item) => {
                    const itemDate = new Date(item.RequestDateTime);
                    return itemDate >= lastYearDate;
                });

                // Update state variables with filtered data
                setworrkrequestlastyear(dataLastYear)
                setworrkrequestlastmonth(dataLastMonth)
                setworrkrequestlastweek(dataWithinLastWeek)
                setworkrrequest(filteredDatas);
            } else {
                console.log("No Closed Work Orders found.");
            }

            if (openWorkOrders.length > 0) {
                // if (openWorkOrders.length > 0) {
                const filteredDatas = openWorkOrders.filter((item) => item && item.RequestDateTime)
                    .filter((item) => {
                        const itemDate = new Date(item.RequestDateTime);
                        return itemDate >= startDate && itemDate <= endDate;
                    });
                setworkrequesttotalopen(filteredDatas);

                const today = new Date();
                const lastWeek = new Date(today);
                lastWeek.setDate(today.getDate() - 7); // Calculate the date one week ago
                lastWeek.setDate(today.getDate() + 7); // Calculate the date one week ago

                const lastMonthDate = new Date(today);
                lastMonthDate.setMonth(today.getMonth() - 1);

                const lastYearDate = new Date(today);
                lastYearDate.setFullYear(today.getFullYear() - 1);

                const dataWithinLastWeek = filteredDatas.filter(item => {
                    const itemDate = new Date(item.RequestDateTime); // Replace "date" with your date field name
                    return itemDate >= today && itemDate <= lastWeek;

                });

                const dataLastMonth = filteredDatas.filter(item => new Date(item.RequestDateTime) >= lastMonthDate);
                const dataLastYear = filteredDatas.filter(item => new Date(item.RequestDateTime) >= lastYearDate);
                setworrkrequestopenlastyear(dataLastYear)
                setworrkrequestopenlastmonth(dataLastMonth)
                setworrkrequestopenlastweek(dataWithinLastWeek)
                // Find the latest "Open" work request
                const latestOpenWorkRequest = filteredDatas.reduce((latest, current) => {
                    return new Date(current.RequestDateTime) > new Date(latest.RequestDateTime) ? current : latest;
                });
                // Find the oldest "Open" work request
                const oldestOpenWorkRequest = filteredDatas.reduce((oldest, current) => {
                    return new Date(current.RequestDateTime) < new Date(oldest.RequestDateTime) ? current : oldest;
                });
                setLatestworkrequestOpen(latestOpenWorkRequest);
                setOldestworkrequestOpen(oldestOpenWorkRequest);
            }else{

                setworkrequesttotalopen([]);
                // You can also reset other variables as needed
                setworrkrequestopenlastyear([]);
                setworrkrequestopenlastmonth([]);
                setworrkrequestopenlastweek([]);
                setLatestworkrequestOpen(null);
                setOldestworkrequestOpen(null);
            }


        })
            .catch((err) => {
                console.log(err);
            });

    }, [selectedRange, intervalType]);

    const [minValue, maxValue] = selectedRange;
    const startMonth = 0; // 0 for January, 1 for February, and so on

    const minDate = format(
        intervalType === 'weeks'
            ? (() => {
                const startDate = new Date();
                while (startDate.getDay() !== 1) {
                    startDate.setDate(startDate.getDate() - 1);
                }
                return addDays(startDate, minValue );
            })()
            : intervalType === 'months'
                ? addMonths(new Date(new Date().getFullYear(), startMonth, 1), minValue)
                : addYears(new Date(2020, 0, 1), minValue),
        'dd MMM, yyyy'
    )
    const maxDate = format(
        intervalType === 'weeks'
            ? (() => {
                const endDate = new Date();
                while (endDate.getDay() !== 1) {
                    endDate.setDate(endDate.getDate() + 1);
                }
                return addDays(endDate, maxValue);
            })()
            : intervalType === 'months'
                ? addMonths(new Date(new Date().getFullYear(), startMonth, 1), maxValue)
                : addYears(new Date(2020, 0, 1), maxValue),
        'dd MMM, yyyy'
    );

    const weekDays = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const getMarksForWeeks = () => {
        const weekMarks = {};
        for (let i = 0; i <= max; i++) {
            weekMarks[i] = weekDays[i % 7];
        }
        return weekMarks;
    };

    const getMarksForMonths = () => {
        const monthMarks = {};
        for (let i = 0; i <= max; i++) {
            monthMarks[i] = monthNames[i % 30];
        }
        return monthMarks;
    };

    const getMarksForYears = () => {
        const yearsMarks = {};
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear + 7;
        for (let year = 2020; year <= maxYear; year++) {
            yearsMarks[year - 2020] = year.toString();
        }

        return yearsMarks;
    };

    
    const marks = intervalType === 'weeks' ? getMarksForWeeks() : intervalType === 'months' ? getMarksForMonths() : getMarksForYears();

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
                                <div className="row formsection mt-5 mb-3">

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5 my-auto">
                                        <div className="d-flex justify-content-between">
                                            <p className='my-auto fw-bord lastpro fs-6'>All Periods</p>
                                            <select value={intervalType} className='border-0 my-auto' onChange={handleDropdownChange} style={{ padding: '15px 20px', }}>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                                <option value="years">Years</option>
                                            </select>
                                        </div>
                                        <div className='emailsection position-relative d-grid py-2'>
                                            <label htmlFor='Datetime' className='lablesection color3 text-start my-2'>
                                                Date Period {minDate} - {maxDate}
                                            </label>
                                            <Slider
                                                min={0}
                                                max={max}
                                                range
                                                value={selectedRange}
                                                onChange={handleRangeChange}
                                                marks={marks} // Use the state variable for marks
                                            />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 mt-auto offset-md-1 offset-lg-1 offset-xl-1">
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
                                                <option className='inputsectiondropdpwn' value=''>Select Building Code</option>
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

                                    <div className="col-sm-12 col-md-2 col-lg-2 mt-auto col-xl-2 ">
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

                                    <div className="col-sm-12 col-md-3 col-lg-2 mt-auto col-xl-2 ">
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
                                                <option className='inputsectiondropdpwn my-1' value=''>Select Floor </option>
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

                                <hr className='color3 line mt-5' />
                                <div className="">
                                    <h6 className='fs-4 text-center my-3 fw-bold'>Space Occupancy</h6>
                                    <div className="bordercolor rounded bgupdata  ">
                                        {/* SPace section */}
                                        <div className="topmain p-3">
                                            <div className="d-flex my-auto">
                                                <img src={SpaceOccupancy} alt="Space Occupancy" className=' me-2' />
                                                <div className="my-auto">
                                                    <h6 className='headingdashbord text-center ms-2'>Total Employees</h6>
                                                    <p className='propdashbord text-center'>{TotalEmployees}</p>
                                                </div>
                                            </div>
                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Capacity</h6>
                                                <p className='propdashbord text-center'>{TotalCapacity}</p>
                                            </div>

                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Occupancy</h6>
                                                <p className='propdashbord text-center'>{totalOccupancy}&nbsp; &nbsp;{isNaN((totalOccupancy / TotalCapacity) * 100)
                                                    ? '0'
                                                    : ((totalOccupancy / TotalCapacity) * 100).toFixed(3)}%</p>
                                            </div>

                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Vacancy</h6>
                                                <p className='propdashbord text-center ms-2'>{totaleTotalVacancy} &nbsp; &nbsp;{isNaN((totaleTotalVacancy / TotalCapacity) * 100)
                                                    ? '0'
                                                    : ((totaleTotalVacancy / TotalCapacity) * 100).toFixed(3)}%</p>
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
                                                <p className='fs-6 my-1'>Latest - Open :{LatestworkrequestOpen && moment(LatestworkrequestOpen.RequestDateTime).isValid() ? moment(LatestworkrequestOpen.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WR-{LatestworkrequestOpen ? LatestworkrequestOpen.RequestNumber : 'N/A'}</p>
                                                <p className='fs-6 my-1'>Oldest - Open :{OldestworkrequestOpen && moment(OldestworkrequestOpen.RequestDateTime).isValid() ? moment(OldestworkrequestOpen.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WR-{OldestworkrequestOpen ? OldestworkrequestOpen.RequestNumber : 'N/A'}</p>
                                                <p className='fs-6 my-1'>Latest - Post : {Latestpost && moment(Latestpost.RequestDateTime).isValid() ? moment(Latestpost.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WR-{Latestpost ? Latestpost.RequestNumber : 'N/A'}</p>
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
                                                <p className='fs-6 my-1'>Last Created :{datapreventlast && moment(datapreventlast.RequestDateTime).isValid() ? moment(datapreventlast.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} RN-{datapreventlast ? datapreventlast.RequestNumber : 'N/A'}</p>
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
                                                <p className='fs-6 my-1'>Last Request :{cleaningdatalast && moment(cleaningdatalast.RequestDateTime).isValid() ? moment(cleaningdatalast.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} RN-{cleaningdatalast ? cleaningdatalast.RequestNumber : 'N/A'}</p>
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