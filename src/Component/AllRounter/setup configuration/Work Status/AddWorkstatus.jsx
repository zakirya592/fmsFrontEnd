import React, { useState, useRef } from 'react';
import Fade from '@mui/material/Fade';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';

function AddWorkstatus() {

    const [value, setvalue] = useState({
        WorkStatusCode: '', WorkStatusDesc: '',
    })
    const [openDialog, setOpenDialog] = useState(false);


    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
   
    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };
    const backCloseDialog = () => {
        setOpenDialog(false);
    };
    const postapi = (e) => {
        e.preventDefault();
        axios.post(`/api/WorkStatus_post`, {
            WorkStatusCode: value.WorkStatusCode,
            WorkStatusDesc: value.WorkStatusDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, WorkStatusCode: '', WorkStatusDesc: '' }));
                // setAnchorEl(null);
                setOpenDialog(false);
                const postdata = res.data.recordset[0].WorkStatusCode
                Swal.fire(
                    'Add!',
                    `Work status  ${postdata} has been created`,
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the redirect after clicking "OK"
                        window.location.reload() // Replace with your desired URL
                    }
                });
               
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    'Error!',
                    'This Work status already exist',
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                     setvalue(prevState => ({ ...prevState, WorkStatusCode: '', WorkStatusDesc: '' }));    // Perform the redirect after clicking "OK"
                    }
                });
                setOpenDialog(false);
            });
    }


    return (
        <>
            <button
                type="button"
                onClick={handleOpenDialog}
                className="btn btn-outline-primary mx-1 color2 btnwork"
            >
                <AddCircleOutlineIcon className="me-1" />
                New
            </button>

            <Dialog open={openDialog} onClose={handleCloseDialog} className='DialogSizing'style={{ top: '-300px', left: '650px' }}>

                <form onSubmit={postapi} className='Sizing'>

                    <div className="row mx-auto w-100 formsection sizingtop">
                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkStatusCode' className='lablesection color3 text-start mb-1'>
                                    WorkStatus Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkStatusCode'
                                    value={value.WorkStatusCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkStatusCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkStatus Code'
                                    required
                                ></input>
                            </div>
                        </div>
                       
                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkStatusDesc' className='lablesection color3 text-start mb-1'>
                                    WorkStatusDesc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkStatusDesc'
                                    value={value.WorkStatusDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkStatusDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2' 
                                    placeholder='WorkStatus Desc'
                                    required
                                ></input>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between my-2 p-4 ">
                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={backCloseDialog}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                        <button type="submit" class="border-0 px-3  savebtn py-2" ><AddCircleOutlineIcon className='me-2' />Add New</button>
                    </div>

                </form>

                </Dialog>
            <ToastContainer />
        </>
    )
}

export default AddWorkstatus