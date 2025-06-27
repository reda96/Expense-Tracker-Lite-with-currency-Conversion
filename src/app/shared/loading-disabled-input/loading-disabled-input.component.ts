import { Component, Input, OnInit, Signal } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-loading-disabled-input',
  imports: [SharedModule],
  templateUrl: './loading-disabled-input.component.html',
  styleUrl: './loading-disabled-input.component.scss'
})
export class LoadingDisabledInputComponent extends BaseFormInputComponent implements OnInit {
 @Input() isLoading!:Signal<boolean>;
 @Input() convertedAmount!:Signal<number>;

 override ngOnInit(): void {
    this.control.disable()
 }

}
