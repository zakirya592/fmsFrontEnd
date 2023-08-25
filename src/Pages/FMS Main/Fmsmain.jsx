import React, { useState } from 'react';
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Siderbar from '../../Component/Siderbar/Siderbar'
import "./Main.css"
import WorkOrder from "../../Image/WorkOrder.png"
import WorkRequest from "../../Image/WorkRequest.png"
import Logout from "../../Image/Logout.png"
import SpaceManagement from "../../Image/SpaceManagement.png"
import Reports from "../../Image/Reports.png"
import Dashboard from "../../Image/DAshbor.png"
import WarehouseManagement from "../../Image/Ware house.png"
import PurchasingManagement from "../../Image/Purchasing  Management.png";
import usermanagment from "../../Image/usermanagment.png"
import setupcon from "../../Image/setupcon.png"
import Assetmanagemtn from "../../Image/Asset Management.png"
import Location from "../../Image/Location Management.png";
import Cleaning from "../../Image/Cleaning Works.png"
import Preventive from "../../Image/Preventive Maintenance.png"
import mainlog from "../../Image/log-removebg.png"
import { useNavigate } from "react-router-dom";
import Assetmanagement from '../../Component/Siderbar/Assetmanagement';
import SetupSidebar from '../Setup&Configuration/SetupSidebar';
import UserManagementSidebar from '../UserManagement/UserManagementSidebar';
import Purchasingsidbard from '../../Component/Siderbar/Purchasing siderbar/Purchasingsidbard';

function Fmsmain() {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showUserSidebar, setShowUserSidebar] = useState(false);
    const [AssetmanagementSidebar, setAssetmanagementSidebar] = useState(false);
    const [Purchasingmanagment, setPurchasingmanagment] = useState(false)

    const handleClick = () => {
        setShowSidebar(!showSidebar);
    };
    const handleUserSidebar = () => {
        setShowUserSidebar(!showUserSidebar)
    }
    const handleAssetmanagementSidebar = () => {
        setAssetmanagementSidebar(!AssetmanagementSidebar)
    }

    const handerPurchasingmanagmentsidebar = () => {
        setPurchasingmanagment(!Purchasingmanagment)
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
                                    <p className='text-center toperheaderside my-auto mx-auto'>FACILITY MANAGEMENT SYSTEMS</p>

                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="background">


                            <div className="container mt-5 circletop">
                                {/* <div id="circle"></div> */}
                                <div className="banc">
                                    <div className="w-right mt-5">
                                        <div className='w-mainCircle '>
                                            {/* Cleaning Works */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={(() => {
                                                    navigate('/Cleaning')
                                                })}>
                                                    <img src={Cleaning} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Cleaning Works</p>
                                            </div>
                                            {/* Location Management */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={(() => {
                                                    navigate('/locationmanagement')
                                                })}>
                                                    <img src={Location} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Location Management</p>
                                            </div>

                                            <div className="w-secCircle">
                                                <img src={mainlog} alt="Amazon" width='100%' />
                                            </div>

                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={handleAssetmanagementSidebar}>
                                                    <img src={Assetmanagemtn} alt="upwork" width='100%' />
                                                </div>
                                                <div className="d-flex">

                                                <p className='textstyle'>Asset Management </p>
                                                {AssetmanagementSidebar && <Assetmanagement />}
                                                </div>
                                            </div>
                                           
                                            {/* setupconfiguration */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={handleClick}>
                                                    <img src={setupcon} alt="upwork" width='100%' />
                                                </div>
                                                <div className="d-flex">
                                                    <p className='textstyle'>Setup & Configuration</p>
                                                    {showSidebar && <SetupSidebar />}
                                                </div>
                                                
                                            </div>

                                            {/* UserManagementSidebar */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={handerPurchasingmanagmentsidebar}>
                                                    <img src={usermanagment} alt="upwork" width='100%' />
                                                </div>
                                                <div className="d-flex">
                                                <p className='textstyle'>User Management</p>
                                                    {Purchasingmanagment && <UserManagementSidebar />}
                                                </div>
                                            </div>

                                            {/* PurchasingManagement */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={handleUserSidebar}>
                                                    <img src={PurchasingManagement} alt="upwork" width='100%' />
                                                </div>
                                                <div className="d-flex">
                                                <p className='textstyle'>Purchasing<br></br> Management</p>
                                                
                                                    {showUserSidebar && <Purchasingsidbard />}
                                                </div>
                                            </div>

                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside">
                                                    <img src={WarehouseManagement} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Warehouse <br></br>Management</p>
                                            </div>

                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside">
                                                    <img src={Dashboard} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Dashboard</p>
                                            </div>

                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside">
                                                    <img src={Reports} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Reports</p>
                                            </div>

                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside">
                                                    <img src={SpaceManagement} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Space Management</p>
                                            </div>

                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside">
                                                    <img src={Logout} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Log-out </p>
                                            </div>

                                            {/* workRequest        */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={(() => {
                                                    navigate('/workRequest')
                                                })}>
                                                    <img src={WorkRequest} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle' >Work Request </p>
                                            </div>

                                            {/* workorder */}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={(() => {
                                                    navigate('/workorder')
                                                })}>
                                                    <img src={WorkOrder} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Work Orders </p>
                                            </div>

                                            {/* Preventive Maintenance*/}
                                            <div className="w-secCircle">
                                                <div className="w-secCircleindside" onClick={(() => {
                                                    navigate('/Preventive')
                                                })}>
                                                    <img src={Preventive} alt="upwork" width='100%' />
                                                </div>
                                                <p className='textstyle'>Preventive<br></br> Maintenance</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Fmsmain