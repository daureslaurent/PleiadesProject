import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';

interface SimpleSliderModel {
	value: number;
	options: Options;
}

@Component({
	selector: 'app-brightness-slider',
	templateUrl: './brightness-slider.component.html',
	styleUrls: [ './brightness-slider.component.css' ]
})
export class BrightnessSliderComponent implements OnInit {
	@Input('brightness') public brightness;
	@Output() public changeBrightnessEvent = new EventEmitter();

	verticalSlider1: SimpleSliderModel = {
		value: this.brightness,
		options: {
			floor: 0,
			ceil: 250,
			step: 10,
			vertical: true,
			showTicks: true
		}
	};

	constructor() {}

	ngOnInit() {}

	onUserChange(changeContext: ChangeContext): void {
		this.emitBrightness(changeContext.value);
	}
	onUserChangeEnd(changeContext: ChangeContext): void {
		this.emitBrightness(changeContext.value);
	}

	emitBrightness(brightness) {
		this.changeBrightnessEvent.emit(this.brightness);
	}
}
