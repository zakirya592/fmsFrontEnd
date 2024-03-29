import React, { useState } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import "./CreateWork.css"
import Swal from "sweetalert2";

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
        setOpenDialog(false)
    };
    const BackCloseDialog = () => {
        setOpenDialog(false);
    };

    const postapi = (e) => {
        e.preventDefault();
        axios
            .post(`/api/WorkType_post`, {
                WorkTypeCode: value.WorkTypeCode,
                WorkTypeDesc: value.WorkTypeDesc,
            })
            .then((res) => {
                console.log('Add', res.data.recordset[0].WorkTypeCode);
                setValue({ WorkTypeCode: '', WorkTypeDesc: '' });
                setOpenDialog(false);
                const postdata = res.data.recordset[0].WorkTypeCode
                Swal.fire(
                    'Add!',
                    `Work Type ${postdata} has been created`,
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the redirect after clicking "OK"
                        window.location.reload() // Replace with your desired URL
                    }
                });
                // handleCloseDialog(); // Close the dialog after success
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    'Error!',
                    `This Work Type already exist`,
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the redirect after clicking "OK"
                        setValue({ WorkTypeCode: '', WorkTypeDesc: '' });  }
                });

                setOpenDialog(false);
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
                            onClick={BackCloseDialog}
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
