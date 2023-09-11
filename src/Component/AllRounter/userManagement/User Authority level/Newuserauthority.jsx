import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Newuserauthority() {

    const [value, setvalue] = useState({
        UserAuthoritySeq: '', UserAuthorityDesc: '', UserAuthorityCode:''
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
        axios.post(`/api/UserAuthority_post`, {
            UserAuthoritySeq: value.UserAuthoritySeq,
            UserAuthorityDesc: value.UserAuthorityDesc,
            UserAuthorityCode: value.UserAuthorityCode
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, UserAuthoritySeq: '', UserAuthorityDesc: '', UserAuthorityCode :''}));
                // setAnchorEl(null);
                setOpenDialog(false);
                const postdata = res.data.recordset[0].UserAuthoritySeq
                Swal.fire(
                    'Created!',
                    `User Authority ${postdata} has been created`,
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        // Perform the redirect after clicking "OK"
                        window.location.reload() // Replace with your desired URL
                    }
                });
            })
            .catch((err) => {
                console.log(err.response.data.error);
                const Errors = err.response.data.error
                Swal.fire(
                    'Error!',
                    `This User Authority ${Errors}`,
                    'error'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setvalue(prevState => ({ ...prevState, UserAuthoritySeq: '', UserAuthorityDesc: '', UserAuthorityCode :''}));
                    }
                });
                setOpenDialog(false);
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

            <Dialog open={openDialog} onClose={handleCloseDialog} className='DialogSizing' style={{ top: '-300px', left: '650px' }}>

                <form onSubmit={postapi} className='sizingtrade'>

                    <div className="row mx-auto  w-100 formsection sizingtoptrade">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='UserAuthoritySeq' className='lablesection color3 text-start mb-1'>
                                    UserAuthority Seq<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='UserAuthoritySeq'
                                    value={value.UserAuthoritySeq}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            UserAuthoritySeq: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='UserAuthority Seq'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='UserAuthorityCode' className='lablesection color3 text-start mb-1'>
                                    UserAuthority Code<span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='UserAuthorityCode'
                                    value={value.UserAuthorityCode}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            UserAuthorityCode: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='UserAuthority Code'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className='emailsection position-relative d-grid my-1'>
                                <label htmlFor='UserAuthorityDesc' className='lablesection color3 text-start mb-1'>
                                    UserAuthority Desc <span className='star'>*</span>
                                </label>

                                <input
                                    types='text'
                                    id='UserAuthorityDesc'
                                    value={value.UserAuthorityDesc}
                                    onChange={e => {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            UserAuthorityDesc: e.target.value
                                        }))
                                    }}
                                    className='rounded inputsection py-2 px-2'
                                    placeholder='UserAuthority Desc'
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

export default Newuserauthority