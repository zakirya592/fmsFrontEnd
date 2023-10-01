import React, { useState, useEffect, useRef } from 'react'
import Box from "@mui/material/Box";
import Siderbar from "../../Component/Siderbar/Siderbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import "../Work Request/View modify/Viewmodify.css";
import { useNavigate, useParams } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import PrintIcon from '@mui/icons-material/Print';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import moment from 'moment';
import logo from "../../Image/log1.png"

function Updataorderwork() {
    const navigate = useNavigate();
    let { userId } = useParams();
    const [value, setvalue] = useState({
        orderNumber: '', RequestNumber: null, RequestStatus: '', workStatus: '', workPriority: '', WorkCategory: "", failureCode: '',
        solutionCode: '', assignEmployee: null, EmployeeName: '', completeEmployee: null, CompleteEmployeeName: '',
        costWork: '', AppointmentDateTime: "", ScheduledDateTime: '', WorkCategoryDiscriptionmain: '',
        EmployeeID: '', Firstname: '',
    })
    const [failureDiscriptionCode, setFailureDiscriptionCode] = useState([]);
    const [solutionCodeDiscription, setsolutionCodeDiscription] = useState("");

    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [workCategorylist, setworkCategorylist] = useState([])
    const [WorkCategoryDiscription, setWorkCategoryDiscription] = useState([])
    const [failureStatusCodelist, setfailureStatusCodelist] = useState([])
    const [solutionCodelist, setsolutionCodelist] = useState([])

    // state for the time 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeDifference, setTimeDifference] = useState('');
    const [minutesdifferent, setminutesdifferent] = useState('')
    const [daysBetween, setDaysBetween] = useState(0);

    // Work Employes ID  Api
    const [bdata, setbata] = useState([])
    const [edata, seteata] = useState([])
    const [EI, setEi] = useState([])
    const [scheduleddata, setscheduleddata] = useState([])
    const [appiontmentddata, setappiontmentddata] = useState([])
    // Emp ID

    const [unitCodeEI, setUnitCodeEI] = useState([]);
    const [dropname, setdropnameEI] = useState([])
    const [openEI, setOpenEI] = useState(false);
    const [autocompleteLoadingEI, setAutocompleteLoadingEI] = useState(false);
    const [hsLoaderOpen, setHsLoaderOpen] = useState(false);
    const [gpcListEI, setGpcListEI] = useState([]); // gpc list
    const [dataget, setdataget] = useState('')
    const abortControllerRefEI = useRef(null);

    const [datanumber, setdatanumber] = useState([])
    const [getdata, setgetdata] = useState([])
    function GetgetworkRequest() {
        axios.get(`/api/WorkOrders_GET_BYID/${userId}`).then((res) => {
            console.log('asdfaf=============++++====----=============', res);
            setdataget(res.data.recordset[0])
            const orderNumber = res.data.recordset[0].WorkOrderNumber
            const RequestNumber = res.data.recordset[0].WorkRequestNumber
            const RequestStatus = res.data.recordset[0].workStatus
            const costWork = res.data.recordset[0].TotalCostofWork;
            const assignEmployee = res.data.recordset[0].AssignedtoEmployeeID
            const completeEmployee = res.data.recordset[0].CompletedByEmployeeID
            const WorkCategoryDiscriptionmain = res.data.recordset[0].WorkDescription
            const workStatus = res.data.recordset[0].WorkStatus
            const workPriority = res.data.recordset[0].WorkPriority
            const WorkCategory = res.data.recordset[0].WorkCategoryCode
            const failureCode = res.data.recordset[0].FailureCode
            const solutionCode = res.data.recordset[0].SolutionCode
            const ScheduledDateTime = res.data.recordset[0].ScheduledDateTime
            const AppointmentDateTime = res.data.recordset[0].AppointmentDateTime
            const startdat = res.data.recordset[0].StartWorkOrderDateTime
            const enddata = res.data.recordset[0].EndWorkOrderDateTime

            const sdata = moment(startdat).format('YYYY-MM-DD h:mm A')
            const edata = moment(enddata).format('YYYY-MM-DD h:mm A')
            const scheduledd = moment(ScheduledDateTime).format('YYYY-MM-DD h:mm A')
            const appiontment = moment(AppointmentDateTime).format('YYYY-MM-DD h:mm A')
            setbata(sdata)
            seteata(edata)
            setscheduleddata(scheduledd)
            setappiontmentddata(appiontment)
            setStartDate(startdat)
            setEndDate(enddata)



            // setUnitCodeID([{ EmployeeID: assignEmployee, Firstname: '' }]);
            const defaultEmployeeOption = { EmployeeID: assignEmployee, Firstname: '' };
            // setUnitCodecompleteemployee([{ EmployeeID: completeEmployee, Firstname: '' }])
            const defaultcomplempeOption = { EmployeeID: completeEmployee, Firstname: '' };

            setvalue((prevValue) => ({
                ...prevValue,
                orderNumber,
                RequestNumber,
                costWork,
                WorkCategoryDiscriptionmain,
                workStatus,
                workPriority,
                WorkCategory,
                failureCode,
                solutionCode,
                assignEmployee,
                completeEmployee,
                ScheduledDateTime,
                AppointmentDateTime,
            }));


            axios.get(`/api/assetworkrequest_GET_BYID/${RequestNumber}`)
                .then((res) => {
                    console.log('assetworkrequest  GET  BYID', res.data.recordset);
                    const AssetItemDescriptionsssss = res.data.recordset
                    // setgetdata(res.data.recordset);
                    const SAQ = res.data.recordset.map((item) => item.seq);
                    const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                    console.log('AssetItemDescriptionsssss', AssetItemDescriptionsssss);
                    const promises = res.data.recordset.map((item) => {
                        const itid = item.AssetItemDescription;
                        console.log(itid);

                        return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`)
                            .then((res) => {
                                console.log('=====', res.data.recordset);
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
                        console.log(itid);

                        return axios.get(`/api/AssetTransactions_GET_ItemDescription/${itid}`)
                            .then((res) => {
                                console.log('=====------', res.data.recordset[0].AssetItemTagID);
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


                            // console.log('dfrfdf---------------------',results1);
                            // console.log('-------------------------------', results2);
                            results1.forEach((itemRecords, index) => {
                                console.log(`Records for ${AssetItemDescriptionsss[index]}:`, itemRecords.data);
                                // setgetdata(results);
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
                                // const assetItemTagID = itemRecords.data[0].AssetItemTagID;
                                // console.log("---------------------------------",assetItemTagID);
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


            axios.post(`/api/getworkRequest`, {
                "EmployeeID": completeEmployee
            }).then((res) => {
                console.log('asdfaf=====================================', res);
                const CompleteddEmployeeName = res.data.recordset[0].Firstname
                const {
                    EmployeeID,
                    Firstname
                } = res.data.recordsets[0][0];

                setvalue((prevValue) => ({
                    ...prevValue,
                    EmployeeID,
                    Firstname,
                    CompleteEmployeeName: CompleteddEmployeeName,
                }));

            })
                .catch((err) => {
                    //// console.log(err);;
                });

            axios.post(`/api/getworkRequest`, {
                "EmployeeID": assignEmployee
            }).then((res) => {
                console.log('asdfaf=====================================', res);
                const Employee = res.data.recordsets[0][0].EmployeeID
                const CompleteEmployee = res.data.recordsets[0][0].Firstname
                console.log(CompleteEmployee);

                setvalue((prevValue) => ({
                    ...prevValue,
                    assignEmployee: Employee,
                    EmployeeName: CompleteEmployee,
                }));

            })
                .catch((err) => {
                    //// console.log(err);;
                });

            axios.post(`/api/getworkRequest`, {
                "EmployeeID": assignEmployee
            }).then((res) => {
                console.log('asdfaf=====================================', res);
                const {
                    EmployeeName,
                } = res.data.recordsets[0];
                const firstname = res.data.recordset[0].Firstname
                setvalue((prevValue) => ({
                    ...prevValue,
                    EmployeeName: firstname
                }));

            })
                .catch((err) => {
                    //// console.log(err);;
                });


            setminutesdifferent(res.data.recordset[0].TotalMinutes)
            setTimeDifference(res.data.recordset[0].TotalHours)
            setDaysBetween(res.data.recordset[0].TotalDays)
            // FailureCodedec
            const FailureCodedec = res.data.recordset[0].FailureCode
            axios.get(`/api/Failure_GET_BYID/${FailureCodedec}`)
                .then((res) => {
                    // console.log('-----:', res.data);
                    setFailureDiscriptionCode(res.data.recordset[0].FailureStatusDesc)

                })
                .catch((err) => {
                    // console.log(err);;
                });
            // SolutionCode
            const soluctionCodedec = res.data.recordset[0].SolutionCode
            axios.get(`/api/Solution_GET_BYID/${soluctionCodedec}`)
                .then((res) => {
                    setsolutionCodeDiscription(res.data.recordset[0].SolutionStatusDesc)
                })
                .catch((err) => {
                    // console.log(err);;
                });

            // Work Catager
            const workcategoryCodedec = res.data.recordset[0].WorkCategoryCode
            axios.get(`/api/WorkCatagres_GET_BYID/${workcategoryCodedec}`)
                .then((res) => {
                    // console.log('-----', res.data);
                    setWorkCategoryDiscription(res.data.recordset[0].WorkCategoryDesc)

                })
                .catch((err) => {
                    // console.log(err);;
                });


        })
            .catch((err) => {
                //// console.log(err);;
            });
    }
    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemTagID', headerName: 'ASSET/STOCK NUMBER', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetQty', headerName: 'ASSET QTY', width: 150 },
        { field: 'Model', headerName: 'MODEL', width: 200 },
        { field: 'Manufacturer', headerName: 'MONIFACTURER', width: 200 },
    ];
    
    useEffect(() => {
        GetgetworkRequest()
    }, [])

    const handlePrintTable = (tableData) => {
        const printWindow = window.open('', '_blank');
        
        const selectedData = tableData.map((row, index) => ({
            'SEQs': index + 1,
            'QTY': row.AssetQty,
            'AssetItemDescription': row.AssetItemDescription,
            'AssetItemTag ID': row.AssetItemTagID,
        }));
        const headerStyle = 'font-weight: bold; background:#3d41cf, color:white';
        const tableHtml = `
        <p style='text-align: center;
    background: #426d93;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    color: white;
    border-radius: 12px;'>WORK ORDER</p>
    <div style="display: flex;justify-content: space-between; margin:10px 10px">
<div style='margin:auto 1px'>
      <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                                Work Order Number:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;margin:auto'
                                                value=${value.orderNumber}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
        </div>
    </div>
      <div style="text-align: end; margin:10px 10px">
                                                 <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                              Work Request Number:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;'
                                                value=${value.RequestNumber}
                                                placeholder='Enter  RequestNumber'
                                                readonly
                                            ></input>
    </div>

      <div style="text-align: end; margin:10px 10px">
                                                 <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                              Assign to Employee:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;'
                                                value=${value.assignEmployee}
                                                placeholder='Enter  assignEmployee'
                                                readonly
                                            ></input>
    </div>

     <div style="text-align: end; margin:10px 10px">
                                                 <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                            work Status:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;'
                                                value=${value.workStatus}
                                                placeholder='Enter  assignEmployee'
                                                readonly
                                            ></input>
    </div>
         <div style=' width: 100%;display: flex;'> 
                                                    
        <table border="1" style='width:100% ;text-align: left;margin: 30px 0px;'>
        <tr style='background:#3d41cf; color:white'>
          <th style="${headerStyle} ">Work Description</th>
          <th style="${headerStyle}">Start Date/Time</th>
          <th style="${headerStyle}">End Date/Time</th>
        </tr>
       
          <tr>
            <td>  
                <input
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                                value=${value.WorkCategoryDiscriptionmain}
                                                placeholder='Enter  assignEmployee'
                                                readonly
                                            ></input>
                                            </td>
                                              <td>
                <input
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                                value=${bdata}
                                                placeholder='Enter  assignEmployee'
                                                readonly
                                            ></input>
                                            </td>
                                                                <td>
                <input
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                                value=${edata}
                                                placeholder='Enter  assignEmployee'
                                                readonly
                                            ></input>
                                            </td>
          </tr>
      </table>

                                
    </div>
    <table border="1" style='width:100% ;text-align: left;margin: 30px 0px;'>
        <tr style='background:#3d41cf; color:white'>
          <th style="${headerStyle} ">QTY</th>
          <th style="${headerStyle}">AssetItemDescription</th>
          <th style="${headerStyle}">AssetItemTag ID</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['QTY']}</td>
            <td>${row['AssetItemDescription']}</td>
            <td>${row['AssetItemTag ID']}</td>
          </tr>`).join('')}
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
    // Create filteredRows with unique descriptions and counts
    const filteredRows = uniqueDescriptions.map((description, index) => ({
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
    }));

    filteredRows.forEach(row => {
        const description = row.AssetItemDescription;
        const count = row.AssetQty;
        const AssetItemTagID = "sdf";

        console.log(`Description: ${description}, Count: ${count} ,AssetItemTagID ${AssetItemTagID}`);

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    // Work Request Number
    const [unitCode, setUnitCode] = useState([]);
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const abortControllerRef = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/Filter_WR')
            .then((response) => {
                // console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                // console.log("----------------------------", data);
                const unitNameList = data.map((requestdata) => ({
                    RequestNumber: requestdata?.RequestNumber,
                    workStatus: requestdata?.RequestStatus,
                }));
                setUnitCode(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

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
                RequestNumber: []
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
            axios.get('/api/Filter_WR')
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
                    RequestNumber: []
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
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                RequestNumber: [],
                workStatus: []
            }));
        }

        if (value && value.RequestNumber) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                RequestNumber: value.RequestNumber,
                workStatus: value.workStatus
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    useEffect(() => {
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
            // console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setWorkPrioritlist(res.data.recordsets[0])
            // console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`/api/WorkCatagres_GET_CODE_LIST`).then((res) => {
            setworkCategorylist(res.data.recordsets[0])
            // console.log('WorkCatagres_GET_LIST', res.data);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Failure_GET_CODELIST`).then((res) => {
            setfailureStatusCodelist(res.data.recordsets[0])
            // console.log('Failure_GET_CODELIST', res.data.recordsets[0].FailureStatusCode);
        })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/Solution_GET_CODE_LIST`).then((res) => {
            setsolutionCodelist(res.data.recordsets[0])
            // console.log('SolutiontatusCode', res.data.recordsets[0]);
        })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleProvinceChange = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            WorkCategory: e.target.value,
        }));
        axios.get(`/api/WorkCatagres_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log('-----', res.data);
                setWorkCategoryDiscription(res.data.recordset[0].WorkCategoryDesc)

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const handleProvinceChangeFailure = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            failureCode: e.target.value,
        }));
        axios.get(`/api/Failure_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log('-----:', res.data);
                setFailureDiscriptionCode(res.data.recordset[0].FailureStatusDesc)

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const solutionCodeheeandly = (e) => {
        const Deptnale = e.target.value;
        setvalue((prevValue) => ({
            ...prevValue,
            solutionCode: e.target.value,
        }));
        axios.get(`/api/Solution_GET_BYID/${Deptnale}`)
            .then((res) => {
                // console.log('-----:', res.data);
                setsolutionCodeDiscription(res.data.recordset[0].SolutionStatusDesc)

            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    // Assign to Employee Logic.
    const [unitCodeAE, setUnitCodeAE] = useState([]);
    const [dropnameAE, setdropnameAE] = useState([])
    const [openAE, setOpenAE] = useState(false);
    const [autocompleteLoadingAE, setAutocompleteLoadingAE] = useState(false);
    const [gpcListAE, setGpcListAE] = useState([]); // gpc list
    const abortControllerRefAE = useRef(null);

    useEffect(() => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                const unitNameList = data.map((unitData) => unitData?.EmployeeID);
                const NAmese = data.map((namedata) => namedata?.Firstname);
                // setdropname(NAmese)
                setdropnameAE(data)
                setUnitCodeAE(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputChangeAE = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)
        if (reason === 'reset' || reason === 'clear') {
            setGpcListAE([]); // Clear the data list if there is no input
            setUnitCodeAE([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason; // Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setGpcListAE([]);
            setUnitCodeAE([])
            return;
        }
        if (newInputValue === null) {

            // perform operation when input is cleared
            setGpcListAE([]);
            setUnitCodeAE([])
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: [] // Change to assignEmployee
            }))
            return;
        }

        // postapi(newInputValue.assignEmployee); // Change to assignEmployee
        setAutocompleteLoadingAE(true);
        setOpenAE(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefAE.current) {
                abortControllerRefAE.current.abort();
            }
            // Create a new AbortController
            abortControllerRefAE.current = new AbortController();
            // I don't know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    // const data = response?.data?.recordset;
                    const data = response?.data?.recordset.map(item => ({
                        ...item,
                        assignEmployee: item.EmployeeID, // Change EmployeeID to assignEmployee
                        EmployeeName: item.Firstname
                    }));
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodeAE(data ?? [])
                    setOpenAE(true);
                    setAutocompleteLoadingAE(false);
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
                    assignEmployee: [] // Change to assignEmployee
                }))
                setAutocompleteLoadingAE(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeAE([])
            setOpenAE(false);
            setAutocompleteLoadingAE(false);
        }
    }

    const handleGPCAutoCompleteChangeAE = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === ' -') {
            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: [] // Change to assignEmployee
            }));
        }
        if (value && value.assignEmployee) { // Change to assignEmployee

            setvalue(prevValue => ({
                ...prevValue,
                assignEmployee: value.assignEmployee,// Change to assignEmployee
                EmployeeName: value.EmployeeName
            }));
            console.log('Received value----------:', value.assignEmployee);
        } else {
            console.log('Value or value.assignEmployee is null:', value); // Debugging line
        }

    }

    // Time section Logic.
    const handleStartDateChange = (event) => {
        const selectedStartDate = new Date(event.target.value);
        const nextDay = new Date(selectedStartDate);
        nextDay.setDate(selectedStartDate.getDate() + 1);

        setStartDate(event.target.value);
        setEndDate(nextDay);

        // Ensure end date is never before the selected start date
        if (nextDay < new Date(endDate)) {
            setEndDate(nextDay);
        } else {
            setEndDate('');
        }

    };
    const handleEndDateChange = (event) => {
        const selectedEndDate = new Date(event.target.value);

        // Ensure end date is never before the selected start date
        if (selectedEndDate < new Date(startDate)) {
            setEndDate(new Date(startDate));
        } else {
            // setEndDate(selectedEndDate);
            setEndDate(event.target.value);

        }
        calculateTimeDifference();

        if (startDate && selectedEndDate > new Date(startDate)) {
            const days = Math.ceil((selectedEndDate - new Date(startDate)) / (1000 * 60 * 60 * 24)) - 1;
            setDaysBetween(days);
        } else {
            setDaysBetween(0);
        }


    };
    const calculateTimeDifference = () => {
        if (startDate && endDate) {
            const startDateTime = new Date(startDate);
            const endDateTime = new Date(endDate);

            const timeDiff = Math.abs(endDateTime - startDateTime);
            // const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            // const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const hours = Math.floor(timeDiff / 3600000); // 1 hour = 3600000 milliseconds
            console.log(hours * 60);
            // const minutes = Math.floor((timeDiff * 60 % 3600000) / 60000); // 1 minute = 60000 milliseconds
            const minutes = hours * 60


            setTimeDifference(hours);
            setminutesdifferent(minutes)
        } else {
            setTimeDifference('');
        }
    };

    // Assign to Employee Logic.



    useEffect(() => {

        // const handleOnBlurCall = () => {

        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                const unitNameList = data.map((unitData) => unitData?.EmployeeID);
                const NAmese = data.map((namedata) => namedata?.Firstname);
                // setdropnameEI(NAmese)
                setdropnameEI(data)
                setUnitCodeEI(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputChangeEI = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)
        if (reason === 'reset' || reason === 'clear') {
            setGpcListEI([]); // Clear the data list if there is no input
            setUnitCodeEI([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setGpcListEI([]);
            setUnitCodeEI([])
            return;
        }
        if (newInputValue === null) {

            // perform operation when input is cleared
            setGpcListEI([]);
            setUnitCodeEI([])
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingEI(true);
        setOpenEI(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefEI.current) {
                abortControllerRefEI.current.abort();
            }
            // Create a new AbortController
            abortControllerRefEI.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodeEI(data ?? [])
                    setOpenEI(true);
                    setAutocompleteLoadingEI(false);
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
                setAutocompleteLoadingEI(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeEI([])
            setOpenEI(false);
            setAutocompleteLoadingEI(false);
        }

    }

    const handleGPCAutoCompleteChangeEI = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === ' -') {
            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: []
            }));
        }
        if (value && value.EmployeeID) {

            setvalue(prevValue => ({
                ...prevValue,
                EmployeeID: value.EmployeeID,
                Firstname: value.Firstname,
                CompleteEmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value.EmployeeID);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

    // Post api for all
    const Createapi = async () => {
        await axios.put(`/api/WorkOrders_Put/${userId}`, {
            WorkOrderNumber: value.orderNumber,
            WorkRequestNumber: value.RequestNumber,
            WorkStatus: value.workStatus,
            WorkPriority: value.workPriority,
            WorkCategoryCode: value.WorkCategory,
            WorkDescription: value.WorkCategoryDiscriptionmain,
            FailureCode: value.failureCode,
            SolutionCode: value.solutionCode,
            AssignedtoEmployeeID: value.assignEmployee,
            AppointmentDateTime: value.AppointmentDateTime,
            ScheduledDateTime: value.ScheduledDateTime,
            StartWorkOrderDateTime: startDate,
            EndWorkOrderDateTime: endDate,
            TotalDays: daysBetween,
            TotalHours: timeDifference,
            TotalMinutes: minutesdifferent,
            TotalCostofWork: value.costWork,
            CompletedByEmployeeID: value.EmployeeID,
            CompletionDateTime: startDate,
        },)
            .then((res) => {
                console.log('Add work api first api', res.data);
                Swal.fire({
                    title: "Success",
                    text: `Work Order ${userId} has been updated`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Navigate to the next page when "OK" is clicked
                        navigate('/workorder')
                    }
                });
            })
            .catch((err) => {
                console.log(err);

            });
    };

    const created = () => {
        Createapi()
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
                                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                                        navigate('/workorder')
                                    })} />
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
                                    </p>
                                </div>
                                <hr className="color3 line" />

                                {/*Rows Section */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="WorkOrderNumber"
                                                className="lablesection color3 text-start mb-1" >
                                                Work Order Number <span className="star">*</span>
                                            </label>
                                            <input
                                                types='text'
                                                id='ordernumber'
                                                value={value.orderNumber}
                                                onChange={handleInputChange}
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
                                                Work Request Number
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCode} // Use the formattedGpcList here
                                                getOptionLabel={(option) =>
                                                    option?.RequestNumber
                                                        ? option.RequestNumber + ' - ' + option.workStatus
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.RequestNumber === value.RequestNumber} // This determines which value gets sent to the API
                                                onChange={handleGPCAutoCompleteChange}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.RequestNumber} - {option.workStatus}
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
                                                        placeholder='Work Request Number '
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workStatus' className='lablesection color3 text-start mb-1'>
                                                Work Status
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workStatus" aria-label="Floating label select example"
                                                value={value.workStatus}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        workStatus: e.target.value
                                                    }))
                                                }}>
                                                <option selected className='inputsectiondropdpwn'>Select Work Status</option>
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workpriority' className='lablesection color3 text-start mb-1'>
                                                Work Priority
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workPriority" aria-label="Floating label select example"
                                                value={value.workPriority}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        workPriority: e.target.value
                                                    }))
                                                }} >
                                                <option selected className='inputsectiondropdpwn'>Select Work Priority</option>
                                                {
                                                    WorkPrioritlist && WorkPrioritlist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkPriorityCode}>{itme.WorkPriorityCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {/* second line */}
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='workCategory' className='lablesection color3 text-start mb-1'>
                                                Work Category
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="workCategory" aria-label="Floating label select example"
                                                value={value.WorkCategory}
                                                onChange={handleProvinceChange} >
                                                <option selected className='inputsectiondropdpwn'>Select Work Category</option>
                                                {
                                                    workCategorylist && workCategorylist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.WorkCategoryCode}>{itme.WorkCategoryCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="workCategoryDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Work Category Discription
                                            </label>
                                            <input
                                                types='text'
                                                id='workCategoryDiscription'
                                                value={WorkCategoryDiscription}
                                                className='rounded inputsection py-2'
                                                placeholder='Work Category Discription'
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
                                                Work Description
                                            </label>
                                            <div className="form-floating inputsectiondropdpwn">
                                                <textarea className='rounded inputsectiondropdpwn w-100 color2 py-2' placeholder="Describe the nature of the problem " id="ProblemDescription"
                                                    value={value.WorkCategoryDiscriptionmain}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            WorkCategoryDiscriptionmain: e.target.value
                                                        }))
                                                    }}></textarea>

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
                                                Failure Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example"
                                                value={value.failureCode}
                                                onChange={handleProvinceChangeFailure}>
                                                <option selected className='inputsectiondropdpwn'>Select Failure Code</option>
                                                {
                                                    failureStatusCodelist && failureStatusCodelist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.FailureStatusCode}>{itme.FailureStatusCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="failureCodeDiscription"
                                                className="lablesection color3 text-start mb-1">
                                                Failure Code Description
                                            </label>
                                            <input
                                                types='text'
                                                id='failurecodediscription'
                                                value={failureDiscriptionCode}
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
                                                Solution Code
                                            </label>
                                            <select className='rounded inputsectiondropdpwn color2 py-2' id="failureCode" aria-label="Floating label select example"
                                                value={value.solutionCode}
                                                onChange={solutionCodeheeandly}>
                                                <option selected className='inputsectiondropdpwn'>Select Solution Code</option>
                                                {
                                                    solutionCodelist && solutionCodelist.map((itme, index) => {
                                                        return (
                                                            <option key={index} value={itme.SolutiontatusCode}>{itme.SolutiontatusCode}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="solutioncodeDisctiption"
                                                className="lablesection color3 text-start mb-1">
                                                Solution Code Description
                                            </label>
                                            <input
                                                types='text'
                                                id='solutioncodeDisctiption'
                                                value={solutionCodeDiscription}
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
                                                Assign to Employee
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeAE} // Use the formattedGpcList here
                                                getOptionLabel={(option) =>
                                                    option?.assignEmployee // Change to assignEmployee
                                                        ? option.assignEmployee + ' - ' + option.EmployeeName
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.assignEmployee === value.assignEmployee} // Change to assignEmployee
                                                onChange={handleGPCAutoCompleteChangeAE}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.assignEmployee} - {option.EmployeeName}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChangeAE(event, newInputValue, params)}
                                                loading={autocompleteLoadingAE}
                                                open={openAE}
                                                onOpen={() => {
                                                    // setOpenAE(true);
                                                }}
                                                onClose={() => {
                                                    setOpenAE(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Assign to Employee ID'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingAE ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="employeename"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='employeename'
                                                value={value.EmployeeName}
                                                // onChange={e => {
                                                //     setEmployeeName(e.target.value)
                                                // }}
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
                                                Appiontment Date/Time
                                            </label>
                                            {appiontmentddata !== 'Invalid date' ? (
                                                <input type='datetime-local' id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2'
                                                    value={value.AppointmentDateTime}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            AppointmentDateTime: e.target.value
                                                        }))
                                                    }} />
                                            ) : (
                                                <input type='datetime-local' id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2'
                                                    value={value.AppointmentDateTime}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            AppointmentDateTime: e.target.value
                                                        }))
                                                    }} />
                                            )}
                                            {/* <input type='datetime-local' id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2'
                                                value={value.AppointmentDateTime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        // ...prevValue,
                                                        // AppointmentDateTime: e.target.value
                                                    }))
                                                }} /> */}


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='ScheduledDateTimeate' className='lablesection color3 text-start mb-1'>
                                                Scheduled Date/Time
                                            </label>
                                            {scheduleddata !== 'Invalid date' ? (
                                                <input type='datetime-local' id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2' value={value.ScheduledDateTime}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            ScheduledDateTime: e.target.value
                                                        }))
                                                    }} />
                                            ) : (
                                                <input type='datetime-local' id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2' value={value.ScheduledDateTime}
                                                    onChange={e => {
                                                        setvalue(prevValue => ({
                                                            ...prevValue,
                                                            ScheduledDateTime: e.target.value
                                                        }))
                                                    }} />
                                            )}
                                            {/* <input type='datetime-local' id="apaintmentdate" name="birthdaytime" className='rounded inputsection py-2' value={value.ScheduledDateTime}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        ScheduledDateTime: e.target.value
                                                    }))
                                                }} /> */}


                                        </div>
                                    </div>
                                </div>
                                {/* Eight row */}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='startdate' className='lablesection color3 text-start mb-1'>
                                                Start Date/Time
                                            </label>
                                            {bdata !== 'Invalid date' ? (
                                                <input
                                                    type="datetime-local"
                                                    value={startDate}
                                                    id="startdate" name="birthdaytime" className='rounded inputsection py-2'
                                                    onChange={handleStartDateChange}
                                                    min={new Date()}
                                                />
                                            ) : (
                                                <input
                                                    type="datetime-local"
                                                    value={startDate}
                                                    onChange={handleStartDateChange}
                                                    min={new Date()}
                                                    id="startdate" name="birthdaytime" className='rounded inputsection py-2'
                                                />
                                            )}
                                            {/* <input type={startDate} id="startdate" name="birthdaytime" className='rounded inputsection py-2' value={startDate}
                                                onChange={handleStartDateChange}
                                                min={new Date()} 
                                                {...(startDate == 'Invalid date' && { min: new Date() })}/> */}


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='endDate' className='lablesection color3 text-start mb-1'>
                                                End Date/Time
                                            </label>
                                            {edata !== 'Invalid date' ? (
                                                <input type='datetime-local' id="endDate" name="birthdaytime" className='rounded inputsection py-2'
                                                    value={endDate}
                                                    onChange={handleEndDateChange}
                                                    min={startDate}
                                                />
                                            ) : (
                                                <input type='datetime-local' id="endDate" name="birthdaytime" className='rounded inputsection py-2'
                                                    value={endDate}
                                                    onChange={handleEndDateChange}
                                                    min={startDate}
                                                />
                                            )}
                                            {/* <input type='datetime-local' id="endDate" name="birthdaytime" className='rounded inputsection py-2'
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                min={startDate} 
                                                /> */}


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='totaldays' className='lablesection color3 text-start mb-1'>
                                                Total days
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={daysBetween} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='totalhours' className='lablesection color3 text-start mb-1'>
                                                Total hours
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={timeDifference} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='totalminutes' className='lablesection color3 text-start mb-1'>
                                                Total Minutes
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={minutesdifferent} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                        <div className='emailsection d-grid my-2'>
                                            <label htmlFor='costofwork' className='lablesection color3 text-start mb-1'>
                                                Cost of Work
                                            </label>
                                            <input type="number" id="endDate" name="birthdaytime" className='rounded inputsection py-2' value={value.costWork}
                                                onChange={e => {
                                                    setvalue(prevValue => ({
                                                        ...prevValue,
                                                        costWork: e.target.value
                                                    }))
                                                }} />


                                        </div>
                                    </div>
                                </div>
                                {/* Ninth Row*/}
                                <div className="row mx-auto formsection">
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className='emailsection position-relative d-grid my-2'>
                                            <label htmlFor='completeemployee' className='lablesection color3 text-start mb-1'>
                                                Completed By Employee
                                            </label>
                                            <Autocomplete
                                                id="serachGpc"
                                                className='rounded inputsection py-0 mt-0'
                                                required
                                                options={unitCodeEI} // Use the formattedGpcList here
                                                // getOptionLabel={(option) => option?.EmployeeID + ' - ' + option?.Firstname}
                                                getOptionLabel={(option) =>
                                                    option?.EmployeeID
                                                        ? option.EmployeeID + ' - ' + option.Firstname
                                                        : ''
                                                }
                                                getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID} // This determines which value gets sent to the API
                                                onChange={handleGPCAutoCompleteChangeEI}
                                                renderOption={(props, option) => (
                                                    <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                                        {option.EmployeeID} - {option.Firstname}
                                                    </li>
                                                )}
                                                value={value}
                                                onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChangeEI(event, newInputValue, params)}
                                                loading={autocompleteLoadingEI}
                                                open={openEI}
                                                onOpen={() => {
                                                    // setOpenEI(true);
                                                }}
                                                onClose={() => {
                                                    setOpenEI(false);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder='Completed By Employee ID'
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {autocompleteLoadingEI ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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
                                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                                        <div className="emailsection position-relative d-grid my-2">
                                            <label
                                                htmlFor="employeename"
                                                className="lablesection color3 text-start mb-1">
                                                Employee Name
                                            </label>
                                            <input
                                                types='text'
                                                id='employeename'
                                                value={value.CompleteEmployeeName}

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
                                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                                        navigate('/workorder')
                                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                                    <div className="d-flex">
                                        <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={() => handlePrintTable(filteredRows)}><PrintIcon className='me-1' />Print</button>
                                        <button type="button" class="border-0 px-3  savebtn py-2" onClick={created}><SaveIcon className='me-2' />SAVE</button>
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

export default Updataorderwork;
