import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDisabledInputComponent } from './loading-disabled-input.component';

describe('LoadingDisabledInputComponent', () => {
  let component: LoadingDisabledInputComponent;
  let fixture: ComponentFixture<LoadingDisabledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingDisabledInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingDisabledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
