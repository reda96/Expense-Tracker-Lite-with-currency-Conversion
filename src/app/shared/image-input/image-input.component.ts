import { Component, Input, WritableSignal } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-image-input',
  imports: [SharedModule],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent extends BaseFormInputComponent {
@Input() valueSignal!:WritableSignal<any>;
  selectedFileName: string = '';
uploadedImageFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.uploadedImageFile = input.files[0];
    this.selectedFileName = this.uploadedImageFile.name;

        const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      // console.log('Base64 string:', base64);
    // /  this.control.setValue(this.selectedFileName)
    this.valueSignal.set(  {
    url: base64,       // Image URL or base64 string
    fileName: this.selectedFileName,  // Optional original file name
    uploadedAt: new Date() // Optional upload date (ISO string)
  });
    
      // You can now save base64 to your model or FormControl
    };
    reader.readAsDataURL(this.uploadedImageFile);
  }
}
}