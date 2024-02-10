import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-file-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './file-drop-down.component.html',
  styleUrl: './file-drop-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropDownComponent {

  public onFileDrop($event: any | Event): void {

    console.log($event.target.files)
  }

}
