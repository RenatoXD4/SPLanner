// src/app/core/shared/ui/tema/tema.spec.ts - VERSIÓN SIMPLE
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemaComponent } from './tema';

describe('TemaComponent', () => {
  let component: TemaComponent;
  let fixture: ComponentFixture<TemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have themeText property', () => {
    expect(component.themeText).toBeDefined();
  });

  it('should have themeIcon property', () => {
    expect(component.themeIcon).toBeDefined();
  });

  it('should have toggleTheme method', () => {
    expect(component.toggleTheme).toBeDefined();
  });
});