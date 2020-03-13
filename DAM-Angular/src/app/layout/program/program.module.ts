import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ProgramRoutingModule, PageHeaderModule, NgbModule,DatePickerModule, FormsModule,ReactiveFormsModule],
    declarations: [ProgramComponent]
})
export class ProgramModule {}
