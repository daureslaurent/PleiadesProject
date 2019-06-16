import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import iro from '@jaames/iro';

@Component({
	selector: 'app-picker-color',
	templateUrl: './picker-color.component.html',
	styleUrls: [ './picker-color.component.css' ]
})
export class PickerColorComponent implements OnInit {
	@Input('color') public oriColor;
	@Output() public changeColorEvent = new EventEmitter();

	nameFeature: String = 'Color Picker';
	private picker = iro.ColorPicker;
	constructor() {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.setPickerIro();
	}

	changeColor(color) {
		this.changeColorEvent.emit(color);
	}

	setPickerIro() {
		var upTimer = this.getTime();
		var self = this;
		this.picker = new iro.ColorPicker('#color-picker-container', {
			width: 320,
			height: 320,
			color: this.oriColor,
			markerRadius: 5,
			padding: 4,
			sliderMargin: 16,
			sliderHeight: 15,
			borderWidth: 1,
			borderColor: '#fff',
			anticlockwise: true
		});

		this.picker.on('color:change', function(color, changes) {
			if (self.getTime() - upTimer > 300) {
				upTimer = self.getTime();
				self.changeColor(color.rgb);
			}
		});
		this.picker.on('input:end', function(color, changes) {
			self.changeColor(color.rgb);
		});
	}

	getTime() {
		return Date.now();
	}
}
