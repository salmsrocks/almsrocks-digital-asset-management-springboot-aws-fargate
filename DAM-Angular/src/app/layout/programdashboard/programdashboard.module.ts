import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule} from '../../shared';
import { ProgramDashboardRoutingModule } from './programdashboard-routing.module';
import { ProgramDashboardComponent } from './programdashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        ProgramDashboardRoutingModule,
        Ng2SmartTableModule,
        PageHeaderModule
       
   
    ],
    declarations: [
        ProgramDashboardComponent,
    ],
  
  
})
export class ProgramDashboardModule {}
