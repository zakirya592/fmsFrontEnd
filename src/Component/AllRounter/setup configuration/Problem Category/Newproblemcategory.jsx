import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Work types/CreateWork.css"
import Swal from "sweetalert2";

function Newproblemcategory() {

    const [value, setvalue] = useState({
        ProblemCategoryCode: '', ProblemCategoryDesc: '',
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
        axios.post(`/api/ProblemCategory_post`, {
            ProblemCategoryCode: value.ProblemCategoryCode,
            ProblemCategoryDesc: value.ProblemCategoryDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, ProblemCategoryCode: '', ProblemCategoryDesc: '' }));
                setOpenDialog(false);
                const postdata = res.data.recordset[0].ProblemCategoryCode
                Swal.fire(
                    'Add!',
                    `Problem Category ${postdata} has been created`,
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
                    'This Problem Category already exist',
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setvalue(prevState => ({ ...prevState, ProblemCategoryCode: '', ProblemCategoryDesc: '' }));
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

                    <div className="row mx-auto  w-100 formsection sizingtop">
                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='ProblemCategoryCode' className='lablesection color3 text-start mb-1'>
                                    ProblemCategory Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='ProblemCategoryCode'
                                    value={value.ProblemCategoryCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            ProblemCategoryCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='ProblemCategoryCode'
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='ProblemCategoryDesc' className='lablesection color3 text-start mb-1'>
                                    Location Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='ProblemCategoryDesc'
                                    value={value.ProblemCategoryDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            ProblemCategoryDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='ProblemCategoryDesc'
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

export default Newproblemcategory