import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
function Createwroke() {
    // generateId random
    const generateId = () => {
        const randomNumber = Math.floor(Math.random() * 100000000);
        return randomNumber.toString().padStart(8, '0');
    };
    const [value, setvalue] = useState({
        EmployeeID: '', WorkTypeCode: '', WorkTypeDesc:''
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const postapi =(e)=>{
        // e.preventDefault();
        const generatedId = generateId();
        axios.post(`/api/WorkType_post`, {
         WorkTypeCode: value.WorkTypeCode,
         WorkTypeDesc: value.WorkTypeDesc,
        },)
            .then((res) => {
                console.log('Add', res.data);
                setvalue(prevState => ({ ...prevState, WorkTypeCode: '', WorkTypeDesc :''}));
                setAnchorEl(null);
            })
            .catch((err) => {
                console.log(err);
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
                onClose={handleClose}
                TransitionComponent={Fade}
               
            >

                <form onSubmit={postapi}>

                <div className="row mx-auto px-3 w-100 formsection firstname1">
                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='WorkTypeCode' className='lablesection color3 text-start mb-1'>
                                WorkType Code<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='WorkTypeCode'
                                value={value.WorkTypeCode}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        WorkTypeCode: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='WorkType Code'
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        <div className='emailsection position-relative d-grid my-1'>
                            <label htmlFor='WorkTypeDesc' className='lablesection color3 text-start mb-1'>
                                WorkType Desc<span className='star'>*</span>
                            </label>

                            <input
                                types='text'
                                id='WorkTypeDesc'
                                value={value.WorkTypeDesc}
                                onChange={e => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        WorkTypeDesc: e.target.value
                                    }))
                                }}
                                className='rounded inputsection py-2'
                                placeholder='WorkType Desc'
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
        </>
    )
}

export default Createwroke