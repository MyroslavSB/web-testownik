import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'optionPicked',
  standalone: true,
})
export class OptionPickedPipe implements PipeTransform {

  public transform(id: number, ids_list: number[] = []): boolean {

    return ids_list.includes(id)
  }

}
