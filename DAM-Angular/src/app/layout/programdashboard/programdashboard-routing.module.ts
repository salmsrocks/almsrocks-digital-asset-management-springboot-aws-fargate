import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramDashboardComponent } from './programdashboard.component';

const routes: Routes = [
    {
        path: '', component: ProgramDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramDashboardRoutingModule {
}
