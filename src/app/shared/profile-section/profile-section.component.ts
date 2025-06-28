import { Component, inject, Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile-section',
  imports: [SharedModule],
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.scss',
})
export class ProfileSectionComponent {
  @Input() avatarUrl!: string;
  @Input() welcomeMessage!: string;
  @Input() userName!: string;
  @Input() filterFunction!: any;
  @Input() filterValue!: any;
  authService = inject(AuthService);

  filterOptions = [
    { label: 'last 7 days', value: 'week' },
    { label: 'This month', value: 'month' },
  ];
  onSelectionChange(value: string) {
    this.filterFunction(value, 1);
  }
  logout() {
    this.authService.logout();
  }
}
