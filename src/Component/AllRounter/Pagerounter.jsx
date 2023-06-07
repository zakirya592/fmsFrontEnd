import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
import Viewwork from '../../Pages/Work Request/View modify/Viewwork'
import WorkOrder from "../../Pages/WorkOrder/WorkOrder"
import LocationManagement from '../../Pages/LocationManagement/LocationManagement'
import SetupAndConfiguration from '../../Pages/Setup&Configuration/SetupAndConfiguration'
import PreventiveView from '../../Pages/Preventive Maintenance/PreventiveView'
import Cleaningworksview from '../../Pages/Cleaning Works/Cleaningworksview'
import AssetManagement from '../../Pages/Asset Management/AssetManagement'
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

          {/* Location Management na */}
          <Route exact path='/locationmanagement' element={<LocationManagement />} />

          {/* Setup & Configuration */}
          <Route exact path='/setupConfiguration' element={<SetupAndConfiguration />} />

          {/* View/Modify Preventive Maintenance* */}
          <Route exact path='/Preventive' element={<PreventiveView />} />

          {/* View/Modify Cleaning Works* */}
          <Route exact path='/Cleaning' element={<Cleaningworksview />} />

          {/* Asset Management */}
          <Route exact path='/assetmanagement' element={<AssetManagement/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pagerounter