import Box from '@mui/material/Box';
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import excel from '../../../Image/excel.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GetAppIcon from '@mui/icons-material/GetApp';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DataGrid } from '@mui/x-data-grid';

function SystemModules() {
  const columns = [
    { field: 'id', headerName: 'SEQ.', width: 150 },
    { field: 'description', headerName: 'DESCRIPTION', width: 270 },
    { field: 'moduleAccessCode', headerName: 'MODULE ACCESS CODE', width: 270 },
    {
      field: 'action',
      headerName: 'ACTION',
      width: 170,
      renderCell: (params) => (
        <div>
          <button type="button" className="btn  mx-1 color2 btnwork">
            <FlipCameraAndroidIcon/>
          </button>
          <button type="button" className="btn  mx-1 color2 btnwork">
          <DeleteOutlineIcon/>
          </button>
        </div>
      ),
    },
  ];

  const generateRandomData = () => {
    const rows = [];
    for (let i = 1; i <= 10; i++) {
      rows.push({
        id: i,
        description: `Description Number  ${i}`,
        moduleAccessCode: `XXX XXXX XXXXX ${i}`,
      });
    }
    return rows;
  };

  const rows = generateRandomData();

  return (
    <>
      <div className="bg">
        <Box sx={{ display: "flex" }}>
          <Siderbar />
          <AppBar className="fortrans locationfortrans" position="fixed">
            <Toolbar>
              <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" />
                <p className="text-center my-auto ms-5">User Management</p>
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="topermaringpage mb- container">
            <div className="py-3">
              <div className="d-flex justify-content-between my-auto">
                <p className="color1 workitoppro my-auto">SYSTEM MODULES MAINTENANCE
                  <span className='star'>*</span>
                </p>
                <div className="d-flex">
                  <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                    <AddCircleOutlineIcon className="me-1" />
                    New
                  </button>
                  <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork">
                    <img src={excel} alt="export" className='me-1' />
                    Import <GetAppIcon />
                  </button>
                  <button type="button" className="btn btn-outline-primary color2">
                    <img src={excel} alt="export" className='me-1' /> Export <FileUploadIcon />
                  </button>
                </div>
              </div>
              <hr className="color3 line width" />
              <div style={{ height: 420, width: '72%', margin:"auto"}} className='tableleft'> 
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3 mb-3">
              <button type="button" className="border-0 px-3 savebtn py-2">
                <ArrowCircleLeftOutlinedIcon className='me-2' />
                Back
              </button>
              <button type="button" className="border-0 px-3 savebtn py-2">
                <SaveIcon className='me-2'/>
                SAVE
              </button>
            </div>
          </div>
        </Box>
      </div>
    </>
  )
}

export default SystemModules;
