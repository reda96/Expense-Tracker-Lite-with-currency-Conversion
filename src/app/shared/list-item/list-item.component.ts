import { Component, Input } from '@angular/core';
import { Expense } from '../../core/models/expense';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-list-item',
  imports: [SharedModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
 @Input() listItem!:Expense;
}
