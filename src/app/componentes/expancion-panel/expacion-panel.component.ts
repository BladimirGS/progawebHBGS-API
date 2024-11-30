import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-expacion-panel',
  standalone: true,
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expacion-panel.component.html',
  styleUrl: './expacion-panel.component.css'
})
export class ExpacionPanelComponent {
  readonly panelOpenState = signal(false);
}
