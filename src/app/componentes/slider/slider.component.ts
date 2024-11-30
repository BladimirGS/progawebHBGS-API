import { Component } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
