import { Routes } from '@angular/router';
import { Countrymaster } from './countrymaster/countrymaster';
import { Currencymaster } from './currencymaster/currencymaster';
import { Companymaster } from './companymaster/companymaster';
import { Employeemaster } from './employeemaster/employeemaster';
import { Statemaster } from './statemaster/statemaster';
import { Divisionmaster } from './divisionmaster/divisionmaster';

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
    path: 'state',
    component:Statemaster,
  },
  {
    path: 'division',
    component: Divisionmaster,
  }
];
