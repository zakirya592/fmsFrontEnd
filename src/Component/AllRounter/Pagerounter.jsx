import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fmsmain from '../../Pages/FMS Main/Fmsmain'
import Viewwork from '../../Pages/Work Request/View modify/Viewwork'
import WorkRequest from '../../Pages/Work Request/View modify/WorkRequest'
import WorkOrder from "../../Pages/WorkOrder/WorkOrder"
import LocationManagement from '../../Pages/LocationManagement/LocationManagement'
import SetupAndConfiguration from '../../Pages/Setup&Configuration/SetupAndConfiguration'
import MainPreventiveMaintenance from '../../Pages/Preventive Maintenance/MainPreventiveMaintenance'
import ViewPreventive from '../../Pages/Preventive Maintenance/ViewPreventive'
import UpdatePreventive from '../../Pages/Preventive Maintenance/UpdatePreventive'
import CreatePreventiveMaintenance from '../../Pages/Preventive Maintenance/CreatePreventiveMaintainance'
import MainCleaningWork from '../../Pages/Cleaning Works/MainCleaningWorks'
import CreateCleaningWork from '../../Pages/Cleaning Works/CreateCleaningWorks'
import Cleaningworksview from '../../Pages/Cleaning Works/Cleaningworksview'
import UpdateCleaningWork from '../../Pages/Cleaning Works/UpdateCleaningWork'
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
import EmployeeStatus from '../../Pages/Setup&Configuration/EmployeeStatus/EmployeeStatus'
import EmployeeDesignation from '../../Pages/Setup&Configuration/EmployeeDesignation/EmployeeDesignation'
import Supplier from '../../Pages/Setup&Configuration/Supplier/Supplier'
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
import CreateAssetMaster from '../../Pages/Asset Management/Asset Master/CreateAssetMaster'
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
import CreateSupplier from './setup configuration/Supplier/CreateSupplier'
import ViewSupplier from '../../Pages/Setup&Configuration/Supplier/ViewSupplier'
import UpdateSupplier from '../../Pages/Setup&Configuration/Supplier/UpdateSupplier'

import Updataemployeemaster from '../../Pages/Setup&Configuration/Employee Maste/Updataemployeemaster'
import PurchaserequestView from '../../Pages/Purchasing Management/Purchase Request/Purchase Request View/PurchaserequestView'
import Purachaseview from '../../Pages/Purchasing Management/Purchase Orders/Purchase Order View/Purachaseview'
import Goodsreceiptsview from '../../Pages/Purchasing Management/Goods Receipts/Goods Receipts View/Goodsreceiptsview'
import GoodsreturnView from '../../Pages/Purchasing Management/Goods Return/Goods Return View/GoodsreturnView'
import Updataworkrequest from '../../Pages/Work Request/updata Work request/Updataworkrequest'
import Addassetcode from '../../Pages/Work Request/Add Asset code/Addassetcode'
import Mainworkordeer from '../../Pages/WorkOrder/Mainworkordeer'
import Updataorderwork from '../../Pages/WorkOrder/Updataorderwork'
import Viewworkorder from '../../Pages/WorkOrder/Viewworkorder'
import Testing from '../../Pages/WorkOrder/Testing'
function Pagerounter() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ---------Home Section----------- */}
          <Route exact path='/' element={<Fmsmain name="John" />} />
          {/*=====================  work Request=====================   */}
          
          <Route exact path="/workrequest" element={<WorkRequest />} />
          <Route exact path="/testing" element={<Testing />} />
          {/*===================== View workRequest Viewwork =====================  */}
          <Route exact path='/viewworkRequest' element={<Viewwork />} />
          {/* TO anthoer  */}
          <Route exact path='/viewworkRequest/:userId' element={<Viewwork />} />
          <Route exact path='/WorkRequest/Updata/:userId' element={<Updataworkrequest />} />
          {/* create work Request */}
          <Route exact path="/createworkrequest" element={<CreateWorkRequest />} />
          {/* create asset master */}
          <Route exact path="/CreateAssetMaster" element={<CreateAssetMaster />} />
          {/* Addassetcode */}
          <Route exact path='/Addassetcode' element={<Addassetcode />} />
          {/*=====================  Word Order=====================   */}
          <Route exact path="/workorder" element={<Mainworkordeer />} />
          <Route exact path='/createworkorder' element={<WorkOrder />} />
          <Route exact path='/Workorder/Updata/:userId' element={<Updataorderwork />} />
          <Route exact path='/Workorder/View/:userId' element={<Viewworkorder />} />

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
          {/*assetType*/}
          <Route exact path='/assettype' element={<Assecttypesmaintence />} />
          {/*Assectcategory*/}
          <Route exact path='/AssetCategory' element={<Assectcategory />} />
          {/*Assectsubcategory*/}
          <Route exact path='/AssetsubCategory' element={<Assectsubcategory />} />
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
          {/* Employee Status */}
          <Route exact path="/employeeStatus" element ={<EmployeeStatus/>}/>
          {/* Employee Designation */}
          <Route exact path="/EmployeeDesignation" element ={<EmployeeDesignation/>}/>
          {/* Supplier */}
          <Route exact path="/Supplier" element ={<Supplier/>}/>
          <Route exact path='/Create/Supplier' element={<CreateSupplier />} />
          <Route exact path='/View/Supplier/:userId' element={<ViewSupplier />} />
          <Route exact path='/Update/Supplier/:userId' element={<UpdateSupplier />} />



          {/* ================ Preventive Maintenance* ==================*/}
          <Route exact path='/Preventive' element={<MainPreventiveMaintenance />} />
          <Route exact path='/CreatePreventive' element={<CreatePreventiveMaintenance />} />
          <Route exact path='/Preventive/view/:userId' element={<ViewPreventive />} />
          <Route exact path='/Preventive/update/:userId' element={<UpdatePreventive />} />
          {/*=====================  View/Modify Cleaning Works* ===================== */}
          <Route exact path='/Cleaning' element={<MainCleaningWork />} />
          <Route exact path='/CreateCleaningWork' element={<CreateCleaningWork />} />
          <Route exact path='/Cleaning/view/:userid' element={<Cleaningworksview />} />
          <Route exact path='/Cleaning/update/:userid' element={<UpdateCleaningWork />} />


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

          {/* PurchaserequestView */}
          <Route exact path="/PurchaserequestView" element={<PurchaserequestView />} />

          {/* Purachaseview */}
          <Route exact path="/Purachaseorderview" element={<Purachaseview />} />

          {/* Purachaseview */}
          <Route exact path="/Goodsreceiptsview" element={<Goodsreceiptsview />} />

          {/* GoodsreturnView */}
          <Route exact path="/GoodsreturnView" element={<GoodsreturnView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pagerounter