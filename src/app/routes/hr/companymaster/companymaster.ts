import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
//import { companyService } from '../hr.service';
import { Companyservice } from '@shared/services/hr/company/companyservice';
import { ICompany } from '@shared/interfaces/hr/company';
import { ICountry } from '@shared/interfaces/hr/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import{ AddEditCompany } from './add-edit-company/add-edit-company';

@Component({
  selector: 'app-companymaster',
  imports: [CommonModule,MatTableModule,MatCardModule,MatDividerModule,MatButtonModule,MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader,MatDialogModule
  ],
  templateUrl: './companymaster.html',
  styleUrl: './companymaster.scss'
})
export class Companymaster {
   private readonly translate = inject(TranslateService);
      @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
       dialogRef!: MatDialogRef<any>;

     countries: ICompany[] = [];
     showForm = false;
     countryModel: any = {};
     editIndex: number | null = null;

     multiSelectable = true;
     rowSelectable = true;
     hideRowSelectionCheckbox = false;
     showToolbar = true;
     columnHideable = true;
     columnSortable = true;
     columnPinnable = true;
     rowHover = true;
     rowStriped = true;
     showPaginator = true;
     expandable = false;
     columnResizable = false;

     isLoading = false;
     list: any[] = [];
     isConfigExpanded: boolean = false;


     constructor(private fb: FormBuilder,private companyService: Companyservice,private dialog: MatDialog,private toastService:Toastservice) {}
       ngOnInit(): void {
        this.loadAllCompanies();

      }

       toggleConfigSection(): void {
       this.isConfigExpanded = !this.isConfigExpanded;
     }

