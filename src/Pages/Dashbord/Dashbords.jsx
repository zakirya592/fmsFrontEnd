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

    useEffect(() => {
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
                setworkrrequest(res.data.recordset)
                const workOrders = res.data.recordset
                const openWorkOrders = workOrders.filter(workOrder => workOrder.RequestStatus === "Open");
                setworkrequesttotalopen(openWorkOrders);
                const workRequests = res.data.recordset;
                if (workRequests.length > 0) {
                    const lastWorkRequest = workRequests[workRequests.length - 1];
                    setLatestpost(lastWorkRequest)
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
                setworkorderlength(res.data.recordset)
                const workOrders = res.data.recordset
                const openWorkOrders = workOrders.filter(workOrder => workOrder.WorkStatus === "Open");
                if (workOrders.length > 0) {
                    const Latestworkorder= workOrders[workOrders.length - 1];
                    setLatestworkorderpost(Latestworkorder)
                } else {
                    console.log("No Date is");
                }
                setworkroderopen(openWorkOrders);
                if (openWorkOrders.length > 0) {
                    // Find the latest "Open" work request
                    const latestOpenWorkRequest = openWorkOrders.reduce((latest, current) => {
                        return new Date(current.RequestDateTime) > new Date(latest.RequestDateTime) ? current : latest;
                    });
                    // Find the oldest "Open" work request
                    const oldestOpenWorkRequest = openWorkOrders.reduce((oldest, current) => {
                        return new Date(current.RequestDateTime) < new Date(oldest.RequestDateTime) ? current : oldest;
                    });
                    setLatestworkorderopen(latestOpenWorkRequest);
                    setoldestdata(oldestOpenWorkRequest);
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

                } else {
                    console.log('The array is empty.');
                }
                setgetdata(res.data.recordset);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

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
                                                <p className='propdashbord text-center'>{totalOccupancy}</p>
                                            </div>

                                            <div className="my-auto">
                                                <h6 className='headingdashbord text-center'>Total Vacancy</h6>
                                                <p className='propdashbord text-center'>00000</p>
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
                                                    <p className='insdieborder'>WTD - 99999</p>
                                                    <p className='insdieborder'>MTD - 99999</p>
                                                    <p className='insdieborder'>YTD - 99999</p>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="">
                                                    <h6 className='headingdashbord text-center ms-2'>Total Posted</h6>
                                                    <p className='propdashbord text-center'>{workrrequest.length}</p>
                                                </div>
                                                <div className="">
                                                    <p className='insdieborder'>WTD - 99999</p>
                                                    <p className='insdieborder'>MTD - 99999</p>
                                                    <p className='insdieborder'>YTD - 99999</p>
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
                                                        <p className='insdieborder'>WTD - 99999</p>
                                                        <p className='insdieborder'>MTD - 99999</p>
                                                        <p className='insdieborder'>YTD - 99999</p>
                                                    </div>

                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between w-100">
                                                    <div className="">
                                                        <h6 className='headingdashbord text-center ms-2'>Total Posted</h6>
                                                        <p className='propdashbord text-center'>{workorderlength.length}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className='insdieborder'>WTD - 99999</p>
                                                        <p className='insdieborder'>MTD - 99999</p>
                                                        <p className='insdieborder'>YTD - 99999</p>
                                                    </div>

                                                </div>
                                                <div className='text-center mt-2 lastpro'>
                                                    <p className='fs-6 my-1'>Latest - Open : {moment(Latestworkorderopen.RequestDateTime).isValid() ? moment(Latestworkorderopen.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WO-{Latestworkorderopen.WorkOrderNumber}</p>
                                                    <p className='fs-6 my-1'>Oldest - Open : {moment(oldestdata.StartWorkOrderDateTime).isValid() ? moment(oldestdata.StartWorkOrderDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WO-{oldestdata.WorkOrderNumber}</p>
                                                    <p className='fs-6 my-1'>Latest - Post :{moment(Latestworkorderpost.RequestDateTime).isValid() ? moment(Latestworkorderpost.RequestDateTime).format('DD-MM-YYYY hh:mm:ss A') : 'DD-MM-YYYY HH:MM:SS A'} WO-{Latestworkorderpost.WorkOrderNumber}</p>
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
                                                    <p className='insdieborder'>WTD - 99999</p>
                                                    <p className='insdieborder'>MTD - 99999</p>
                                                    <p className='insdieborder'>YTD - 99999</p>
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
                                                    <p className='insdieborder'>WTD - 99999</p>
                                                    <p className='insdieborder'>MTD - 99999</p>
                                                    <p className='insdieborder'>YTD - 99999</p>
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
                                                    <p className='insdieborder'>WTD - 99999</p>
                                                    <p className='insdieborder'>MTD - 99999</p>
                                                    <p className='insdieborder'>YTD - 99999</p>
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
                                                    <p className='insdieborder'>WTD - 99999</p>
                                                    <p className='insdieborder'>MTD - 99999</p>
                                                    <p className='insdieborder'>YTD - 99999</p>
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