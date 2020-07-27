import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'mult' })
export class MultByPipe implements PipeTransform{
  // transform(value: any, ...args: any[]): any {}
  transform(num: number, stepen: number = 2): number {
    return num * stepen
  }

}
