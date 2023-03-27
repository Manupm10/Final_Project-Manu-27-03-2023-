import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchString: any): any[] {
    if (!value) return [];
    if(!searchString){
    return value;
    }
    return value.filter((value: any) => {
      return Object.keys(value).some(key=>{
        return String(value[key]).toLowerCase().includes(searchString.toLowerCase());
      });
    })
  }

}
