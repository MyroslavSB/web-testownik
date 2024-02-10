import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FileDropDownComponent} from "../../shared/components/file-drop-down/file-drop-down.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FileDropDownComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {

}
