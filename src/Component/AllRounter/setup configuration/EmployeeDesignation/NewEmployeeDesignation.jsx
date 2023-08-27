import React, { useState} from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';

function NewEmployeeDesignation() {

    const [value, setvalue] = useState({
        DesignationCode: '', DesignationDesc: '',
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
        axios.post(`api/Designation_post/`, {
            DesignationCode: value.DesignationCode,
            DesignationDesc: value.DesignationDesc,
        },)
            .then((res) => {
                console.log('Add rhis', res.data);
                setvalue(prevState => ({ ...prevState, DesignationCode: '', DesignationDesc: '' }));
                // setAnchorEl(null);
                setOpenDialog(false);
                const postdata = res.data.recordset[0].DesignationCode
                Swal.fire(
                    'Add!',
                    `Employee Status  ${postdata} has been created`,
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
                    'This Employee Status already exist',
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                     setvalue(prevState => ({ ...prevState, DesignationCode: '', DesignationDesc: '' }));    // Perform the redirect after clicking "OK"
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

                    <div className="row mx-auto w-100 formsection sizingtop">
                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='DesignationCode' className='lablesection color3 text-start mb-1'>
                                Employee Designation Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='DesignationCode'
                                    value={value.DesignationCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DesignationCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='Employee Designation Code'
                                    required
                                ></input>
                            </div>
                        </div>
                       
                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='DesignationDesc' className='lablesection color3 text-start mb-1'>
                                Employee Desigantion Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkStatusDesc'
                                    value={value.DesignationDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DesignationDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2' 
                                    placeholder='Employee Desigantion Desc'
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

export default NewEmployeeDesignation