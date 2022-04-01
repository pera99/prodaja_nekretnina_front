import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateShowBriefComponent } from './estate-show-brief.component';

describe('EstateShowBriefComponent', () => {
  let component: EstateShowBriefComponent;
  let fixture: ComponentFixture<EstateShowBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateShowBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateShowBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
