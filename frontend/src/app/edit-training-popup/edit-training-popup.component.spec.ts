import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingPopupComponent } from './edit-training-popup.component';

describe('EditTrainingPopupComponent', () => {
  let component: EditTrainingPopupComponent;
  let fixture: ComponentFixture<EditTrainingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrainingPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
