import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Newfrequency() {

    const [value, setvalue] = useState({
        FreqCode: '', FreqSeq: '', FreqDesc: ''
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
        window.location.reload(); // Reload the page
    };

    const postapi = (e) => {
        e.preventDefault();
        axios.post(`/api/Frequency_post`, {
            FreqCode: value.FreqCode,
            FreqSeq: value.FreqSeq,
            FreqDesc: value.FreqDesc
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, FreqCode: '', FreqSeq: '', FreqDesc: '' }));
                // setAnchorEl(null);
                setOpenDialog(false);
                Swal.fire(
                    'Add!',
                    'Frequency has been created',
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
                    'This Frequency already exist',
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the redirect after clicking "OK"
                        setvalue(prevState => ({ ...prevState, FreqCode: '', FreqSeq: '', FreqDesc: '' }));
                    }
                });
                setOpenDialog(false);
            });
    }


    return (
        <>
            <button type="button" id="fade-button"
                onClick={handleOpenDialog}
                className="btn btn-outline-primary mx-1 color2 btnwork"
            >
                <AddCircleOutlineIcon className="me-1" />
                New
            </button>

            <Dialog open={openDialog} onClose={handleCloseDialog} className='DialogSizing'style={{ top: '-300px', left: '850px' }}>

                <form onSubmit={postapi} className='sizingtrade'>
                    <div className="row mx-auto px-3 w-100 formsection sizingtoptrade">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='FreqCode' className='lablesection color3 text-start mb-1'>
                                    Freq Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='FreqCode'
                                    value={value.FreqCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            FreqCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Freq Code'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='FreqSeq' className='lablesection color3 text-start mb-1'>
                                    Freq Seq<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='FreqSeq'
                                    value={value.FreqSeq}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            FreqSeq: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Freq Seq'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='FreqDesc' className='lablesection color3 text-start mb-1'>
                                    Freq Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='FreqDesc'
                                    value={value.FreqDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            FreqDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Freq Desc'
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

export default Newfrequency