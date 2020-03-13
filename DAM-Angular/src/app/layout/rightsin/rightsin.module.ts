import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';
import { RightsinRoutingModule } from './rightsin-routing.module';
import { RightsinComponent } from './rightsin.component';
import { PageHeaderModule} from './../../shared';
import { FormsModule } from '@angular/forms';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
@NgModule({
    imports: [CommonModule, MultiSelectAllModule,RightsinRoutingModule, PageHeaderModule, FormsModule, DatePickerModule],
    declarations: [RightsinComponent]
})
export class RightsinModule {}
