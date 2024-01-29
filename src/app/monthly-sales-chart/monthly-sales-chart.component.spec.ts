import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesChartComponent } from './monthly-sales-chart.component';

describe('MonthlySalesChartComponent', () => {
  let component: MonthlySalesChartComponent;
  let fixture: ComponentFixture<MonthlySalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySalesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlySalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
