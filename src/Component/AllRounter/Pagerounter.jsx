import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Siderbar from '../Siderbar/Siderbar'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
function Pagerounter() {
  return (
    <>
          <BrowserRouter>
              <Routes>
                  {/* ---------Home Section----------- */}
                  <Route exact path='/' element={<Fmsmain />} />

              </Routes>
          </BrowserRouter>
    </>
  )
}

export default Pagerounter