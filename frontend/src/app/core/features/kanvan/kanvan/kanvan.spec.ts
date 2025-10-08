import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kanvan } from './kanvan';

describe('Kanvan', () => {
  let component: Kanvan;
  let fixture: ComponentFixture<Kanvan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kanvan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kanvan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
