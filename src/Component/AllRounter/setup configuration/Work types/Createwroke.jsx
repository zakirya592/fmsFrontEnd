import React, { useState } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import "./CreateWork.css"

function CreateWork() {
    const generateId = () => {
        const randomNumber = Math.floor(Math.random() * 100000000);
        return randomNumber.toString().padStart(8, '0');
    };

    const [value, setValue] = useState({
        EmployeeID: '',
        WorkTypeCode: '',
        WorkTypeDesc: '',
    });

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
        const generatedId = generateId();
        axios
            .post(`/api/WorkType_post`, {
                WorkTypeCode: value.WorkTypeCode,
                WorkTypeDesc: value.WorkTypeDesc,
            })
            .then((res) => {
                console.log('Add', res.data);
                setValue({ WorkTypeCode: '', WorkTypeDesc: '' });
                toast.success('Add record successfully', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                handleCloseDialog(); // Close the dialog after success
            })
            .catch((err) => {
                console.log(err);
                toast.error('This Work Type already exist', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    };

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
                                <label htmlFor='WorkTypeCode' className='lablesection color3 text-start mb-1'>
                                    WorkType Code<span className='star'>*</span>
                                </label>
                                <input
                                    type='text'
                                    id='WorkTypeCode'
                                    value={value.WorkTypeCode}
                                    onChange={e => {
                                        setValue(prevValue => ({
                                            ...prevValue,
                                            WorkTypeCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkType Code'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkTypeDesc' className='lablesection color3 text-start mb-1'>
                                    WorkType Desc<span className='star'>*</span>
                                </label>
                                <input
                                    type='text'
                                    id='WorkTypeDesc'
                                    value={value.WorkTypeDesc}
                                    onChange={e => {
                                        setValue(prevValue => ({
                                            ...prevValue,
                                            WorkTypeDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkType Desc'
                                    required
                                />
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
    );
}

export default CreateWork;
