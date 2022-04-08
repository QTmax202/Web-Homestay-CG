import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHomestayComponent } from './my-homestay.component';

describe('MyHomestayComponent', () => {
  let component: MyHomestayComponent;
  let fixture: ComponentFixture<MyHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHomestayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