    columns: MtxGridColumn[] = [
  {
    header: this.translate.stream('SNo'),
    field: 'SNo',
    sortable: true,
    minWidth: 60,
    width: '60px',
  },
  {
    header: this.translate.stream('Company Code'),
    field: 'CompanyCode',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Company Name'),
    field: 'CompanyName',
    sortable: true,
    minWidth: 200,
    width: '200px',
  },
  {
    header: this.translate.stream('Short Name'),
    field: 'ShortName',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Email'),
    field: 'EmailId',
    sortable: true,
    minWidth: 180,
    width: '180px',
  },
  {
    header: this.translate.stream('Phone'),
    field: 'PhoneNumber',
    sortable: true,
    minWidth: 140,
    width: '140px',
  },
  {
    header: this.translate.stream('Registered Address'),
    field: 'RegisteredAddress',
    sortable: true,
    minWidth: 200,
    width: '200px',
    // Optional: Add tooltip for long addresses
    //showExpand: true,
  },
  {
    header: this.translate.stream('Registered City'),
    field: 'RegisteredCityName',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Registered District'),
    field: 'RegisteredDistrictName',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Registered State'),
    field: 'RegisteredStateName',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Registered Country'),
    field: 'RegisteredCountryName',
    sortable: true,
    minWidth: 130,
    width: '130px',
  },
  {
    header: this.translate.stream('Pin Code'),
    field: 'RegisteredPinCode',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Corporate Address'),
    field: 'CorporateAddress',
    sortable: true,
    minWidth: 200,
    width: '200px',
  },
  {
    header: this.translate.stream('Corporate Country'),
    field: 'CorporateCountryName',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Corporate State'),
    field: 'CorporateStateName',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Corporate District'),
    field: 'CorporateDistrictName',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Corporate City'),
    field: 'CorporateCityName',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Corporate Pin Code'),
    field: 'CorporatePinCode',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Website'),
    field: 'Website',
    sortable: true,
    minWidth: 160,
    width: '160px',
    // Make website clickable
    type: 'link',
  },
  {
    header: this.translate.stream('Social Media'),
    field: 'SocialMedialink',
    sortable: true,
    minWidth: 160,
    width: '160px',
    // Make website clickable
    type: 'link',
  },
  {
    header: this.translate.stream('PAN'),
    field: 'Pan',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('GST'),
    field: 'Gst',
    sortable: true,
    minWidth: 150,
    width: '150px',
  },
  {
    header: this.translate.stream('CIN'),
    field: 'Cin',
    sortable: true,
    minWidth: 180,
    width: '180px',
  },
  {
    header: this.translate.stream('Established Date'),
    field: 'EstablishedDate',
    sortable: true,
    minWidth: 130,
    width: '130px',
    type: 'date',
    typeParameter: {
      format: 'dd/MM/yyyy'
    }
  },
  {
    header: this.translate.stream('Entity Type'),
    field: 'CompanyEntityTypeName',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Currency'),
    field: 'CurrencyName',
    sortable: true,
    minWidth: 100,
    width: '100px',
  },
  {
    header: this.translate.stream('Fiscal Year Start'),
    field: 'FiscalYearStart',
    sortable: true,
    minWidth: 130,
    width: '130px',
    type: 'date',
    typeParameter: {
      format: 'dd/MM/yyyy'
    }
  },
  {
  header: this.translate.stream('Logo'),
  field: 'Logo',
  sortable: false,
  minWidth: 80,
  width: '80px',
  type: 'image', // Use built-in image type instead of cellTemplate
  typeParameter: {
    // style: {
    //   width: '40px',
    //   height: '40px',
    //   borderRadius: '8px',
    //   objectFit: 'contain',
    // },
   // fallback: 'assets/images/default-company-logo.png'
  }
},

  {
    header: this.translate.stream('Parent Company'),
    field: 'ParentCompanyName',
    sortable: true,
    minWidth: 150,
    width: '150px',
  },
  {
    header: this.translate.stream('Ownership %'),
    field: 'OwnershipPercentage',
    sortable: true,
    minWidth: 100,
    width: '100px',
    type: 'number',
    typeParameter: {
      digitsInfo: '1.0-2'
    }
  },
  {
    header: this.translate.stream('AI Insights'),
    field: 'AiinsightsEnabled',
    sortable: true,
    minWidth: 100,
    width: '100px',
    type: 'tag',
    tag: {
      true: { text: 'Enabled', color: 'green-100' },
      false: { text: 'Disabled', color: 'red-100' }
    }
  },
  {
    header: this.translate.stream('Predictive Analytics Level'),
    field: 'PredictiveAnalyticsLevel',
    sortable: true,
    minWidth: 130,
    width: '130px',
  },
  {
    header: this.translate.stream('Inter-Company Transactions'),
    field: 'InterCompanyTransactions',
    sortable: true,
    minWidth: 160,
    width: '160px',
    type: 'tag',
    tag: {
      true: { text: 'Yes', color: 'green-100' },
      false: { text: 'No', color: 'gray-100' }
    }
  },
  {
    header: this.translate.stream('Location Advantage Score'),
    field: 'LocationAdvantageScore',
    sortable: true,
    minWidth: 120,
    width: '120px',
    type: 'number',
    typeParameter: {
      digitsInfo: '1.1-1'
    }
  },
  {
    header: this.translate.stream('Talent Accessiblity Score'),
    field: 'TalentAccessibilityScore',
    sortable: true,
    minWidth: 110,
    width: '110px',
    type: 'number',
    typeParameter: {
      digitsInfo: '1.1-1'
    }
  },
  {
    header: this.translate.stream('Company Remark'),
    field: 'CompanyRemark',
    sortable: true,
    minWidth: 110,
    width: '110px',
  },
  {
    header: this.translate.stream('Cost Efficiency Rating'),
    field: 'CostEfficiencyRating',
    sortable: true,
    minWidth: 120,
    width: '120px',
    type: 'number',
    typeParameter: {
      digitsInfo: '1.1-1'
    }
  },
  {
    header: this.translate.stream('Authorized'),
    field: 'CompanyIsAuth',
    sortable: true,
    minWidth: 100,
    width: '100px',
    type: 'tag',
    tag: {
      true: { text: 'Yes', color: 'green-100' },
      false: { text: 'No', color: 'red-100' }
    }
  },
  {
    header: this.translate.stream('Status'),
    field: 'CompanyIsActive',
    sortable: true,
    minWidth: 100,
    width: '100px',
    type: 'tag',
    tag: {
      true: { text: 'Active', color: 'green-100' },
      false: { text: 'Inactive', color: 'red-100' }
    }
  },
  {
    header: this.translate.stream('Discard'),
    field: 'CompanyIsDiscard',
    sortable: true,
    minWidth: 100,
    width: '100px',
    type: 'tag',
    tag: {
      true: { text: 'Active', color: 'green-100' },
      false: { text: 'Inactive', color: 'red-100' }
    }
  },
  {
    header: this.translate.stream('Created Date'),
    field: 'CreatedDate',
    sortable: true,
    minWidth: 130,
    width: '130px',
    type: 'date',
    typeParameter: {
      format: 'dd/MM/yyyy HH:mm'
    }
  },
  {
    header: this.translate.stream('Created By'),
    field: 'CreatedBy',
    sortable: true,
    minWidth: 120,
    width: '120px',
  },
  {
    header: this.translate.stream('Company Remark 2'),
    field: 'CompanyRemark2',
    sortable: true,
    minWidth: 110,
    width: '110px',
  },
  {
    header: this.translate.stream('Action'),
    field: 'action',
    minWidth: 200,
    width: '200px',
    pinned: 'right',
    type: 'button',
    buttons: [
      {
        type: 'icon',
        icon: 'edit',
        tooltip: this.translate.stream('edit'),
        color: 'accent',
        click: (record: any) => this.edit(record),
      },
      {
        type: 'icon',
        color: 'warn',
        icon: 'delete',
        tooltip: this.translate.stream('delete'),
        pop: {
          title: this.translate.stream('confirm_delete'),
          description: this.translate.stream('confirm_delete_company_message'),
          closeText: this.translate.stream('cancel'),
          okText: this.translate.stream('delete'),
        },
        click: (record: any) => this.delete(record),
      },
    ],
  },
];

   loadAllCompanies() {
     this.companyService.getAllCompanies().subscribe({
       next: (data) => {
         this.list = data.map((item: any, index: number) => ({
           ...item,
           SNo: index + 1
         }));
         console.log('Fetched companies:', this.list);
       },
       error: (err) => {
         console.error('Error fetching countries:', err);
       }
     });
   }


   edit(record: any) {
     // Open dialog, pass in the record
     this.dialog.open(AddEditCompany, {
       width: '100%',
       height: '100%',
       maxWidth: '100vw',
       maxHeight: '100vh',
       data: { company: record },
     }).afterClosed().subscribe(result => {
       if (result) {

       }
     });
   }

     openAddDialog() {
     const dialogRef = this.dialog.open(AddEditCompany, {
       width: '100%',
       height: '100%',
       maxWidth: '100vw',
       maxHeight: '100vh',
       data: {} // empty for add
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         debugger
         console.log('New company added:', result);
       }
     });
    }

     closeDialog(): void {
       this.dialogRef.close();
     }

     save(record: any): void {
       console.log('Saving record:', record);
       this.closeDialog();
     }

      delete(value: any) {

     }

      changeSelect(e: any) {
       console.log(e);
     }

     changeSort(e: any) {
       console.log(e);
     }

      enableRowExpandable() {
       this.columns[0].showExpand = this.expandable;
     }

      updateCell() {
       this.list = this.list.map(item => {
         item.weight = Math.round(Math.random() * 1000) / 100;
         return item;
       });
     }

     updateList() {
       this.list = this.list.splice(-1).concat(this.list);
     }

}
