import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
import Viewwork from '../../Pages/Work Request/View modify/Viewwork'
import WorkRequest from '../../Pages/Work Request/View modify/WorkRequest'
import WorkOrder from "../../Pages/WorkOrder/WorkOrder"
import LocationManagement from '../../Pages/LocationManagement/LocationManagement'
import SetupAndConfiguration from '../../Pages/Setup&Configuration/SetupAndConfiguration'
import PreventiveView from '../../Pages/Preventive Maintenance/PreventiveView'
import Cleaningworksview from '../../Pages/Cleaning Works/Cleaningworksview'
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
import CreateWorkRequest from '../View work/CreateWorkRequest'
import Updataworktype from '../../Pages/Setup&Configuration/Work type manintance/Updataworktype'
import Updataworktrade from '../../Pages/Setup&Configuration/Work trade/Updataworktrade'
import Updataworkstatus from '../../Pages/Setup&Configuration/Work Status/Updataworkstatus'
import Updatworkpriority from '../../Pages/Setup&Configuration/Work Priority/Updatworkpriority'
import Updataworkcategory from '../../Pages/Setup&Configuration/Work Category/Updataworkcategory'
import Updatadepartment from './setup configuration/Department/Updatadepartment'
import Gender from '../../Pages/Setup&Configuration/Gender/Gender'
import Titless from '../../Pages/Setup&Configuration/Prm Title/Titless'
import Maritalstatus from '../../Pages/Setup&Configuration/Marital Status/Maritalstatus'
import Maintablemaster from '../../Pages/Asset Management/Asset Master/Maintablemaster'
import UpdataAssetmaster from '../../Pages/Asset Management/Asset Master/UpdataAssetmaster'
import ViewAssmaster from '../../Pages/Asset Management/Asset Master/ViewAssmaster'
import Maintransactiontable from '../../Pages/Asset Management/Asset Transactions/Maintransactiontable'
import Viewtransaction from '../../Pages/Asset Management/Asset Transactions/Viewtransaction'
import Updatatransaction from '../../Pages/Asset Management/Asset Transactions/Updatatransaction'
import WarrantyPeriod from '../../Pages/Setup&Configuration/Warranty Period/WarrantyPeriod'
import Employeemaster from '../../Pages/Setup&Configuration/Employee Maste/Employeemaster'
import Viewemployeemaster from '../../Pages/Setup&Configuration/Employee Maste/Viewemployeemaster'
import NewEmployeemaster from './setup configuration/Employee Master/NewEmployeemaster'
import Updataemployeemaster from '../../Pages/Setup&Configuration/Employee Maste/Updataemployeemaster'
function Pagerounter() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ---------Home Section----------- */}
          <Route exact path='/' element={<Fmsmain name="John" />} />
          {/*=====================  work Request=====================   */}
          <Route exact path="/workrequest" element={<WorkRequest/>}/>       
             {/*===================== View workRequest Viewwork =====================  */}
          <Route exact path='/viewworkRequest' element={<Viewwork />} />
          {/* TO anthoer  */}
          <Route exact path='/viewworkRequest/:userId' element={<Viewwork />} />
          {/* create work Request */}
          <Route exact path="/createworkrequest" element={<CreateWorkRequest />} />
          {/*=====================  Word Order=====================   */}
          <Route exact path='/workorder' element={<WorkOrder />} />

          {/*=========== Location Management==============  */}
          <Route exact path='/locationmanagement' element={<LocationManagement />} />
          {/*===================== Setup & Configuration================== */}
          {/*Worketypesmaintance*/}
          <Route exact path='/Worketypes' element={<Worketypesmaintance />} />
          <Route exact path='/Updata/Worktypes/:EmployeeID' element={<Updataworktype />} />
          {/* =================# Set-Up-Work Trade Maintenance-prmWorkTrade=============== */}
          <Route exact path='/WORKTRADE' element={<SetupAndConfiguration />} />
          <Route exact path='/Updata/WORKTRADE/:EmployeeID' element={<Updataworktrade />} />
          {/*Workstatus*/}
          <Route exact path='/Workstatus' element={<Workstatus />} />
          <Route exact path='/Updata/Workstatus/:EmployeeID' element={<Updataworkstatus />} />
          {/*Workpriority*/}
          <Route exact path='/Workpriority' element={<Workpriority />} />
          <Route exact path='/Updata/Updatworkpriority/:EmployeeID' element={<Updatworkpriority />} />
          {/*Workcategory*/}
          <Route exact path='/Workcategory' element={<Workcategory />} />
          <Route exact path='/Updata/workcategory/:EmployeeID' element={<Updataworkcategory />} />
          {/*Departmentmaintence*/}
          <Route exact path='/Departmentmaintence' element={<Departmentmaintence />} />
          <Route exact path='/Updata/department/:EmployeeID' element={<Updatadepartment />} />
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
          {/*TradeMaintenance*/}
          <Route exact path='/TradeMaintenance' element={<TradeMaintenance />} />
          {/*Day*/}
          <Route exact path='/Day' element={<Day />} />
          {/*Frequency*/}
          <Route exact path='/Frequency' element={<Frequency />} />
          {/*Gender*/}
          <Route exact path='/Gender' element={<Gender />} />
          {/*Titles*/}
          <Route exact path='/Titles' element={<Titless />} />
          {/*Maritalstatus*/}
          <Route exact path='/Maritalstatus' element={<Maritalstatus />} />
          {/*Assectcategory*/}
          <Route exact path='/AssetCategory' element={<Assectcategory />} />
          {/*Assectsubcategory*/}
          <Route exact path='/AssetsubCategory' element={<Assectsubcategory />} />
          {/*Assectcondition*/}
          <Route exact path='/Assectcondition' element={<Assectcondition />} />
          {/*Nationality*/}
          <Route exact path='/Nationality' element={<Nationality />} />
             {/*Employeemaster*/}
          <Route exact path='/Employeemaster' element={<Employeemaster />} />
          <Route exact path='/Create/Employeemaster' element={<NewEmployeemaster />} />
          <Route exact path='/View/Employeemaster/:userId' element={<Viewemployeemaster />} />
          <Route exact path='/Updata/Employeemaster/:userId' element={<Updataemployeemaster />} />
          {/*WarrantyPeriod*/}
          <Route exact path='/WarrantyPeriod' element={<WarrantyPeriod />} />


          {/* ================View/Modify Preventive Maintenance* ==================*/}
          <Route exact path='/Preventive' element={<PreventiveView />} />

          {/*=====================  View/Modify Cleaning Works* ===================== */}
          <Route exact path='/Cleaning' element={<Cleaningworksview />} />

          {/* Asset Management */}
          <Route exact path='/AssetMasters' element={<Maintablemaster />} />
          <Route exact path='/View/Assetmaster/:userId' element={<ViewAssmaster />} />
          <Route exact path='/Updata/Assetmaster/:userId' element={<UpdataAssetmaster />} />

          <Route exact path='AssetTransaction' element={<Maintransactiontable />} />
          <Route exact path='/View/transaction' element={<Viewtransaction />} />
          <Route exact path='/Updata/transaction' element={<Updatatransaction />} />
          
          {/* System Modules */}
          <Route exact path="/systemmodules" element={<SystemModules />} />

          {/* User Authourity Levels */}
          <Route exact path="/userauthority" element={<UserAuthority />} />

          {/* User Credentials  */}
          <Route exact path="/userCredentials" element={<UserCredentials />} />

          {/* userSystemAccess */}
          <Route exact path="/usersystemaccess" element={<UserSystemAccess />} />
          {/* ===================== Asset Management=====================  */}
          {/* <Route exact path='/assetmanagement' element={<AssetManagement />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pagerounter