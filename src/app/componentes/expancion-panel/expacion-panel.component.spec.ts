import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpacionPanelComponent } from './expacion-panel.component';

describe('ExpacionPanelComponent', () => {
  let component: ExpacionPanelComponent;
  let fixture: ComponentFixture<ExpacionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpacionPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpacionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
