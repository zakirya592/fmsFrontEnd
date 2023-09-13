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
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
function CreateWorkRequest() {
 //   Table section 
    // Employe ID
    const [value, setvalue] = useState({
        VendorID: null, VendorName:''
    })

    //VendorCode
    const [unitCodeVendorCode, setUnitCodeVendorCode] = useState([]);
    const [openVendorCode, setOpenVendorCode] = useState(false);
    const [autocompleteLoadingVendorCode, setAutocompleteLoadingVendorCode] = useState(false);
    const abortControllerRefVendorCode = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/Filter_WR')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------", data);
                const unitNameList = data.map((requestdata) => ({
                    VendorID: requestdata?.VendorID,
                    VendorName: requestdata?.VendorName,
                }));
                setUnitCodeVendorCode(unitNameList)

            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputVendorCode = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)

        if (reason === 'reset' || reason === 'clear') {
            setUnitCodeVendorCode([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            setUnitCodeVendorCode([])
            return;
        }
        if (newInputValue === null) {
            setUnitCodeVendorCode([])
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingVendorCode(true);
        setOpenVendorCode(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefVendorCode.current) {
                abortControllerRefVendorCode.current.abort();
            }
            // Create a new AbortController
            abortControllerRefVendorCode.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_VendorMaster')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    setUnitCodeVendorCode(data ?? [])
                    setOpenVendorCode(true);
                    setAutocompleteLoadingVendorCode(false);
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
                    VendorID: []
                }))
                setAutocompleteLoadingVendorCode(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodeVendorCode([])
            setOpenVendorCode(false);
            setAutocompleteLoadingVendorCode(false);
        }

    }

    const handleGPCAutoVendorCode = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: [],
                VendorName: []
            }));
        }

        if (value && value.VendorID) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                VendorID: value.VendorID,
                VendorName: value.VendorName
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
        }
    }

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
                                <Autocomplete
                                    id="serachGpc"
                                    className='rounded inputsection py-0 mt-0'
                                    required
                                    options={unitCodeVendorCode} // Use the formattedGpcList here
                                    getOptionLabel={(option) =>
                                        option?.VendorID
                                            ? option.VendorID + ' - ' + option.VendorName
                                            : ''
                                    }
                                    onChange={handleGPCAutoVendorCode}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                            {option.VendorID} - {option.VendorName}
                                        </li>
                                    )}
                                    value={value}
                                    onInputChange={(event, newInputValue, params) => handleAutoCompleteInputVendorCode(event, newInputValue, params)}
                                    loading={autocompleteLoadingVendorCode}
                                    open={openVendorCode}
                                    onOpen={() => {
                                        // setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpenVendorCode(false);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder='Employee Number'
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {autocompleteLoadingVendorCode ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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
                    </Box>
                </div>
            </div >
            <ToastContainer />
        </div >
    )
}

export default CreateWorkRequest