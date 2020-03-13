import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
    imports: [CommonModule,AdminRoutingModule, PageHeaderModule, NgbModule,DatePickerModule, FormsModule,ReactiveFormsModule],
    declarations: [AdminComponent]
})
export class AdminModule 
{
    constructor(){}
}
