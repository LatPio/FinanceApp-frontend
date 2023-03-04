import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthChartComponent } from './last-month-chart.component';

describe('LastMonthChartComponent', () => {
  let component: LastMonthChartComponent;
  let fixture: ComponentFixture<LastMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastMonthChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
