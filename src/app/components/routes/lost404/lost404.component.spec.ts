import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lost404Component } from './lost404.component';

describe('Lost404Component', () => {
  let component: Lost404Component;
  let fixture: ComponentFixture<Lost404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lost404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lost404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
