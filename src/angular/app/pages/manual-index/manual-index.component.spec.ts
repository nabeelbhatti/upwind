import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualIndexComponent } from './manual-index.component';

describe('ManualIndexComponent', () => {
  let component: ManualIndexComponent;
  let fixture: ComponentFixture<ManualIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
