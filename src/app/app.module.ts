import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SailsModule } from "angular2-sails";
import { Routing } from './app.routing';
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from './pipes/data-filter.pipe';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';

import { UserService } from './services/user.service';
import { ShopService } from './services/shop.service';
import { FormService } from './services/form.service';
import { QuestionService } from './services/question.service';
import { ProgramService } from './services/program.service';

import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ReportComponent } from './pages/report/report.component';
import { PlanComponent } from './pages/plan/plan.component';
import { MapComponent } from './pages/map/map.component';
import { ShopMarkerFilterPipe } from './pipes/shop-marker-filter.pipe';
import { UserMarkerFilterPipe } from './pipes/user-marker-filter.pipe';
import { ShopDataFilterPipe } from './pipes/shop-data-filter.pipe';
import { UserDataFilterPipe } from './pipes/user-data-filter.pipe';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FormComponent } from './pages/form/form.component';
import { QuestionComponent } from './pages/question/question.component';
import { ChoiceComponent } from './pages/choice/choice.component';
import { CalendarComponent } from './ap-angular2-fullcalendar/src/calendar/calendar';
import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    AsideBarComponent,
    DataFilterPipe,
    UserComponent,
    HomeComponent,
    ShopComponent,
    ReportComponent,
    PlanComponent,
    MapComponent,
    ShopMarkerFilterPipe,
    UserMarkerFilterPipe,
    ShopDataFilterPipe,
    UserDataFilterPipe,
    FileSelectDirective,
    FormComponent,
    QuestionComponent,
    ChoiceComponent,
    CalendarComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule,
    DataTableModule,
    SailsModule.forRoot(),
    Routing,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZexFLa1Izg7wJTJzP5pg3E7nNrA-P0ZU'
    }),
  ],
  providers: [UserService,ShopService,FormService,QuestionService,ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
