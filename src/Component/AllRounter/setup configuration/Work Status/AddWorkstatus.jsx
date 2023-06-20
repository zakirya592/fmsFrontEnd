import React, { useState, useRef } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddWorkstatus() {

    const [value, setvalue] = useState({
        WorkStatusCode: '', WorkStatusDesc: '',
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
   
    const handleClose = () => {
        setAnchorEl(null);
        window.location.reload(); // Reload the page
    };

    const postapi = (e) => {
        e.preventDefault();
        axios.post(`/api/WorkStatus_post`, {
            WorkStatusCode: value.WorkStatusCode,
            WorkStatusDesc: value.WorkStatusDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, WorkStatusCode: '', WorkStatusDesc: '' }));
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
            <button type="button" id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} className="btn btn-outline-primary mx-1 color2 btnwork">
                <AddCircleOutlineIcon className="me-1" />
                New
            </button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                // onClose={handleClose}
                TransitionComponent={Fade}

            >

                <form onSubmit={postapi}>

                    <div className="row mx-auto w-100 formsection firstname">
                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkStatusCode' className='lablesection color3 text-start mb-1'>
                                    WorkStatus Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkStatusCode'
                                    value={value.WorkStatusCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkStatusCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='WorkStatus Code'
                                    required
                                ></input>
                            </div>
                        </div>
                       
                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='WorkStatusDesc' className='lablesection color3 text-start mb-1'>
                                    WorkStatusDesc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='WorkStatusDesc'
                                    value={value.WorkStatusDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            WorkStatusDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2' 
                                    placeholder='WorkStatus Desc'
                                    required
                                ></input>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between my-2 p-4 ">
                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={handleClose}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                        <button type="submit" class="border-0 px-3  savebtn py-2" ><AddCircleOutlineIcon className='me-2' />Add New</button>
                    </div>

                </form>

            </Menu>
            <ToastContainer />
        </>
    )
}

export default AddWorkstatus