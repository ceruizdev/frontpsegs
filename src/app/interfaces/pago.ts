export interface Pago {
    nro_pol: number;
    idPago: number;
    idCliente: string;
    concepto: string;
    totalPagar: number;
    totalIva: number;
    fecVencimiento: string;
    id_pv_cero: string;
}
