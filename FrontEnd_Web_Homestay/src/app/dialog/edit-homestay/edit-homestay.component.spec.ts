import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomestayComponent } from './edit-homestay.component';

describe('EditHomestayComponent', () => {
  let component: EditHomestayComponent;
  let fixture: ComponentFixture<EditHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHomestayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
