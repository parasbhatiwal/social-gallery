import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicGallaryComponent } from './public-gallary.component';

describe('PublicGallaryComponent', () => {
  let component: PublicGallaryComponent;
  let fixture: ComponentFixture<PublicGallaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicGallaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
