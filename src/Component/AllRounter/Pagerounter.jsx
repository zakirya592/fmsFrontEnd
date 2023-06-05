import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
import Viewwork from '../../Pages/Work Request/View modify/Viewwork'
import WorkOrder from "../../Pages/WorkOrder/WorkOrder"
import LocationManagement from '../../Pages/LocationManagement/LocationManagement'
import SetupAndConfiguration from '../../Pages/Setup&Configuration/SetupAndConfiguration'
function Pagerounter() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ---------Home Section----------- */}
          <Route exact path='/' element={<Fmsmain name="John" />} />

          {/* Viewwork */}
          <Route exact path='/workRequest' element={<Viewwork />} />

          {/* Word Order  */}
          <Route exact path='/workorder' element={<WorkOrder />} />

          {/* Location Management */}
          <Route exact path='/locationmanagement' element={<LocationManagement />} />

          {/* Setup & Configuration */}
          <Route exact path='/setupConfiguration' element={<SetupAndConfiguration />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pagerounter