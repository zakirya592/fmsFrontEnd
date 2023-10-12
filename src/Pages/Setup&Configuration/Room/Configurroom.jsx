import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
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
import Siderbar from '../../../Component/Siderbar/Siderbar';
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Newrooms from '../../../Component/AllRounter/setup configuration/Room Configuration/Newrooms';

function Configurroom() {

  const [RoomCode, setRoomCode] = useState()
  const [RoomDesc, setRoomDesc] = useState()
  const ref = useRef(null)
  const [itemCode, setItemCode] = useState(null);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [getdata, setgetdata] = useState([])

  const getapi = () => {
    axios.get(`/api/Rooms_GET_List`, {
    },)
      .then((res) => {
        console.log('TO get the list', res);
        setgetdata(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getapi()
  }, [])

  // Deleted api section
  const Deletedapi = (RoomCode) => {
    console.log(RoomCode);
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
      text: `You want to delete this ${RoomCode} Room`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/Rooms_DELETE_BYID/${RoomCode}`)
          .then((res) => {
            console.log('Deleted successfully', res);
            getapi()
          })
          .catch((err) => {
            // Handle delete error
            console.log('Error deleting', err);
          });
        swalWithBootstrapButtons.fire(
          'Deleted!',
          `${RoomCode} Room has been deleted`,
          'success'
        )
      }
    })

  };

  const columns = [
    { field: 'id', headerName: 'SEQ.', width: 130 },
    { field: 'RoomCode', headerName: 'ROOM CODE', width: 220 },
    { field: 'RoomDesc', headerName: 'DESCRIPTION', width: 370 },
    {
      field: 'action',
      headerName: 'ACTION',
      width: 190,
      renderCell: (params) => (
        <div>
          <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => updata(params.row.RoomCode)}>
            <FlipCameraAndroidIcon />
          </button>
          {/* <!-- Button trigger modal --> */}
          <button type="button" class="btn" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            <FlipCameraAndroidIcon />
          </button>
          <button type="button" className="btn  mx-1 color2 btnwork" onClick={() => Deletedapi(params.row.RoomCode)}>
            <DeleteOutlineIcon />
          </button>
        </div>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const filteredData = getdata && getdata.map((row, indes) => ({
    ...row,
    id: indes + 1,
    RoomCode: row.RoomCode,
    RoomDesc: row.RoomDesc,

  }))

  // Updata section
  function updata(RoomCode) {
    console.log(RoomCode);
    ref.current.click()
    // get api
    axios.get(`/api/Rooms_GET_BYID/${RoomCode}`, {
    },)
      .then((res) => {
        console.log('TO get the list hg', res.data);
        setRoomCode(res.data.data[0].RoomCode)
        setRoomDesc(res.data.data[0].RoomDesc)
        setItemCode(RoomCode); // Store the WorkTypeCode in state
      })
      .catch((err) => {
        console.log(err);

      });
  }

  const handleClose = () => {
    setOpen(false);
  };
  // UPdata api
  const postapi = (e) => {
    e.preventDefault();
    // ref.current.click(SolutiontatusCode)
    console.log(itemCode);
    axios.put(`/api/Rooms_Put/${itemCode}`, {
      RoomDesc: RoomDesc,
    },)
      .then((res) => {
        console.log('Add', res.data);
        getapi()
        Swal.fire(
          'Update!',
          `Room ${itemCode} has been updated`,
          'success'
        ).then(() => {
          handleClose();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file.type);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming you have data in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        json.forEach((item) => {
          console.log(item.RoomCode);
          axios.post(`/api/Rooms_post`, {
            RoomCode: item.RoomCode.toString(), // Adjust property names as needed
            RoomDesc: item.RoomDesc.toString(),
          })
            .then((res) => {
              console.log('Add', res.data);
              // Handle success
              Swal.fire(
                'create!',
                `Room has been created`,
                'success'
              )
              getapi()
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                'Error!',
                `${err.response.data.error}`,
                'error'
              )
              // Handle errors
            });
        });
      };
      reader.readAsArrayBuffer(file);

    }
  };


  return (
    <>
      <div className="bg">
        <Box sx={{ display: "flex" }}>
          <Siderbar />
          <AppBar className="fortrans locationfortrans" position="fixed">
            <Toolbar>
              <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => {
                  navigate(`/`);
                }} />
                <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="topermaringpage  container">
            <div className="py-3">
              <div className="d-flex justify-content-between my-auto">
                <p className="color1 workitoppro my-auto">ROOM MAINTENANCE
                  <span className='star'>*</span>
                </p>
                <div className="d-flex">
                  <Newrooms />
                  <label type="button" className="btn btn-outline-primary mx-1 color2 btnwork" htmlFor="Importdata">
                    <img src={excel} alt="export" className='me-1' />
                    Import <GetAppIcon />
                  </label>
                  <input type="file" accept=".xlsx" onChange={handleFileUpload} className='d-none' id='Importdata' />

                  <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export  <FileUploadIcon />
                  </CSVLink>
                </div>
              </div>
              <hr className="color3 line width" />
              <div style={{ height: 420, width: '75%' }} className='tableleft'>
                <DataGrid
                  rows={filteredData}
                  columns={columns}
                  pagination
                  rowsPerPageOptions={[25, 50, 100]} // Optional: Set available page size options
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </div>
            </div>
            <div className="d-flex justify-content-between w-100 mt-3 mb-3">
              <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => {
                navigate(`/`);
              }} >
                <ArrowCircleLeftOutlinedIcon className='me-2' />
                Back
              </button>
            </div>
          </div>
        </Box>
        {/* Model */}
        <div class="modal fade mt-5 " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog bgupdata" style={{ borderRadius: '10px', border: '4px solid #1E3B8B' }}>
            <div class="modal-content bgupdata">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Updata Room </h5>
              </div>
              <div class="modal-body">
                <form onSubmit={postapi}>

                  <div className='emailsection position-relative d-grid my-1'>
                    <label htmlFor='FloorSeq' className='lablesection color3 text-start mb-1'>
                      Room Seq<span className='star'>*</span>
                    </label>

                    <input
                      types='text'
                      id='FloorSeq'
                      value={RoomCode}
                      onChange={e => {
                        setRoomCode(e.target.value)
                      }}
                      className='rounded inputsection py-2 borderfo'
                      placeholder='Room seq'
                      readOnly
                    ></input>
                  </div>

                  <div className='emailsection position-relative d-grid my-3'>
                    <label htmlFor='FloorsDesc' className='lablesection color3 text-start mb-1'>
                      Room Desc<span className='star'>*</span>
                    </label>

                    <input
                      types='text'
                      id='RoomDesc'
                      value={RoomDesc}
                      onChange={e => {
                        setRoomDesc(e.target.value)
                      }}
                      className='rounded inputsection py-2 borderfo'
                      placeholder='Room Desc'
                      required
                    ></input>
                  </div>
                  <div className="d-flex justify-content-between p-4 ">
                    <button type="button" class="border-0 px-3  savebtn py-2" data-bs-dismiss="modal"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                    <button type="submit" class="border-0 px-3 savebtn py-2" data-bs-dismiss="modal"><AddCircleOutlineIcon className='me-2' />Save</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Configurroom