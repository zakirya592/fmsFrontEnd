import React, { useState, useEffect, useRef } from 'react'
import Siderbar from '../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

function CreateWorkRequest() {
 //   Table section 
    const [getdata, setgetdata] = useState([])
    const [datanumber, setdatanumber] = useState([])
    // List a data thougth api 
    const getapi = () => {
        // const empid = localStorage.getItem('postemployid',)
        const empid = localStorage.getItem('requestnumber',)
        axios.get(`/api/assetworkrequest_GET_BYID/${empid}`)
            .then((res) => {
                console.log('assetworkrequest  GET  BYID', res.data.recordset);
                console.log('length', res.data.recordset.length);
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
                                data: null // Handle error case here
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
    }
    useEffect(() => {
        getapi()
    }, [])

    const columns = [
        { field: 'id', headerName: 'SEQ.', width: 90 },
        { field: 'AssetItemTagID', headerName: 'ASSET/STOCK NUMBER', width: 220 },
        { field: 'AssetItemGroup', headerName: 'ASSET ITEM GROUP', width: 160 },
        { field: 'AssetItemDescription', headerName: 'ASSET ITEM DESCRIPTION', width: 220 },
        { field: 'AssetQty', headerName: 'ASSET QTY', width: 150 },
        { field: 'Model', headerName: 'MODEL', width: 200 },
        { field: 'Manufacturer', headerName: 'MONIFACTURER', width: 200 },
    ];

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
    const uniqueDescriptions = Array.from(new Set(getdata.map(row =>  row.description)));
    // const uniqueDesID = Array.from(new Set(datanumber.map(row => row.AssetItemTagID)));
    // console.log('uniqueDescriptions-------------------------', uniqueDesID);
   
    // Create filteredRows with unique descriptions and counts
    const filteredRows = uniqueDescriptions.map((description, index) => ({

        id: index + 1,
        AssetItemDescription: description,
        AssetItemTagID: datanumber[index].records ? datanumber[index].records.data[0].AssetItemTagID : '', 
        ASQS: getdata.find(row => row.description === description)?.saq || 0,
        AssetQty: duplicatesCount[description] || 0,
        AssetItemGroup: getdata[index].records ? getdata[index].records.data[0].AssetItemGroup : '',
        AssetCategory: getdata[index].records ? getdata[index].records.data[0].AssetCategory : '',
        AssetSubCategory: getdata[index].records ? getdata[index].records.data[0].AssetSubCategory : '',
        RequestDateTime: getdata[index].records ? getdata[index].records.data[0].RequestDateTime : '',
        Model: getdata[index].records ? getdata[index].records.data[0].Model : '',
        Manufacturer: getdata[index].records ? getdata[index].records.data[0].Manufacturer : '',
    }));

    // Now you can loop through the filteredRows and access duplicatesCount to display counts alongside entries
    filteredRows.forEach(row => {
        const description = row.AssetItemDescription;
        const count = row.AssetQty;
        const AssetItemTagID = "sdf";

        console.log(`Description: ${description}, Count: ${count} ,AssetItemTagID ${AssetItemTagID}`);

    });

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
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
                                    <p className="text-center my-auto mx-auto">Work Request</p>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="topermaringpage mb-4 container">
                            <div className="py-3">
                                {/* Top section */}
                                <div className="d-flex justify-content-between my-auto">
                                    <p className='color1 workitoppro my-auto'>Create Work  Request</p>
                                    
                                </div>
                                {/* Table section */}
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
                                {/*Button section*/}
                            </div>
                        </div>
                    </Box>
                </div>
            </div >
            <ToastContainer />
        </div >
    )
}

export default CreateWorkRequest