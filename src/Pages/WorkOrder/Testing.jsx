import React, { useState, useEffect, useRef } from 'react'
import "../Work Request/View modify/Viewmodify.css";
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';

function Testing() {
    const [value, setvalue] = useState({
        assignEmployee: '', EmployeeName: ''
    })
    // Emp ID
    function GetgetworkRequest() {
        axios.post(`/api/getworkRequest`, {
            "EmployeeID": "2687643826"
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
    }

    useEffect(() => {
        GetgetworkRequest()
    }, [])

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
                        EmployeeName:item.Firstname
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
                assignEmployee: value.assignEmployee // Change to assignEmployee
            }));
            console.log('Received value----------:', value.assignEmployee);
        } else {
            console.log('Value or value.assignEmployee is null:', value); // Debugging line
        }
    
    }


   


  return (
    <div>
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
                                  placeholder='Employee Number'
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
    </div>
  )
}

export default Testing