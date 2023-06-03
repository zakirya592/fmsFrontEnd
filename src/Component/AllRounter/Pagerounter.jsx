import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
import Viewwork from '../../Pages/Work Request/View modify/Viewwork'
import LocationManagement from '../../Pages/LocationManagement/LocationManagement'
function Pagerounter() {
  
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Home Section----------- */}
                  <Route exact path='/' element={<Fmsmain name="John"/>} />

                  {/* Viewwork */}
                   <Route exact path='/workRequest' element={<Viewwork />} />

                  {/* Location Management */}
                  <Route exact path='/locationmanagement' element={<LocationManagement/>}/>

              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Pagerounter