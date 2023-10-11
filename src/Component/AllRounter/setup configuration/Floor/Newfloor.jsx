import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Newfloor() {

    const [value, setvalue] = useState({
        FloorCode: '', DaysSeq: '', FloorDesc: ''
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
        axios.post(`/api/Floor_post`, {
            FloorCode: value.FloorCode,
            FloorDesc: value.FloorDesc,
        }).then((res) => {
            console.log('Add', res.data);
            if (res.data.status===201){
                setvalue(prevState => ({ ...prevState, FloorCode: '', FloorDesc: '' }));
                setOpenDialog(false);
                Swal.fire(
                    'Add!',
                    `Floor Code ${value.FloorCode} has been created`,
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }
        }).catch((err)=>{

            console.log('Error', err.response.data.status);
            if (err.response.data.status === 400) {
                Swal.fire(
                    'Error!',
                    `${err.response.data.error}`,
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setvalue(prevState => ({ ...prevState, FloorCode: '', FloorDesc: '' }));
                    }
                });
            } 
            setOpenDialog(false);

        })
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

            <Dialog open={openDialog} onClose={handleCloseDialog} className='DialogSizing' style={{ top: '-300px', left: '850px' }}>

                <form onSubmit={postapi} className='sizingtrade'>
                    <div className="row mx-auto px-3 w-100 formsection sizingtoptrade">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='FloorCode' className='lablesection color3 text-start mb-1'>
                                    Floor Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='FloorCode'
                                    value={value.FloorCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            FloorCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Floor Code'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='FloorDesc' className='lablesection color3 text-start mb-1'>
                                    Floor Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='FloorDesc'
                                    value={value.FloorDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            FloorDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Floor Desc'
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

export default Newfloor