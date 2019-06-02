import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-brightness-slider',
	templateUrl: './brightness-slider.component.html',
	styleUrls: [ './brightness-slider.component.css' ]
})
export class BrightnessSliderComponent implements OnInit {
	@Input('brightness') public brightness;
	@Output() public changeBrightnessEvent = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onChangeBrightness(brightness) {
		this.changeBrightnessEvent.emit(brightness);
		this.brightness = brightness;
	}
}
