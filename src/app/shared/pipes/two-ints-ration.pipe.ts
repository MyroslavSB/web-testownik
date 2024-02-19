import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'twoNumsRatio',
  standalone: true
})
export class TwoNumsRatioPipe implements PipeTransform {

  transform(num1: number, num2: number): number[] {
    const ratio1 = Math.floor((num1 / (num1 + num2)) * 100)
    return [ratio1, 100 - ratio1]
  }

}
