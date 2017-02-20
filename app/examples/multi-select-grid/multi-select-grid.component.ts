import { Component } from "@angular/core";
import { BaseGridComponent } from "../base-grid";
import { Http } from "@angular/http";

@Component({
  selector: 'multi-select-grid',
  templateUrl: 'app/examples/multi-select-grid/multi-select-grid.component.html',
})
export class MultiSelectGridComponent extends  BaseGridComponent
{
  constructor(private http: Http) {
    super();
    console.log('in constructor');
    this.data = this.data.slice();
    http.get('app/examples/data/contact.json')
      .map(res => res.json())
      .subscribe(data => this.data = data,
        err => console.log(err),
        () => console.log('Completed'));
  }

  public onRowClicked=(event:any) :void => {
    console.log('on row clicked ', event);
  }
}
