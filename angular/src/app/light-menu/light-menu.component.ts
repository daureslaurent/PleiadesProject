import { Component, OnInit } from '@angular/core';
import { DataNetworkService } from '../data-network.service';

@Component({
	selector: 'app-light-menu',
	templateUrl: './light-menu.component.html',
	styleUrls: [ './light-menu.component.css' ]
})
export class LightMenuComponent implements OnInit {
	listLight: Object;

	//Err
	isOnErr: Boolean = false;
	errMsg: String = '';

	//Waiting
	isOnwaiting: Boolean = true;

	constructor(private net: DataNetworkService) {}

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this.net.getListLight().subscribe(
			(data) => {
				this.listLight = data;
				this.isOnwaiting = false;
				this.isOnErr = false;
				this.errMsg = '';
			},
			(err) => {
				console.error('Err getListLight', err);
				this.isOnwaiting = false;
				this.errMsg = 'Erreur de connection';
				this.isOnErr = true;
			}
		);
	}
}
