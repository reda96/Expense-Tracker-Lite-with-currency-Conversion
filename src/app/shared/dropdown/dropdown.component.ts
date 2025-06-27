import { Component, Input } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';

import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-dropdown',
  imports: [SharedModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent extends BaseFormInputComponent {
  @Input() options!: any[];


    onSelectionChange(value: string) {
    const selected = this.options.find(opt => opt.value === value);
    if (selected) {
      this.control?.setValue(selected.value);
    }
  }
}
