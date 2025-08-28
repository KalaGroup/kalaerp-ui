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
import { Component } from '@angular/core';
import { Companyentitytypemaster } from './companyentitytypemaster/companyentitytypemaster';


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
    path: 'companyentitytype',
    component: Companyentitytypemaster,
  }
];
