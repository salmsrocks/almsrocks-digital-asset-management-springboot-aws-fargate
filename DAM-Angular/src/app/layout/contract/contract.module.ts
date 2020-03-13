import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
    imports: [CommonModule, ContractRoutingModule, PageHeaderModule, NgbModule,DatePickerModule, FormsModule,ReactiveFormsModule],
    declarations: [ContractComponent]
})
export class ContractModule 
{
    constructor(){}
}
