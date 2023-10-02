import React, { useState, useEffect } from 'react'
import Siderbar from '../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from "react-router-dom";
import excel from "../../Image/excel.png"
import PrintIcon from '@mui/icons-material/Print';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import "react-phone-number-input/style.css";
import Toolbar from '@mui/material/Toolbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import 'react-phone-input-2/lib/style.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { SearchOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Swal from "sweetalert2";
import moment from 'moment';

function Mainworkordeer() {
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        orderNumber: '', RequestNumber: null, RequestStatus: '', workStatus: '', workPriority: '', WorkCategory: "", failureCode: '',
        solutionCode: '', assignEmployee: null, EmployeeName: '', completeEmployee: null, CompleteEmployeeName: '',
        costWork: '', AppointmentDateTime: "", ScheduledDateTime: '', WorkCategoryDiscriptionmain: '',
        EmployeeID: '', Firstname: '', MobileNumber: '', Lastname: '', Middlename: '', LocationCode: '',
        VAT: ''

    })


    const [datanumber, setdatanumber] = useState([])

    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [workCategorylist, setworkCategorylist] = useState([])
    const [WorkCategoryDiscription, setWorkCategoryDiscription] = useState([])
    const [failureStatusCodelist, setfailureStatusCodelist] = useState([])
    const [solutionCodelist, setsolutionCodelist] = useState([])

    const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('');
    const [requestByEmployee, setrequestByEmployee] = useState('');
    const [getdata, setgetdata] = useState([])

    const [RequestStatusLIST, setRequestStatusLIST] = useState([])

    const [failureDiscriptionCode, setFailureDiscriptionCode] = useState([]);
    const [solutionCodeDiscription, setsolutionCodeDiscription] = useState("");
    // print button
    const handlePrintTable1 = (tableData) => {
        const printWindow = window.open('', '_blank');
        let selectedData;
        if (selectedRowIds.length == 1) {
            // If any rows are selected, print only the selected rows
         selectedData = tableData.filter((row) => selectedRowIds.includes(row.id)).map((row, index) => ({
                'SEQ': index + 1,
                'Order Number': row.WorkOrderNumber,
                'ORDER Status': row.WorkStatus,
                'Work Request Number': row.WorkRequestNumber,
                'Work Priority': row.WorkPriority,
                'Request Date': row.ScheduledDateTime,
                'Work Category': row.WorkCategory,
                'Solution Code': row.SolutionCode,
            }));
        } 
        else {
            // If no rows are selected, print the entire table
         selectedData = tableData.map((row, index) => ({
                'SEQ': index + 1,
                'Order Number': row.WorkOrderNumber,
                'ORDER Status': row.WorkStatus,
                'Work Request Number': row.WorkRequestNumber,
                'Work Priority': row.WorkPriority,
                'Request Date': row.ScheduledDateTime,
                'Work Category': row.WorkCategory,
                'Solution Code': row.SolutionCode,
            }));
        }
        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
    <table border="1">
      <tr>
        <th style="${headerStyle}">SEQ</th>
        <th style="${headerStyle}">Order Number</th>
        <th style="${headerStyle}">ORDER Status</th>
        <th style="${headerStyle}">Work Request Number</th>
        <th style="${headerStyle}">Work Priority</th>
        <th style="${headerStyle}">Request Date</th>
        <th style="${headerStyle}">Work Category</th>
        <th style="${headerStyle}">Solution Code</th>
      </tr>
      ${selectedData.map(row => `
        <tr>
          <td>${row['SEQ']}</td>
          <td>${row['Order Number']}</td>
          <td>${row['ORDER Status']}</td>
          <td>${row['Work Request Number']}</td>
          <td>${row['Work Priority']}</td>
          <td>${row['Request Date']}</td>
          <td>${row['Work Category']}</td>
          <td>${row['Solution Code']}</td>
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

    const handlePrintTable2 = (tableData)=>{
        const printWindow = window.open('', '_blank');

        const selectedDatass = tableData.map((row, index) => ({
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
    border-radius: 12px;'>WORK ORDER</p>
    

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
                                            > ${value.EmployeeName}  ${value.Middlename}  ${value.Lastname} </p>
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
                                         Work Category:
                                            </label>
      </td>
      <td>
         <p
                                                types='text'
                                                id='ordernumber'
                                            >${value.WorkCategory}</p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          Solution Code:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                            ${value.solutionCode}
                                            </p>
      </td>
      </tr>
                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Failure Code:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${value.failureCode}
                                            </p>
      </td>
      </tr>

       <tr>

      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                         Assign to Employee:
                                            </label>
      </td>
      <td>

        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${value.assignEmployee}
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
                                         Completed By Employee:
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
                                           work Status:
                                            </label>
      </td>
      <td>
       
      <input
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:1px solid #524d4dab;'
                                                value=${value.workStatus}
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
                                        Work Category Discription:
                                            </label>
      </td>
      <td>
         <p
                                                types='text'
                                                id='ordernumber'
                                            >${WorkCategoryDiscription}</p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          Solution Code Description:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                            ${solutionCodeDiscription}
                                            </p>
      </td>
      </tr>
                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Failure Code Description:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${failureDiscriptionCode}
                                            </p>
      </td>
      </tr>

       <tr>

      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                         Employee Name
:
                                            </label>
      </td>
      <td>

        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            ${value.EmployeeName}
                                            </p>
      </td>
      </tr>

      </table>

      

      </div>




         <div style=' width: 100%;display: flex;'> 
                                                    
        <table style='width:100% ;text-align: left;margin: 30px 0px;'>
        <tr style='background:#3d41cf; color:white'>
          <th style="${headerStyle} padding: 5px">Work Description</th>
          <th style="${headerStyle}">Start Date/Time</th>
          <th style="${headerStyle}">End Date/Time</th>
           <th style="${headerStyle}">Appointment Date/Time</th>
          <th style="${headerStyle}">Scheduled Date/Time</th>
        </tr>
       
          <tr>
            <td>  
                <p
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                            >
                                            ${value.WorkCategoryDiscriptionmain}</p>
                                            </td>
                                              <td>
                <p
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                            >
                                           </p>
                                            </td>
                                                                <td>
                <p
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                                readonly
                                            >
                                           
                                            </p>
                                            </td>

                                                                                          <td>
                <p
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                                readonly
                                            >
                                           
                                            </p>
                                            </td>

                                                                                          <td>
                <p
                                                types='text'
                                                id='ordernumber'
                                                style='border:none; padding: 10px;'
                                                readonly
                                            >
                                          
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
        ${selectedDatass.map(row => `
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

      <div style='display: flex;
    justify-content: space-between'>

      <table style='display: flex; justify-content: end;'>
      <tr>
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                         Total days:
                                            </label>
      </td>
      <td>
         <p
                                                types='text'
                                                id='ordernumber'
                                            ></p>
      </td>
      </tr>

        <tr >
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px'
                                                className="lablesection color3 text-start mb-1 " >
                                          Total Minutes:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                           
                                            </p>
      </td>
      </tr>
                <tr>
                
      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Total hours:
                                            </label>
      </td>
      <td>
       
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                            
                                            </p>
      </td>
      </tr>

       <tr>

      <td>
             <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;margin-top:5px border: 1px solid black' >
                                          Cost of Work:
                                            </label>
      </td>
      <td>

        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'

                                            >
                                         
                                            </p>
      </td>
      </tr>

      </table>



       <table style='display: flex;'>
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
                                          VAT:
                                            </label>
      </td>
      <td>
        <p
                                                types='text'
                                                id='ordernumber'
                                                style='border-radius: 5px;border:none;'
                                                
                                            >
                                            ${value.VAT}
                                            </p>
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
                                           
                                            </p>
      </td>
      </tr>

      </table>


      </div>

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
    }
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

    const filteredRowsprinter = uniqueDescriptions.map((description, index) => {
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
            AssetQty: assetQty,
            Manufacturer: getdata[index].records ? getdata[index].records.data[0].Manufacturer : '',
            Model: getdata[index].records ? getdata[index].records.data[0].Model : '',
            PurchaseAmount: purchaseAmount,
            TOTAL_PRICE: totalPrice,
        };
    });
    // Calculate the overall TOTAL_PRICE
    const overallTotalPrice = filteredRowsprinter.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    // Calculate the initial overallTotalPrice

    const initialOverallTotalPrice = calculateOverallTotalPrice(filteredRowsprinter);
    const [overallTotalPricess, setOverallTotalPricess] = useState(initialOverallTotalPrice);
    // Function to calculate the overallTotalPrice
    function calculateOverallTotalPrice(rows) {
        return rows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
    }
    filteredRowsprinter.forEach(row => {
        const description = row.AssetItemDescription;
        const count = row.AssetQty;
        const AssetItemTagID = "sdf";

        console.log(`Description: ${description}, Count: ${count} ,AssetItemTagID ${AssetItemTagID}`);

    });


    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/WorkOrders_GET_LIST`, {
        },)
            .then((res) => {
                console.log('TO get the list', res);
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
    // Deleted api section
    const Deletedapi = (WorkOrderNumber) => {
        console.log(WorkOrderNumber);
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
            text: `You want to delete this ${WorkOrderNumber} workOrder`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/WorkOrders_DELETE_BYID/${WorkOrderNumber}`)
                    .then((res) => {
                        getapi()
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            `workorder ${WorkOrderNumber} has been deleted.`,
                            'success'
                        )
                        getapi()
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Error deleting', err);
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
        { field: 'OrderNumber', headerName: 'ORDER NUMBER#', width: 160 },
        { field: 'OrderStatus', headerName: 'ORDER STATUS', width: 160 },
        { field: 'WorkRequestNumber', headerName: 'REQUEST NUMBER#', width: 160 },
        { field: 'WorkPriority', headerName: 'PRIORITY', width: 150 },
        { field: 'RequestDateTime', headerName: 'REQUEST DATE', width: 200 },
        { field: 'WorkCategory', headerName: 'WORK CATEGORY ', width: 160 },
        { field: 'SOLUCTIONCODE', headerName: 'SOLUCTION CODE ', width: 160 },
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
                        navigate(`/Workorder/View/${params.row.WorkOrderNumber}`)
                    })}>
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem disabled={params.row.WorkStatus === 'This Work Order is already closed..'} onClick={(() => {
                        navigate(`/Workorder/Updata/${params.row.WorkOrderNumber}`)
                    })}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        Deletedapi(params.row.WorkOrderNumber)
                        handleMenuClose();
                    }}>
                        <span style={{ paddingRight: '10px' }}>Delete</span>
                        <DeleteIcon />
                    </MenuItem>
                </Menu>
            </div>


        );
    }
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        const filteredRows = (getdata || []).filter(row => (
            (!RequestStatusFilterValue || row.WorkStatus === RequestStatusFilterValue) &&
            (!requestByEmployee || (row.WorkOrderNumber && row.WorkOrderNumber.includes(requestByEmployee)))
        )).sort((a, b) => a.WorkOrderNumber - b.WorkOrderNumber).map((row, index) => {
            // Your mapping logic remains the same


            const isClosed = row.WorkStatus === "Closed";

            if (isClosed) {
                // If the request is closed, return a modified row with the closed message
                return {
                    ...row,
                    id: index + 1,
                    OrderNumber: row.WorkOrderNumber,
                    OrderStatus: isClosed ? "This Work Order is already closed.." : row.WorkStatus,
                    WorkRequestNumber: row.WorkRequestNumber,
                    WorkPriority: row.WorkPriority,
                    RequestDateTime: moment(row.ScheduledDateTime).isValid() ? moment(row.ScheduledDateTime).format('DD/MM/YYYY') : '',
                    WorkCategory: row.WorkCategoryCode,
                    SOLUCTIONCODE: row.SolutionCode,
                };
            } else {
                // If the request is not closed, return the row as is
                return {
                    ...row,
                    id: index + 1,
                    OrderNumber: row.WorkOrderNumber,
                    OrderStatus: isClosed ? "This Work Order is already closed.." : row.WorkStatus,
                    WorkRequestNumber: row.WorkRequestNumber,
                    WorkPriority: row.WorkPriority,
                    RequestDateTime: moment(row.ScheduledDateTime).isValid() ? moment(row.ScheduledDateTime).format('DD/MM/YYYY') : '',
                    WorkCategory: row.WorkCategoryCode,
                    SOLUCTIONCODE: row.SolutionCode,
                };
            }
        });

        const uniqueWorkTypes = [...new Set(filteredRows.map(row => row.WorkType))];
        const uniqueWorkTrade = [...new Set(filteredRows.map(row => row.WorkTrade))];

        const workTypePromises = uniqueWorkTypes.map(workType =>
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
        const workTradePromises = uniqueWorkTrade.map(workTrade =>
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

        Promise.all([...workTypePromises, ...workTradePromises])
            .then(results => {
                const updatedRows = filteredRows.map(row => {
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

    useEffect(() => {
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
            console.log(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const [statuscheck, setstatuscheck] = useState()
    const handleCellClick = (params, event) => {
        const columnField = params.field;
        if (columnField === '__check__') {
            // This condition checks if the clicked cell is a checkbox cell
            // Retrieve the entire data of the clicked row using its ID
            const clickedRow = filteredRows.find((row) => row.id === params.id);

            if (clickedRow) {
                console.log('WorkRequestNumber', clickedRow.WorkRequestNumber);
               console.log("Selected row data:", clickedRow);
                console.log(clickedRow.OrderStatus);
                setstatuscheck(clickedRow.WorkStatus)
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
    const handleAddToWorkRequest = () => {
        console.log("rozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", selectedRow);
        if (!selectedRow || selectedRow.length === 0) {
            console.log('Select a Work Order by checking the check box');
            Swal.fire({
                title: "Error",
                text: `Select a Work Order by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }
        if (statuscheck === 'Closed') {
            console.log('This Work Order is already closed..');
            Swal.fire({
                title: "Error",
                text: `This Work Order No. ${selectedRow[0].WorkOrderNumber}  is already closed..`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }

        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            console.log('Post the Data:', firstSelectedRow.WorkStatus);
            navigate(`/Workorder/Updata/${firstSelectedRow.WorkOrderNumber}`);
        }


        const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
        console.log('Selected Row Data:', selectedRowData);

        setSelectedRowIds(selectedRowData);


        // Perform your logic to add to work request using selectedRowData
        // Example: sendToWorkRequest(selectedRowData);
    };

  return (
      <div>
          <div className='bg'>
              <div className=''>
                  <Box sx={{ display: 'flex' }}>
                      <Siderbar />
                      <AppBar className="fortrans locationfortrans" position="fixed">
                          <Toolbar>
                              <Typography variant="h6" noWrap component="div" className="d-flex py-2 ">
                                  <ArrowCircleLeftOutlinedIcon className="my-auto ms-2" onClick={() => navigate('/')} />
                                  <p className="text-center my-auto mx-auto">Work Order</p>
                              </Typography>
                          </Toolbar>
                      </AppBar>
                      <div className="topermaringpage mb-4 container">
                          <div className="py-3">


                              {/* Top section */}
                              <div className="d-flex justify-content-between my-auto">
                                  <p className='color1 workitoppro my-auto'>Work Order<span className='star'>*</span></p>
                                  <div className="d-flex">
                                      {/* create */}
                                      <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Order is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={(() => {
                                          navigate('/createworkorder')
                                      })}><AddCircleOutlineIcon className='me-1' />Create</button>
                                      {/* print  */}
                                      <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" 
                                          onClick={() => {
                                              if (selectedRow.length === 1) {
                                                  handlePrintTable2();
                                              } else {
                                                  handlePrintTable1(filteredRows);
                                              }
                                          }}
                                          ><PrintIcon className='me-1' />Print</button>
                                      {/* excel  */}
                                      <CSVLink data={filteredRows} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                      </CSVLink>
                                  </div>
                              </div>

                              <hr className='color3 line' />
                               {/* Search Fields */}
                  <div className="row mx-auto formsection">
                    <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5 ">
                      <div className='emailsection position-relative d-grid my-2'>
                        <label className='lablesection color3 text-start mb-1 filter-label'>
                          Order Number</label>

                        <input
                          types='text'
                          id='Employeenumber'
                          placeholder="Enter Order Number "
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
                          Order Status
                        </label>

                        <select
                          id='RequestStatus'
                          value={RequestStatusFilterValue}
                          className='rounded inputsection py-2'
                          onChange={(e) => setRequestStatusFilterValue(e.target.value)}
                        >
                          <option value=''>Select Status</option>
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
                              {/* table section */}
                              <div style={{ height: 400, width: '100%' }}>
                                  <DataGrid
                                      rows={filteredRows}
                                      columns={columns}
                                      pagination
                                      rowsPerPageOptions={[10, 25, 50]} // Optional: Set available page size options
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
                                          // console.log(newRowSelectionModel); // Logs the ids of selected rows
                                          const selectedRows = filteredRows.filter((row) => newRowSelectionModel.includes(row.id));
                                          console.log(selectedRows)
                                          setSelectedRow(selectedRows); // Set the state with selected row data objects
                                          // handleRowClick(selectedRows);

                                      }}
                                  />
                              </div>

                              <div className="d-flex justify-content-between mt-3">
                                  <button type="button" class="border-0 px-3  savebtn py-2" onClick={() => navigate('/')}> <ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
                              </div>
                          </div>
                      </div>
                  </Box>
              </div>
          </div>
      </div>
  )
}

export default Mainworkordeer