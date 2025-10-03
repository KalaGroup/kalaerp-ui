import { Routes } from '@angular/router';
import { Countrymaster } from './countrymaster/countrymaster';
import { Currencymaster } from './currencymaster/currencymaster';
import { Companymaster } from './companymaster/companymaster';
import { Employeemaster } from './employeemaster/employeemaster';
import { Statemaster } from './statemaster/statemaster';
import { Divisionmaster } from './divisionmaster/divisionmaster';
import { Workstationmaster } from './workstationmaster/workstationmaster';
import { Profitcentermaster } from './profitcentermaster/profitcentermaster';
import { Qualificationmaster } from './qualificationmaster/qualificationmaster';
import { Recruitmentattributemaster } from './recruitmentattributemaster/recruitmentattributemaster';
import { employeetypemaster } from './employeetypemaster/employeetypemaster';
import { Component } from '@angular/core';
import { Companyentitytypemaster } from './companyentitytypemaster/companyentitytypemaster';
import { Petrolallowancemaster } from './petrolallowancemaster/petrolallowancemaster';
import { Employeemasterupdationformaster } from './employeemasterupdationformaster/employeemasterupdationformaster';
import { Qualificationtypemaster } from './qualificationtypemaster/qualificationtypemaster';
import { AddEditHoliday } from './holidaymaster/add-edit-holiday/add-edit-holiday';
import { Holidaymaster } from './holidaymaster/holidaymaster';
import { Responsibilitiesmaster } from './responsibilitiesmaster/responsibilitiesmaster';
import { Departmentmaster } from './departmentmaster/departmentmaster';
import { Rolesmaster } from './rolesmaster/rolesmaster';
import { Locationmaster } from './locationmaster/locationmaster';
import { Classoftravelmaster } from './classoftravelmaster/classoftravelmaster';
import { Facilitymaster } from './facilitymaster/facilitymaster';
import { Ctcmaster } from './ctcmaster/ctcmaster';
import { Authoritiesmaster } from './authoritiesmaster/authoritiesmaster';
import { Recruitmentstagestatusmaster } from './recruitmentstagestatusmaster/recruitmentstagestatusmaster';
import { Activitymaster } from './activitymaster/activitymaster';
import { Kpamaster } from './kpamaster/kpamaster';
import { CitymasterComponent } from './citymaster/citymaster';
import { Gradedesignationfacilityassignment } from './gradedesignationfacilityassignment/gradedesignationfacilityassignment/gradedesignationfacilityassignment';
import { Recruitmentreferencemasterservice } from '@shared/services/hr/RecruitmentReferenceMaster/recruitmentreferencemaster';
import { Recruitmentreferencemaster } from './recruitmentreferencemaster/recruitmentreferencemaster';
import { Recruitmentmaster } from './recruitmentmaster/recruitmentmaster';
import { Profitcenterbudget } from './profitcenterbudget/profitcenterbudget';
import { Shiftmaster } from './shiftmaster/shiftmaster';
import { Districtmaster } from './districtmaster/districtmaster';
import { Workstationbudget } from './workstationbudget/workstationbudget';
import { Leavetypemaster } from './leavetypemaster/leavetypemaster';
import { Offerletter } from './offerletter/offerletter';
import { Employeeleavebalances } from './employeeleavebalances/employeeleavebalances';
import { Leaveapplications } from './leaveapplications/leaveapplications';
import { Positionmaster } from './positionmaster/positionmaster';
import { Departmentbudget } from './departmentbudget/departmentbudget';
import { Dailyattendance } from './dailyattendance/dailyattendance';
import { Kalaerppagedetails } from './kalaerppagedetails/kalaerppagedetails';
import { Gatepasstype } from './gatepasstype/gatepasstype';

export const routes: Routes = [
  {
    path: 'country',
    component: Countrymaster,
  },
  {
    path: 'currency',
    component: Currencymaster,
  },
  {
    path: 'company',
    component: Companymaster,
  },
  {
    path: 'employee',
    component: Employeemaster,
  },
  {
    path: 'state',
    component: Statemaster,
  },
  {
    path: 'division',
    component: Divisionmaster,
  },

  {
    path: 'workstation',
    component: Workstationmaster,
  },
  {
    path: 'profitcenter',
    component: Profitcentermaster,
  },
  {
    path: 'qualification',
    component: Qualificationmaster,
  },
  {
    path: 'recruitmentattributemaster',
    component: Recruitmentattributemaster,
  },
  {
    path: 'employeetypemaster',
    component: employeetypemaster,
  },
  {
    path: 'companyentitytype',
    component: Companyentitytypemaster,
  },
  {
    path: 'petrolallowancemaster',
    component: Petrolallowancemaster,
  },
  {
    path: 'employeeupdationfor',
    component: Employeemasterupdationformaster,
  },
  {
    path: 'qualificationtype',
    component: Qualificationtypemaster,
  },
  {
    path: 'holidaymaster',
    component: Holidaymaster,
  },
  {
    path: 'responsibilitiesmaster',
    component: Responsibilitiesmaster,
  },
  {
    path: 'departmentmaster',
    component: Departmentmaster,
  },
  {
    path: 'rolesmaster',
    component: Rolesmaster,
  },
  {
    path: 'location',
    component: Locationmaster,
  },
  {
    path: 'classoftravel',
    component: Classoftravelmaster,
  },
  {
    path: 'facility',
    component: Facilitymaster,
  },
  {
    path: 'ctcmaster',
    component: Ctcmaster,
  },
  {
    path: 'authoritiesmaster',
    component: Authoritiesmaster,
  },
  {
    path: 'recruitmentstagestatusmaster',
    component: Recruitmentstagestatusmaster,
  },
  {
    path: 'activity',
    component: Activitymaster,
  },
  {
    path: 'kpa',
    component: Kpamaster,
  },
  {
    path: 'citymaster',
    component: CitymasterComponent,
  },
  {
    path: 'gradedesignationfacilityassignment',
    component: Gradedesignationfacilityassignment,
  },
  {
    path: 'recruitmentreferencemaster',
    component: Recruitmentreferencemaster,
  },
  {
    path: 'recruitmentmaster',
    component: Recruitmentmaster,
  },
  {
    path: 'profitcenterbudget',
    component: Profitcenterbudget,
  },
  {
    path: 'shiftmaster',
    component: Shiftmaster,
  },
  {
    path: 'distictmaster',
    component: Districtmaster,
  },
  {
    path: 'workstationbudget',
    component: Workstationbudget,
  },
  {
    path: 'leavetypemaster',
    component: Leavetypemaster,
  },
  {
    path: 'offerletter',
    component: Offerletter,
  },
  {
    path: 'employeeleavebalances',
    component: Employeeleavebalances
  },
  {
    path: 'leaveapplications',
    component: Leaveapplications
  },
  {
    path: 'employeeleavebalances',
    component: Employeeleavebalances,
  },
  {
    path: 'positionmaster',
    component: Positionmaster,
  },
  {
    path: 'departmentbudget',
    component: Departmentbudget
  },
  {
    path: 'dailyattendance',
    component: Dailyattendance,
  },
  {
    path: 'kalaerppagedetails',
    component: Kalaerppagedetails,
  },
  {
    path: 'gatepasstype',
    component: Gatepasstype,
  }
];
