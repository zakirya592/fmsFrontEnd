import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
import { SearchOutlined } from '@ant-design/icons';
import excel from '../../../Image/excel.png';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from "sweetalert2";
import moment from 'moment';
import { CSVLink } from "react-csv";

function WorkRequest() {
  const navigate = useNavigate();
  const [getdata, setgetdata] = useState([])
  const [getdataprinter, setgetdataprinter] = useState([])

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
    RequestStatus: '',
  })
  // print button
  const handlePrintTable1 = (tableData) => {
    const printWindow = window.open('', '_blank');
    const selectedData = tableData.map((row, index) => ({
      'SEQ': index + 1,
      'Request Number': row.RequestNumber,
      'Request Status': row.RequestStatus,
      'Employee ID': row.EmployeeID,
      'Work Priority': row.WorkPriority,
      'Request Date': row.RequestDateTime,
      'Work Type Desc': row.workTypeDesc,
    }));

    // Create a bold style for header cells
    const headerStyle = 'font-weight: bold;';

    const tableHtml = `
      <table  style='width:100% ;text-align: left;margin: 30px 0px; border: 1px solid black;
  border-collapse: collapse;'>
        <tr style='background:#3d41cf; color:white; '>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">Request Number</th>
          <th style="${headerStyle}">Request Status</th>
          <th style="${headerStyle}">Employee ID</th>
          <th style="${headerStyle}">Work Priority</th>
          <th style="${headerStyle}">Request Date</th>
          <th style="${headerStyle}">Work Type Desc</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['SEQ']}</td>
            <td  style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Request Number']}</td>
            <td style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Request Status']}</td>
            <td style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Employee ID']}</td>
            <td style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Work Priority']}</td>
            <td style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Request Date']}</td>
            <td style=" border-right: 2px solid; border-bottom: 1px solid;padding:5px;
  border-collapse: collapse;">${row['Work Type Desc']}</td>
          </tr>`).join('')}
      </table>`;

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

  const handlePrintTable2 = (tableData) => {
    const printWindow = window.open('', '_blank');
    const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px';

    const selectedData = tableData.map((row, index) => ({
      'id': index + 1,
      'AssetItemDescription': row.AssetItemDescription,
      'AssetItemTag ID': row.AssetItemTagID,
      'Manufacturer': row.Manufacturer,
      'Model': row.Model,
      'AssetQty': row.AssetQty,
      'purchaseAmount': row.purchaseAmount,
      'TOTAL_PRICE': row.TOTAL_PRICE,
    }));

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
  border-collapse: collapse;">${row['purchaseAmount']}</td>
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

  // List a data thougth api 
  const getapi = () => {
    axios.get(`/api/workRequest_GET_LIST`, {
    },)
      .then((res) => {
        setgetdata(res.data.recordset)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getapi()
  }, [])

  // Deleted api section
  const Deletedapi = (RequestNumber) => {
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
      text: `You want to delete this ${RequestNumber} workRequest`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/all_work_request_DELETE_BYID/${RequestNumber}`)
          .then((res) => {
            getapi()
            // Handle successful delete response
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `workrequest ${RequestNumber} has been deleted.`,
              'success'
            )
            getapi()
          })
          .catch((err) => {
            // Handle delete error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          });

      }
    })

  };

  const columns = [
    { field: 'id', headerName: 'SEQ.', width: 90 },
    { field: 'RequestNumber', headerName: 'WORK REQUEST#', width: 160 },
    { field: 'RequestStatus', headerName: 'REQUEST STATUS', width: 160 },
    { field: 'EmployeeID', headerName: 'REQUEST BY EMP#', width: 160 },
    { field: 'WorkPriority', headerName: 'PRIORITY', width: 150 },
    { field: 'RequestDateTime', headerName: 'REQUEST DATE', width: 200 },
    { field: 'workTypeDesc', headerName: 'WORK TYPE DESC', width: 160 },
    { field: 'worktradeDesc', headerName: 'WORK TRADE DESC', width: 160 },
    { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
  ];

  function ActionButtons(params) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button className='actionBtn' onClick={handleMenuOpen} style={{ color: "black" }}>
          <span style={{ paddingRight: '10px' }}>Action</span>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={(() => {
            navigate(`/viewworkRequest/${params.row.RequestNumber}`)
            localStorage.setItem('EMpID', params.row.EmployeeID)
          })}>
            <span style={{ paddingRight: '18px' }} >View</span>
            <VisibilityIcon />
          </MenuItem>
          <MenuItem disabled={params.row.RequestStatus === 'This Work Request is already closed..'} onClick={(() => {
            navigate(`/WorkRequest/Updata/${params.row.RequestNumber}`)
            localStorage.setItem('EMpIDUpdata', params.row.EmployeeID)
          })}>
            <span style={{ paddingRight: '3px' }}>Update</span>
            <EditIcon />
          </MenuItem>
          <MenuItem onClick={() => {
            Deletedapi(params.row.RequestNumber)
            handleMenuClose();
          }}>
            <span style={{ paddingRight: '10px' }}>Delete</span>
            <DeleteIcon />
          </MenuItem>
        </Menu>
      </div>


    );
  }

  const [requestByEmployee, setrequestByEmployee] = useState('');
  const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('');
  const [filteredRowsss, setFilteredRows] = useState([]);

  useEffect(() => {
    const filteredRowsss = (getdata || []).filter(row => (
      (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
      (!requestByEmployee || (row.EmployeeID && row.EmployeeID.includes(requestByEmployee)))
    )).sort((a, b) => a.RequestNumber - b.RequestNumber).map((row, index) => {

      const isClosed = row.RequestStatus === "Closed";

      if (isClosed) {
        // If the request is closed, return a modified row with the closed message
        return {
          ...row,
          id: index + 1,
          RequestNumber: row.RequestNumber,
          RequestStatus: isClosed ? "This Work Request is already closed.." : row.RequestStatus,
          EmployeeID: row.EmployeeID,
          WorkPriority: row.WorkPriority,
          RequestDateTime: moment(row.RequestDateTime).format('DD/MM/YYYY'),
          WorkType: row.WorkType,
          workTypeDesc: row.workTypeDesc,
          WorkTrade: row.WorkTrade,
          worktradeDesc: row.worktradeDesc,
        };
      } else {
        // If the request is not closed, return the row as is
        return {
          ...row,
          id: index + 1,
          RequestNumber: row.RequestNumber,
          RequestStatus: row.RequestStatus,
          EmployeeID: row.EmployeeID,
          WorkPriority: row.WorkPriority,
          RequestDateTime: moment(row.RequestDateTime).format('DD/MM/YYYY'),
          WorkType: row.WorkType,
          workTypeDesc: row.workTypeDesc,
          WorkTrade: row.WorkTrade,
          worktradeDesc: row.worktradeDesc,
        };
      }
    });

    // Fetch work type descriptions for all unique work types
    const uniqueWorkTypesss = [...new Set(filteredRowsss.map(row => row.WorkType))];

    const uniqueWorkTradess = [...new Set(filteredRowsss.map(row => row.WorkTrade))];

    const workTypePromisesss = uniqueWorkTypesss.map(workType =>
      axios.get(`/api/WorkType_descri_LIST/${workType}`)
        .then(res => ({
          workType,
          descriptions: res.data.recordset[0].WorkTypeDesc,
        }))
        .catch(err => {
          console.log(err);
          return null;
        })
    );

    // Fetch work trade descriptions for all unique work trades
    const workTradePromisesss = uniqueWorkTradess.map(workTrade =>
      axios.get(`/api/WorkTrade_descri_LIST/${workTrade}`)
        .then(res => ({
          workTrade,
          descriptionsTrade: res.data.recordset[0].WorkTradeDesc,
        }))
        .catch(err => {
          console.log(err);
          return null;
        })
    );

    Promise.all([...workTypePromisesss, ...workTradePromisesss])
      .then(results => {
        const updatedRows = filteredRowsss.map(row => {
          let newRow = { ...row };
          results.forEach(result => {
            if (result && result.workType === row.WorkType) {
              newRow = { ...newRow, workTypeDesc: result.descriptions };
            }
            if (result && result.workTrade === row.WorkTrade) {
              newRow = { ...newRow, worktradeDesc: result.descriptionsTrade };
            }
          });
          return newRow;
        });
        setFilteredRows(updatedRows);
      })
      .catch(err => {
        console.log(err);
      });
  }, [getdata, RequestStatusFilterValue, requestByEmployee]);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [statuscheck, setstatuscheck] = useState()
  const [DeptDesc, setDeptDesc] = useState([])
  const [WorkTypedesc, setWorkTypedesc] = useState([])
  const [datanumber, setdatanumber] = useState([])
  const [WorkTradedescp, setWorkTradedescp] = useState([])
  const handleCellClick = (params, event) => {
    const columnField = params.field;
    if (columnField === '__check__') {
      // This condition checks if the clicked cell is a checkbox cell
      // Retrieve the entire data of the clicked row using its ID
      const clickedRow = filteredRowsss.find((row) => row.id === params.id);

      if (clickedRow) {
        const Res = clickedRow.RequestNumber;
        axios.post(`/api/getworkRequestsecond`, {
          "RequestNumber": Res
        }).then((res) => {
          const {
            RequestNumber,
            WorkType,
            WorkPriority,
            ProblemDescription,
            RequestStatus,
            ProblemCategory,
            RequestDateTime,
            AssetItemTagID,
            EmployeeID,
          } = res.data.recordsets[0][0];
          setvalue((prevValue) => ({
            ...prevValue,
            WorkType,
            EmployeeID,
            WorkPriority,
            ProblemDescription,
            RequestStatus,
            ProblemCategory,
            RequestDateTime,
            AssetItemTagID,
            RequestNumber,
            // DepartmentCode,
            // LocationCode,
            // BuildingCode
          }));
          const Depauto = res.data.recordsets[0][0].DepartmentCode
          axios.get(`/api/Department_desc_LIST/${Depauto}`)
            .then((res) => {
              setDeptDesc(res.data.recordset[0].DepartmentDesc)
            })
            .catch((err) => {
              //// console.log(err);;
            });

          const workaout = res.data.recordsets[0][0].WorkType
          axios.get(`/api/WorkTrade_LIST/${workaout}`).then((res) => {
            if (res.data.recordsets[0][0] && res.data.recordsets[0][0].WorkTradeCode) {
              setvalue((prevValue) => ({
                ...prevValue,
                WorkTrade: res.data.recordsets[0][0].WorkTradeCode,
              }));
              const worktradauto = res.data.recordsets[0][0].WorkTradeCode;
              axios.get(`/api/WorkTrade_descri_LIST/${worktradauto}`)
                .then((res) => {
                  setWorkTradedescp(res.data.recordset[0].WorkTradeDesc)
                })
                .catch((err) => {
                  // console.log(err);;
                });
            }
            else {
              console.log("not");
            }
          })
            .catch((err) => {
              // console.log(err);;
            });
          axios.get(`/api/WorkType_descri_LIST/${workaout}`)
            .then((res) => {
              setWorkTypedesc(res.data.recordset[0].WorkTypeDesc)
            })
            .catch((err) => {
              // console.log(err);;
            });
        }).catch((error) => {
          console.log("error");
        })



        axios.post(`/api/getworkRequest`, {
          "EmployeeID": clickedRow.EmployeeID
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
        })
          .catch((err) => {
            console.log(err);
          });

        axios.get(`/api/assetworkrequest_GET_BYID/${clickedRow.RequestNumber}`)
          .then((res) => {
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

            // Create an array of promises for fetching data and updating
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
                  setgetdataprinter(recordsWithDescriptions, recordsWithSAQ);

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
        setstatuscheck(clickedRow.RequestStatus)
        // setSelectedRowIds([params.id])
        setSelectedRowIds(clickedRow)
      }
      //    =======
      if (clickedRow) {
        setSelectedRowIds((prevSelected) => ({
          ...prevSelected,
          [params.id]: !prevSelected[params.id] // Toggle the selection
        }));
      }
    }
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
  const duplicatesCount = countDuplicates(getdataprinter, 'description');
  // Extract unique descriptions
  const uniqueDescriptions = Array.from(new Set(getdataprinter.map(row => row.description)));
  const filteredRows = uniqueDescriptions.map((description, index) => {
    const assetQty = duplicatesCount[description] || 0;
    const purchaseAmount = getdataprinter[index].records ? parseFloat(getdataprinter[index].records.data[0].PurchaseAmount) : '';
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
      totalPrice = 0; // Handle cases where purchaseAmount is not a valid number
    }

    return {
      id: index + 1,
      AssetItemDescription: description,
      AssetItemTagID: datanumber[index]?.records?.data[0]?.AssetItemTagID || "",
      AssetQty: duplicatesCount[description] || 0,
      Model: getdataprinter[index].records ? getdataprinter[index].records.data[0].Model : '',
      Manufacturer: getdataprinter[index].records ? getdataprinter[index].records.data[0].Manufacturer : '',
      purchaseAmount: purchaseAmount,
      TOTAL_PRICE: totalPrice,
    };
  });
  // Calculate the overall TOTAL_PRICE
  const overallTotalPrice = filteredRows.reduce((total, row) => total + row.TOTAL_PRICE, 0);

  const handleAddToWorkRequest = () => {
    if (!selectedRow || selectedRow.length === 0) {
      Swal.fire({
        title: "Error",
        text: `Select a Work Request by checking the check box`,
        icon: "error",
        confirmButtonText: "OK",
      })

      return;
    }
    if (statuscheck === 'This Work Request is already closed..') {
      Swal.fire({
        title: "Error",
        text: `This Work Request No. ${selectedRow[0].RequestNumber}  is already closed..`,
        icon: "error",
        confirmButtonText: "OK",
      })

      return;
    }

    // Assuming you want to navigate to the update page of the first selected row
    if (selectedRow.length > 0) {
      const firstSelectedRow = selectedRow[0];
      navigate(`/WorkRequest/Updata/${firstSelectedRow.RequestNumber}`);
    }
    const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
    setSelectedRowIds(selectedRowData);

  };

  return (
    <>
      <div className="bg">
        <div className="bg">
          <div className="">
            <Box sx={{ display: 'flex' }}>
              <Siderbar />
              <AppBar className="fortrans locationfortrans" position="fixed">
                <Toolbar>
                  <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                    <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={(() => {
                      navigate('/')
                    })} />
                    <p className="text-center my-auto ms-5">Work Request</p>
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className="topermaringpage mb- container">
                <div className="py-3">
                  <div className="d-flex justify-content-between my-auto">
                    <p className="color1 workitoppro my-auto">
                      Work Request Transactions</p>
                    <div className="d-flex">
                      <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Request is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                        navigate('/createworkrequest')
                      })}><AddCircleOutlineIcon className='me-1' />Create</button>
                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"
                        //  onClick={() => handlePrintTable(filteredRows)}
                        onClick={() => {
                          if (selectedRow.length === 1) {
                            handlePrintTable2(filteredRows);
                          } else {
                            handlePrintTable1(filteredRowsss);
                          }
                        }}

                      >
                        <PrintIcon className="me-1" />
                        Print
                      </button>
                      <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                      </CSVLink>
                    </div>
                  </div>

                  <hr className="color3 line" />
                  {/* Search Fields */}
                  <div className="row mx-auto formsection">
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Employee</label>

                        <input
                          types='text'
                          id='Employeenumber'
                          placeholder="Select Employee # "
                          value={requestByEmployee}
                          className='rounded inputsection py-2'
                          onChange={(e) => setrequestByEmployee(e.target.value)}
                        ></input>
                        <p
                          className='position-absolute text-end serachicon'
                        >
                          <SearchOutlined className=' serachicon' />
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Request Status
                        </label>

                        <select
                          id='RequestStatus'
                          value={RequestStatusFilterValue}
                          className='rounded inputsection py-2'
                          onChange={(e) => setRequestStatusFilterValue(e.target.value)}
                        >
                          <option value=''>Select Status</option>
                          <option value='Open'>Open</option>
                          <option value='Closed'>Closed</option>
                          <option value='Cancelled'>Cancelled</option>
                        </select>

                      </div>
                    </div>

                  </div>
                  <div style={{ height: 420, width: '100%' }}>
                    <DataGrid
                      rows={filteredRowsss}
                      columns={columns}
                      pagination
                      rowsPerPageOptions={[10, 25, 50]}
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      onCellClick={handleCellClick}
                      checkboxSelection
                      disableRowSelectionOnClick
                      disableMultipleSelection
                      selectionModel={selectedRowIds}
                      onSelectionModelChange={(selection) => setSelectedRowIds(selection)}
                      rowSelectionModel={rowSelectionModel}
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel); // Set the state with selected row ids
                        const selectedRows = filteredRowsss.filter((row) => newRowSelectionModel.includes(row.id));
                        setSelectedRow(selectedRows); // Set the state with selected row data objects

                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button type="button" className="border-0 px-3  savebtn py-2" onClick={(() => {
                      navigate('/')
                    })}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkRequest;
