import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ReportComponent } from './pages/report/report.component';
import { MapComponent } from './pages/map/map.component';
import { PlanComponent } from './pages/plan/plan.component';
import { FormComponent } from './pages/form/form.component';

import { ModuleWithProviders } from '@angular/core';
import { Route,RouterModule,Routes } from '@angular/router';
const appRoutes:Routes=[
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'user',
        component:UserComponent
    },
    {
        path:'shop',
        component:ShopComponent
    },
    {
        path:'map',
        component:MapComponent
    },
     {
        path:'report',
        component:ReportComponent
    },
     {
        path:'plan',
        component:PlanComponent
    },
    {
        path:'form',
        component:FormComponent
    }
];

export const  Routing :  ModuleWithProviders=RouterModule.forRoot(appRoutes);