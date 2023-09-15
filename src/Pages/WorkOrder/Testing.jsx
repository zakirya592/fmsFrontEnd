import React, { useState, useEffect, useRef } from 'react'
import Siderbar from '../../Component/Siderbar/Siderbar'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
function CreateWorkRequest() {
 //   Table section 
    // Employe ID
    const [value, setvalue] = useState({
        PurchaseRequestNumber: null, VendorName:''
    })

    //VendorCode
    const [unitCoderequestnumber, setUnitCoderequestnumber] = useState([]);
    const [openrequestnumber, setOpenrequestnumber] = useState(false);
    const [autocompleteLoadingrequestnumer, setAutocompleteLoadingrequestnumber] = useState(false);
    const abortControllerRefrequestnumber = useRef(null);
    
    const handleAutoCompleteInputrequestnumber = async (event, newInputValue, reason) => {
        console.log('==========+++++++======', newInputValue)

        if (reason === 'reset' || reason === 'clear') {
            setUnitCoderequestnumber([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            setUnitCoderequestnumber([])
            return;
        }
        if (newInputValue === null) {
            setUnitCoderequestnumber([])
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseRequestNumber: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingrequestnumber(true);
        setOpenrequestnumber(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefrequestnumber.current) {
                abortControllerRefrequestnumber.current.abort();
            }
            // Create a new AbortController
            abortControllerRefrequestnumber.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/Filter_PurchaseRequestNumber')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    setUnitCoderequestnumber(data ?? [])
                    setOpenrequestnumber(true);
                    setAutocompleteLoadingrequestnumber(false);
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
                    PurchaseRequestNumber: []
                }))
                setAutocompleteLoadingrequestnumber(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCoderequestnumber([])
            setOpenrequestnumber(false);
            setAutocompleteLoadingrequestnumber(false);
        }

    }

    const handleGPCAutorequestnumber = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseRequestNumber: [],
            }));
        }

        if (value && value.PurchaseRequestNumber) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                PurchaseRequestNumber: value.PurchaseRequestNumber,
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
                                    options={unitCoderequestnumber} // Use the formattedGpcList here
                                    getOptionLabel={(option) =>
                                        option?.PurchaseRequestNumber
                                            ? option.PurchaseRequestNumber
                                            : ''
                                    }
                                    onChange={handleGPCAutorequestnumber}
                                    renderOption={(props, option) => (
                                        <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                            {option.PurchaseRequestNumber}
                                        </li>
                                    )}
                                    value={value}
                                    onInputChange={(event, newInputValue, params) => handleAutoCompleteInputrequestnumber(event, newInputValue, params)}
                                    loading={autocompleteLoadingrequestnumer}
                                    open={openrequestnumber}
                                    onOpen={() => {
                                        // setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpenrequestnumber(false);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder='Purchase Request Number'
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {autocompleteLoadingrequestnumer ? <CircularProgress style={{ color: 'black' }} size={20} /> : null}
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