import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Pago } from 'src/app/interfaces/pago';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {

  @Input() usuario: Usuario;
  @Input() pago: Pago;
  constructor() {  }

  ngOnInit() {
  }
}
