import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataNetworkService } from '../data-network.service';

@Component({
	selector: 'app-feature-select',
	templateUrl: './feature-select.component.html',
	styleUrls: [ './feature-select.component.css' ]
})
export class FeatureSelectComponent implements OnInit {
	@Input('current-feature') public featureId;
	@Output() public changeFeatureEvent = new EventEmitter();

	private isFeatureActive: boolean = true;
	private currentFeature: boolean = true;

	listFeatures: object = [
		{ name: 'color', id: 0, status: false, disable: true },
		{ name: 'weather', id: 1, status: false, disable: false }
	];

	currentOption;

	constructor(private net: DataNetworkService) {}

	ngOnInit() {
		console.log(this);
		this.changeMenu(this.featureId);
	}

	changeMenu(id) {
		if (id != undefined) {
			if (!this.isFeatureActive) this.isFeatureActive = true;
			this.currentFeature = id;
			if (this.featureId >= 0) {
				this.listFeatures[this.featureId].status = false;
				this.listFeatures[id].status = true;
			}
			if (this.currentOption >= 0) {
				this.currentOption = -1;
			}
			this.featureId = id;
			this.changeFeatureEvent.emit({ id: id });
		}
	}
}
