import { Routes } from '@angular/router';
import { HomePageComp } from '../home-page/home-page.component';

export const routes: Routes = [
    {path:'', redirectTo: '/home-page', pathMatch: 'full'},
    {path: 'home-page', component: HomePageComp}
];
