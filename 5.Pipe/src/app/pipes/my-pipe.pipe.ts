import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(str: string): string {
    return `<<${str.trim()}>>`;
  }

}
