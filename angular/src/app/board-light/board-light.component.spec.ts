import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLightComponent } from './board-light.component';

describe('BoardLightComponent', () => {
  let component: BoardLightComponent;
  let fixture: ComponentFixture<BoardLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
