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

const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

  function UserManagementSidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);


  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className="userManagementStyles">
    <Box sx={{ display: 'flex' }}  >
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
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* System Modules*/}
        <List  className='setupsidebar'>
                        {['. System Modules'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/systemmodules')
                            })}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
        </List>
        {/* User Authority Levels */}
        <List  className='setupsidebar'>
                        {['. User Authority Levels'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/userauthority')
                            })}>
                                <ListItemButton >
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
        </List>
        {/*User Credentials */}
        <List className='setupsidebar'>
                        {['. User Credentials'].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/userCredentials')
                            })}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
        </List>
        {/* User System Access  */}
        <List className='setupsidebar'>
                        {['. User System Access '].map((text, index) => (
                            <ListItem key={text} disablePadding onClick={(() => {
                                navigate('/usersystemaccess')
                            })}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
        </List>
        <Divider />

      </Drawer>

    </Box>
    </div>
  );
}
export default UserManagementSidebar