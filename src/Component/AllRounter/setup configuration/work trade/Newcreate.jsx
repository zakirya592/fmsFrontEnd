import React, { useState } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import "./CreateTrade.css"
function Newcreate() {

    const [value, setvalue] = useState({
        WorkTypeCode: '', WorkTradeCode: '', WorkTradeDesc: ''
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
        axios.post(`/api/WorkTrade_post`, {
            WorkTypeCode: value.WorkTypeCode,
            WorkTradeCode: value.WorkTradeCode,
            WorkTradeDesc: value.WorkTradeDesc
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, WorkTypeCode: '', WorkTradeCode: '', WorkTradeDesc: '' }));
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
            <button type="button" id="fade-button"
                onClick={handleOpenDialog}
                className="btn btn-outline-primary mx-1 color2 btnwork"
            >
                <AddCircleOutlineIcon className="me-1" />
                New
            </button>

            <Dialog open={openDialog} onClose={handleCloseDialog} className='DialogSizing'style={{ top: '-300px', left: '650px' }}>
                <form onSubmit={postapi} className='sizingtrade'>

                    <div className="row mx-auto px-3 w-100 formsection sizingtoptrade">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkTypeCode' className='lablesection color3 text-start mb-1'>
                                    WorkType Code <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkTypeCode'
                                    value={value.WorkTypeCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkTypeCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkType Code'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkTradeCode' className='lablesection color3 text-start mb-1'>
                                    WorkTrade Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkTradeCode'
                                    value={value.WorkTradeCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkTradeCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkType Code'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkTradeDesc' className='lablesection color3 text-start mb-1'>
                                    WorkTradeDesc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkTradeDesc'
                                    value={value.WorkTradeDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkTradeDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkType Desc'
                                    required
                                ></input>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between my-2 p-4 ">
                    <button
                            type="button"
                            className="border-0 px-3 savebtn py-2"
                            onClick={handleCloseDialog}
                        >
                            <ArrowCircleLeftOutlinedIcon className="me-2" /> Back
                        </button>
                        <button
                            type="submit"
                            className="border-0 px-3 savebtn py-2"
                        >
                            <AddCircleOutlineIcon className="me-2" /> Add New
                        </button>
                    </div>

                </form>

                </Dialog>
            <ToastContainer />
        </>
    )
}

export default Newcreate