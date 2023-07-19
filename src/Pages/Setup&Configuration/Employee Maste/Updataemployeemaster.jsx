import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Printer from "../../../Image/printer.jpeg"
import Barcode from "../../../Image/barcode.png"
import Camera1 from "../../../Image/camera 1.png"
import BrowserFolder from "../../../Image/browsefolder 3.png"
import { useNavigate, useParams } from 'react-router-dom';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import axios from 'axios';
import PhoneInput from "react-phone-number-input";
import "./Employee.css"
import Swal from "sweetalert2";
import SaveIcon from '@mui/icons-material/Save';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Updataemployeemaster() {

    let { userId } = useParams();
    const navigate = useNavigate();

    const [value, setvalue] = useState({
        EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
        DepartmentCode: 'Select Dept Code', Departmentname: '',//Department api input 
        BuildingCode: 'Select Building', //AddBuildingInworkRequestPOST api input
        LocationCode: 'Select Location',// //AddLocationInworkRequestPOST api input
        RequestNumber: '', workTrade: '',// RequestNumber
        EmployeeStatus: '',
        Gender: 'Gender', Title: '', Age: '',
        NationalityCode: '', MaritalStatus: '', NationalityDescription: '',
        NationalIQAMANumber: '', PassportNumber: '',
        DesignationCode: '', DesignationName: '', Email: '',
        JoiningDate: '',
    })

    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])

    const getapi = () => {
        axios.get(`/api/EmployeeMaster_GET_BYID/${userId}`, {
        },)
            .then((res) => {
                console.log('TO Assets Master By ID', res.data);
                const {
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                    EmployeeID,
                    EmployeeStatus,
                    Email,
                    NationalID,
                    PassportNumber,
                    DesignationCode,
                    Title,
                    Gender,
                    Age
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    EmployeeStatus,
                    EmployeeID,
                    Firstname,
                    Lastname,
                    Middlename,
                    Email,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                    NationalID,
                    PassportNumber,
                    DesignationCode,
                    Title,
                    Gender,
                    Age
                }));
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        //// console.log(err);;
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    useEffect(() => {
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            // console.log("Loaction list", res.data.recordset);
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                // console.log(err);;
            });
        // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownDepartmentLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                //// console.log(err);;
            });
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            // console.log("dropdownBuilding LIST", res.data.recordset);
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                // console.log(err);;
            });
    }, [])
    // Department
    const [DeptDesc, setDeptDesc] = useState([])
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: e.target.value,
        }));
        axios.get(`/api/Department_desc_LIST/${Deptnale}`)
            .then((res) => {
                // console.log(res.data);
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const postapi = (e) => {
        axios.put(`/api/EmployeeMaster_Put/${userId}`, {
            EmployeeStatus: value.EmployeeStatus,
            Gender: value.Gender,
            Title: value.Title,
            BirthDate: value.BirthDate,
            Age: value.Age,
            Lastname: value.Lastname,
            Middlename: value.Middlename,
            Firstname: value.Firstname,
            NationalityCode: value.NationalityCode,
            MaritalStatus: value.MaritalStatus,
            NationalID: value.NationalID,
            PassportNumber: value.PassportNumber,
            MobileNumber: value.MobileNumber,
            LandlineNumber: value.LandlineNumber,
            DesignationCode: value.DesignationCode,
            Email: value.Email,
            DepartmentCode: value.DepartmentCode,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            JoiningDate: value.JoiningDate
        },)
            .then((res) => {
                console.log('Add', res.data);
                Swal.fire(
                    'Updata!',
                    ' You have successfully updated.',
                    'success'
                ).then(() => {
                    navigate(`/Employeemaster`);
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error(`You will not Updata the Date ${err.data}`, {
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/Employeemaster')} />
                                    <p className="text-center my-auto ms-5">Set-Up & Configuration</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                       Updata Set-Up-Employee Master
                                        <span className="star">*</span>
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="row">
                                            <div className="col">
                                                <img src={Printer} alt="" className="printerpic" />
                                            </div>
                                            <div className="col">
                                                <img src={Barcode} alt="" className="barcodepic" />
                                            </div>
                                        </div>

                                        <div className="row ">
                                            <div className="col camera1">
                                                <img src={Camera1} alt="" />
                                            </div>
                                            <div className="col">
                                                <img src={BrowserFolder} alt="" className="browserfolder" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className='emailsection position-relative d-grid my-2'>
                                                    <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                        Employee Number<span className='star'>*</span>
                                                    </label>

                                                    <input
                                                        types='text'
                                                        id='EmployeeID'
                                                        value={value.EmployeeID}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                EmployeeID: e.target.value
                                                            }))
                                                        }}
                                                        className='rounded inputsection py-2'
                                                        placeholder='Enter Employee Number'
                                                        required
                                                    ></input>
                                                    <p
                                                        className='position-absolute text-end serachicon'
                                                    >
                                                        <SearchOutlined className=' serachicon' />
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="d-flex">
                                                <div className='emailsection position-relative d-grid mx-2 my-2'>
                                                    <label htmlFor='Gender' className='lablesection color3 text-start mb-1'>
                                                        Gender<span className='star'>*</span>
                                                    </label>
                                                    <select className='rounded inputsectiondropdpwn color2 py-2' id="Gender" aria-label="Floating label select example" value={value.Gender}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                Gender: e.target.value
                                                            }))
                                                        }}
                                                        // dropdownIcon={<CaretDownOutlined />}
                                                        suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                                    >
                                                        <option className='px-4 mx-4' value={value.Gender}>{value.Gender}</option>
                                                        <option className='px-4 mx-4' value='Male'>Male</option>
                                                        <option className='px-4 mx-4' value='Female'>FeMale</option>
                                                        <option className='px-4 mx-4' value='other'>Other</option>

                                                    </select>

                                                </div>

                                                <div className='emailsection position-relative mx-2 d-grid my-2'>
                                                    <label htmlFor='Title' className='lablesection color3 text-start mb-1'>
                                                        Title<span className='star'>*</span>
                                                    </label>
                                                    <select className='rounded inputsectiondropdpwn color2 py-2' id="Title" aria-label="Floating label select example" value={value.Title}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                Title: e.target.value
                                                            }))
                                                        }}
                                                        // dropdownIcon={<CaretDownOutlined />}
                                                        suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                                    >
                                                        <option className='px-4 mx-4' value={value.Title}>{value.Title}</option>

                                                        <option className='px-4 mx-4' value='ms'>MS</option>
                                                        <option className='px-4 mx-4' value='FeMale'>FeMale</option>

                                                    </select>

                                                </div>

                                                <div className='emailsection position-relative mx-2 d-grid  my-2'>
                                                    <label htmlFor='Age' className='lablesection color3 text-start mb-1'>
                                                        Age<span className='star'>*</span>
                                                    </label>

                                                    <input
                                                        types='text'
                                                        id='Age'
                                                        value={value.Age}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                Age: e.target.value
                                                            }))
                                                        }}
                                                        className='rounded inputsection py-2'
                                                        placeholder='Enter Age '
                                                        required
                                                    ></input>
                                                </div>

                                                <div className='emailsection  mx-2  w-100 my-2'>
                                                    <label htmlFor='JoiningDate' className='lablesection color3 text-start mb-1'>
                                                        Birth Date<span className='star'>*</span>
                                                    </label>
                                                    <input type="date" id="JoiningDate"

                                                        value={value.JoiningDate}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                JoiningDate: e.target.value
                                                            }))
                                                        }}
                                                        name="birthdaytime" className='rounded inputsection py-2' />
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    {/* change the value for the request status  */}
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='RequestStatus' className='lablesection color3 text-start mb-1'>
                                                Employee Status<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="RequestStatus" aria-label="Floating label select example" value={value.RequestStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestStatus: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className=''>{value.EmployeeStatus}</option>
                                                <option value='open'>Open</option>
                                                <option value='Closed'>Closed</option>
                                                <option value='Cancelled'>Cancelled</option>

                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Firstname' className='lablesection color3 text-start mb-1'>
                                                First Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Firstname'
                                                value={value.Firstname}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Firstname: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter First Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Middlename' className='lablesection color3 text-start mb-1'>
                                                Middle Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Middlename'
                                                value={value.Middlename}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Middlename: e.target.value
                                                    }))
                                                }}

                                                className='rounded inputsection py-2'
                                                placeholder='Enter Middle Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Lastname' className='lablesection color3 text-start mb-1'>
                                                Last Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Lastname'
                                                value={value.Lastname}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Lastname: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Last Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    {/* change the value for the request status  */}
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='NationalityCode' className='lablesection color3 text-start mb-1'>
                                                Nationality Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="NationalityCode" aria-label="Floating label select example" value={value.NationalityCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        NationalityCode: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='' value='dfd'>Select Nationality Code</option>

                                                <option value='12'> 12</option>

                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-sm-7 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="NationalityDescription"
                                                className="lablesection color3 text-start mb-1">
                                                Nationality Description<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='NationalityDescription'
                                                value={value.NationalityDescription}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        NationalityDescription: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Nationality Description'
                                                required
                                            ></input>

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='MaritalStatus' className='lablesection color3 text-start mb-1'>
                                                Marital Status <span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="MaritalStatus" aria-label="Floating label select example" value={value.MaritalStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        MaritalStatus: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='' value=''>Select Marital Status </option>

                                                <option value='22'>22</option>

                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='NationalIQAMANumber' className='lablesection color3 text-start mb-1'>
                                                National/IQAMA Number<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='NationalIQAMANumber'
                                                value={value.NationalID}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        NationalID: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='xxxxxxxxxxxxxxxx'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='PassportNumber' className='lablesection color3 text-start mb-1'>
                                                Passport Number<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='PassportNumber'
                                                value={value.PassportNumber}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        PassportNumber: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='xxxxxxxxxxxxxxxx'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                {/* Row Three */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='MobileNumber' className='lablesection color3 text-start mb-1'>
                                                Mobile Number<span className='star'>*</span>
                                            </label>

                                            <PhoneInput
                                                placeholder="+966   500000000"
                                                id='MobileNumber'
                                                value={value.MobileNumber}
                                                onChange={(phoneNumber) =>
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        MobileNumber: phoneNumber,
                                                    }))
                                                }
                                                className='rounded inputsection custom-phone-input py-2'
                                                defaultCountry="SA"
                                                dropdownClass='custom-phone-dropdown'
                                            />

                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Landlinenumber' className='lablesection color3 text-start mb-1'>
                                                Landline Number<span className='star'>*</span>
                                            </label>

                                            <PhoneInput
                                                placeholder="+966  0100000000"
                                                id='Landlinenumber'
                                                value={value.LandlineNumber}
                                                onChange={(LandlineNumber) =>
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        LandlineNumber: LandlineNumber,
                                                    }))
                                                }
                                                className='rounded inputsection py-2'
                                                defaultCountry="SA" />

                                        </div>
                                    </div>
                                </div>

                                {/* Break Line */}
                                <hr className='color3 line' />
                                <div className="row mx-auto formsection">
                                    {/* change the value for the request status  */}
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Designationcode' className='lablesection color3 text-start mb-1'>
                                                Designation Code<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn   color2 py-2' id="Designationcode" aria-label="Floating label select example" value={value.DesignationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        DesignationCode: e.target.value
                                                    }))
                                                }}
                                                // dropdownIcon={<CaretDownOutlined />}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='' value='dfd'>{value.DesignationCode}</option>

                                                <option value='Nationality12'>Nationality Code 12</option>

                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-sm-7 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="DesignationName"
                                                className="lablesection color3 text-start mb-1">
                                                Designation Name<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='DesignationName'
                                                value={value.DesignationName}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        DesignationName: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Designation Name'
                                                required
                                            ></input>

                                        </div>
                                    </div>

                                    <div className="col-sm-7 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="EmailAddress"
                                                className="lablesection color3 text-start mb-1">
                                                Email Address <span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmailAddress'
                                                value={value.Email}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Email: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter your Email Address '
                                                required
                                            ></input>

                                        </div>
                                    </div>


                                </div>
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='DepartmentCode' className='lablesection color3 text-start mb-1'>
                                                Department Code<span className='star'>*</span>
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id='DepartmentCode'
                                                aria-label='Floating label select example'
                                                value={value.DepartmentCode}
                                                onChange={handleProvinceChange}
                                            >
                                                <option value={value.DepartmentCode}>{value.DepartmentCode}</option>
                                                {
                                                    dropdownDepartmentLIST && dropdownDepartmentLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.DepartmentCode}>{itme.DepartmentCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Departmentname' className='lablesection color3 text-start mb-1'>
                                                Department Name<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Departmentname'
                                                value={DeptDesc}

                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         Departmentname: e.target.value
                                                //     }))
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Department Name'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Building' className='lablesection color3 text-start mb-1'>
                                                Building<span className='star'>*</span>
                                            </label>
                                            <select className='roundedinputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option value={value.BuildingCode}>{value.BuildingCode}</option>
                                                {
                                                    dropdownBuildingLIST && dropdownBuildingLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.BuildingCode}>{itme.BuildingCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='Location' className='lablesection color3 text-start mb-1'>
                                                Location<span className='star'>*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" value={value.LocationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value={value.LocationCode}>{value.LocationCode}</option>
                                                {
                                                    dropdownLocation && dropdownLocation.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.LocationCode}>{itme.LocationCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='JoiningDate' className='lablesection color3 text-start mb-1'>
                                                Joining Date<span className='star'>*</span>
                                            </label>
                                            <input type="date" id="JoiningDate"

                                                value={value.JoiningDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        JoiningDate: e.target.value
                                                    }))
                                                }}
                                                name="birthdaytime" className='rounded inputsection py-2' />
                                        </div>

                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => navigate('/Employeemaster')}>
                                        <ArrowCircleLeftOutlinedIcon className="me-2" />
                                        Back
                                    </button>
                                    <button type="button" className="border-0 px-3 savebtn py-2" onClick={postapi}>
                                        <SaveIcon className="me-2" />
                                        SAVE
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Box>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Updataemployeemaster;
