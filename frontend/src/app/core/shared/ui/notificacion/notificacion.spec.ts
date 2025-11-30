import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

import { Notificacion } from './notificacion';

describe('NotificacionComponent', () => {
  let component: Notificacion;
  let fixture: ComponentFixture<Notificacion>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [Notificacion, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Notificacion);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load notificaciones on init', () => {
    spyOn(component, 'loadNotificaciones');
    component.ngOnInit();
    expect(component.loadNotificaciones).toHaveBeenCalled();
  });

  it('should toggle dropdown', () => {
    expect(component.showDropdown).toBeFalse();
    component.toggleDropdown();
    expect(component.showDropdown).toBeTrue();
    component.toggleDropdown();
    expect(component.showDropdown).toBeFalse();
  });

  it('should update unread count', () => {
    component.notificaciones = [
      { id: 1, leida: false } as any,
      { id: 2, leida: true } as any,
      { id: 3, leida: false } as any
    ];
    component.updateUnreadCount();
    expect(component.unreadCount).toBe(2);
  });
});
