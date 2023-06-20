import React, { useState, useEffect } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Siderbar from '../../../Siderbar/Siderbar';
// import "./Updata.css"

function Updatadepartment() {
    const navigate = useNavigate()
    let { EmployeeID } = useParams();
    console.log(EmployeeID);
    const [DepartmentDesc, setDepartmentDesc] = useState()
    const getapi = () => {
        axios.get(`/api/Department_GET_BYID/${EmployeeID}`, {
        },)
            .then((res) => {
                console.log('TO get the list', res.data);
                setDepartmentDesc(res.data.recordset[0].DepartmentDesc)
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
        axios.put(`/api/Department_Put/${EmployeeID}`, {
            DepartmentDesc: DepartmentDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setDepartmentDesc('')

                Swal.fire(
                    'Updata!',
                    ' You have successfully updated.',
                    'success'
                ).then(() => {
                    navigate(`/Departmentmaintence`);
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={() => { navigate(`/Departmentmaintence`); }} />
                                    <p className="text-center my-auto mx-auto">Updata Department</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">

                                <form onSubmit={postapi}>

                                    <div className="row mx-auto px-3 formsection">

                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
                                            <div className='emailsection position-relative d-grid my-1'>
                                                <label htmlFor='DepartmentDesc' className='lablesection color3 text-start mb-1'>
                                                    Department Desc<span className='star'>*</span>
                                                </label>

                                                <input
                                                    types='text'
                                                    id='DepartmentDesc'
                                                    value={DepartmentDesc}
                                                    onChange={e => {
                                                        setDepartmentDesc(e.target.value)
                                                    }}
                                                    className='rounded inputsection py-2 borderfo'
                                                    placeholder='Department Desc'
                                                    required
                                                ></input>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-between my-2 p-4 ">
                                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => { navigate(`/Departmentmaintence`); }}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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

export default Updatadepartment