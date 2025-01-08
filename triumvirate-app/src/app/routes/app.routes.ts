import { Routes } from '@angular/router';
import { HomePageComp } from '../home-page/home-page.component';
import { RoomsPageComp } from '../rooms-page/rooms-page.component';
import { LobbyPageComp } from '../lobby-page/lobby-page.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComp},
    {path: 'rooms', component: RoomsPageComp},
    {path: 'room/:roomId', component: LobbyPageComp}
];
