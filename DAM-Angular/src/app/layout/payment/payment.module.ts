import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from '../../layout/payment/payment.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule,  PaymentRoutingModule, PageHeaderModule,FormsModule],
    declarations: [PaymentComponent]
})
export class PaymentModule {}
