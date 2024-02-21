import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'twoNumsRatio',
  standalone: true
})
export class TwoNumsRatioPipe implements PipeTransform {

  transform(num1: number, num2: number, in_percentage = false): Array<number | string> {
    const ratio1 = Math.floor((num1 / (num1 + num2)) * 100)
    if (in_percentage) {
      return [ratio1 + '%', (100 - ratio1) + '%']
    }
    return [ratio1 || 0, 100 - ratio1 || 0]
  }

}
