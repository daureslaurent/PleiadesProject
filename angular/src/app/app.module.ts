import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LightMenuComponent } from './light-menu/light-menu.component';
import { NavComponent } from './nav/nav.component';
import { BoardLightComponent } from './board-light/board-light.component';

@NgModule({
	declarations: [ AppComponent, LightMenuComponent, NavComponent, BoardLightComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
