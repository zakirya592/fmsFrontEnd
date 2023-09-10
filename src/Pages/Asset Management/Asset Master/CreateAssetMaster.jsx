import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Siderbar from "../../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import "./assetManagement.css"
import Printer from "../../../Image/printer.jpeg"
import Barcode from "../../../Image/barcode.png"
import Camera1 from "../../../Image/camera 1.png"
import BrowserFolder from "../../../Image/browsefolder 3.png"
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from "sweetalert2";

function CreateAssetMaster() {
    let { userId } = useParams();
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        assetSubCategory: '', assetCategory: '', AssetItemGroup: '', AssetType: '', WarrentyPeriod: '', Vendorcode: '', Unitscode: '',
        PurchaseDate: '', PurchaseAmount: '0', OnHandQty: '0', ReOrderLevel: '0', MaximumOrderLevel: '0', MinimumOrderLevel: '0', LastPurchaseDate:'0',
        LastPOAmount: '0', LastPOQty: '0', AssetItemDescription: '', Warranty:'0',

    })

    const [assetSubCategorylist, setassetSubCategorylist] = useState("");
    const [assetCategorylist, setassetCategorylist] = useState("");
    const [AssetItemGrouplist, setAssetItemGrouplist] = useState("");
    const [assetTypelist, setassetTypelist] = useState("");
    const [WarrentyPeriodlist, setWarrentyPeriodlist] = useState("");
    const [Vendorcodelist, setVendorcodelist] = useState("");
    const [Unitscodelist, setUnitscodelist] = useState("");
    const [UnitsDescriptions, setUnitsDescriptions] = useState("");

    const [AssetitemGroupDescription, setAssetitemGroupDescription] = useState('')
    const [assetTypeDiscription, setassetTypeDiscription] = useState("");
    const [VendorName, setVendorName] = useState("");

    const [assetCategoryDiscription, setassetCategoryDiscription] = useState("");
    const [assetSubCategoryDiscription, setassetSubCategoryDiscription] = useState("");
    const [manufacturer, setmanufacturer] = useState("");
    const [Model, setModel] = useState("");
    const [Brand, setBrand] = useState("");
    const [purchaseAmount, setpurchaseAmount] = useState("");
    useEffect(() => {

        axios.get(`/api/AssetSubCategory_GET_LIST`).then((res) => {
            setassetSubCategorylist(res.data.recordsets[0])
            //  console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/AssetCategory_GET_LIST`).then((res) => {
            setassetCategorylist(res.data.recordsets[0])
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

        axios.get(`/api/AssetType_GET_LIST`).then((res) => {
            setassetTypelist(res.data.recordsets[0])
            console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/WarrantyPeriod_GET_LIST`).then((res) => {
            setWarrentyPeriodlist(res.data.recordsets[0])
            console.log('WarrantyPeriod_GET_LIST', res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Filter_VendorMaster`).then((res) => {
            setVendorcodelist(res.data.recordsets[0])
            console.log('VendorMaster_GET_LIST', res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/MaterialUnits_GET_LIST`).then((res) => {
            setUnitscodelist(res.data.recordsets[0])
            console.log('MaterialUnits_GET_LIST', res.data);
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const handleProvinceChangeassetSubCategory = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            assetSubCategory: e.target.value,
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

    const handleProvinceChangeasassetCategory = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            assetCategory: e.target.value,
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

    const handleProvinceChangeAssetItemGroup = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetItemGroup: e.target.value,
        }));
        axios.get(`/api/AssetItemGroup_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setAssetitemGroupDescription(res.data.recordset[0].AssetItemGroupCodeDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }

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
    }

    const handleProvinceChangeVendorcode = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            Vendorcode: e.target.value,
        }));
        axios.get(`/api/VendorMaster_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setVendorName(res.data.recordset[0].VendorName)

            })
            .catch((err) => {
                console.log(err);;
            });
    }

    const handleProvinceChangeUnitscode = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            Unitscode: e.target.value,
        }));
        axios.get(`/api/MaterialUnits_GET_BYID/${Deptnale}`)
            .then((res) => {
                console.log('-----:', res.data);
                setUnitsDescriptions(res.data.recordset[0].MaterialUnitDesc)

            })
            .catch((err) => {
                console.log(err);;
            });
    }

    const [WarrantyStartDate, setWarrantyStartDate] = useState('0');
    const [WarrantyEndDate, setWarrantyEndDate] = useState('');
   const handleStartDateChange = (event) => {
        const selectedStartDate = new Date(event.target.value);
        const nextDay = new Date(selectedStartDate);
        nextDay.setDate(selectedStartDate.getDate() + 1);

       setWarrantyStartDate(event.target.value);
       setWarrantyEndDate(nextDay);

        // Ensure end date is never before the selected start date
       if (nextDay < new Date(WarrantyEndDate)) {
           setWarrantyEndDate(nextDay);
        } else {
           setWarrantyEndDate('');
        }

    };
    const handleEndDateChange = (event) => {
        const selectedEndDate = new Date(event.target.value);

        // Ensure end date is never before the selected start date
        if (selectedEndDate < new Date(WarrantyStartDate)) {
            setWarrantyEndDate(new Date(WarrantyStartDate));
        } else {
            // setScheduleendtime(selectedEndDate);
            setWarrantyEndDate(event.target.value);

        }
    };

    const [AssetImage, setAssetImage] = useState()
    const [selectedFile, setSelectedFile] = useState(null);


    function handleChangeback(e) {
        setAssetImage(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('AssetItemDescription', value.AssetItemDescription);
    formData.append('AssetItemGroup', value.AssetItemGroup);
    formData.append('AssetType', value.AssetType);
    formData.append('AssetCategory', value.assetCategory);
    formData.append('AssetSubCategory', value.assetSubCategory);
    formData.append('Manufacturer', manufacturer);
    formData.append('Model', Model);
    formData.append('Brand', Brand);
    formData.append('PurchaseDate', value.PurchaseDate);
    formData.append('PurchaseAmount', value.PurchaseAmount);
    formData.append('WarrantyPeriod', value.WarrentyPeriod);
    formData.append('WarrantyStartDate', WarrantyStartDate);
    formData.append('WarrantyEndDate', WarrantyEndDate);
    formData.append('Warranty', value.Warranty);
    formData.append('OnHandQty', value.OnHandQty);
    formData.append('ReOrderLevel', value.ReOrderLevel);
    formData.append('MinimumOrderLevel', value.MinimumOrderLevel);
    formData.append('MaximumOrderLevel', value.MaximumOrderLevel);
    formData.append('MaterialUnitCode', value.Unitscode);
    formData.append('LastPOReference', value.LastPOReference);
    formData.append('LastPOAmount', value.LastPOAmount);
    formData.append('LastPOQty', value.LastPOQty);
    formData.append('LastVendorID', value.Vendorcode);
    formData.append('LastPurchaseDate', value.LastPurchaseDate);
    formData.append('Details_Remarks_Notes', 'sjdksd');
    formData.append('AssetImage', AssetImage);


    const postapi = (e) => {
        axios.post(`/api/AssetsMaster_post`, formData)
            .then((res) => {
                console.log('Add', res.data);
                Swal.fire(
                    'Updata!',
                    'Assets Master has been created successfully.',
                    'success'
                ).then(() => {
                    navigate(`/AssetMasters`);
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    'Error!',
                    `${err.response.data.error}`,
                    'error'
                )
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={() => navigate('/AssetMasters')} />
                                    <p className="text-center my-auto ms-5">Asset Management </p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        Asset Masterlist - Create
                                        <span className="star">*</span>
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-12 col-lg-4 col-xl-3 ">
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
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Category<span className="star">*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="asset Category" aria-label="Floating label select example"
                                                value={value.assetCategory}
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
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Sub-Category <span className="star">*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="subCategory" aria-label="Floating label select example"
                                                value={value.assetSubCategory}
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
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Category Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='workCategoryDiscription'
                                                value={assetCategoryDiscription}
                                                // onChange={e => {
                                                //     setassetCategoryDiscription(e.target.value)
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Asset Category Discription'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >

                                            </p>
                                        </div>
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Sub-Category Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetSubCategoryDiscription}
                                                // onChange={e => {
                                                //     setassetSubCategoryDiscription(e.target.value)
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Sub-Category Discription'
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
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Item Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                type='text'
                                                id='assetsubcategorydiscription'
                                                value={value.AssetItemDescription}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        AssetItemDescription: e.target.value
                                                    }))
                                                }}
                                                
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Asset Item Discription'
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
                                            <label htmlFor='AssetItemGroup' className='lablesection color3 text-start mb-1'>
                                                Asset Item Group<span className="star">*</span>
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
                                                htmlFor="AssetitemGroupDescription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Item Group Description<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='AssetitemGroupDescription'
                                                value={AssetitemGroupDescription}
                                                //   onChange={e => {
                                                //       setAssetitemGroupDescription(e.target.value)
                                                //   }}
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
                                                Asset Type <span className="star">*</span>
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
                                                Asset type Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetTypeDiscription}
                                                // onChange={e => {
                                                //     setassetTypeDiscription(e.target.value)
                                                // }}
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
                                {/* Break Line */}
                                <hr className='color3 line' />
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-7 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Manufacturer<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='manufacturer'
                                                value={manufacturer}
                                                onChange={e => {
                                                    setmanufacturer(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Manufacturer'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Model<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='Model'
                                                value={Model}
                                                onChange={e => {
                                                    setModel(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Model'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Brand<span className="star">*</span>
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
                                </div>
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                                Purchase Date<span className="star">*</span>
                                            </label>
                                            <input type="datetime-local" id="purchasedate" name="birthdaytime" className='rounded inputsection py-2'
                                             value={value.PurchaseDate} 
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        PurchaseDate: e.target.value
                                                    }))
                                                }}/>


                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="PurchaseAmount"
                                                className="lablesection color3 text-start mb-1">
                                                Purchase Amount<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='PurchaseAmount'
                                                value={value.PurchaseAmount}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        PurchaseAmount: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Purchase Amount'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Warrenty Period <span className="star">*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="warrentyperiod" aria-label="Floating label select example"
                                                value={value.WarrentyPeriod}
                                                onChange={(event) => {
                                                    // setWarrentyPeriod(event.target.value)
                                                    setvalue((prevValue) => ({
                                                        ...prevValue,
                                                        WarrentyPeriod: event.target.value,
                                                    }));
                                                }}
                                            >
                                                <option selected className='inputsectiondropdpwn'>Warrenty Period</option>
                                                {
                                                    WarrentyPeriodlist && WarrentyPeriodlist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WarrantyPeriodCode}>{itme.WarrantyPeriodCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                                Warrenty Start Date<span className="star">*</span>
                                            </label>
                                            <input type="datetime-local" id="purchasedate" name="birthdaytime" className='rounded inputsection py-2'
                                                value={WarrantyStartDate}
                                                onChange={handleStartDateChange}
                                                min={new Date()} />


                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                                Warrenty End Date<span className="star">*</span>
                                            </label>
                                            <input type="datetime-local" id="purchasedate" name="birthdaytime" className='rounded inputsection py-2' 
                                                value={WarrantyEndDate}
                                                onChange={handleEndDateChange}
                                                min={WarrantyStartDate}/>


                                        </div>
                                    </div>
                                </div>
                                {/* on hand order row  */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-7 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="OnHandQty"
                                                className="lablesection color3 text-start mb-1">
                                                on-Hand Qty.<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='OnHandQty'
                                                value={value.OnHandQty}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        OnHandQty: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='999,999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="ReOrderLevel"
                                                className="lablesection color3 text-start mb-1">
                                                Re-Order Qty Level<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='ReOrderLevel'
                                                value={value.ReOrderLevel}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ReOrderLevel: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='999,999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="MinimumOrderLevel"
                                                className="lablesection color3 text-start mb-1">
                                                Minimum Level<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='MinimumOrderLevel'
                                                value={value.MinimumOrderLevel}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        MinimumOrderLevel: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='999,999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="MaximumOrderLevel"
                                                className="lablesection color3 text-start mb-1">
                                                Maximum Level<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='MaximumOrderLevel'
                                                value={value.MaximumOrderLevel}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        MaximumOrderLevel: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='999,999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                    Units <span className="star">*</span>
                                                </label>
                                                <select className='rounded inputsectiondropdpwn color2 py-2' id="warrentyperiod" aria-label="Floating label select example"
                                                    value={value.Unitscode}
                                                    onChange={handleProvinceChangeUnitscode}>
                                                    <option className='inputsectiondropdpwn'>Units</option>
                                                    {
                                                        Unitscodelist && Unitscodelist.map((itme, index) => {
                                                            return (
                                                                <option key={index} value={itme.MaterialUnitCode}>{itme.MaterialUnitCode}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1 ">
                                        </div>
                                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="emailsection position-relative d-grid my-2">
                                                <label
                                                    htmlFor="UnitsDescriptions"
                                                    className="lablesection color3 text-start mb-1">
                                                    Units Descriptions<span className="star">*</span>
                                                </label>
                                                <input
                                                    types='text'
                                                    id='UnitsDescriptions'
                                                    value={UnitsDescriptions}
                                                    className='rounded inputsection py-2'
                                                    placeholder='Units Descriptions'
                                                    required
                                                ></input>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* last perchase */}
                                <hr className="color3 line" />

                                <div className="row mx-auto formsection">
                                    <div className="col-sm-7 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="lastPurchaseDate"
                                                className="lablesection color3 text-start mb-1">
                                                last purchase date<span className="star">*</span>
                                            </label>
                                           
                                            <input type="date" id="lastPurchaseDate" name="birthdaytime" className='rounded inputsection py-2'
                                                value={value.LastPurchaseDate}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LastPurchaseDate: e.target.value
                                                    }))
                                                }} />

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="LastPOReference"
                                                className="lablesection color3 text-start mb-1">
                                                Po Referencell<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='LastPOReference'
                                                value={value.LastPOReference}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LastPOReference: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='xxx xxx xxx'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="LastPOAmount"
                                                className="lablesection color3 text-start mb-1">
                                                Purchase Amount<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='LastPOAmount'
                                                value={value.LastPOAmount}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LastPOAmount: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='999,999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="LastPOQty"
                                                className="lablesection color3 text-start mb-1">
                                                PO Qty. Units<span className="star">*</span>
                                            </label>
                                            <input
                                                type='text'
                                                id='LastPOQty'
                                                value={value.LastPOQty}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        LastPOQty: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='999,999'
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Warrenty Period<span className="star">*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='Brand'
                                                value={value.WarrantyPeriod}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WarrantyPeriod: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='years'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="Warranty"
                                                className="lablesection color3 text-start mb-1">
                                                Warrenty End<span className="star">*</span>
                                            </label>
                                            <input
                                                type='number'
                                                id='Warranty'
                                                value={value.Warranty}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Warranty: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='years'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>
                                {/* vonder Code*/}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Vendor Code <span className="star">*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="warrentyperiod" aria-label="Floating label select example"
                                                value={value.Vendorcode}
                                                onChange={handleProvinceChangeVendorcode}

                                            >
                                                <option selected className='inputsectiondropdpwn'>Select Vendor Code</option>
                                                {
                                                    Vendorcodelist && Vendorcodelist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.VendorID}>{itme.VendorID}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Vendor Name<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='Brand'
                                                value={VendorName}
                                                className='rounded inputsection py-2'
                                                placeholder='Vendor Name'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3 savebtn py-2" onClick={() => navigate('/AssetMasters')}>
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
            </div>
        </>
    );
}

export default CreateAssetMaster;
