import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsConteinerComponent } from './cards-conteiner.component';

describe('CardsConteinerComponent', () => {
  let component: CardsConteinerComponent;
  let fixture: ComponentFixture<CardsConteinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsConteinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsConteinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
