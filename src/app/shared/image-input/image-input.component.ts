import { Component } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-image-input',
  imports: [SharedModule],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent extends BaseFormInputComponent {
selectedFileName: string = '';
uploadedImageFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.uploadedImageFile = input.files[0];
    this.selectedFileName = this.uploadedImageFile.name;
  }
}
}