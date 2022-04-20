import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesHomestayComponent } from './images-homestay.component';

describe('ImagesHomestayComponent', () => {
  let component: ImagesHomestayComponent;
  let fixture: ComponentFixture<ImagesHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesHomestayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
