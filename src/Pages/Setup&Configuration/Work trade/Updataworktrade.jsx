import React, { useState, useEffect } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import "./Updata.css"

function Updataworktrade() {
    const navigate = useNavigate()
    let { EmployeeID } = useParams();
    console.log(EmployeeID);
    const [WorkTradeDesc, setWorkTradeDesc] = useState()
    const getapi = () => {
        axios.get(`/api/WorkTRADE_GET_BYID/${EmployeeID}`, {
        },)
            .then((res) => {
                console.log('TO get the list', res.data);
                setWorkTradeDesc(res.data.recordset[0].WorkTradeDesc)
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
        axios.put(`/api/WorkTrade_Put/${EmployeeID}`, {
            WorkTradeDesc: WorkTradeDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setWorkTradeDesc('')
                Swal.fire(
                    'Updata!',
                    `Work Trad ${EmployeeID } has been updated`,
                    'success'
                ).then(() => {
                    navigate(`/WORKTRADE`);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={() => { navigate(`/WORKTRADE`); }} />
                                    <p className="text-center my-auto mx-auto">Updata Worktypes</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">

                                <form onSubmit={postapi}>

                                    <div className="row mx-auto px-3 formsection">
                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                                            <div className='emailsection position-relative d-grid my-1'>
                                                <label htmlFor='WorkTypeDesc' className='lablesection color3 text-start mb-1'>
                                                    WorkTrade Desc<span className='star'>*</span>
                                                </label>

                                                <input
                                                    types='text'
                                                    id='WorkTypeDesc'
                                                    value={WorkTradeDesc}
                                                    onChange={e => {
                                                        setWorkTradeDesc(e.target.value)
                                                    }}
                                                    className='rounded inputsection py-2 borderfo'
                                                    placeholder='WorkTrade Desc'
                                                    required
                                                ></input>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="d-flex justify-content-between my-2 p-4 ">
                                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => { navigate(`/WORKTRADE`); }}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                        <button type="submit" class="border-0 px-3  savebtn py-2" ><AddCircleOutlineIcon className='me-2' />Save</button>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default Updataworktrade