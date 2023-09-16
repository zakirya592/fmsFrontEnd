import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Siderbar from '../../../../Component/Siderbar/Siderbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import PrintIcon from '@mui/icons-material/Print';
import { SearchOutlined } from '@ant-design/icons';
import excel from '../../../../Image/excel.png';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";

function Addgoodreturn() {
    const navigate = useNavigate();
    const [getdata, setgetdata] = useState([])
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    // List a data thougth api 
    const getapi = () => {
        axios.get(`/api/AssetsMaster_GET_LIST`, {
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


    const handleCellClick = (params, event) => {
        const columnField = params.field;
        if (columnField === '__check__') {
            // This condition checks if the clicked cell is a checkbox cell
            // Retrieve the entire data of the clicked row using its ID
            const clickedRow = filteredRows.find((row) => row.id === params.id);
            console.log('ID', params.id);
            if (clickedRow) {
                console.log("Selected row data:", clickedRow);
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
        const selectedRowData = selectedRow?.map((row) => row?.AssetItemDescription);

        console.log("selectedRowData")
        console.log(selectedRowData) // THIS CONTAIN THE LSIT OF DESCRITION......OKKKKKK
        console.log('Selected Row Data for Work Request:', selectedRowIds);

        setSelectedRowIds(selectedRowData)
        let oneDesc = selectedRowData;
        putapi(oneDesc)
    };

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetCategory', headerName: 'ASSET CATGORY', width: 180 },
        { field: 'AssetSubCategory', headerName: 'ASSET SUB_CATGORY', width: 180 },
        { field: 'OnHandQty', headerName: 'ON-HAND QTY', width: 150 },
        { field: 'LastPurchaseDate', headerName: 'LAST PURCHASE DATE', width: 200 },
        { field: 'Manufacturer', headerName: 'MANUFACTURE', width: 200 },
        { field: 'Model', headerName: 'MODEL', width: 200 },
    ];

    const [getemplodata, setgetemplodata] = useState([])
    const putapi = (AssetItemDescription) => {

        const assetcodeid = localStorage.getItem('updatagoodreturn') || localStorage.getItem('Addgoodreturn');

        console.log(AssetItemDescription);
        console.log(assetcodeid);
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
            text: "You want to Add ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/api/assetItemGOODSReturn_ADD_post`, {
                    PurchaseOrderNumber: assetcodeid,
                    AssetItemDescriptions: AssetItemDescription
                })
                    .then((res) => {
                        console.log('Asset desc Add  successfully', res);
                        setgetemplodata(res.data.recordset)
                        console.log();
                        getapi()
                        setSelectedRowIds([]); // Clear selected row IDs
                        setRowSelectionModel([]); // Clear row selection model
                        swalWithBootstrapButtons.fire(
                            'Add!',
                            `The selected records are added to the  Goods Return :${localStorage.getItem('updatagoodreturn') || localStorage.getItem('Addgoodreturn')} `,
                            'success'
                        )
                    })
                    .catch((err) => {
                        // Handle delete error
                        console.log('Add Asset Code Error:', err);
                        swalWithBootstrapButtons.fire(
                            'Error!',
                            `This Asset already exist`,
                            'error'
                        )
                    });

            }
        })

    };

    const [requestByEmployee, setrequestByEmployee] = useState('');
    const [RequestStatusFilterValue, setRequestStatusFilterValue] = useState('')

    const filteredRows = getdata && getdata.filter(row => (
        (!RequestStatusFilterValue || row.RequestStatus === RequestStatusFilterValue) &&
        // (!requestByEmployee || row.AssetItemDescription === requestByEmployee)
        (!requestByEmployee || row.AssetItemDescription.toLowerCase().includes(requestByEmployee.toLowerCase()))
    )).map((row, indes) => ({
        ...row,
        id: indes + 1,
        AssetItemDescription: row.AssetItemDescription,
        AssetItemGroup: row.AssetItemGroup,
        AssetCategory: row.AssetCategory,
        AssetSubCategory: row.AssetSubCategory,
        OnHandQty: row.OnHandQty,
        LastPurchaseDate: row.LastPurchaseDate,
        Manufacturer: row.Manufacturer,//this Both id  is to display a work types desc //ok
        Model: row.Model
    }))

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const handlePrint = () => {
        window.print(); // This triggers the browser's print dialog
    };

    const Navigatepage = () => {
        const employeeIDss = localStorage.getItem('updatagoodreturn');

        if (employeeIDss) {
            navigate(-1);
        } else {
            navigate('/Create/Goodsreturn');
        }
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
                                        <ArrowCircleLeftOutlinedIcon className="my-auto text-start me-5 ms-2" onClick={Navigatepage} />
                                        <p className="text-center my-auto ms-5">Purchasing Management</p>
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <div className="topermaringpage mb- container">
                                <div className="py-3">
                                    <div className="d-flex justify-content-between my-auto">
                                        <p className="color1 workitoppro my-auto">
                                            Goods Return</p>
                                        <div className="d-flex">
                                            <button type="button" className="btn btn-outline-primary mx-1 color2 btnwork" onClick={handlePrint}>
                                                <PrintIcon className="me-1" />
                                                Print
                                            </button>
                                            <CSVLink data={getdata} type="button" className="btn btn-outline-primary color2" > <img src={excel} alt="export" className='me-1' htmlFor='epoet' /> Export
                                            </CSVLink>
                                        </div>
                                    </div>

                                    <hr className="color3 line" />
                                    {/* Search Fields */}
                                    <div className="row mx-auto my-auto formsection">
                                        <div className="col-sm-10 col-md-5 col-lg-5 col-xl-5 ">
                                            <div className='emailsection position-relative d-grid my-2'>
                                                <label className='lablesection color3 text-start mb-1 filter-label'>
                                                    Asset Item Description</label>

                                                <input
                                                    types='text'
                                                    id='Employeenumber'
                                                    placeholder="Select filter Asset Item Description"
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
                                        <div className="col-sm-2 col-md-3 col-lg-3 col-xl-3 my-auto">
                                            {/* <p></p> */}
                                            <button type="button" className="border-0 px-3 mt-4 savebtn py-2" onClick={handleAddToWorkRequest}><AddCircleOutlineIcon className='me-2' />Add To  Goods Return</button>
                                        </div>
                                        <div className="col-sm-2 col-md-3 col-lg-3 text-end col-xl-3 my-auto">
                                            <p></p>
                                            {/* <p></p> */}
                                            <p className='mt-4 fs-5 fw-bolder color3 font-monospace mt-4'>{localStorage.getItem('updatagoodreturn') || localStorage.getItem('Addgoodreturn')}</p>

                                        </div>

                                    </div>
                                    <div style={{ height: 420, width: '100%' }}>
                                        <DataGrid
                                            rows={filteredRows}
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
                                                // console.log(newRowSelectionModel); // Logs the ids of selected rows
                                                const selectedRows = filteredRows.filter((row) => newRowSelectionModel.includes(row.id));
                                                console.log(selectedRows)
                                                setSelectedRow(selectedRows); // Set the state with selected row data objects
                                                // handleRowClick(selectedRows);

                                            }}
                                        />

                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button type="button" className="border-0 px-3  savebtn py-2" onClick={Navigatepage}><ArrowCircleLeftOutlinedIcon className='me-2' />Back</button>
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

export default Addgoodreturn;
