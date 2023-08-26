import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Newsoluction() {

    const [value, setvalue] = useState({
        SolutiontatusCode: '', SolutionStatusDesc: '',
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
        axios.post(`/api/Solution_post`, {
            SolutiontatusCode: value.SolutiontatusCode,
            SolutionStatusDesc: value.SolutionStatusDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, SolutiontatusCode: '', SolutionStatusDesc: '' }));
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
                                <label htmlFor='SolutiontatusCode' className='lablesection color3 text-start mb-1'>
                                    SolutionStatus Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='SolutiontatusCode'
                                    value={value.SolutiontatusCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            SolutiontatusCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='SolutionStatus code'
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='SolutionStatusDesc' className='lablesection color3 text-start mb-1'>
                                    SolutionStatus Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='SolutionStatusDesc'
                                    value={value.SolutionStatusDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            SolutionStatusDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='SolutionStatusDesc'
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

export default Newsoluction