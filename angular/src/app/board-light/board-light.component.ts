import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataNetworkService } from '../data-network.service';

@Component({
	selector: 'app-board-light',
	templateUrl: './board-light.component.html',
	styleUrls: [ './board-light.component.css' ]
})
export class BoardLightComponent implements OnInit {
	constructor(private route: ActivatedRoute, private net: DataNetworkService) {}
	id: String;
	private sub: any;

	//lightData: Object;

	//Page mode
	isOnError: Boolean = false;
	errMsg: String = '';
	isWaiting: Boolean = true;

	//Data from light
	l_id: String;
	l_name: String;
	l_isConnected: Boolean;
	l_ssid: String;
	l_signal: String;
	l_hardware: String;
	l_feature: Number = 0;

	l_brightness: Number;

	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => {
			this.id = params['id'];
			this.loadData();
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	loadData() {
		this.isWaiting = true;
		this.net.getDataLight(this.id).subscribe(
			(data) => {
				console.log(data);
				//this.lightData = data;
				this.mappingData(data);
				this.isWaiting = false;
				this.isOnError = false;
				this.errMsg = '';
			},
			(err) => {
				console.error(err);
				this.isWaiting = false;
				this.isOnError = true;
				this.errMsg = 'Erreur de connection';
			}
		);
	}

	mappingData(data) {
		this.l_isConnected = data.connected;
		this.l_name = data.name;
		this.l_id = data.id;

		this.l_brightness = data.brightness;

		this.l_ssid = 'MyWifi';
		this.l_signal = '-20';
		this.l_hardware = 'ESP32';
	}

	onUpdateFeature(feature) {
		this.l_feature = feature.id;
	}

	onUpdateBrightness(brightness) {
		this.net.setBrightness(this.l_id, brightness);
		this.l_brightness = brightness;
	}
}
