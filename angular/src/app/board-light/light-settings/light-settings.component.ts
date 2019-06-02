import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataNetworkService } from '../../data-network.service';

@Component({
	selector: 'app-light-settings',
	templateUrl: './light-settings.component.html',
	styleUrls: [ './light-settings.component.css' ]
})
export class LightSettingsComponent implements OnInit {
	@Output() public changeBrightness = new EventEmitter();
	@Input('brightness') brightness;

	constructor() {}

	ngOnInit() {}

	onChangeBrightness(brightness) {
		this.changeBrightness.emit(brightness);
	}
}
