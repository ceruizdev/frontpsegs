import { Usuario } from './usuario';
import { Pago } from './pago';

export interface Resumen {
    usuario: Usuario;
    pagos: Pago[];
    detallePago: Pago;
}
