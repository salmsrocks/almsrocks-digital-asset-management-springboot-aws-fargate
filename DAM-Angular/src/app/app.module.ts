import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {AvailDataService} from'./shared/services/avail-data.service';
import { HttpModule } from '@angular/http';
import {LoginComponent} from './login/login.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { TableService } from './layout/dashboard/table.service';
import { RestApiService } from "src/app/shared/rest-api.service";
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MultiSelectAllModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        LanguageTranslationModule,
        AppRoutingModule,
        DatePickerModule,
        Ng2SmartTableModule,
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,AvailDataService,LoginComponent,RestApiService],
    bootstrap: [AppComponent]
})
export class AppModule {}
