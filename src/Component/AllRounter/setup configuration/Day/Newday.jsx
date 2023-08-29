import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Newday() {

    const [value, setvalue] = useState({
        DaysCode: '', DaysSeq: '', DaysDesc: ''
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
        axios.post(`/api/Days_post`, {
            DaysCode: value.DaysCode,
            DaysSeq: value.DaysSeq,
            DaysDesc: value.DaysDesc
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, DaysCode: '', DaysSeq: '', DaysDesc: '' }));
                // setAnchorEl(null);
                setOpenDialog(false);
                const postdata = res.data.recordset[0].DaysCode
                Swal.fire(
                    'Add!',
                    `Day ${postdata} has been created`,
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the redirect after clicking "OK"
                        window.location.reload() // Replace with your desired URL
                    }
                });
            })
            .catch((err) => {
                Swal.fire(
                    'Error!',
                    'This Day  already exist',
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setvalue(prevState => ({ ...prevState, DaysCode: '', DaysSeq: '', DaysDesc: '' }));
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
                                <label htmlFor='DaysCode' className='lablesection color3 text-start mb-1'>
                                    Days Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='DaysCode'
                                    value={value.DaysCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DaysCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Days Code'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='DaysSeq' className='lablesection color3 text-start mb-1'>
                                    Days Seq<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='DaysSeq'
                                    value={value.DaysSeq}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DaysSeq: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Days Seq'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='DaysDesc' className='lablesection color3 text-start mb-1'>
                                    Days Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='DaysDesc'
                                    value={value.DaysDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DaysDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Days Desc'
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

export default Newday