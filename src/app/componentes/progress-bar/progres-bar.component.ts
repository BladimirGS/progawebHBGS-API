import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-progres-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progres-bar.component.html',
  styleUrl: './progres-bar.component.css'
})
export class ProgresBarComponent {

}
