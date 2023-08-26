import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Newgender() {

    const [value, setvalue] = useState({
        GenderCode: '', GenderDesc: ''
    })
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        window.location.reload(); // Reload the page
    };

    const postapi = (e) => {
        e.preventDefault();
        axios.post(`/api/Gender_post`, {
            GenderCode: value.GenderCode,
            GenderDesc: value.GenderDesc
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, GenderCode: '', GenderDesc: '' }));
                // setAnchorEl(null);
                toast.success('Add record successfully', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error(`The Error is due to ${err}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
                    <div className="row mx-auto px-3 formsection sizingtop ">

                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='GenderCode' className='lablesection color3 text-start mb-1'>
                                    Gender Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='GenderCode'
                                    value={value.GenderCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            GenderCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Gender Code'
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='GenderDesc' className='lablesection color3 text-start mb-1'>
                                    Gender Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='GenderDesc'
                                    value={value.GenderDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            GenderDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Gender Desc'
                                    required
                                ></input>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between my-2 p-4 ">
                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={handleCloseDialog}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                        <button type="submit" class="border-0 px-3  savebtn py-2" ><AddCircleOutlineIcon className='me-2' />Add New</button>
                    </div>

                </form>

                </Dialog>
            <ToastContainer />
        </>
    )
}

export default Newgender