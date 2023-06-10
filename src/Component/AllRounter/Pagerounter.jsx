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
import SystemModules from "../../Pages/UserManagement/SystemModules/SystemModules"
import UserAuthority from '../../Pages/UserManagement/UserAuthority/UserAuthorityLevel'
import UserCredentials from '../../Pages/UserManagement/UserCredentials/UserCredentials'
import UserSystemAccess from '../../Pages/UserManagement/UserSystemAccess/UserSystemAccess'
import TradeMaintenance from '../../Pages/Setup&Configuration/WORK TRADE MAINTENANCE/TradeMaintenance'
import Departmentmaintence from '../../Pages/Setup&Configuration/Department maintence/Departmentmaintence'
import Failurecode from '../../Pages/Setup&Configuration/Failure code/Failurecode'
import Soluctioncode from '../../Pages/Setup&Configuration/Soluction code/Soluctioncode'
import Assecttypesmaintence from '../../Pages/Setup&Configuration/Assect types maintence/Assecttypesmaintence'
import Assectcategory from '../../Pages/Setup&Configuration/Assect category/Assectcategory'
import Assectsubcategory from '../../Pages/Setup&Configuration/Assect subcategory/Assectsubcategory'
import Worketypesmaintance from '../../Pages/Setup&Configuration/Work type manintance/Worketypesmaintance'
import Assectcondition from '../../Pages/Setup&Configuration/Assect Condition/Assectcondition'
import Workpriority from '../../Pages/Setup&Configuration/Work Priority/Workpriority'
import Workstatus from '../../Pages/Setup&Configuration/Work Status/Workstatus'
import Buildingcode from '../../Pages/Setup&Configuration/Building Code/Buildingcode'
import Loactioncode from '../../Pages/Setup&Configuration/location Code/Loactioncode'
import ProblemCategory from '../../Pages/Setup&Configuration/Problem Category/ProblemCategory'
import Workcategory from '../../Pages/Setup&Configuration/Work Category/Workcategory'
import RequestStatus from '../../Pages/Setup&Configuration/Request Status/RequestStatus'
import Day from '../../Pages/Setup&Configuration/Day/Day'
import Frequency from '../../Pages/Setup&Configuration/Frequency/Frequency'
import Nationality from '../../Pages/Setup&Configuration/Nationality/Nationality'
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
          {/* =================# Set-Up-Work Trade Maintenance-prmWorkTrade=============== */}
          <Route exact path='/WORKTRADE' element={<SetupAndConfiguration />} />
          {/*Worketypesmaintance*/}
          <Route exact path='/Worketypes' element={<Worketypesmaintance />} />
          {/*Workstatus*/}
          <Route exact path='/Workstatus' element={<Workstatus />} />
          {/*Workpriority*/}
          <Route exact path='/Workpriority' element={<Workpriority />} />
          {/*Workcategory*/}
          <Route exact path='/Workcategory' element={<Workcategory />} />
          {/*TradeMaintenance*/}
          <Route exact path='/TradeMaintenance' element={<TradeMaintenance />} />
          {/*Departmentmaintence*/}
          <Route exact path='/Departmentmaintence' element={<Departmentmaintence />} />
          {/*Buildingcode*/}
          <Route exact path='/Buildingcode' element={<Buildingcode />} />
          {/*Loactioncode*/}
          <Route exact path='/Loactioncode' element={<Loactioncode />} />
          {/*ProblemCategory*/}
          <Route exact path='/ProblemCategory' element={<ProblemCategory />} />
          {/*RequestStatus*/}
          <Route exact path='/RequestStatus' element={<RequestStatus />} />
          {/*Failurecode*/}
          <Route exact path='/Failurecode' element={<Failurecode />} />
          {/*Soluctioncode*/}
          <Route exact path='/Soluctioncode' element={<Soluctioncode />} />
          {/*Day*/}
          <Route exact path='/Day' element={<Day />} />
          {/*Frequency*/}
          <Route exact path='/Frequency' element={<Frequency />} />
          {/*Assecttypesmaintence*/}
          <Route exact path='/Assecttypes' element={<Assecttypesmaintence />} />
          {/*Assectcategory*/}
          <Route exact path='/AssetCategory' element={<Assectcategory />} />
          {/*Assectsubcategory*/}
          <Route exact path='/AssetsubCategory' element={<Assectsubcategory />} />
          {/*Assectcondition*/}
          <Route exact path='/Assectcondition' element={<Assectcondition />} />
          {/*Nationality*/}
          <Route exact path='/Nationality' element={<Nationality />} />


          {/* ================View/Modify Preventive Maintenance* ==================*/}
          <Route exact path='/Preventive' element={<PreventiveView />} />

          {/*=====================  View/Modify Cleaning Works* ===================== */}
          <Route exact path='/Cleaning' element={<Cleaningworksview />} />

          {/* Asset Management */}
          <Route exact path='/assetmanagement' element={<AssetManagement/>}/>

          {/* System Modules */}
          <Route exact path = "/systemmodules" element ={<SystemModules/>}/>

          {/* User Authourity Levels */}
          <Route exact path= "/userauthority" element = {<UserAuthority/>}/>

          {/* User Credentials  */}
          <Route exact path = "/userCredentials" element = {<UserCredentials/>}/>

          {/* userSystemAccess */}
          <Route exact path="/usersystemaccess" element={<UserSystemAccess/>}/>
          {/* ===================== Asset Management=====================  */}
          <Route exact path='/assetmanagement' element={<AssetManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pagerounter