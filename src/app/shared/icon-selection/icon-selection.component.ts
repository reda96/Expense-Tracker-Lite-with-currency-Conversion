import { Component, Input } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-icon-selection',
  imports: [SharedModule],
  templateUrl: './icon-selection.component.html',
  styleUrl: './icon-selection.component.scss'
})
export class IconSelectionComponent extends BaseFormInputComponent{
  @Input() categories!:any[];
  selectedCategory='';
    onSelectionChange(value: string) {
      this.selectedCategory=value;
    const selected = this.categories.find(opt => opt.value === value);
    if (selected) {
      this.control?.setValue(selected.icon);
    }
  }
  
}
