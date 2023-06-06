import Box from "@mui/material/Box";
import Siderbar from "../../Component/Siderbar/Siderbar";
import pagepin from "../../Image/pagepin.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import excel from "../../Image/excel.png";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import "../Work Request/View modify/Viewmodify.css";
import WorkOrderCreate from "../../Component/View work/WorkOrderCreate";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';


function WorkOrder() {
    const [orderNumber, setOrderNumber] = useState("");
    const [requestOrderNumber, setRequestOrderNumber] = useState("");
    const [workStatus, setWorkStatus] = useState("");
    const [workPriority, setWorkPriority] = useState("");
    const [workCategory, setWorkCategory] = useState("");
    const [workCategoryDiscription, setWorkCategoryDiscription ] = useState("");
    const [failureCode, setFailureCode] = useState("");
    const [failureDiscriptionCode, setFailureDiscriptionCode] = useState("");
    const [solutionCode, setsolutionCode] = useState("");
    const [solutionCodeDiscription, setsolutionCodeDiscription] = useState("");
    const [assignEmployee, setAssignEmployee] = useState("");
    const [EmployeeName, setEmployeeName] = useState("");
    const [completeEmployee, setcompleteEmployee] = useState("");
    const [CompleteEmployeeName, setCompleteEmployeeName] = useState("");


    
    return (
        <>
            <div className="bg">
                <div className="">
                    <Box sx={{ display: "flex" }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" />
                                    <p className="text-center my-auto ms-5">Work Order</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        View/Modify Work Orders
                                        <span className="star">*</span>
                                    </p>
                                    <div className="d-flex">
                                        <img src={pagepin} className="me-2" alt="pagepin" />
                                        <WorkOrderCreate />
                                        <button
                                            type="button"
                                            class="btn btn-outline-primary mx-1 color2 btnwork">
                                            <PrintIcon className="me-1" />
                                            Print
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-outline-primary color2">
                                            <img src={excel} alt="excel" /> Export
                                        </button>
                                    </div>
                                </div>
                                <hr className="color3 line" />

                                {/*Rows Section */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="WorkOrderNumber"
                                                className="lablesection color3 text-start mb-1">
                                                Work Order Number<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='ordernumber'
                                            value={orderNumber}
                                            onChange={e => {
                                                setOrderNumber(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Work Order Number'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="WorkRequestNumber"
                                                className="lablesection color3 text-start mb-1">
                                                Work Request Number<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='requestOrderNumber'
                                            value={requestOrderNumber}
                                            onChange={e => {
                                                setRequestOrderNumber(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Work Request Number'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workStatus' className='lablesection color3 text-start mb-1'>
                                        Work Status<span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workStatus" aria-label="Floating label select example" value={workStatus}
                                            onChange={(event) => {
                                                setWorkStatus(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Status</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workpriority' className='lablesection color3 text-start mb-1'>
                                            Work Priority <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workPriority" aria-label="Floating label select example" value={workPriority}
                                            onChange={(event) => {
                                                setWorkPriority(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Priority</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                {/* second line */}
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                            Work Category <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="workCategory" aria-label="Floating label select example" value={workCategory}
                                            onChange={(event) => {
                                                setWorkCategory(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Work Category</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Work Category Discription<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='workCategoryDiscription'
                                            value={workCategoryDiscription}
                                            onChange={e => {
                                                setWorkCategoryDiscription(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Work Category Discription'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                    {/* Third line */}
                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                            Work Description<span className="star">*</span>
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription"></textarea>
                                          
                                        </div>
                                    </div>
                                </div>
                                </div>

                                <hr className='color3 line' />
                                {/* forth row */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='failurecode' className='lablesection color3 text-start mb-1'>
                                        Failure Code <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example" value={failureCode}
                                            onChange={(event) => {
                                                setFailureCode(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Failure Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="failureCodeDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                 Failure Code Description<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='failurecodediscription'
                                            value={failureDiscriptionCode}
                                            onChange={e => {
                                                setFailureDiscriptionCode(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Work Category Discription'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                {/* fifth row  */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='solutioncode' className='lablesection color3 text-start mb-1'>
                                        Solution Code <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example" value={solutionCode}
                                            onChange={(event) => {
                                                setsolutionCode(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Solution Code</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="solutioncodeDisctiption"
                                                className="lablesection color3 text-start mb-1">
                                                 Solution Code Description<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='solutioncodeDisctiption'
                                            value={solutionCodeDiscription}
                                            onChange={e => {
                                                setsolutionCodeDiscription(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Enter Solution Code Discription'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                {/* sixth row */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='empoyeeid' className='lablesection color3 text-start mb-1'>
                                        Assign to Employee <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="empoyeeid" aria-label="Floating label select example" value={assignEmployee}
                                            onChange={(event) => {
                                                setAssignEmployee(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Employee ID</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="employeename"
                                                className="lablesection color3 text-start mb-1">
                                                 Employee Name<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='employeename'
                                            value={EmployeeName}
                                            onChange={e => {
                                                setEmployeeName(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Employee Name'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Seventh row  */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                            Appiontment Date/Time<span className="star">*</span>
                                        </label>
                                            <input type="datetime-local" id="apaintmentdate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='scheduledate' className='lablesection color3 text-start mb-1'>
                                            Scheduled Date/Time<span className="star">*</span>
                                        </label>
                                            <input type="datetime-local" id="apaintmentdate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                </div>
                                {/* Eight row */}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='startdate' className='lablesection color3 text-start mb-1'>
                                            Start Date/Time<span className="star">*</span>
                                        </label>
                                            <input type="datetime-local" id="startdate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='endDate' className='lablesection color3 text-start mb-1'>
                                            End Date/Time<span className="star">*</span>
                                        </label>
                                            <input type="datetime-local" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='totaldays' className='lablesection color3 text-start mb-1'>
                                            Total days<span className="star">*</span>
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='totalhours' className='lablesection color3 text-start mb-1'>
                                            Total hours<span className="star">*</span>
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='totalminutes' className='lablesection color3 text-start mb-1'>
                                            Total Minutes<span className="star">*</span>
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className='emailsection d-grid my-2'>
                                        <label htmlFor='costofwork' className='lablesection color3 text-start mb-1'>
                                            Cost of Work<span className="star">*</span>
                                        </label>
                                            <input type="number" id="endDate"   name="birthdaytime" className='rounded inputsection py-2' />

                                
                                    </div>
                                </div>
                                </div>
                                {/* Ninth Row*/}
                                <div className="row mx-auto formsection">
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                    <div className='emailsection position-relative d-grid my-2'>
                                        <label htmlFor='completeemployee' className='lablesection color3 text-start mb-1'>
                                        Completed By Employee <span className="star">*</span>
                                        </label>
                                        <select className='rounded inputsectiondropdpwn color2 py-2' id="completeemploye" aria-label="Floating label select example" value={completeEmployee}
                                            onChange={(event) => {
                                                setcompleteEmployee(event.target.value)
                                            }}>
                                            <option selected className='inputsectiondropdpwn'>Select Employee ID</option>
                                            <option value={"First"}>One</option>
                                            <option value={"Second"}>Two</option>
                                            <option value={"three"}>Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="employeename"
                                                className="lablesection color3 text-start mb-1">
                                                 Employee Name<span className="star">*</span>
                                            </label>
                                            <input
                                            types='text'
                                            id='employeename'
                                            value={CompleteEmployeeName}
                                            onChange={e => {
                                                setCompleteEmployeeName(e.target.value)
                                            }}
                                            className='rounded inputsection py-2'
                                            placeholder='Employee Name'
                                            required
                                        ></input>
                                                                                <p
                                            className='position-absolute text-end serachicon'
                                        >
                                            <SearchOutlined className=' serachicon' />
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                <button type="button" class="border-0 px-3  savebtn py-2"><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                <button type="button" class="border-0 px-3  savebtn py-2"><SaveIcon className='me-2'/>SAVE</button>
                            </div>
                            </div>              
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default WorkOrder;
