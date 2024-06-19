import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingPopupComponent } from './add-training-popup.component';

describe('AddTrainingPopupComponent', () => {
  let component: AddTrainingPopupComponent;
  let fixture: ComponentFixture<AddTrainingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainingPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
