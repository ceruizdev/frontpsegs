import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagosService } from '../../../services/pagos.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Resumen } from '../../../interfaces/resumen';
import { ActivatedRoute, RouterModule, Router, NavigationExtras } from '@angular/router';
import { Pago } from 'src/app/interfaces/pago';
import { Usuario } from 'src/app/interfaces/usuario';
import { InformacionPersonalService } from 'src/app/services/informacion-personal.service';
import { Store, select } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import * as action from '../../../actions/pago.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../../../services/sesion.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  requiered = 'required';
  datos: object;
  pagosAgregados: Pago[] = [] as Pago[];
  pagoFinal: Pago;
  itemPago: Pago;
  resumen: Resumen;
  usuario: Usuario;
  resumenPago: Pago;
  valorTotal$: Observable<number>;
  token = {};
  @Output() messageEvent = new EventEmitter<any[]>();
  constructor(private pagoService: PagosService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private info: InformacionPersonalService,
              private store: Store<{ valorTotal: number }>,
              private SpinnerService: NgxSpinnerService,
              private sesionService: SesionService
              ) {
    this.SpinnerService.show();
    this.sesionService.getRequest('api/sesion/token').subscribe(
      data => {
        localStorage.setItem('token', data[`token`]);
      }
    );
    this.usuario = {} as Usuario;
    this.info.getInfoUsuario(`api/usuario/get/${this.route.snapshot.paramMap.get('id_pv_cero')}`).subscribe(data => {
      this.usuario.txt_nombre = data[`txt_nombre`];
      this.usuario.txt_apellido = data[`txt_apellido`];
      this.usuario.txt_mail_cliente = data[`txt_mail_cliente`];
      this.usuario.nro_doc_tomador = data[`nro_doc_tomador`];
      this.usuario.txt_telefono = data[`txt_telefono`];
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status !== 401) {
          console.log('No cuenta con una autorización de ingreso');
        }
      }
    });
    this.pagoService.getRequest(`api/pago/detalle/${this.route.snapshot.paramMap.get('id_pv_cero')}`).subscribe(data => {
      this.datos = data[`pagos`];
      console.log(this.datos);
      this.SpinnerService.hide();
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status !== 401) {
          console.log('No cuenta con una autorización de ingreso');
        }
      }
    });
  }

  ngOnInit() {
    this.reiniciarTotal();
    this.valorTotal$ = this.store.pipe(select('valorTotal'));
  }

  addPago(pago: any[], isChecked: boolean) {
    this.itemPago = {} as Pago;
    this.itemPago.concepto = pago[`concepto`];
    this.itemPago.fecVencimiento = pago[`fec_limite_pago`];
    this.itemPago.idCliente = pago[`nro_doc_tomador`];
    this.itemPago.idPago = pago[`id_referencia`];
    this.itemPago.id_pv_cero = this.route.snapshot.paramMap.get('id_pv_cero');
    this.itemPago.nro_pol = pago[`nro_pol`];
    this.itemPago.totalIva = pago[`imp_iva`];
    this.itemPago.totalPagar = pago[`imp_cuota`];
    if (isChecked) {
      this.adicionarTotal(pago[`imp_cuota`]);
      this.pagosAgregados.push(this.itemPago);
    } else {
      this.restarTotal(pago[`imp_cuota`]);
      this.eliminarPago(pago[`id_referencia`]);
    }
    this.valorTotal$.subscribe(data => {
      this.pagoFinal = {} as Pago;
      this.pagoFinal.concepto = pago[`concepto`];
      this.pagoFinal.id_pv_cero = this.route.snapshot.paramMap.get('id_pv_cero');
      this.pagoFinal.nro_pol = pago[`nro_pol`];
      this.pagoFinal.totalPagar = data;
    });
  }


  mostrarMilecimas(num: number): string {
    return num.toLocaleString();
  }

  generarPago() {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario,
        pagos: this.pagosAgregados,
        detallePago: this.pagoFinal
      }
    };
    this.router.navigateByUrl('/resumen', navigationExtras);
  }

  eliminarPago(key) {
    this.pagosAgregados.forEach((currentValue, index, arr) => {
      if (this.pagosAgregados[index].idPago === key) {
        this.pagosAgregados.splice(index, 1);
      }
    });
  }

  adicionarTotal(n: number) {
    this.store.dispatch(action.inc({ num: n }));
  }

  restarTotal(n: number) {
    this.store.dispatch(action.dec({ num: n }));
  }

  reiniciarTotal() {
    this.store.dispatch(action.reset());
  }
}
