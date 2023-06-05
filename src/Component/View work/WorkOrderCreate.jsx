import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import "./Create.css"
function WorkOrderCreate() {
    const [WorkRequest, setWorkRequest] = useState('')
    const [department, setdepartment] = useState("")
    const [building, setbuilding] = useState("")
    const [location, setlocation] = useState("")
    const [worktype, setworktype] = useState("")
    const [workTypeDescription, setworkTypeDescription] = useState("")
    const [workTrade, setworkTrade] = useState("")
    const [workTradeDiscription, setworkTradeDiscription] = useState("")
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
                                Work Request Number<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='workrequestnumber'
                                value={WorkRequest}
                                onChange={e => {
                                    setWorkRequest(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Work Request Number*'
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className='emailsection  d-grid my-2'>
                            <label htmlFor='requestdate' className='lablesection color3 text-start mb-1'>
                               Request Date <span className='star'>*</span>
                            </label>

                            <input type="datetime-local" id="Employdata" name="birthdaytime" className='rounded inputsection py-2' />
                        </div>
                    </div>
                </div>

{/* Row two */}
                <div className="row mx-auto px-3 formsection">

                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='FeedbackByEmp' className='lablesection color3 text-start mb-1'>
                               Department <span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='department'
                                value={department}
                                onChange={e => {
                                    setdepartment(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Department Code'
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='FeedbackByEmp' className='lablesection color3 text-start mb-1'>
                               Building <span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='department'
                                value={building}
                                onChange={e => {
                                    setbuilding(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Building'
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='FeedbackByEmp' className='lablesection color3 text-start mb-1'>
                               Location <span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='location'
                                value={location}
                                onChange={e => {
                                    setlocation(e.target.value)
                                }}
                                className='rounded inputsection py-2'
                                placeholder='Department Code'
                                required
                            ></input>
                        </div>
                    </div>


                </div>
{/* row three */}
<div className="row mx-auto px-3 formsection">

<div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
    <div className='emailsection position-relative d-grid my-1'>
        <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
            Work Type <span className='star'>*</span>
        </label>

        <input
            types='text'
            id='worktype'
            value={worktype}
            onChange={e => {
                setworktype(e.target.value)
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
            Work Type Description<span className='star'>*</span>
        </label>

        <input
            types='text'
            id='WorkRequest'
            value={workTypeDescription}
            onChange={e => {
                setworkTypeDescription(e.target.value)
            }}
            className='rounded inputsection py-2'
            placeholder='Work Type Discription'
            required
        ></input>
    </div>
</div>

</div>
{/* Row four */}
<div className="row mx-auto px-3 formsection">

<div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
    <div className='emailsection position-relative d-grid my-1'>
        <label htmlFor='Employeenumber' className='lablesection color3 text-start mb-1'>
            Work Trade <span className='star'>*</span>
        </label>

        <input
            types='text'
            id='worktrade'
            value={workTrade}
            onChange={e => {
                setworkTrade(e.target.value)
            }}
            className='rounded inputsection py-2'
            placeholder='Work Trade'
            required
        ></input>
    </div>
</div>

<div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
    <div className='emailsection position-relative d-grid my-1'>
        <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
            Work Trade Description<span className='star'>*</span>
        </label>

        <input
            types='text'
            id='worktradediscripitn'
            value={workTradeDiscription}
            onChange={e => {
                setworkTradeDiscription(e.target.value)
            }}
            className='rounded inputsection py-2'
            placeholder='Work Trade Discription'
            required
        ></input>
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

export default WorkOrderCreate