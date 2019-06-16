import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataNetworkService } from '../data-network.service';
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-board-light',
	templateUrl: './board-light.component.html',
	styleUrls: [ './board-light.component.css' ]
})
export class BoardLightComponent implements OnInit {
	constructor(private route: ActivatedRoute, private net: DataNetworkService) {}
	id: String;
	subscription: Subscription;
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
	l_color: Object;

	l_brightness: Number;

	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => {
			this.id = params['id'];
			this.isWaiting = true;
			this.loadData();
		});

		//Update light data
		this.subscription = interval(5 * 1000).subscribe((val) => this.loadData());
	}

	updateData() {
		console.log('updateData');
		this.loadData();
	}

	loadData() {
		this.net.getDataLight(this.id).subscribe(
			(data) => {
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

		this.l_color = data.color;
		this.l_brightness = data.brightness;

		this.l_ssid = data.ssid;
		this.l_signal = String(this.convertWifiSignal(data.signal));
		this.l_hardware = 'ESP32';
	}

	convertWifiSignal(signal) {
		if (signal < -92) return 1;
		else if (signal > -21) return 100;
		else return '' + Math.round(-0.0154 * signal * signal - 0.3794 * signal + 98.182);
	}

	onUpdateFeature(feature) {
		this.l_feature = feature.id;
	}

	onUpdateBrightness(brightness) {
		this.net.setBrightness(this.l_id, brightness);
		this.l_brightness = brightness;
	}

	onUpdateColor(color) {
		console.log('onUpdateColor ' + color);
		this.l_color = color;
		this.net.setColor(this.l_id, color);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.sub.unsubscribe();
	}
}
