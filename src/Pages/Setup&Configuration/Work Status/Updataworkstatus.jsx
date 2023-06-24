import React, { useState, useEffect } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import "./Updata.css"
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
function Updataworkstatus() {
    const navigate = useNavigate()
    let { EmployeeID } = useParams();
    console.log(EmployeeID);
    const [WorkStatusDesc, setWorkStatusDesc] = useState()
    const getapi = () => {
        axios.get(`/api/WorkStatus_GET_BYID/${EmployeeID}`, {
        },)
            .then((res) => {
                console.log('TO get the list', res.data);
                setWorkStatusDesc(res.data.recordset[0].WorkStatusDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    const postapi = (e) => {
        e.preventDefault();
        axios.put(`/api/WorkStatus_Put/${EmployeeID}`, {
            WorkStatusDesc: WorkStatusDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);

                setWorkStatusDesc('')
                Swal.fire(
                    'Updata!',
                    ' You have successfully updated.',
                    'success'
                ).then(() => {
                    navigate(`/Workstatus`);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
   
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
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">

                                <form onSubmit={postapi}>

                                    <div className="row mx-auto px-3 formsection">
                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                                            <div className='emailsection position-relative d-grid my-1'>
                                                <label htmlFor='WorkStatusDesc' className='lablesection color3 text-start mb-1'>
                                                    WorkType Desc<span className='star'>*</span>
                                                </label>

                                                <input
                                                    types='text'
                                                    id='WorkStatusDesc'
                                                    value={WorkStatusDesc}
                                                    onChange={e => {
                                                        setWorkStatusDesc(e.target.value)
                                                    }}
                                                    className='rounded inputsection py-2 borderfo'
                                                    placeholder='WorkStatus Desc'
                                                    required
                                                ></input>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="d-flex justify-content-between my-2 p-4 ">
                                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => { navigate(`/Workstatus`); }}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                        <button type="submit" class="border-0 px-3  savebtn py-2" ><AddCircleOutlineIcon className='me-2' />Save</button>

                                    </div>

                                </form>
                            </div>
                        </div>

               

               
                </Menu>
        </>
    )
}

export default Updataworkstatus