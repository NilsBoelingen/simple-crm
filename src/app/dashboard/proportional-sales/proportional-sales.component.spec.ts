import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProportionalSalesComponent } from './proportional-sales.component';

describe('ProportionalSalesComponent', () => {
  let component: ProportionalSalesComponent;
  let fixture: ComponentFixture<ProportionalSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProportionalSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProportionalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
