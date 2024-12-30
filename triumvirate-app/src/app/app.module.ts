import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComp } from './home-page/home-page.component'
import { AppRoutingModule } from './routes/app-routing.module';
import { HomePageModule } from './routes/home-page.module';
import { RoomsPageComp } from './rooms-page/rooms-page.component';
import { RoomsPageModule } from './routes/rooms-page.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    //HttpClient,
    AppRoutingModule,
    HomePageModule,
    RoomsPageModule
  ],
  //declarations: [
    //AppComponent,
    //HomePageComp,
    //RoomsPageComp
  //],
  //bootstrap: [ provideHttpClient ]
})
export class AppModule { }
