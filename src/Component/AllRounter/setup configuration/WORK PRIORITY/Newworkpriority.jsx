import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Swal from "sweetalert2";
function Newworkpriority() {

  const [value, setvalue] = useState({
    WorkPrioritySeq: '', WorkPriorityCode: '', WorkPriorityDesc: ''
  })
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const postapi = (e) => {
    e.preventDefault();
    axios.post(`/api/Workpriority_post`, {
      WorkPrioritySeq: value.WorkPrioritySeq,
      WorkPriorityCode: value.WorkPriorityCode,
      WorkPriorityDesc: value.WorkPriorityDesc
    },)
      .then((res) => {
        console.log('Add', res.data);
        setvalue(prevState => ({ ...prevState, WorkPrioritySeq: '', WorkPriorityCode: '', WorkPriorityDesc: '' }));
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
        onClose={handleClose}
        TransitionComponent={Fade}

      >

        <form onSubmit={postapi}>

          <div className="row mx-auto px-3 w-100 formsection ">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className='emailsection position-relative d-grid my-1'>
                <label htmlFor='WorkPrioritySeq' className='lablesection color3 text-start mb-1'>
                  WorkPriority Seq<span className='star'>*</span>
                </label>

                <input
                  types='text'
                  id='WorkPrioritySeq'
                  value={value.WorkPrioritySeq}
                  onChange={e => {
                    setvalue(prevValue => ({
                      ...prevValue,
                      WorkPrioritySeq: e.target.value
                    }))
                  }}
                  className='rounded inputsection py-2'
                  placeholder='WorkPriority Seq'
                  required
                ></input>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className='emailsection position-relative d-grid my-1'>
                <label htmlFor='WorkPriorityCode' className='lablesection color3 text-start mb-1'>
                  WorkPriority Code<span className='star'>*</span>
                </label>

                <input
                  types='text'
                  id='WorkPriorityCode'
                  value={value.WorkPriorityCode}
                  onChange={e => {
                    setvalue(prevValue => ({
                      ...prevValue,
                      WorkPriorityCode: e.target.value
                    }))
                  }}
                  className='rounded inputsection py-2'
                  placeholder='WorkPriority Code'
                  required
                ></input>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className='emailsection position-relative d-grid my-1'>
                <label htmlFor='WorkPriorityDesc' className='lablesection color3 text-start mb-1'>
                  WorkPriority Desc <span className='star'>*</span>
                </label>

                <input
                  types='text'
                  id='WorkPriorityDesc'
                  value={value.WorkPriorityDesc}
                  onChange={e => {
                    setvalue(prevValue => ({
                      ...prevValue,
                      WorkPriorityDesc: e.target.value
                    }))
                  }}
                  className='rounded inputsection py-2'
                  placeholder='WorkPriority Desc'
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

export default Newworkpriority