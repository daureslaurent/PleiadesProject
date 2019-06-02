import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataNetworkService {
	private host: string = '192.168.1.28';
	//private host: string = '127.0.0.1';
	private port: string = '8010';
	private url: string = 'http://' + this.host + ':' + this.port;
	constructor(private http: HttpClient) {}

	getListLight() {
		return this.http.get(this.url + '/api/get_list_light');
	}

	getDataLight(id) {
		return this.http.get(this.url + '/api/get_light/' + id);
	}

	setBrightness(id, brightness) {
		this.http.post(this.url + '/api/set_brightness', { id: id, brightness: brightness }).subscribe((ret) => {});
	}

	setColor(id, color) {
		this.http
			.post(this.url + '/api/set_color', { r: color.r, g: color.g, b: color.b, id: id })
			.subscribe((ret) => {});
	}
}
