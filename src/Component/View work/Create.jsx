import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import "./Create.css"
function Create() {
    const [Employeenumber, setEmployeenumber] = useState('')
    const [WorkRequest, setWorkRequest] = useState('')
    const [WorkCategory, setWorkCategory] = useState('')
    const [WorkOrderNumber, setWorkOrderNumber] = useState()
    const [WorkOrderStatus, setWorkOrderStatus] = useState()
    const [FeedbackByEmp, setFeedbackByEmp] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <button type="button" id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} className="btn btn-outline-primary mx-1 color2 btnwork"><AddCircleOutlineRoundedIcon className='me-1' />Create</button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >

                <div className="row mx-auto px-3 ">

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='WorkOrderNumber' className='lablesection color3 text-start mb-1'>
                                Work Order Number*
                            </label>

                            <input
                                types='text'
                                id='WorkOrderNumber'
                                value={WorkOrderNumber}
                                onChange={e => {
                                    setWorkOrderNumber(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Work Order Number*'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='WorkOrderStatus' className='lablesection color3 text-start mb-1'>
                               Work Order Status*
                            </label>

                            <input
                                types='text'
                                id='WorkOrderStatus'
                                value={WorkOrderStatus}
                                onChange={e => {
                                    setWorkOrderStatus(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Work Order Status'
                                required
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mx-auto px-3 formsection">
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='WorkCategory' className='lablesection color3 text-start mb-1'>
                                Work Category*
                            </label>

                            <input
                                types='text'
                                id='WorkCategory'
                                value={WorkCategory}
                                onChange={e => {
                                    setWorkCategory(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Work Category'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                        <div className='emailsection d-grid my-1'>
                            <label htmlFor='WorkCategoryDescription' className='lablesection color3 text-start mb-1'>
                                Work Category Description**
                            </label>
                            <div className="form-floating inputsectiondropdpwn">
                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-1' placeholder="Work Category Description" id="WorkCategoryDescription"></textarea>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mx-auto px-3 formsection">

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
                                Completed By Emp#*
                            </label>

                            <input
                                types='text'
                                id='Employeenumber'
                                value={Employeenumber}
                                onChange={e => {
                                    setEmployeenumber(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Employee ID'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                Employee Name*
                            </label>

                            <input
                                types='text'
                                id='WorkRequest'
                                value={WorkRequest}
                                onChange={e => {
                                    setWorkRequest(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Employee Name'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection d-grid my-1'>
                            <label htmlFor='Employdata' className='lablesection color3 text-start mb-1'>
                                Request Date/Time*
                            </label>
                            <input type="datetime-local" id="Employdata" name="birthdaytime" className='rounded inputsection py-2' />


                        </div>
                    </div>
                </div>

                <hr className='color3 line' />

                <div className="row mx-auto px-3 formsection">

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='FeedbackByEmp' className='lablesection color3 text-start mb-1'>
                               Feedback By Emp#*
                            </label>

                            <input
                                types='text'
                                id='FeedbackByEmp'
                                value={FeedbackByEmp}
                                onChange={e => {
                                    setFeedbackByEmp(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Employee ID'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                Employee Name*
                            </label>

                            <input
                                types='text'
                                id='WorkRequest'
                                value={WorkRequest}
                                onChange={e => {
                                    setWorkRequest(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Employee Name'
                                required
                            ></input>
                        </div>
                    </div>

                </div>

                <div className="row mx-auto px-3  formsection">

                    <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 ">
                        <div className='emailsection d-grid my-2'>
                            <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                Problem Description*
                            </label>
                            <div className="form-floating inputsectiondropdpwn">
                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription"></textarea>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="d-flex justify-content-between my-2 ps-4">
                    <button type="button" class="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                </div>


            </Menu>
        </>
    )
}

export default Create