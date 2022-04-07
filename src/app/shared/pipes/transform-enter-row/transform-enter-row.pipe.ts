import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformEnterRow'
})
export class TransformEnterRowPipe implements PipeTransform {

  constructor() {}

  public transform(value: string): string {
    return value.replace(/\n/g, '</br>');
  }
}