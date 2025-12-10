import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibleEditingComponent } from './accessible-editing.component';

describe('AccessibleEditingComponent', () => {
  let component: AccessibleEditingComponent;
  let fixture: ComponentFixture<AccessibleEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessibleEditingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibleEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
