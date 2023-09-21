import React, { useState, useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import Printer from "../../../Image/printer.jpeg"
import Barcode from "../../../Image/barcode.png"
import BrowserFolder from "../../../Image/browsefolder 3.png"
function Createtransaction() {
    const navigate = useNavigate();
    const [assetTypeDiscription, setassetTypeDiscription] = useState("");
    const [assetSubCategoryDiscription, setassetSubCategoryDiscription] = useState("");
    const [manufacturer, setmanufacturer] = useState("");
    const [Model, setModel] = useState("");
    const [Brand, setBrand] = useState("");

    const [value, setvalue] = useState({
        DepartmentCode: '', Departmentname: '', BuildingCode: '', AssetCategory: '', AssetSubCategory:'',
        Unites: '', UnitesDescription: "",
        AssetType: '', SerialNumber: '', LocationCode: '',
        EmployeeID: null, Firstname: '', AssetItemDescription: '', AssetItemTagID: '', AssetCondition: '', AssetCondition: '', AssetItemGroup:'',
    })

    const [assetCategorylist, setassetCategorylist] = useState("");
    const [AssetItemGrouplist, setAssetItemGrouplist] = useState("");
    const [AssetitemGroupDescription, setAssetitemGroupDescription] = useState("");
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [listAssetCondition, setlistAssetCondition] = useState([])

    useEffect(() => {
        // AssetCondition_GET_LIST
        axios.get(`/api/AssetCondition_GET_LIST`).then((res) => {
            console.log('======', res.data);
            setlistAssetCondition(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`/api/AssetType_GET_LIST`).then((res) => {
            setassetTypelist(res.data.recordsets[0])
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });

        axios.get(`/api/AssetCategory_GET_LIST`).then((res) => {
            setassetCategorylist(res.data.recordsets[0])
            //  console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/AssetSubCategory_GET_LIST`).then((res) => {
            setassetSubCategorylist(res.data.recordsets[0])
            //  console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/AssetItemGroup_GET_LIST`).then((res) => {
            setAssetItemGrouplist(res.data.recordsets[0])
            console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
        // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
            setdropdownDepartmentLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Location_LIST
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const [assetTypelist, setassetTypelist] = useState("");
    const [assetCategoryDiscription, setassetCategoryDiscription] = useState("");
    const [assetSubCategorylist, setassetSubCategorylist] = useState("");
    // handleProvinceChangeassetType
    const handleProvinceChangeassetType = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetType: e.target.value,
        }));
        axios.get(`/api/AssetType_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setassetTypeDiscription(res.data.recordset[0].AssetTypeDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
        axios.get(`/api/AssetType_GET_BYAssetType/${Deptnale}`)
            .then((res) => {
                console.log('-----:++++++====', res.data);
                setmanufacturer(res.data.recordset[0].Manufacturer)
                setModel(res.data.recordset[0].Model)
                setBrand(res.data.recordset[0].Brand)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
    // handleProvinceChangeasassetCategory
    const handleProvinceChangeasassetCategory = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetCategory: e.target.value,
        }));
        axios.get(`/api/AssetCategory_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setassetCategoryDiscription(res.data.recordset[0].AssetCategoryDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
    // AssetSubCategory_GET_BYID
    const handleProvinceChangeassetSubCategory = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetSubCategory: e.target.value,
        }));
        axios.get(`/api/AssetSubCategory_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setassetSubCategoryDiscription(res.data.recordset[0].AssetSubCategoryDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
    // handleProvinceChangeAssetItemGroup
    const handleProvinceChangeAssetItemGroup = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetItemGroup: e.target.value,
        }));
        axios.get(`/api/AssetItemGroup_GET_BYID/${Deptnale}`)
            .then((res) => {
                setAssetitemGroupDescription(res.data.recordset[0].AssetItemGroupCodeDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }
    // Department
    const [DeptDesc, setDeptDesc] = useState('')
    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: e.target.value,
        }));
        axios.get(`/api/Department_desc_LIST/${Deptnale}`)
            .then((res) => {
                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Employe ID
    const [unitCode, setUnitCode] = useState([]);
    const [dropname, setdropname] = useState([])
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [hsLoaderOpen, setHsLoaderOpen] = useState(false);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const abortControllerRef = useRef(null);

    useEffect(() => {

        // const handleOnBlurCall = () => {

        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                const unitNameList = data.map((unitData) => unitData?.EmployeeID);
                const NAmese = data.map((namedata) => namedata?.Firstname);
                // setdropname(NAmese)
                setdropname(data)
                setUnitCode(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])
    // EmployeeID
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {

            const {
                Firstname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
            }));
            console.log('-------------------', res.data.recordsets[0][0]);
            const Depauto = res.data.recordsets[0][0].DepartmentCode
            console.log('-------------------------------------------', Depauto);
            axios.get(`/api/Department_desc_LIST/${Depauto}`)
                .then((res) => {
                    setDeptDesc(res.data.recordset[0].DepartmentDesc)
                })
                .catch((err) => {
                    console.log(err);;
                });
        })
            .catch((err) => {
                //// console.log(err);;
            });
    }
    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)
        if (reason === 'reset' || reason === 'clear') {
            setGpcList([]); // Clear the data list if there is no input
            setUnitCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setGpcList([]);
            setUnitCode([])
            return;
        }
        if (newInputValue === null) {

            // perform operation when input is cleared
            setGpcList([]);
            setUnitCode([])
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoading(true);
        setOpen(true);
        try {
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            // Create a new AbortController
            abortControllerRef.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCode(data ?? [])
                    setOpen(true);
                    setAutocompleteLoading(false);
                    // 
                })
                .catch((error) => {
                    console.log('-----', error);

                }
                );

        }


        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setvalue(prevValue => ({
                    ...prevValue,
                    EmployeeID: []
                }))
                setAutocompleteLoading(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCode([])
            setOpen(false);
            setAutocompleteLoading(false);
        }

    }

    const handleGPCAutoCompleteChange = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === ' -') {
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }));
        }
        if (value && value.EmployeeID) {
            postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: value.EmployeeID,
                Firstname: value.Firstname
            }));
            console.log('Received value----------:', value.EmployeeID);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }


    const [imageshow, setimageshow] = useState()
    // Assign to Employee Logic.
    function getAssetItemDescriptionapi(AssetItemDescription) {
        axios.get(`/api/AssetsMaster_GET_BYID/${AssetItemDescription}`).then((res) => {
            console.log('-----',res.data);

            console.log(res.data.recordset[0].AssetImage);
            const AssetType=res.data.recordset[0].AssetType
            const AssetItemGroup = res.data.recordset[0].AssetItemGroup
            const AssetCategory = res.data.recordset[0].AssetCategory
            const AssetSubCategory = res.data.recordset[0].AssetSubCategory
            setvalue((prevValue) => ({
                ...prevValue,
                AssetType: AssetType,
                AssetItemGroup: AssetItemGroup,
                AssetCategory: AssetCategory,
                AssetSubCategory: AssetSubCategory,
            }));
            setmanufacturer(res.data.recordset[0].Manufacturer)
            setModel(res.data.recordset[0].Model)
            setBrand(res.data.recordset[0].Brand)
            setimageshow(res.data.recordset[0].AssetImage)

            // AssetItemGroup_GET_BYID
            axios.get(`/api/AssetItemGroup_GET_BYID/${AssetItemGroup}`)
                .then((res) => {
                    setAssetitemGroupDescription(res.data.recordset[0].AssetItemGroupCodeDesc)

                })
                .catch((err) => {
                    console.log(err);;
                });
            // AssetType_GET_BYID
            axios.get(`/api/AssetType_GET_BYID/${AssetType}`)
                .then((res) => {
                    setassetTypeDiscription(res.data.recordset[0].AssetTypeDesc)

                })
                .catch((err) => {
                    console.log(err);;
                });
            // AssetCategory_GET_BYID
            axios.get(`/api/AssetCategory_GET_BYID/${AssetCategory}`)
                .then((res) => {
                    setassetCategoryDiscription(res.data.recordset[0].AssetCategoryDesc)

                })
                .catch((err) => {
                    console.log(err);;
                });
            // AssetSubCategory_GET_BYID
            axios.get(`/api/AssetSubCategory_GET_BYID/${AssetSubCategory}`)
                .then((res) => {
                    setassetSubCategoryDiscription(res.data.recordset[0].AssetSubCategoryDesc)

                })
                .catch((err) => {
                    console.log(err);;
                });


        })
            .catch((err) => {
                //// console.log(err);;
            });
    }
    const [unitCodeID, setUnitCodeID] = useState([]);
    const [openID, setOpenID] = useState(false);
    const [autocompleteLoadingID, setAutocompleteLoadingID] = useState(false);
    const abortControllerRefID = useRef(null);


    const handleAutoCompleteInputChangeID = async (eventID, newInputValueID, reason) => {
        console.log('==========+++++++======', newInputValueID)

        if (reason === 'reset' || reason === 'clear') {
            setUnitCodeID([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValueID || newInputValueID.trim() === '') {
            setUnitCodeID([])
            return;
        }
        if (newInputValueID === null) {

            setUnitCodeID([])
            setvalue(prevValue => ({
                ...prevValue,
                AssetItemDescription: [],
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingID(true);
        setOpenID(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefID.current) {
                abortControllerRefID.current.abort();
            }
            // Create a new AbortController
            abortControllerRefID.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_AssetsMaster')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodeID(data ?? [])
                    setOpenID(true);
                    setUnitCodeID(data)
                    setAutocompleteLoadingID(false);
                    // 
                })
                .catch((error) => {
                    console.log('-----', error);

                }
                );

        }


        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setvalue(prevValue => ({
                    ...prevValue,
                    AssetItemDescription: [],
                }))
                setAutocompleteLoadingID(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeID([])
            setOpenID(false);
            setAutocompleteLoadingID(false);
        }

    }

    const handleGPCAutoCompleteChangeID = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                AssetItemDescription: [],
            }));
        }

        if (value && value.AssetItemDescription) {
            getAssetItemDescriptionapi(value.AssetItemDescription);
            setvalue(prevValue => ({
                ...prevValue,
                AssetItemDescription: value.AssetItemDescription,
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);

    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
    }

    const addtransaction = async () => {
        axios.post(`/api/AssetTransactions_post`, {
            AssetItemTagID: value.AssetItemTagID,
            AssetItemDescription: value.AssetItemDescription,
            AssetCondition: value.AssetCondition,
            SerialNumber: value.SerialNumber,
            EmployeeID: value.EmployeeID,
            BuildingCode: value.BuildingCode,
            DepartmentCode: value.DepartmentCode,
            LocationCode: value.LocationCode,
            CaptureDateTime: '01',
            ScannedDateTime: '90',

        })
            .then((res) => {
                console.log(res.data);
                Swal.fire(
                    'Created!',
                    `Asset Transactions ${value.AssetItemTagID} has been created successfully`,
                    'success'
                )
                navigate('/AssetTransaction')

            })
            .catch((err) => {
                console.log(err);
                const statuss = err.response.data.error

                Swal.fire(
                    'Error!',
                    ` ${statuss} `,
                    'error'
                )
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/AssetTransaction')} />
                                    <p className="text-center my-auto ms-5">Asset Management</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        Asset Transaction - Create

                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-12 col-lg-4 col-xl-3 ">
                                    {/* <center> */}
                                    <div className="row">
                                                <div className="col">
                                                <img src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow != null ? imageshow : Printer} alt="" className="printerpic" />
   </div>
                                                <div className="col">
                                                    <img src={Barcode} alt="" className="barcodepic" />
                                                </div>
                                            </div>

                                            <div className="row " htmlFor="file-inputs">
                                                <label htmlFor="file-inputs">
                                                    <img src={BrowserFolder} />
                                                </label>
                                                <input
                                                    id="file-inputs"
                                                    type="file"
                                                    onChange={handleChangeback}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                    {/* </center> */}

                                    </div>

                                    {/*  Asset / Stock Number */}
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Asset / Stock Number<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeID'
                                                value={value.AssetItemTagID}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AssetItemTagID: e.target.value
                                                    }))
                                                }}
                                                // onKeyDown={handleKeyPress}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter/Generate Tag Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>

                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee ID
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCode} // Use the formattedGpcList here
                                                // getOptionLabel={(option) => option?.EmployeeID + ' - ' + option?.Firstname}
                                                getOptionLabel={(option) =>
                                                    option?.EmployeeID
                                                        ? option.EmployeeID + ' - ' + option.Firstname
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID} // This determines which value gets sent to the API
                                                onChange={handleGPCAutoCompleteChange}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmployeeID} - {option.Firstname}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                                                loading={autocompleteLoading}
                                                open={open}
                                                onOpen={() => {
                                                    // setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpen(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoading ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            '& label.Mui-focused': {
                                                                color: '#000000',
                                                            },
                                                            '& .MuiInput-underline:after': {
                                                                borderBottomColor: '#00006a',
                                                                color: '#000000',
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&:hover fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Condition
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.AssetCondition}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AssetCondition: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Dept Code</option>
                                                {
                                                    listAssetCondition && listAssetCondition.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.AssetConditionCode}>{itme.AssetConditionCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {/* Employee Name */}
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={value.Firstname}
                                                className='rounded inputsection py-2'
                                                placeholder='Employee Name'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="AssetItemDescription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Item Discription
                                            </label>
                                            <Autocomplete
                                                id="serachGpcid"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeID}
                                                getOptionLabel={(option) =>
                                                    option?.AssetItemDescription
                                                        ? option.AssetItemDescription
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.AssetItemDescription === value.AssetItemDescription}
                                                onChange={handleGPCAutoCompleteChangeID}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.AssetItemDescription}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(eventID, newInputValueID, params) =>
                                                    handleAutoCompleteInputChangeID(eventID, newInputValueID, params)
                                                }
                                                loading={autocompleteLoadingID}
                                                open={openID} // Control open state based on selected value
                                                onOpen={() => {
                                                    // setOpenID(true);
                                                }}
                                                onClose={() => {
                                                    setOpenID(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Employee Number'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingID ? (
                                                                        <CircularProgress style={{ color: 'black' }} size={20} />
                                                                    ) : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            '& label.Mui-focused': {
                                                                color: '#000000',
                                                            },
                                                            '& .MuiInput-underline:after': {
                                                                borderBottomColor: '#00006a',
                                                                color: '#000000',
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '&:hover fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#00006a',
                                                                    color: '#000000',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor=' AssetIteGroup' className='lablesection color3 text-start mb-1'>
                                                Asset Item Group
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="AssetItemGroup" aria-label="Floating label select example"
                                                value={value.AssetItemGroup}
                                                onChange={handleProvinceChangeAssetItemGroup}>
                                                <option selected className='inputsectiondropdpwn'>Select Asset type</option>
                                                {
                                                    AssetItemGrouplist && AssetItemGrouplist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.AssetItemGroupCode}>{itme.AssetItemGroupCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Item Group Discription
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={AssetitemGroupDescription}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Item Group Discription'
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Type
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="assettype" aria-label="Floating label select example"
                                                value={value.AssetType}
                                                onChange={handleProvinceChangeassetType}
                                            >
                                                <option selected className='inputsectiondropdpwn'>Select Asset type</option>
                                                {
                                                    assetTypelist && assetTypelist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.AssetTypeCode}>{itme.AssetTypeCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset type Discription
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetTypeDiscription}
                                                onChange={e => {
                                                    setassetTypeDiscription(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Type Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Category
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="asset Category" aria-label="Floating label select example"
                                                value={value.AssetCategory}
                                                onChange={handleProvinceChangeasassetCategory}>
                                                <option selected className='inputsectiondropdpwn'>Select Asset Category</option>
                                                {
                                                    assetCategorylist && assetCategorylist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.AssetCategoryCode}>{itme.AssetCategoryCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Category Discription
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetCategoryDiscription}

                                                className='rounded inputsection py-2'
                                                placeholder='Asset Category Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Sub-Category
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="subCategory" aria-label="Floating label select example"
                                                value={value.AssetSubCategory}
                                                onChange={handleProvinceChangeassetSubCategory}>
                                                <option selected className='inputsectiondropdpwn'>Select Asset Sub-Category</option>
                                                {
                                                    assetSubCategorylist && assetSubCategorylist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.AssetSubCategoryCode}>{itme.AssetSubCategoryCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Sub-Category Discription
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetSubCategoryDiscription}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Sub-Category Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Break Line */}
                                <hr className="color3 line" />


                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='DepartmentCode' className='lablesection color3 text-start mb-1'>
                                                Department Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Departmentcode" aria-label="Floating label select example"
                                                value={value.DepartmentCode}
                                                onChange={handleProvinceChange}
                                            >

                                                <option className='inputsectiondropdpwn' >Select Dept Code</option>
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
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Building" aria-label="Floating label select example" value={value.BuildingCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        BuildingCode: e.target.value
                                                    }))
                                                }}>
                                                <option className='inputsectiondropdpwn'>Select Dept Code</option>
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
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="Location" aria-label="Floating label select example"
                                                value={value.LocationCode}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LocationCode: e.target.value
                                                    }))
                                                    localStorage.setItem('LocationCode', e.target.value)

                                                }}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Location</option>
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
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Manufacturer
                                            </label>
                                            <input
                                                types='text'
                                                id='manufacturer'
                                                value={manufacturer}
                                                onChange={e => {
                                                    setmanufacturer(e.target.value)
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Manufacturer'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Model
                                            </label>
                                            <input
                                                types='text'
                                                id='Model'
                                                value={Model}
                                                onChange={e => {
                                                    setModel(e.target.value)
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Model'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Brand
                                            </label>
                                            <input
                                                types='text'
                                                id='Brand'
                                                value={Brand}
                                                onChange={e => {
                                                    setBrand(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Brand'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="SerialNumber"
                                                className="lablesection color3 text-start mb-1">
                                                Serial Number
                                            </label>
                                            <input
                                                types='text'
                                                id='SerialNumber'
                                                value={value.SerialNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        SerialNumber: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Serial Number'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>


                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/AssetTransaction')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <div className="d-flex">

                                        <button type="button" class="border-0 px-3 mx-2  savebtn py-2" onClick={addtransaction}><SaveIcon className='me-2' />SAVE</button>
                                        <button type="button" class="border-0 px-3 mx-2 proceedbtn py-2"><VideoLibraryIcon className='me-2' />GENERATE  ASSET TAG NUMBER</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Createtransaction;
