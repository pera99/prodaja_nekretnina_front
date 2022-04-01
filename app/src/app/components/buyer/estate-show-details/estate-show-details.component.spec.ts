import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateShowDetailsComponent } from './estate-show-details.component';

describe('EstateShowDetailsComponent', () => {
  let component: EstateShowDetailsComponent;
  let fixture: ComponentFixture<EstateShowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateShowDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
