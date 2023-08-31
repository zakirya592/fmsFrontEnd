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
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import moment from 'moment';

function Testing() {
    const [value, setvalue] = useState({
        orderNumber: '', RequestNumber: null, workStatus: '', workPriority: '', WorkCategory: "", failureCode: '',
        solutionCode: '', assignEmployee: null, EmployeeName: '', completeEmployee: null, CompleteEmployeeName: '',
        costWork: '', AppointmentDateTime: "", ScheduledDateTime: '', WorkCategoryDiscriptionmain: '',
    })

    // Emp ID
    function GetgetworkRequest() {
        axios.get(`/api/WorkOrders_GET_BYID/000-000-005`).then((res) => {
            console.log('asdfaf=====================================', res);

            const orderNumber = res.data.recordset[0].WorkOrderNumber
            const assignEmployee = res.data.recordset[0].AssignedtoEmployeeID
            const completeEmployee = res.data.recordset[0].CompletedByEmployeeID
            const defaultEmployeeOption = { EmployeeID: assignEmployee, Firstname: '' };
            // setUnitCodecompleteemployee([{ EmployeeID: completeEmployee, Firstname: '' }])
            const defaultcomplempeOption = { EmployeeID: completeEmployee, Firstname: '' };

            setvalue((prevValue) => ({
                ...prevValue,
                orderNumber,
                // assignEmployee,
                // completeEmployee,
                assignEmployee: defaultEmployeeOption,
                completeEmployee: defaultcomplempeOption,
            }));


            axios.post(`/api/getworkRequest`, {
                "EmployeeID": completeEmployee
            }).then((res) => {
                console.log('completeEmployee=====================================', res);
                const CompleteddEmployeeName = res.data.recordset[0].Firstname
                setvalue((prevValue) => ({
                    ...prevValue,
                    CompleteEmployeeName: CompleteddEmployeeName
                }));

                setUnitCodecompleteemployee([{ EmployeeID: CompleteddEmployeeName, Firstname: CompleteddEmployeeName }]);
                console.log(unitCodecompleteemployee);
            })
                .catch((err) => {
                    //// console.log(err);;
                });


        })
            .catch((err) => {
                //// console.log(err);;
            });
    }
    useEffect(() => {
        GetgetworkRequest()
    }, [])
    const [unitCodecompleteemployee, setUnitCodecompleteemployee] = useState([]);
    const [opencompleteemployee, setOpencompleteemployee] = useState(false);
    const [autocompleteLoadingcompleteemployee, setAutocompleteLoadingcompleteemployee] = useState(false);
    const [gpcListcompleteemployee, setGpcListcompleteemployee] = useState([]); // gpc list
    const abortControllerRefcompleteemployee = useRef(null);

    useEffect(() => {
        // const handleOnBlurCall = () => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                console.log('Dropdown me', response.data.recordset)
                const data = response?.data?.recordset;
                console.log("----------------------------", data);
                const dataget = data.map((requestdata) => ({
                    RequestNumber: requestdata?.RequestNumber,
                    RequestStatus: requestdata?.RequestStatus,
                }));
                // setUnitCodeID(dataget)
                setOpencompleteemployee(false)
            })
            .catch((error) => {
                console.log('-----', error);
            }
            );
        // }

    }, [])

    const handleAutoCompleteInputChangecompleteemployee = async (eventcompleteemployee, newInputValuecompleteemployee, reason) => {
        console.log('==========+++++++======', newInputValuecompleteemployee)

        if (reason === 'reset' || reason === 'clear') {
            setGpcListcompleteemployee([]); // Clear the data list if there is no input
            setUnitCodecompleteemployee([])
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return reason// Do not perform search if the option is selected
        }

        if (!newInputValuecompleteemployee || newInputValuecompleteemployee.trim() === '') {
            // perform operation when input is cleared
            setGpcListcompleteemployee([]);
            setUnitCodecompleteemployee([])
            return;
        }
        if (newInputValuecompleteemployee === null) {

            // perform operation when input is cleared
            setGpcListcompleteemployee([]);
            setUnitCodecompleteemployee([])
            setvalue(prevValue => ({
                ...prevValue,
                completeEmployee: [],
                CompleteEmployeeName: []
            }))
            return;
        }

        // postapi(newInputValue.EmployeeID);
        setAutocompleteLoadingcompleteemployee(true);
        setOpencompleteemployee(true);
        try {
            // Cancel any pending requests
            if (abortControllerRefcompleteemployee.current) {
                abortControllerRefcompleteemployee.current.abort();
            }
            // Create a new AbortController
            abortControllerRefcompleteemployee.current = new AbortController();
            // I dont know what is the response of your api but integrate your api into this block of code thanks 
            axios.get('/api/EmployeeID_GET_LIST')
                .then((response) => {
                    console.log('Dropdown me', response.data.recordset)
                    const data = response?.data?.recordset;
                    //name state da setdropname
                    //or Id state da setGpcList da 
                    setUnitCodecompleteemployee(data ?? [])
                    setOpencompleteemployee(true);
                    setUnitCodecompleteemployee(data)
                    setAutocompleteLoadingcompleteemployee(false);
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
                    completeEmployee: [],
                    CompleteEmployeeName: []
                }))
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setUnitCodecompleteemployee([])
            setOpencompleteemployee(false);
            setAutocompleteLoadingcompleteemployee(false);
        }

    }

    const handleGPCAutoCompleteChangecompleteemployee = (event, value) => {

        console.log('Received value:', value); // Debugging line
        if (value === null || value === '-') {
            setvalue(prevValue => ({
                ...prevValue,
                completeEmployee: [],
                CompleteEmployeeName: []
            }));
        }

        if (value && value.EmployeeID) {
            // postapi(value.EmployeeID);
            setvalue(prevValue => ({
                ...prevValue,
                completeEmployee: value.EmployeeID,
                CompleteEmployeeName: value.Firstname
            }));
            console.log('Received value----------:', value);
        } else {
            console.log('Value or value.EmployeeID is null:', value); // Debugging line
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
                          id="completeemployee"
                          className='rounded inputsection py-0 mt-0'
                          required
                          options={unitCodecompleteemployee}
                          getOptionLabel={(option) =>
                              option?.EmployeeID
                                  ? option.EmployeeID + ' - ' + option.Firstname
                                  : ''
                          }
                          getOptionSelected={(option, value) => option.EmployeeID === value.EmployeeID}
                          onChange={handleGPCAutoCompleteChangecompleteemployee}
                          renderOption={(props, option) => (
                              <li {...props} style={{ color: option.isHighlighted ? 'blue' : 'black' }}>
                                  {option.EmployeeID} - {option.Firstname}
                              </li>
                          )}
                          value={value.completeEmployee || null}
                        // value={value.EmployeeID}
                          onInputChange={(eventcompleteemployee, newInputValuecompleteemployee, params) =>
                              handleAutoCompleteInputChangecompleteemployee(eventcompleteemployee, newInputValuecompleteemployee, params)
                          }
                          loading={autocompleteLoadingcompleteemployee}
                          open={opencompleteemployee} // Control open state based on selected value
                          onOpen={() => {
                              // setOpenID(true);
                          }}
                          onClose={() => {
                              setOpencompleteemployee(false);
                          }}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  value={value.completeEmployee || ''}
                                  placeholder='Employee Number'
                                  InputProps={{
                                      ...params.InputProps,
                                      endAdornment: (
                                          <React.Fragment>
                                              {autocompleteLoadingcompleteemployee ? (
                                                  <CircularProgress style={{ color: 'black' }} size={20} />
                                              ) : null}
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
    </div>
  )
}

export default Testing