import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.tpl.html'
})
export class AppComponent {
  constructor(public router: Router,
              private route: ActivatedRoute) {
  }
}
