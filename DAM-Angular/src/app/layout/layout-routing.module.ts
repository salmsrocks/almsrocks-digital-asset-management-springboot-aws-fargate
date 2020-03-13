import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'forms', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'programdashboard', loadChildren: () => import('./programdashboard/programdashboard.module').then(m => m.ProgramDashboardModule) },
            { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
            { path: 'program', loadChildren: () => import('./program/program.module').then(m => m.ProgramModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'contract', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
            {path:'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)},
            {path:'timeline', loadChildren:() => import('./timeline/timeline.module').then(m => m.TimelineModule)},
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            // { path: 'admin-page', loadChildren: './admin-page/admin-page.module#AdminPageModule' },
            { path: 'rightsin', loadChildren: () => import('./rightsin/rightsin.module').then(m => m.RightsinModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
