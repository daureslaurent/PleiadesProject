import { Component, OnInit } from '@angular/core';
import { DataNetworkService } from '../data-network.service';

@Component({
	selector: 'app-light-menu',
	templateUrl: './light-menu.component.html',
	styleUrls: [ './light-menu.component.css' ]
})
export class LightMenuComponent implements OnInit {
	listLight: Object;

	constructor(private net: DataNetworkService) {}

	ngOnInit() {
		this.net.getListLight().subscribe((data) => {
			this.listLight = data;
			console.log(data);
		});
	}
}
