import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveComponent } from './predictive.component';

describe('PredictiveComponent', () => {
  let component: PredictiveComponent;
  let fixture: ComponentFixture<PredictiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
