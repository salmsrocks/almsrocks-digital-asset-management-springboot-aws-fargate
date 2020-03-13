import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RightsinComponent } from './rightsin.component';

const routes: Routes = [
    {
        path: '',
        component: RightsinComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RightsinRoutingModule {}
