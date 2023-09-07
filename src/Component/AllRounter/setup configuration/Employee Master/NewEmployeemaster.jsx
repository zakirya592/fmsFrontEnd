import React,{ useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Siderbar from "../../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Printer from "../../../../Image/printer.jpeg"
import Barcode from "../../../../Image/barcode.png"
import Camera1 from "../../../../Image/camera 1.png"
import BrowserFolder from "../../../../Image/browsefolder 3.png"
import { useNavigate, useParams } from 'react-router-dom';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import axios from 'axios';
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";
import SaveIcon from '@mui/icons-material/Save';

function NewEmployeemaster() {

    const navigate = useNavigate();

    function getCurrentJoiningDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const [EmployeeImage, setEmployeeImage] = useState()

    const [value, setvalue] = useState({
        EmployeeID: '', EmployeeStatus: '',
        Age: '', BirthDate:'0',
        Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
        DepartmentCode: '', Departmentname: '',//Department api input 
        BuildingCode: '', //AddBuildingInworkRequestPOST api input
        LocationCode: '',// //AddLocationInworkRequestPOST api input
        MaritalStatus: '',
        Gender: '',
        Title: '',
        RequestNumber: '', workTrade: '',// RequestNumber
        NationalityCode: '', NationalityDescription: '',
        NationalIQAMANumber: '', PassportNumber: '',
        DesignationCode: '', DesignationName: '', Email: '',
        JoiningDate: getCurrentJoiningDate(),
    })

    const BirthDateChange = (e) => {
        setvalue((prevValue) => ({
            ...prevValue,
            BirthDate: e.target.value,
        }));
    };
    

    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownMeritalStatus, setdropdownMeritalStatus] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [dropdownGender, setdropdownGender] = useState([])
    const [dropdownTitle, setdropdownTitle] = useState([])
    const [dropdownNationality, setdropdownNationality] = useState([]);
    const [dropdownDesignation, setdropdownDesignation] = useState([]);

    // Work Employes ID  Api
    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                console.log('Work Request Number Api', res.data.recordset[0]);
                // const reqput = res.data.recordset[0].EmployeeID + 1;
                const reqput = res.data.recordset[0].EmployeeID;
                // const reqput=1000
                let formattedRequestNumber;
                if (reqput >= 1 && reqput <= 9) {
                    formattedRequestNumber = `000${reqput}`;
                } else if (reqput >= 10 && reqput <= 99) {
                    formattedRequestNumber = `00${reqput}`;
                } else if (reqput >= 100 && reqput <= 999) {
                    formattedRequestNumber = `0${reqput}`;
                } else if (reqput >= 1000 && reqput <= 9999) {
                    formattedRequestNumber = `${reqput}`;
                } else {
                    formattedRequestNumber = `${reqput}`;
                }
                // localStorage.setItem('Requestnumbers', reqput)
                setvalue(prevState => ({ ...prevState, EmployeeID: formattedRequestNumber }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        Requestnumberapi()
    }, [])

    const requestincreas = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                console.log('Work Request Number Api', res.data.recordset[0].EmployeeID);
                const reqput = res.data.recordset[0].EmployeeID + 1;
                // localStorage.setItem('Requestnumbers', reqput)
                axios.put(`/api/EmployeeIDCount_Put/1`, {
                    EmployeeID: reqput
                })
                    .then((res) => {
                        console.log('Work Request Number put Api', res.data);
                        const reqput = res.data.recordset[0].EmployeeID + 1;
                        setvalue(prevState => ({ ...prevState, EmployeeID: '000-000-' + '0' + `${reqput}` }));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
        // Gender
        axios.get(`/api/Gender_GET_LIST`)
            .then((res) => {
                setdropdownGender(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Gender API error:", err);
            });
        // Title
        axios.get(`api/Title_GET_LIST`)
            .then((res) => {
                setdropdownTitle(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Gender API error:", err);
            });
        // Fetch Designation
        axios.get(`/api/Designation_GET_LIST`)
            .then((res) => {
                setdropdownDesignation(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Designation API error:", err);
            });

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
        // marital statement 
        axios.get(`/api/MaritalStatus_GET_LIST`)
            .then((res) => {
                setdropdownMeritalStatus(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Marital Status API error:", err);
            });
        axios.get(`/api/Nationality_GET_LIST`)
            .then((res) => {
                setdropdownNationality(res.data.recordsets[0]);
            })
            .catch((err) => {
                console.error("Nationality API error:", err);
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
    const [selectedFile, setSelectedFile] = useState(null);


    function handleChangeback(e) {
        setEmployeeImage(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('EmployeeID', value.EmployeeID);
    formData.append('Gender', value.Gender);
    formData.append('Title', value.Title);
    formData.append('BirthDate', value.BirthDate);
    formData.append('Age', value.Age);
    formData.append('Lastname', value.Lastname);
    formData.append('Middlename', value.Middlename);
    formData.append('Firstname', value.Firstname);
    formData.append('NationalityCode', value.NationalityCode);
    formData.append('MaritalStatus', value.MaritalStatus);
    formData.append('NationalID', value.NationalID);
    formData.append('PassportNumber', value.PassportNumber);
    formData.append('MobileNumber', value.MobileNumber);
    formData.append('LandlineNumber', value.LandlineNumber);
    formData.append('DesignationCode', value.DesignationCode);
    formData.append('Email', value.Email);
    formData.append('DepartmentCode', value.DepartmentCode);
    formData.append('BuildingCode', value.BuildingCode);
    formData.append('LocationCode', value.LocationCode);
    formData.append('JoiningDate', value.JoiningDate);
    formData.append('EmployeeImage', EmployeeImage);
    

    const addemploymaster = async () => {
        axios.post(`/api/EmployeeMaster_post`, formData)
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Employee Master ${value.EmployeeID} has been created successfully`,
                    'success'
                )
                navigate('/Employeemaster')
                requestincreas()

            })
            .catch((err) => {
                console.log(err);
                const statuss = err.response.status

                if (statuss == 404) {
                    Swal.fire(
                        'Error!',
                        'EmployeeID is required  ',
                        'error'
                    )
                }
                else if (statuss == 500) {
                    Swal.fire(
                        'Error!',
                        `This EmployeeID Already exit`,
                        'error'
                    )
                }
                // else {
                //     Swal.fire(
                //         'Error!',
                //         `${err.response.message}`,
                //         'error'
                //     )
                // }
            });

    };

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
                                        Create Set-Up-Employee Master

                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">
                                  

                                    <div className="printerPic col-sm-12 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="row">
                                            <div className="col">
                                                {/* <img src={Printer} alt="" className="printerpic" /> */}
                                                <img src={selectedFile ? URL.createObjectURL(selectedFile) : Printer} alt="" className="printerpic" />
                                            </div>
                                            <div className="col">
                                                <img src={Barcode} alt="" className="barcodepic" />
                                            </div>
                                        </div>

                                        <div className="row " htmlFor="file-inputs">
                                            {/* <div className="col camera1"> */}
                                                {/* <img src={Camera1} alt="" /> */}
                                                <label htmlFor="file-inputs">
                                                    <img src={BrowserFolder} />
                                                </label>
                                                {/* <img src={selectedFile ? URL.createObjectURL(selectedFile) : Camera1} alt="" /> */}
          <input
                                                    id="file-inputs"
                                                    type="file"
                                                    onChange={handleChangeback}
                                                    style={{ display: 'none' }}
                                                />

                                            {/* </div> */}
                                            {/* <div className="col">
                                                <img src={BrowserFolder} alt="" className="browserfolder" />
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className='emailsection position-relative d-grid my-2'>
                                                    <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                        Employee Number
                                                    </label>

                                                    <input
                                                        types='text'
                                                        id='EmployeeID'
                                                        value={value.EmployeeID}
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
                                                        Gender
                                                    </label>
                                                    <select
                                                        className='rounded inputsectiondropdpwn color2 py-2'
                                                        id="Gender"
                                                        aria-label="Floating label select example"
                                                        value={value.Gender}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                Gender: e.target.value
                                                            }))
                                                        }}
                                                        suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                                    >
                                                        <option className='px-4 mx-4' value=''>Select Gender</option>
                                                        {dropdownGender.map((item, index) => (
                                                            <option key={index} value={item.GenderDesc}>{item.GenderDesc}</option>
                                                        ))}
                                                    </select>




                                                </div>

                                                <div className='emailsection position-relative mx-2 d-grid my-2'>
                                                    <label htmlFor='Title' className='lablesection color3 text-start mb-1'>
                                                        Title
                                                    </label>
                                                    <select
                                                        className='rounded inputsectiondropdpwn color2 py-2'
                                                        id="Title"
                                                        aria-label="Floating label select example"
                                                        value={value.Title}
                                                        onChange={e => {
                                                            setvalue(prevValue => ({
                                                                ...prevValue,
                                                                Title: e.target.value
                                                            }))
                                                        }}
                                                        suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                                    >
                                                        <option className='px-4 mx-4' value=''>Select Title</option>
                                                        {dropdownTitle.map((item, index) => (
                                                            <option key={index} value={item.TitleCode}>{item.TitleCode}</option>
                                                        ))}
                                                    </select>


                                                </div>

                                                <div className='emailsection position-relative mx-2 d-grid  my-2'>
                                                    <label htmlFor='Age' className='lablesection color3 text-start mb-1'>
                                                        Age
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
                                                    <label htmlFor='BirthDate' className='lablesection color3 text-start mb-1'>
                                                        Birth Date
                                                    </label>
                                                    <input type="date" id="BirthDate"
                                                        value={value.BirthDate}
                                                        // onChange={e => {
                                                        //     setvalue(prevValue => ({
                                                        //         ...prevValue,
                                                        //         BirthDate: e.target.value
                                                        //     }))
                                                        // }}
                                                        onChange={BirthDateChange}
                                                        name="birthdaytime" className='rounded inputsection py-2'  />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Firstname' className='lablesection color3 text-start mb-1'>
                                                First Name
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
                                                Middle Name
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
                                                Last Name
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
                                                Nationality Code
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id="NationalityCode"
                                                aria-label="Floating label select example"
                                                value={value.NationalityCode}
                                                onChange={e => {
                                                    const selectedCode = e.target.value;
                                                    const selectedDescription = dropdownNationality.find(item => item.NationalityCode === selectedCode)?.NationalityDesc || '';

                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        NationalityCode: selectedCode,
                                                        NationalityDescription: selectedDescription
                                                    }));
                                                }}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='' value=''>Select Nationality Code</option>
                                                {dropdownNationality.map((item, index) => (
                                                    <option key={index} value={item.NationalityCode}>{item.NationalityCode}</option>
                                                ))}
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
                                                type='text'
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
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='MaritalStatus' className='lablesection color3 text-start mb-1'>
                                                Marital Status
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id="MaritalStatus"
                                                aria-label="Floating label select example"
                                                value={value.MaritalStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        MaritalStatus: e.target.value
                                                    }))
                                                }}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='' value=''>Select Marital Status</option>
                                                {dropdownMeritalStatus.map((item, index) => (
                                                    <option key={index} value={item.MaritalDesc}>{item.MaritalDesc}</option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='NationalIQAMANumber' className='lablesection color3 text-start mb-1'>
                                                National/IQAMA Number
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
                                                Passport Number
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
                                                Mobile Number
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
                                                Landline Number
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
                                                Designation Code
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id="Designationcode"
                                                aria-label="Floating label select example"
                                                value={value.DesignationCode}
                                                onChange={e => {
                                                    const selectedCode = e.target.value;
                                                    const selectedDescription = dropdownDesignation.find(item => item.DesignationCode === selectedCode)?.DesignationDesc || '';

                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        DesignationCode: selectedCode,
                                                        DesignationName: selectedDescription
                                                    }));
                                                }}
                                                suffixIcon={<CaretDownOutlined style={{ color: 'red' }} />}
                                            >
                                                <option className='' value=''>Select Designation Code</option>
                                                {dropdownDesignation.map((item, index) => (
                                                    <option key={index} value={item.DesignationCode}>{item.DesignationCode}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-7 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="DesignationName"
                                                className="lablesection color3 text-start mb-1">
                                                Designation Name
                                            </label>
                                            <input
                                                type='text'
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
                                            />
                                        </div>
                                    </div>


                                    <div className="col-sm-7 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="EmailAddress"
                                                className="lablesection color3 text-start mb-1">
                                                Email Address
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
                                                Department Code
                                            </label>
                                            <select
                                                className='rounded inputsectiondropdpwn color2 py-2'
                                                id='DepartmentCode'
                                                aria-label='Floating label select example'
                                                value={value.DepartmentCode}
                                                onChange={handleProvinceChange}
                                            >
                                                <option value='not Selected Select Dept Code'>Select Dept Code</option>
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
                                                Department Name
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
                                                Building
                                            </label>
                                            <select className='roundedinputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}

                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option value='Select Building'>Select Building</option>
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
                                                Location
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example" value={value.LocationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn' value='Select Location'>Select Location</option>
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
                                                Joining Date
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
                                    <button type="button" className="border-0 px-3 savebtn py-2" onClick={addemploymaster}>
                                        <SaveIcon className="me-2" />
                                        SAVE
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Box>
                </div>
            </div>
        </>
    );
}

export default NewEmployeemaster;
