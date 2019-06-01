import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataNetworkService {
	//	private host: string = '192.168.1.28';
	private host: string = '127.0.0.1';
	private port: string = '8010';
	private url: string = 'http://' + this.host + ':' + this.port;
	constructor(private http: HttpClient) {}

	getListLight() {
		return this.http.get(this.url + '/api/get_list_light');
	}
}
