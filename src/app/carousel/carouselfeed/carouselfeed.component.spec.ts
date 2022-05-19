import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselfeedComponent } from './carouselfeed.component';

describe('CarouselfeedComponent', () => {
  let component: CarouselfeedComponent;
  let fixture: ComponentFixture<CarouselfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
