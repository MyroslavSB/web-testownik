import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true
})
export class TimerPipe implements PipeTransform {

  transform(time: number): string {
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');


    return `${hours}:${minutes}:${seconds}`;
  }

}
