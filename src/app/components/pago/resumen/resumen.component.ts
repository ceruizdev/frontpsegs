import { Component, OnInit } from '@angular/core';
import { Resumen } from 'src/app/interfaces/resumen';
import { ActivatedRoute, RouterModule, Router, NavigationExtras } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as action from '../../../actions/pago.actions';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  resumen: Resumen;
  constructor(public router: Router, private store: Store<{ valorTotal: number }>) {  }

  ngOnInit() {
    if (window.history.state.usuario === undefined) {
        this.router.navigateByUrl('/404');
     } else {
      this.resumen = window.history.state;
    }
  }
}
