import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmFlowComponent } from './firm-flow.component';

describe('FirmFlowComponent', () => {
  let component: FirmFlowComponent;
  let fixture: ComponentFixture<FirmFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

