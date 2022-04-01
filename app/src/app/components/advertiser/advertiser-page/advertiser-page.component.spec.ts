import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserPageComponent } from './advertiser-page.component';

describe('AdvertiserPageComponent', () => {
  let component: AdvertiserPageComponent;
  let fixture: ComponentFixture<AdvertiserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
