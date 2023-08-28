import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import "./setupSidebar.css"

const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function SetupSidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);


    const handleDrawerClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* Work Type */}
                <List className='setupsidebar'>
                    {['. Work Type'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Worketypes')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Work Trade */}
                <List className='setupsidebar'>
                    {['. Work Trade'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/WORKTRADE')
                        })}>
                            <ListItemButton >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Work Status */}
                <List className='setupsidebar'>
                    {['. Work Status'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Workstatus')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Work Priority */}
                <List className='setupsidebar'>
                    {['. Work Priority'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Workpriority')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Work Category */}
                <List className='setupsidebar'>
                    {['. Work Category'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Workcategory')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Department */}
                <List className='setupsidebar'>
                    {['. Department'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Departmentmaintence')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Building */}
                <List className='setupsidebar'>
                    {['. Building'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Buildingcode')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* location */}
                <List className='setupsidebar'>
                    {['. Location'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Loactioncode')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Problem Category */}
                <List className='setupsidebar'>
                    {['. Problem Category'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/ProblemCategory')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Request Status */}
                <List className='setupsidebar'>
                    {['. Request Status'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/RequestStatus')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Failure Code */}
                <List className='setupsidebar'>
                    {['. Failure Codes'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Failurecode')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Solutions Code */}
                <List className='setupsidebar'>
                    {['. Solution Codes'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Soluctioncode')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Days */}
                <List className='setupsidebar'>
                    {['. Days'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Day')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Frequency */}
                <List className='setupsidebar'>
                    {['. Frequency'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Frequency')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Gender */}
                <List className='setupsidebar'>
                    {['. Gender'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Gender')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Title/salutation */}
                <List className='setupsidebar'>
                    {['. Title/Salutation'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Titles')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Marital Status */}
                <List className='setupsidebar'>
                    {['. Marital Status'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Maritalstatus')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Nationality */}
                <List className='setupsidebar'>
                    {['. Nationality'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Nationality')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Asset Type */}
                <List className='setupsidebar'>
                    {['. Asset Type'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/assettype')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Asset Category */}
                <List className='setupsidebar'>
                    {['. Asset Category'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/AssetCategory')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Asset Sub-Category */}
                <List className='setupsidebar'>
                    {['. Asset Sub-Category'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/AssetsubCategory')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Asset Condition */}
                <List className='setupsidebar'>
                    {['. Asset Condition'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Assectcondition')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Warrenty Period */}
                <List className='setupsidebar'>
                    {['. Warrenty Period'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/WarrantyPeriod')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Employee Master*/}
                <List className='setupsidebar'>
                    {['. Employee Master'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/Employeemaster')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Employee Status */}
                <List className='setupsidebar'>
                    {['. Employee Status'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/EmployeeStatus')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Employee Designation  */}
                <List className='setupsidebar'>
                    {['. Employee Designation'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={(() => {
                            navigate('/EmployeeDesignation')
                        })}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                
                {/* Vendor/Supplier   */}
                <List className='setupsidebar setupsidebarlast'>
                    {['. Vendor/Supplier '].map((text, index) => (
                        <ListItem key={text} disablePadding
                           onClick={(() => {
                              navigate('/supplier')
                          })}
                        >
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>

        </Box>
    );
}
export default SetupSidebar