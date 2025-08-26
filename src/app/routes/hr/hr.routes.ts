import { Routes } from '@angular/router';
import { Countrymaster } from './countrymaster/countrymaster';
import { Currencymaster } from './currencymaster/currencymaster';
import { Companymaster } from './companymaster/companymaster';
import { Employeemaster } from './employeemaster/employeemaster';
import { Workstationmaster } from './workstationmaster/workstationmaster';

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
    component:Companymaster,
  },
  {
    path: 'employee',
    component: Employeemaster,
  },
  {
    path: 'workstation',
    component: Workstationmaster,
  }
];
