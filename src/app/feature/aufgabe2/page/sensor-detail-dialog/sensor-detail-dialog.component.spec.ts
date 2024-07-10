import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailDialogComponent } from './sensor-detail-dialog.component';

describe('SensorDetailDialogComponent', () => {
  let component: SensorDetailDialogComponent;
  let fixture: ComponentFixture<SensorDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
