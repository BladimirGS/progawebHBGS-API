import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

}
