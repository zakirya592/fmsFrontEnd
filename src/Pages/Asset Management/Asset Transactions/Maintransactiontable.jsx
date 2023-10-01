import React, { useState, useEffect, useRef } from 'react';
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
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import logo from "../../../Image/log1.png"

function Maintransactiontable() {
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        DepartmentCode: '', Departmentname: '', BuildingCode: '', LocationCode: '',
        Unites: '', UnitesDescription: "",
        AssetType: '', SerialNumber: '',
        EmployeeID: null, Firstname: '', AssetItemDescription: '', AssetItemTagID: '', AssetCondition: '', AssetCondition: ''
    })

    const [imageshow, setimageshow] = useState()
    const [manufacturer, setmanufacturer] = useState("");
    const [Model, setModel] = useState("");
    const [Brand, setBrand] = useState("");

    // print button
    const handlePrintTable1 = (tableData) => {
        const printWindow = window.open('', '_blank');
        
        const selectedData = tableData.map((row, index) => ({
            'SEQ': index + 1,
            'AssetItemTag ID': row.AssetItemTagID,
            'AssetItem Description': row.AssetItemDescription,
            'Serial Number': row.SerialNumber,
            'Employee ID': row.EmployeeID,
            'AssetCondition': row.AssetCondition,
            'BuildingCode': row.BuildingCode,
            'LocationCode': row.LocationCode,
        }));

        // Create a bold style for header cells
        const headerStyle = 'font-weight: bold;';

        const tableHtml = `
      <table border="1">
        <tr>
          <th style="${headerStyle}">SEQ</th>
          <th style="${headerStyle}">AssetItemTag ID</th>
          <th style="${headerStyle}">AssetItem Description</th>
          <th style="${headerStyle}">Serial Number</th>
          <th style="${headerStyle}">EmployeeID</th>
          <th style="${headerStyle}">AssetCondition</th>
          <th style="${headerStyle}">BuildingCode</th>
          <th style="${headerStyle}">LocationCode</th>
        </tr>
        ${selectedData.map(row => `
          <tr>
            <td>${row['SEQ']}</td>
            <td>${row['AssetItemTag ID']}</td>
            <td>${row['AssetItem Description']}</td>
            <td>${row['Serial Number']}</td>
            <td>${row['Employee ID']}</td>
            <td>${row['AssetCondition']}</td>
            <td>${row['BuildingCode']}</td>
            <td>${row['LocationCode']}</td>
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
        const headerStyle = 'font-weight: bold; background:#3d41cf, color:white';
        const tableHtml = `
        <p style='text-align: center;
    background: #426d93;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    color: white;
    border-radius: 12px;'> Asset Management</p>
    <div style="display: flex;justify-content: space-between; margin:20px 10px">
    <img src=${logo} alt='logo' width='150px' style='height: 150px'/>
    
  <p style='
     font-size: 26px;
    font-weight: bolder;
    padding: 10px;
    margin: auto;
    border-radius: 12px;'> Asset Transaction</p>
     <img src=${imageshow} alt='logo' width='150px' style='height: 150px'/>
    </div>
    <div style="display: flex;justify-content: space-between; margin:30px 10px">
<div style='margin:auto 1px'>
      <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                               Employee Name:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style=';border: antiquewhite; border-bottom: 1px solid black ;margin:auto'
                                                value=${value.Firstname}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
        </div>
        <div style='margin:auto 1px'>
      <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                              Department Code:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style=';border: antiquewhite; border-bottom: 1px solid black ;margin:auto'
                                                value=${value.DepartmentCode}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
        </div>
        <div style='margin:auto 1px'>
      <label
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                               Asset / Stock Number:
                                            </label>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style=';border: antiquewhite; border-bottom: 1px solid black ;margin:auto'
                                                value=${value.AssetItemTagID}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
        </div>
    </div>
    <hr style='background: black;
    border: 1px solid black;
    height: 2px'/>

    
    <p style='font-size: 16px;
        font-weight: bolder;
        font-family: math;
    '>ASSET DETAIL</p>
<div style="justify-content: center;display: flex; margin: auto 50px;">
     <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Asset Item Discription:
                                            </p>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto;width: 75%;'
                                                value=${value.AssetItemDescription}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
      </div>
      <div style="justify-content: center;display: flex;margin: auto 50px;">
     <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Manufacturer:&nbsp &nbsp &nbsp &nbsp
                                            </p>
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto; width: 75%;'
                                                value=${manufacturer}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
      </div>
      <div style="justify-content: center;display: flex;margin: auto 50px;">
       <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Model:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                            </p>
  
                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto ; width: 75%;'
                                                value=${Model}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
      </div>

         <div style="justify-content: center;display: flex;margin: auto 50px;">
       <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Brand:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
                                            </p>

                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto ; width: 75%;'
                                                value=${Brand}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
      </div>

         <div style="justify-content: center;display: flex;margin: auto 50px;">
       <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Serial Number:
                                            </p>

                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto ; width: 75%;'
                                                value=${value.SerialNumber}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
      </div>

         <div style="justify-content: center;display: flex;margin: auto 50px;">
       <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Building:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                            </p>

                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto ; width: 75%;'
                                                value=${value.BuildingCode}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
      </div>

               <div style="justify-content: center;display: flex;margin: auto 50px;">
       <p
                                                htmlFor="WorkOrderNumber"
                                                style='font-weight: bold;'
                                                className="lablesection color3 text-start mb-1" >
                                             Location:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                            </p>

                                             <input
                                                types='text'
                                                id='ordernumber'
                                                style='border: antiquewhite; border-bottom: 1px solid black ;margin:auto; width: 75%;'
                                                value=${value.LocationCode}
                                                placeholder='Enter Work Order Number'
                                                readonly
                                            ></input>
                                            
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
    };
    const [getdata, setgetdata] = useState([])
    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/AssetTransactions_GET_LIST`, {
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

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemTagID', headerName: 'ASSET TAG/STOCK NUMBER', width: 200 },
        { field: 'SerialNumber', headerName: 'SERIAL NUMBER', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 200 },
        { field: 'EmployeeID', headerName: 'EMPLOYEE ID', width: 180 },
        { field: 'AssetCondition', headerName: 'ASSET CONDITION', width: 150 },
        { field: 'BuildingCode', headerName: 'BUILDING', width: 200 },
        { field: 'LocationCode', headerName: 'LOACTION', width: 200 },
        { field: 'ACTIONS', headerName: 'ACTIONS', width: 140, renderCell: ActionButtons },
    ];

    // Deleted api section
    const Deletedapi = (AssetItemTagID) => {
        console.log(AssetItemTagID);
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
            text: `You want to delete this ${AssetItemTagID} Asset Transactions `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/AssetTransactions_DELETE_BYID/${AssetItemTagID}`)
                    .then((res) => {
                        getapi()
                        // Handle successful delete response
                        console.log('Deleted successfully', res);
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            `Asset Transactions  ${AssetItemTagID} has been deleted.`,
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

    function ActionButtons(params) {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
            setAnchorEl(null);
        };

        const handleUpdate = () => {
            // Handle update action
            navigate('/Updata/Assetmaster')
            handleMenuClose();
        };

        const handleDeleteButtonClick = () => {
            // Handle delete action
            handleMenuClose();
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
                    <MenuItem onClick={() => navigate(`/View/transaction/${params.row.AssetItemTagID}`)} >
                        <span style={{ paddingRight: '18px' }} >View</span>
                        <VisibilityIcon />
                    </MenuItem>
                    <MenuItem onClick={() => navigate(`/Updata/transaction/${params.row.AssetItemTagID}`)}>
                        <span style={{ paddingRight: '3px' }}>Update</span>
                        <EditIcon />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        Deletedapi(params.row.AssetItemTagID)
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
    const [AssetItemDescriptionfilter, setAssetItemDescriptionfilter] = useState('')

    const filteredRows = getdata && getdata.filter(row => (
        (!requestByEmployee || (row.AssetItemTagID && row.AssetItemTagID.includes(requestByEmployee)))  &&
        (!AssetItemDescriptionfilter || row.AssetItemDescription.toLowerCase().includes(AssetItemDescriptionfilter.toLowerCase()))
    )).map((row, index) => ({
        ...row,
        id: index + 1,
        AssetItemTagID: row.AssetItemTagID,
        SerialNumber: row.SerialNumber,
        AssetItemDescription: row.AssetItemDescription,
        EmployeeID: row.EmployeeID,
        AssetCondition: row.AssetCondition,
        BuildingCode: row.BuildingCode,
        LocationCode: row.LocationCode, //this Both id  is to display a work types desc //ok
        LastPurchaseDate: row.LastPurchaseDate,
        PurchaseAmount: row.PurchaseAmount,
    }))


    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const [statuscheck, setstatuscheck] = useState()
    const handleCellClick = (params, event) => {
        const columnField = params.field;
        if (columnField === '__check__') {
            // This condition checks if the clicked cell is a checkbox cell
            // Retrieve the entire data of the clicked row using its ID
            const clickedRow = filteredRows.find((row) => row.id === params.id);

            if (clickedRow) {
                console.log("Selected row data:", clickedRow);
                axios.get(`/api/AssetTransactions_GET_BYID/${clickedRow.AssetItemTagID}`, {
                },)
                    .then((res) => {
                        console.log('TO Assets Master By ID', res.data);

                        const Departmentcode = res.data.recordset[0].DepartmentCode
                        setvalue((prevValue) => ({
                            ...prevValue,
                            AssetItemTagID: res.data.recordset[0].AssetItemTagID,
                            AssetCondition: res.data.recordset[0].AssetCondition,
                            AssetItemDescription: res.data.recordset[0].AssetItemDescription,
                            SerialNumber: res.data.recordset[0].SerialNumber,
                            EmployeeID: res.data.recordset[0].EmployeeID
                        }));

                        const EmployeeID = res.data.recordset[0].EmployeeID
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
                          
                        })
                            .catch((err) => {
                                //// console.log(err);;
                            });
                       

                        const AssetItemDescriptionss = res.data.recordset[0].AssetItemDescription
                        axios.get(`/api/AssetsMaster_GET_BYID/${AssetItemDescriptionss}`).then((res) => {
                            console.log('-----', res.data);

                            console.log(res.data.recordset[0].AssetImage);
                            const AssetType = res.data.recordset[0].AssetType
                            const AssetItemGroup = res.data.recordset[0].AssetItemGroup
                            const AssetCategory = res.data.recordset[0].AssetCategory
                            const AssetSubCategory = res.data.recordset[0].AssetSubCategory
                            setvalue((prevValue) => ({
                                ...prevValue,
                                AssetType: AssetType,
                                AssetItemGroup: AssetItemGroup,
                                assetCategory: AssetCategory,
                                assetSubCategory: AssetSubCategory,
                            }));
                            setmanufacturer(res.data.recordset[0].Manufacturer)
                            setModel(res.data.recordset[0].Model)
                            setBrand(res.data.recordset[0].Brand)
                            setimageshow(res.data.recordset[0].AssetImage)

                        })
                            .catch((err) => {
                                //// console.log(err);;
                            });



                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
        if (!selectedRow || selectedRow.length === 0) {
            Swal.fire({
                title: "Error",
                text: `Select a Asset Transactions  by checking the check box`,
                icon: "error",
                confirmButtonText: "OK",
            })

            return;
        }

        // Assuming you want to navigate to the update page of the first selected row
        if (selectedRow.length > 0) {
            const firstSelectedRow = selectedRow[0];
            console.log('Post the Data:', firstSelectedRow.AssetItemTagID); 
            navigate(`/Updata/transaction/${firstSelectedRow.AssetItemTagID}`);
        }


        const selectedRowData = selectedRow.map((row) => row.AssetItemDescription);
        console.log('Selected Row Data:', selectedRowData);

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
                                        <p className="text-center my-auto ms-5">Asset Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                           Asset Transactions<span className='star'>*</span></p>
                                        <div className="d-flex">
                                            <button type="button" className="border-0 px-3  savebtn py-2" onClick={handleAddToWorkRequest}> {selectedRowIds.length === 0 ? 'UPDATE' : statuscheck === 'This Work Order is already closed..' ? 'UPDATE' : 'UPDATE'}</button>

                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"
                                             onClick={(() => {
                                                 navigate('/Create/Transaction')
                                            })}
                                            ><AddCircleOutlineIcon className='me-1' />Create</button>
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork"
                                            //  onClick={() => handlePrintTable(filteredRows)}
                                                onClick={() => {
                                                    if (selectedRow.length === 1) {
                                                        handlePrintTable2();
                                                    } else {
                                                        handlePrintTable1(filteredRows);
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
                                        <div className="col-sm-10 col-md-4 col-lg-4 col-xl-3">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                  AssetItem TagID
                                                </label>
                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select AssetItemTagID"
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
                                        <div className="col-sm-10 col-md-6 col-lg-6 col-xl-6 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    Asset Item Description   </label>

                                                <input
                                                    types='text'
                                                    id='Asset'
                                                    placeholder="Select filter Asset Item Description"
                                                    value={AssetItemDescriptionfilter}
                                                    className='rounded inputsection py-2'
                                                    onChange={(e) => setAssetItemDescriptionfilter(e.target.value)}
                                                ></input>
                                                <p
                                                    className='position-absolute text-end serachicon'
                                                >
                                                    <SearchOutlined className=' serachicon' />
                                                </p>
                                            </div>
                                        </div>
                                        

                                    </div>
                                    <div style={{ height: 420, width: '100%' }}>
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

export default Maintransactiontable;
