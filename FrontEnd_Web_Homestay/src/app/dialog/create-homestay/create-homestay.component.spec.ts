import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomestayComponent } from './create-homestay.component';

describe('CreateHomestayComponent', () => {
  let component: CreateHomestayComponent;
  let fixture: ComponentFixture<CreateHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHomestayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
