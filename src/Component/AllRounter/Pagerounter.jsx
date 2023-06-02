import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Siderbar from '../Siderbar/Siderbar'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
import Viewwork from '../../Pages/Work Request/View modify/Viewwork'
function Pagerounter() {
  
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Home Section----------- */}
                  <Route exact path='/' element={<Fmsmain name="John"/>} />

                  {/* Viewwork */}
                   <Route exact path='/workRequest' element={<Viewwork />} />

              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Pagerounter