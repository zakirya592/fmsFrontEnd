import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import logo from '../../Image/log.png'
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
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import "./Sidebar.css"
const drawerWidth = 250;


function Siderbar(props) {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>

                        <Typography variant="h6" noWrap component="div" className='d-flex py-2 '>
                            <ArrowCircleLeftOutlinedIcon className='my-auto text-start me-5 ms-2' />
                            <p className='text-center my-auto ms-5'>FACILITY MANAGEMENT SYSTEMS  </p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    {/* <Divider /> */}
                    <span className="">
                        <center>
                            <img className=" mx-auto loginimg" src={logo} alt="" />
                        </center>
                    </span>

                    {/* Work Request */}
                    <List>
                        {['Work Request'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/workRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={WorkRequest} className="sidebaricon my-auto" /> : <img src={WorkRequest} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Work Order */}
                    <List>
                        {['Work Order'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/workorder')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={WorkOrder} className="sidebaricon my-auto" alt='' /> : <img src={WorkOrder} className="sidebaricon my-auto" alt="workorder" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Preventive Maintenance */}
                    <List>
                        {['Preventive Maintenance'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/Preventive')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Preventive} className="sidebaricon my-auto" /> : <img src={Preventive} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Cleaning Works */}
                    <List>
                        {['Cleaning Works'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/Cleaning')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Cleaning} className="sidebaricon my-auto" /> : <img src={Cleaning} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Location Management */}
                    <List>
                        {['Location Management'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/locationmanagement')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Location} className="sidebaricon my-auto text-center" alt='location' /> : <img src={Location} className="sidebaricon my-auto" alt='loaction' />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Asset Management'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Assetmanagemtn} className="sidebaricon my-auto" /> : <img src={Assetmanagemtn} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Setup & Configuration */}
                    <List>
                        {['Setup & Configuration'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/setupconfiguration')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={setupcon} className="sidebaricon my-auto" /> : <img src={setupcon} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['User Management'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={usermanagment} className="sidebaricon my-auto" /> : <img src={usermanagment} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Purchasing  Management'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={PurchasingManagement} className="sidebaricon my-auto" /> : <img src={PurchasingManagement} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Warehouse Management'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={WarehouseManagement} className="sidebaricon my-auto text-center" /> : <img src={WarehouseManagement} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Dashboard'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Dashboard} className="sidebaricon my-auto" /> : <img src={Dashboard} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Reports'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Reports} className="sidebaricon my-auto" /> : <img src={Reports} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Space Management'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={SpaceManagement} className="sidebaricon my-auto" /> : <img src={SpaceManagement} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        {['Log-out'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/WorkRequest')
                            })}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <img src={Logout} className="sidebaricon my-auto" /> : <img src={Logout} className="sidebaricon my-auto" />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Drawer>

            </Box>
            );
        </>
    )
}

export default Siderbar