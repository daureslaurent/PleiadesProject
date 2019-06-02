import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrightnessSliderComponent } from './brightness-slider.component';

describe('BrightnessSliderComponent', () => {
  let component: BrightnessSliderComponent;
  let fixture: ComponentFixture<BrightnessSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrightnessSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrightnessSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
