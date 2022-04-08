import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookHomestayComponent } from './book-homestay.component';

describe('BookHomestayComponent', () => {
  let component: BookHomestayComponent;
  let fixture: ComponentFixture<BookHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookHomestayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
