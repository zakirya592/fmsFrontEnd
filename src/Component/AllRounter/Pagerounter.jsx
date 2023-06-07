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
import TradeMaintenance from '../../Pages/Setup&Configuration/WORK TRADE MAINTENANCE/TradeMaintenance'
import Departmentmaintence from '../../Pages/Setup&Configuration/Department maintence/Departmentmaintence'
import Failurecode from '../../Pages/Setup&Configuration/Failure code/Failurecode'
import Soluctioncode from '../../Pages/Setup&Configuration/Soluction code/Soluctioncode'
import Assecttypesmaintence from '../../Pages/Setup&Configuration/Assect types maintence/Assecttypesmaintence'
import Assectcategory from '../../Pages/Setup&Configuration/Assect category/Assectcategory'
import Assectsubcategory from '../../Pages/Setup&Configuration/Assect subcategory/Assectsubcategory'
function Pagerounter() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ---------Home Section----------- */}
          <Route exact path='/' element={<Fmsmain name="John" />} />

          {/*=====================  Viewwork =====================  */}
          <Route exact path='/workRequest' element={<Viewwork />} />

          {/*=====================  Word Order=====================   */}
          <Route exact path='/workorder' element={<WorkOrder />} />

          {/*=========== Location Management==============  */}
          <Route exact path='/locationmanagement' element={<LocationManagement />} />

          {/*===================== Setup & Configuration================== */}
          <Route exact path='/setupConfiguration' element={<SetupAndConfiguration />} />
          {/*TradeMaintenance*/}
          <Route exact path='/TradeMaintenance' element={<TradeMaintenance />} />
          {/*Departmentmaintence*/}
          <Route exact path='/Departmentmaintence' element={<Departmentmaintence />} />
          {/*Failurecode*/}
          <Route exact path='/Failurecodemaintence' element={<Failurecode />} />
          {/*Soluctioncode*/}
          <Route exact path='/Soluctioncodemaintence' element={<Soluctioncode />} />
          {/*Assecttypesmaintence*/}
          <Route exact path='/Assecttypesmaintence' element={<Assecttypesmaintence />} />
          {/*Assectcategory*/}
          <Route exact path='/Assectcategorymaintence' element={<Assectcategory />} />
          {/*Assectsubcategory*/}
          <Route exact path='/Assectsubcategorymaintence' element={<Assectsubcategory />} />

          {/* ================View/Modify Preventive Maintenance* ==================*/}
          <Route exact path='/Preventive' element={<PreventiveView />} />

          {/*=====================  View/Modify Cleaning Works* ===================== */}
          <Route exact path='/Cleaning' element={<Cleaningworksview />} />

          {/* ===================== Asset Management=====================  */}
          <Route exact path='/assetmanagement' element={<AssetManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pagerounter