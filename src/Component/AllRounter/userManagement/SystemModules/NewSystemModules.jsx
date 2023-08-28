import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

function NewSystemModule() {

    const [value, setvalue] = useState({
        SystemModuleCode: '', SystemModuleDesc: '',
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
        axios.post(`/api/SystemModules_post`, {
            SystemModuleCode: value.SystemModuleCode,
            SystemModuleDesc: value.SystemModuleDesc,
            SystemModuleSeq:"80"
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, SystemModuleCode: '', SystemModuleDesc: '' }));
                // setAnchorEl(null);
                setOpenDialog(false);
                const postdata = res.data.recordset[0].SystemModuleCode
                Swal.fire(
                    'Add!',
                    `System module Period ${postdata} has been created`,
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
                    'This System Module  already exist',
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setvalue(prevState => ({ ...prevState, SystemModuleCode: '', SystemModuleDesc: '' }));
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
                                <label htmlFor='SystemModuleCode' className='lablesection color3 text-start mb-1'>
                                    System Module Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='SystemModuleCode'
                                    value={value.SystemModuleCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            SystemModuleCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='System module code'
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='SystemModuleDesc' className='lablesection color3 text-start mb-1'>
                                    System Module Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='SystemModuleDesc'
                                    value={value.SystemModuleDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            SystemModuleDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='System Module Desc'
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

export default NewSystemModule