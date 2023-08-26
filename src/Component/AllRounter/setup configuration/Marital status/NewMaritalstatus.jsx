import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NewMaritalstatus() {

    const [value, setvalue] = useState({
        MaritalCode: '', MaritalDesc: '',
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
        axios.post(`/api/MaritalStatus_post`, {
            MaritalCode: value.MaritalCode,
            MaritalDesc: value.MaritalDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, MaritalCode: '', MaritalDesc: '' }));
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
                // Swal.fire(
                //     'Add!',
                //     'Add record successfully',
                //     'success'
                // )
            })
            .catch((err) => {
                console.log(err);
                toast.error(`You will not add due to ${err}`, {
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

                    <div className="row mx-auto w-100 formsection sizingtop">

                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='MaritalCode' className='lablesection color3 text-start mb-1'>
                                    Marital Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='MaritalCode'
                                    value={value.MaritalCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            MaritalCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Marital Code'
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='MaritalDesc' className='lablesection color3 text-start mb-1'>
                                    Marital Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='MaritalDesc'
                                    value={value.MaritalDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            MaritalDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Marital Desc'
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

export default NewMaritalstatus