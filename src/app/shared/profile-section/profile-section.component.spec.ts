import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSectionComponent } from './profile-section.component';
import { SharedModule } from '../shared.module';
import { AuthService } from '../../core/services/auth.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

class MockAuthService {
  logout = jasmine.createSpy('logout');
}

fdescribe('ProfileSectionComponent', () => {
  let component: ProfileSectionComponent;
  let fixture: ComponentFixture<ProfileSectionComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule,ProfileSectionComponent],
      declarations: [],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSectionComponent);
    component = fixture.componentInstance;

    // Set @Input() values
    component.avatarUrl = 'https://example.com/avatar.jpg';
    component.welcomeMessage = 'Welcome back!';
    component.userName = 'John Doe';
    component.filterFunction = jasmine.createSpy('filterFunction');
    component.filterValue = 'week';

    authService = TestBed.inject(AuthService) as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message and user name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Welcome back!');
    expect(compiled.textContent).toContain('John Doe');
  });

  it('should call filterFunction on dropdown change', () => {
    component.onSelectionChange('month');
    expect(component.filterFunction).toHaveBeenCalledWith('month', 1);
  });

  it('should call logout on button click', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
