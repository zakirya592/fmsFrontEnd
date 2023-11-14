import React, { useState, useEffect } from 'react'
import Siderbar from '../../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import "./Viewmodify.css"
import { useNavigate, useParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Create from '../../../Component/View work/Create'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
import moment from 'moment';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';

function Viewwork() {
    let { userId } = useParams();
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        EmployeeID: '', Firstname: '', Middlename: '', Lastname: '', MobileNumber: '', LandlineNumber: '',//AddworkRequestPOST api input
        DepartmentCode: 'Select Dept Code', Departmentname: '',//Department api input 
        BuildingCode: 'Select Building', //AddBuildingInworkRequestPOST api input
        Location: 'Select Location',// //AddLocationInworkRequestPOST api input
        WorkType: "", WorkTypeDesc: '',//AddWorkTypeInworkRequestPOST api input
        WorkPriority: '',//AddWorkPriorityInworkRequestPOST api input
        AssetItemTagID: '',// AddAssetItemTagIDInworkRequestPOST api input
        AssetItemDescription: '', AssetCategory: '', Manufacturer: '', Model: '',//AddassetItemInworkRequestPOST api input
        RequestNumber: '', WorkTrade: '',// RequestNumber
        RequestDateTime: '',
        RequestStatus: '',
        AssetItemTag: '',
        CompletedByEmp: '',
        FeedbackEmp: '',
        Feedback_Remarks: '',
    })

    // post api for the data 
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest`, {
            EmployeeID,
        }).then((res) => {
            // console.log(res.data)
            if (res.data.recordsets[0].length === 0) {
                Swal.fire('Oops...!', 'Something went wrong!', 'error')
                // setModelError(true);
            } else {

                const {
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                } = res.data.recordsets[0][0];
                setvalue((prevValue) => ({
                    ...prevValue,
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                }));
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            postapi(value.EmployeeID);
        }
    }
    // Dropdown list
    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    useEffect(() => {
        // RequestStatus_LIST
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            // console.log("RequestStatus_LIST", res.data.recordset);
            setRequestStatusLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // Location
        axios.get(`/api/Location_LIST`).then((res) => {
            // console.log("Loaction list", res.data.recordset);
            setdropdownLocation(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // dropdownDepartmentLIST
        axios.get(`/api/Department_LIST`).then((res) => {
            // console.log("Department LIST", res.data.recordset);
            setdropdownDepartmentLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    // /Building_LIST WorkType_LIST
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkPriorityLIST, setdropdownWorkPriorityLIST] = useState([])
    const [dropdownWorkTradeLIST, setdropdownWorkTradeLIST] = useState([])
    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // WorkType_LIST
        axios.get(`/api/WorkType_LIST`).then((res) => {
            setdropdownworktypesLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
        // WorkPriority_LIST
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setdropdownWorkPriorityLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
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

                setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // WorkTypedesc
    const [WorkTypedesc, setWorkTypedesc] = useState([])
    const Workypesdesc = (e) => {
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
            ...prevValue,
            WorkType: e.target.value
        }))
        axios.get(`/api/WorkType_descri_LIST/${Deptnale}`)
            .then((res) => {

                setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
            })
            .catch((err) => {
                console.log(err);
            });
        // WorkTrade_LIST
        axios.get(`/api/WorkTrade_LIST/${Deptnale}`).then((res) => {
            // console.log("WorkTrade_LIST", res.data.recordset);
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });

    }

    // prmWorkTrade
    const [WorkTradedescp, setWorkTradedescp] = useState([])
    const Worktrandedesc = (e) => {
        const Deptnale = e.target.value;
        setvalue(prevValue => ({
            ...prevValue,
            WorkTrade: e.target.value
        }))
        axios.get(`/api/WorkTrade_descri_LIST/${Deptnale}`)
            .then((res) => {
                // console.log('WorkTrade_descri_LIST',res.data);
                setWorkTradedescp(res.data.recordset[0].WorkTradeDesc)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // Work Request Number
    const [imtedata, setimtedata] = useState('')

    // To get the all Data Work Request Number 
    function GetgetworkRequest() {
        axios.post(`/api/getworkRequest`, {
            "EmployeeID": userId
        }).then((res) => {
            const {
                EmployeeID,
                Firstname,
                Lastname,
                Middlename,
                MobileNumber,
                LandlineNumber,
                RequestDateTime,
                DepartmentCode,
                BuildingCode,
                LocationCode,
            } = res.data.recordsets[0][0];

            setvalue((prevValue) => ({
                ...prevValue,
                EmployeeID,
                Firstname,
                Lastname,
                Middlename,
                MobileNumber,
                LandlineNumber,
                RequestDateTime,
                DepartmentCode,
                BuildingCode,
                LocationCode,
            }));
            const Depauto = res.data.recordsets[0][0].DepartmentCode
            axios.get(`/api/Department_desc_LIST/${Depauto}`)
                .then((res) => {
                    setDeptDesc(res.data.recordset[0].DepartmentDesc)
                })
                .catch((err) => {
                    console.log(err);
                });
        })
            .catch((err) => {
                console.log(err);
            });
    }
    const [RequestDateTimeform, setRequestDateTimeform] = useState([])

    const [datanumber, setdatanumber] = useState([])
    // Work Request
    function Workrequestget() {
        axios.post(`/api/getworkRequestsecond`, {
            "RequestNumber": userId
        }).then((res) => {
            const {
                RequestNumber,
                WorkType,
                WorkTrade,
                WorkPriority,
                ProblemDescription,
                RequestStatus,
                ProblemCategory,
                RequestDateTime,
                AssetItemTagID,
                EmployeeID,
            } = res.data.recordsets[0][0];
            const timeanddate = moment(value.RequestDateTime).format('DD/MM/YYYY')
            setimtedata(timeanddate)
            setvalue((prevValue) => ({
                ...prevValue,
                WorkType,
                EmployeeID,
                WorkTrade,
                WorkPriority,
                ProblemDescription,
                RequestStatus,
                ProblemCategory,
                RequestDateTime,
                AssetItemTagID,
                RequestNumber,
            }));
            const data = moment(RequestDateTime).format('YYYY-MM-DD')
            setRequestDateTimeform(data)
            const EmployeeIDss = res.data.recordsets[0][0].EmployeeID;
            axios.post(`/api/getworkRequest`, {
                EmployeeID: EmployeeIDss
            }).then((res) => {
                console.log('asdfaf', res.data);

                const {
                    // EmployeeID,
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    RequestDateTime,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                } = res.data.recordsets[0][0];

                setvalue((prevValue) => ({
                    ...prevValue,
                    // EmployeeID,
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    RequestDateTime,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                }));
                const Depauto = res.data.recordsets[0][0].DepartmentCode
                axios.get(`/api/Department_desc_LIST/${Depauto}`)
                    .then((res) => {
                        setDeptDesc(res.data.recordset[0].DepartmentDesc)
                        console.log('khan', res.data);
                    })
                    .catch((err) => {
                        console.log('The error due to the ', err);
                    });
            })
                .catch((err) => {
                    console.log(err);
                });

            axios.get(`/api/assetworkrequest_GET_BYID/${userId}`)
                .then((res) => {
                    const AssetItemDescriptionsssss = res.data.recordset
                    // setgetdata(res.data.recordset);
                    const SAQ = res.data.recordset.map((item) => item.seq);
                    const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                    const promises = res.data.recordset.map((item) => {
                        const itid = item.AssetItemDescription;
                        return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`)
                            .then((res) => {
                                return {
                                    item,
                                    data: res.data.recordset,// Store API response data here
                                };

                            })
                            .catch((err) => {
                                console.log(err);
                                return {
                                    item,
                                    data: null // Handle error case here
                                };
                            });

                    });

                    const assetItemTagIDs = [];

                    // Create an array of promises for fetching data and updating assetItemTagIDs
                    const promisesNumber = res.data.recordset.map((item) => {
                        const itid = item.AssetItemDescription;
                        return axios.get(`/api/AssetTransactions_GET_ItemDescription/${itid}`)
                            .then((res) => {
                                return {
                                    item,
                                    data: res.data.recordset,// Store API response data here
                                };

                            })


                            .catch((err) => {
                                console.log(err);
                                return {
                                    item,
                                    data: [] // Handle error case here
                                };
                            });
                    });

                    Promise.all([Promise.all(promises), Promise.all(promisesNumber)])
                        .then(([results1, results2]) => {
                            results1.forEach((itemRecords, index) => {
                                const recordsWithDescriptions = AssetItemDescriptionsss.map((description, index) => ({
                                    description: description,
                                    records: results1[index],
                                    saq: SAQ[index],
                                }));

                                const recordsWithSAQ = SAQ.map((saq, index) => ({
                                    saq: SAQ[index],
                                    records: results1[index],
                                }));
                                setgetdata(recordsWithDescriptions, recordsWithSAQ);
                            });
                            results2.forEach((itemRecords, index) => {
                                const assetItemTagID = AssetItemDescriptionsss.map((assetItemTagID, index) => ({
                                    assetItemTagID: assetItemTagID,
                                    records: results2[index],
                                    saq: SAQ[index],
                                }));
                                setdatanumber(assetItemTagID);
                            });
                        });

                })
                .catch((err) => {
                    console.log(err);
                });

            const Depauto = res.data.recordsets[0][0].DepartmentCode
            axios.get(`/api/Department_desc_LIST/${Depauto}`)
                .then((res) => {
                    setDeptDesc(res.data.recordset[0].DepartmentDesc)
                })
                .catch((err) => {
                    console.log(err);
                });
            const workaout = res.data.recordsets[0][0].WorkType
            axios.get(`/api/WorkType_descri_LIST/${workaout}`)
                .then((res) => {

                    setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
                })
                .catch((err) => {
                    console.log(err);
                });
            axios.get(`/api/WorkTrade_LIST/${workaout}`).then((res) => {
                // console.log("WorkTrade_LIST", res.data.recordset);
                setdropdownWorkTradeLIST(res.data.recordsets[0])
                const worktradauto = res.data.recordsets[0][0].WorkTradeCode;
                axios.get(`/api/WorkTrade_descri_LIST/${worktradauto}`)
                    .then((res) => {
                        // console.log('WorkTrade_descri_LIST', res.data);
                        setWorkTradedescp(res.data.recordset[0].WorkTradeDesc)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
        GetgetworkRequest()
        Workrequestget()
    }, [])

    //   Table section 
    const [getdata, setgetdata] = useState([])
    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemTagID', headerName: 'ASSET/STOCK NUMBER', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetQty', headerName: 'ASSET QTY', width: 150 },
        { field: 'Model', headerName: 'MODEL', width: 200 },
        { field: 'Manufacturer', headerName: 'MONIFACTURER', width: 200, },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    //  Deleting the assetworkrequest DELETE_BYID
    const Deletedapi = (ASQS) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2',
                // actions: 'mx-3'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You want to delete this AssetCode",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/assetworkrequest_DELETE_BYID/${ASQS}`)
                    .then((res) => {
                        Workrequestget()
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'AssetCode has been deleted.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log('Error deleting', err);
                    });

            }
        })

    };

    // Button section
    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <MenuItem onClick={() => {
                    Deletedapi(params.row.ASQS)
                    handleMenuClose();
                }}>
                    <span style={{ paddingRight: '10px' }}>Delete</span>
                    <DeleteIcon />
                </MenuItem>
            </div>
        );
    }


    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');

        const selectedData = tableData.map((row, index) => ({
            'id': index + 1,
            'AssetItemDescription': row.AssetItemDescription,
            'AssetItemTag ID': row.AssetItemTagID,
            'Manufacturer': row.Manufacturer,
            'Model': row.Model,
            'AssetQty': row.AssetQty,
            'PurchaseAmount': row.PurchaseAmount,
            'TOTAL_PRICE': row.TOTAL_PRICE,
        }));


        const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px';
        const tableHtml = `
        <p style='text-align: center;
    background: #426d93;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    color: white;
    border-radius: 12px;'>WORK REQUEST</p>
    

       <div style='display: flex;
    justify-content: space-between'>
      <table style='display: flex; justify-content: end;'>
    <tr>
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                         Name:
                                            </label>
      </td>
      <td>
         <p
                                                types='text'
                                                id='ordernumber'
                                            > ${value.EmployeeName ? value.EmployeeName : ''} ${value.Middlename ? value.Middlename : ''}${value.Lastname ? value.Lastname : ''} </p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          MobileNumber:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                            ${value.MobileNumber}
                                            </p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          Landline Number:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${value.LandlineNumber}
                                            </p>
      </td>
      </tr>

                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Location Code:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${value.LocationCode}
                                            </p>
      </td>
      </tr>


      <tr>
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                        Department Code:
                                            </label>
      </td>
      <td>
         <p
                                                types='text'
                                                id='ordernumber'
                                            >${value.DepartmentCode}</p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          Work Type:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                            ${value.WorkType}
                                            </p>
      </td>
      </tr>
                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Work Trade:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${value.WorkTrade ? value.WorkTrade : ''}
                                            </p>
      </td>
      </tr>

      </table>



      <table style='display: flex; justify-content: end;'>

  <tr>
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                       Work Request Number:
                                            </label>
      </td>
      <td>
        <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;margin:auto'
                                                value=${value.RequestNumber}
                                                placeholder=${'Enter Work Order Number'}
                                                readonly
                                            ></input>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                        Employee ID:
                                            </label>
      </td>
      <td>
        <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;margin:auto'
                                                value=${value.EmployeeID}
                                                placeholder=${'Enter Work Order Number'}
                                                readonly
                                            ></input>
      </td>
      </tr>
                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Request Status:
                                            </label>
      </td>
      <td>
       
      <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;'
                                                value=${value.RequestStatus}
                                                placeholder='Enter  assignEmployee'
                                                readonly
                                            ></input>
      </td>
      </tr>




      <tr>
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                        Work Priority:
                                            </label>
      </td>
      <td>
         <p
                                                types='text'
                                                id='ordernumber'
                                            >${value.WorkPriority}</p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          Department Name:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                            ${DeptDesc}
                                            </p>
      </td>
      </tr>
                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                        Work Type Description:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${WorkTypedesc}
                                            </p>
      </td>
      </tr>

       <tr>

      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                         Work Trade Description
:
                                            </label>
      </td>
      <td>

        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${WorkTradedescp}
                                            </p>
      </td>
      </tr>

      </table>

      

      </div>

    <table style='width:100% ;text-align: left;margin: 30px 0px; border: 1px solid black;
  border-collapse: collapse;'>
        <tr style='background:#3d41cf; color:white; '>
          <th style="${headerStyle} padding: 5px ;">SEQ</th>
          <th style="${headerStyle}">AssetItemDescription</th>
          <th style="${headerStyle}">AssetItemTag ID</th>
           <th style="${headerStyle}">Manufacturer</th>
             <th style="${headerStyle}">Model</th>
          <th style="${headerStyle} ">QTY</th>
        <th style="${headerStyle}">UNITY PRICE</th>
         <th style="${headerStyle}">TOTAL PRICE</th>

        </tr>
        ${selectedData.map(row => `
          <tr>
            <td style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['id']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['AssetItemDescription']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['AssetItemTag ID']}</td>
  <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Manufacturer']}</td>
    <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Model']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['AssetQty']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['PurchaseAmount']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['TOTAL_PRICE']}</td>
          </tr>`).join('')}
      </table>

       <table style='display: flex;justify-content: end'>
      <tr>
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                           SUB TOTAL AMOUNT:
                                            </label>
      </td>
      <td>
         <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;'
                                                value=${overallTotalPrice}
                                                readonly
                                            ></input>
      </td>
      </tr>

                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          TOTAL AMOUNT:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${overallTotalPrice}
                                            </p>
      </td>
      </tr>

      </table>

      <div style="display: flex;justify-content: space-between;">
      <p>Signature: _____________________________</p>
       <p>Date: _____________________________</p>
      </div>
    `;


        const printContent = `
      <html>
        <head>
          <title>DataGrid Table</title>
          <style>
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              th {
                ${headerStyle}
              }
            }
          </style>
        </head>
        <body>${tableHtml}</body>
      </html>
    `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };
    const countDuplicates = (array, key) => {
        const counts = {};
        array.forEach(item => {
            const value = item[key];
            counts[value] = (counts[value] || 0) + 1;
        });
        return counts;
    };

    // Get the data first
    const duplicatesCount = countDuplicates(getdata, 'description');
    // Extract unique descriptions
    const uniqueDescriptions = Array.from(new Set(getdata.map(row => row.description)));
    const filteredRows = uniqueDescriptions.map((description, index) => {
        const assetQty = duplicatesCount[description] || 0;
        const purchaseAmount = getdata[index].records ? parseFloat(getdata[index].records.data[0].PurchaseAmount) : '';
        let totalPrice;

        if (!isNaN(purchaseAmount)) {
            if (assetQty === 1) {
                totalPrice = purchaseAmount;
            } else if (assetQty > 1) {
                totalPrice = purchaseAmount * assetQty;
            } else {
                totalPrice = 0; // Handle cases where AssetQty is negative or invalid
            }
        } else {
            totalPrice = 0; // Handle cases where PurchaseAmount is not a valid number
        }

        return {
            id: index + 1,
            AssetItemDescription: description,
            AssetItemTagID: datanumber[index]?.records?.data[0]?.AssetItemTagID || "",
            ASQS: getdata.find(row => row.description === description)?.saq || 0,
            AssetQty: duplicatesCount[description] || 0,
            AssetItemGroup: getdata[index].records ? getdata[index].records.data[0].AssetItemGroup : '',
            AssetCategory: getdata[index].records ? getdata[index].records.data[0].AssetCategory : '',
            AssetSubCategory: getdata[index].records ? getdata[index].records.data[0].AssetSubCategory : '',
            RequestDateTime: getdata[index].records ? getdata[index].records.data[0].RequestDateTime : '',
            Model: getdata[index].records ? getdata[index].records.data[0].Model : '',
            Manufacturer: getdata[index].records ? getdata[index].records.data[0].Manufacturer : '',
            PurchaseAmount: purchaseAmount,
            TOTAL_PRICE: totalPrice,
        };
    });
    // Calculate the overall TOTAL_PRICE
    const overallTotalPrice = filteredRows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    // Calculate the initial overallTotalPrice

    const initialOverallTotalPrice = calculateOverallTotalPrice(filteredRows);
    const [overallTotalPricess, setOverallTotalPricess] = useState(initialOverallTotalPrice);
    // Function to calculate the overallTotalPrice
    function calculateOverallTotalPrice(rows) {
        return rows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    }

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 5,
        page: 0,
    });


    return (
        <div>
            <div className='bg'>
                <div className=''>
                    <Box sx={{ display: 'flex' }}>
                        <Siderbar />
                        <AppBar className="fortrans locationfortrans" position="fixed">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                    <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={(() => {
                                        navigate('/workRequest')
                                    })} />
                                    <p className="text-center my-auto mx-auto">Work Request</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">


                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>View/Modify Work Request</p>
                                    <div className="d-flex">
                                        <Create />
                                    </div>
                                </div>

                                <hr className='color3 line' />
                                {/* Row section */}
                                <div className="row mx-auto formsection">

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='EmployeeID' className='lablesection color3 text-start mb-1'>
                                                Employee
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
                                                onKeyDown={handleKeyPress}
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

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkRequest' className='lablesection color3 text-start mb-1'>
                                                Work Request Number <span className='star'>*</span>
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkRequest'
                                                value={value.RequestNumber}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestNumber: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                className='rounded inputsection py-2'
                                                placeholder='Enter Request Number'
                                                required
                                            ></input>
                                            <p
                                                className='position-absolute text-end serachicon'
                                            >
                                                <SearchOutlined className=' serachicon' />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='Employdata' className='lablesection color3 text-start mb-1'>
                                                Request Date/Time <span className='star'>*</span>
                                            </label>
                                            <input type={RequestDateTimeform} id="Employdata"
                                                value={RequestDateTimeform}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        RequestDateTime: e.target.value
                                                    }))
                                                }}
                                                readOnly
                                                name="birthdaytime" className='rounded inputsection py-2' />
                                        </div>

                                    </div>
                                    {/* change the value for the request status  */}
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='RequestStatus' className='lablesection color3 text-start mb-1'>
                                                Request Status <span className='star'>*</span>
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
                                                <option className='inputsectiondropdpwn'>Request Status</option>
                                                {
                                                    RequestStatusLIST && RequestStatusLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.RequestStatusCode}>{itme.RequestStatusCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                {/* Row Two */}
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
                                {/* second row */}
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
                                                Location
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
                                {/* 3rd row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkType' className='lablesection color3 text-start mb-1'>
                                                Work Type
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkType" aria-label="Floating label select example"
                                                value={value.WorkType}
                                                onChange={Workypesdesc}>
                                                <option className='inputsectiondropdpwn'>Select Work Type</option>
                                                {
                                                    dropdownworktypesLIST && dropdownworktypesLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkTypeCode}>{itme.WorkTypeCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='WorkTypeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Type Description
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={WorkTypedesc}
                                                // onChange={e => {
                                                //     setvalue(prevValue => ({
                                                //         ...prevValue,
                                                //         WorkTypeDesc: e.target.value
                                                //     }))
                                                // }}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Type Description '
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='WorkPriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="WorkPriority" aria-label="Floating label select example"
                                                value={value.WorkPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        WorkPriority: e.target.value
                                                    }))
                                                }}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Work Priority</option>
                                                {
                                                    dropdownWorkPriorityLIST && dropdownWorkPriorityLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkPriorityCode}>{itme.WorkPriorityCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {/* 4th row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workTrade' className='lablesection color3 text-start mb-1'>
                                                Work Trade
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workTrade" aria-label="Floating label select example"
                                                value={value.WorkTrade}
                                                onChange={Worktrandedesc}
                                            >
                                                <option className='inputsectiondropdpwn'>Select Work Trade</option>
                                                {
                                                    dropdownWorkTradeLIST && dropdownWorkTradeLIST.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkTradeCode}>{itme.WorkTradeCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='workTradeDescription' className='lablesection color3 text-start mb-1'>
                                                Work Trade Description
                                            </label>

                                            <input
                                                types='text'
                                                id='WorkTypeDescription'
                                                value={WorkTradedescp}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Trade Description'
                                                required
                                            ></input>
                                        </div>
                                    </div>

                                </div>

                                <hr className='color3 line' />
                                {/* 6th row */}
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredRows}
                                        columns={columns}
                                        pagination
                                        rowsPerPageOptions={[10, 25, 50]} // Optional: Set available page size options
                                        paginationModel={paginationModel}
                                        onPaginationModelChange={setPaginationModel}
                                        checkboxSelection
                                        disableRowSelectionOnClick
                                        disableMultipleSelection
                                    />

                                </div>


                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/workRequest')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredRows)}><PrintIcon className='me-1' />Print</button>

                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Viewwork