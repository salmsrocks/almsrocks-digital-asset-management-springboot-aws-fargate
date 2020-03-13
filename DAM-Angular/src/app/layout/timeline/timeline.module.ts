import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
    imports: [CommonModule,TimelineRoutingModule, PageHeaderModule, NgbModule,DatePickerModule, FormsModule,ReactiveFormsModule],
    declarations: [TimelineComponent]
})
export class TimelineModule 
{
    constructor(){}
}
