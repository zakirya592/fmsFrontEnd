import { useState } from "react";
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
import SaveIcon from '@mui/icons-material/Save';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-number-input";

function Viewtransaction() {
    const [assetCategory, setassetCategory] = useState("");
    const [assetTypeDiscription, setassetTypeDiscription] = useState("");
    const [assetSubCategory, setassetSubCategory] = useState("");
    const [assetSubCategoryDiscription, setassetSubCategoryDiscription] = useState("");
    const [assetItemDiscription, setassetItemDiscription] = useState("");
    const [manufacturer, setmanufacturer] = useState("");
    const [Model, setModel] = useState("");
    const [Brand, setBrand] = useState("");
    const [purchaseAmount, setpurchaseAmount] = useState("");
    const [WarrentyPeriod, setWarrentyPeriod] = useState("");

    const [value, setvalue] = useState({
        Emailaddress: '', Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
      
    })

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
                                    <p className="text-center my-auto ms-5">Asset Management - Master</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top Section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className="color1 workitoppro my-auto">
                                        Asset Transaction - View
                                        <span className="star">*</span>
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/* Rows sections  */}
                                <div className="row mx-auto formsection">

                                    <div className="printerPic col-sm-12 col-md-12 col-lg-4 col-xl-3 ">
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
                                    {/*  Asset / Stock Number */}
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                            Asset / Stock Number<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeID'
                                                value={assetSubCategory}
                                                onChange={(event) => {
                                                    setassetSubCategory(event.target.value)
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
                                                Employee ID<span className='star'>*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='EmployeeID'
                                                value={assetSubCategory}
                                                onChange={(event) => {
                                                    setassetSubCategory(event.target.value)
                                                }}
                                                // onKeyDown={handleKeyPress}
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Employee ID'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Asset Condition <span className="star">*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="asset Category" aria-label="Floating label select example" value={assetCategory}
                                                onChange={(event) => {
                                                    setassetCategory(event.target.value)
                                                }}>
                                                <option selected className='inputsectiondropdpwn'>Select Asset Condition</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                        {/* Employee Name */}
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetSubCategoryDiscription}
                                                onChange={e => {
                                                    setassetSubCategoryDiscription(e.target.value)
                                                }}
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
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Item Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetItemDiscription}
                                                onChange={e => {
                                                    setassetItemDiscription(e.target.value)
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
                                            <label htmlFor=' AssetIteGroup' className='lablesection color3 text-start mb-1'>
                                                Asset Item Group <span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='AssetIteGroup'
                                                value={assetSubCategory}
                                                onChange={(event) => {
                                                    setassetSubCategory(event.target.value)
                                                }}
                                                // onKeyDown={handleKeyPress}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Item Group'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Item Group Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetTypeDiscription}
                                                onChange={e => {
                                                    setassetTypeDiscription(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Item Group Discription'
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
                                            <input
                                                types='text'
                                                id='AssetIteGroup'
                                                value={assetSubCategory}
                                                onChange={(event) => {
                                                    setassetSubCategory(event.target.value)
                                                }}
                                                // onKeyDown={handleKeyPress}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Type '
                                                required
                                            ></input>
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
                                                Asset Category <span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='AssetIteGroup'
                                                value={assetSubCategory}
                                                onChange={(event) => {
                                                    setassetSubCategory(event.target.value)
                                                }}
                                                // onKeyDown={handleKeyPress}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Category'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                               Asset Category Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetTypeDiscription}
                                                onChange={e => {
                                                    setassetTypeDiscription(e.target.value)
                                                }}
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
                                               Asset Sub-Category <span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='AssetIteGroup'
                                                value={assetSubCategory}
                                                onChange={(event) => {
                                                    setassetSubCategory(event.target.value)
                                                }}
                                                // onKeyDown={handleKeyPress}
                                                className='rounded inputsection py-2'
                                                placeholder='Asset Sub-Category'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Asset Sub-Category Discription<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='assetsubcategorydiscription'
                                                value={assetTypeDiscription}
                                                onChange={e => {
                                                    setassetTypeDiscription(e.target.value)
                                                }}
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
                                            <input type="datetime-local" id="purchasedate" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Purchase Amount<span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='Brand'
                                                value={purchaseAmount}
                                                onChange={e => {
                                                    setpurchaseAmount(e.target.value)
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder='Purchase Amount'
                                                required
                                            ></input>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Warrenty Period <span className="star">*</span>
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="warrentyperiod" aria-label="Floating label select example" value={WarrentyPeriod}
                                                onChange={(event) => {
                                                    setWarrentyPeriod(event.target.value)
                                                }}>
                                                <option selected className='inputsectiondropdpwn'>Warrenty Period</option>
                                                <option value={"First"}>One</option>
                                                <option value={"Second"}>Two</option>
                                                <option value={"three"}>Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                                Warrenty Start Date<span className="star">*</span>
                                            </label>
                                            <input type="datetime-local" id="purchasedate" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2 col-xl-2 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='apointementdate' className='lablesection color3 text-start mb-1'>
                                                Warrenty End Date<span className="star">*</span>
                                            </label>
                                            <input type="datetime-local" id="purchasedate" name="birthdaytime" className='rounded inputsection py-2' />


                                        </div>
                                    </div>
                                </div>



                                {/* Row Two */}
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
                                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className='emailsection  d-grid my-2'>
                                            <label htmlFor='Emailaddress' className='lablesection color3 text-start mb-1'>
                                                Email Address<span className='star'>*</span>
                                            </label>

                                            <input
                                                types='email'
                                                id='Emailaddress'
                                                value={value.Emailaddress}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        Emailaddress: e.target.value
                                                    }))
                                                }}
                                                className='rounded inputsection py-2'
                                                placeholder=' Email Address'
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
                                    <div className='emailsection d-grid my-2'>
                                        <label htmlFor='ProblemDescription' className='lablesection color3 text-start mb-1'>
                                            Remarks /  Notes<span className="star">*</span>
                                        </label>
                                        <div className="form-floating inputsectiondropdpwn">
                                            <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Remarks /  Additional Notes " id="Remarks"></textarea>

                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <button type="button" className="border-0 px-3 savebtn py-2">
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

export default Viewtransaction;
