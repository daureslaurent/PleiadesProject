import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightMenuComponent } from './light-menu.component';

describe('LightMenuComponent', () => {
  let component: LightMenuComponent;
  let fixture: ComponentFixture<LightMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
