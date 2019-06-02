import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LightMenuComponent } from './light-menu/light-menu.component';
import { NavComponent } from './nav/nav.component';
import { BoardLightComponent } from './board-light/board-light.component';
import { FeatureSelectComponent } from './feature-select/feature-select.component';
import { PickerColorComponent } from './feature-select/picker-color/picker-color.component';
import { LightSettingsComponent } from './board-light/light-settings/light-settings.component';
import { BrightnessSliderComponent } from './board-light/light-settings/brightness-slider/brightness-slider.component';

@NgModule({
	declarations: [
		AppComponent,
		LightMenuComponent,
		NavComponent,
		BoardLightComponent,
		FeatureSelectComponent,
		PickerColorComponent,
		LightSettingsComponent,
		BrightnessSliderComponent
	],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule, Ng5SliderModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
