import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.tpl.html',
})
export class AppComponent  {
  name = ', Jeremy Sucks Balls';
  data: any = [];
  radioGroupValue: any;
  constructor() {
    for(let i = 0;i<100;i++){
    this.data.push({column1: 'col 1 row ' + i, column2: i + '', column3: i , column4: i + '', column5: i + '', column6: i + '', column7: i + ''});
    }
  }

}
