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
import { Departmentmaster } from './departmentmaster/departmentmaster';
import { Rolesmaster } from './rolesmaster/rolesmaster';
import { Rolesdetails } from './rolesdetails/rolesdetails';
import { Locationmaster } from './locationmaster/locationmaster';
import { Classoftravelmaster } from './classoftravelmaster/classoftravelmaster';


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
    path: 'departmentmaster',
    component: Departmentmaster,
  },
  {
    path: 'rolesmaster',
    component: Rolesmaster,
  },
  {
    path: 'rolesdetails',
    component: Rolesdetails,
  },
  {
    path: 'location',
    component: Locationmaster
  },
    {
    path: 'classoftravel',
    component: Classoftravelmaster
  },
];
