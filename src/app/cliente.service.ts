import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private generarVentas(no_vacio: boolean) {
    const ventas: { [key: string]: number } = {};
    const fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    for (let i = 0; i < 14; i++) {
      const periodo = `${fechaActual.getFullYear()}${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!no_vacio) ventas[periodo] = 0;
      else ventas[periodo] = Math.floor(Math.random() * 10000); 
      fechaActual.setMonth(fechaActual.getMonth() - 1);
    }
    return ventas;
  }

  private clientes = [ 
    { codigo: '123', nombre: 'Enrique' , tipo: 'Recurrente', venta: this.generarVentas(true)},
    { codigo: '456', nombre: 'Pedro', tipo: 'Nuevo', venta: this.generarVentas(true) },
    { codigo: '234', nombre: 'Gerard', tipo: 'Nuevo', venta: this.generarVentas(false) }
  ];

  constructor() { }

  buscarCliente(codigo: string): Observable<{ codigo: string, nombre: string, tipo: string, venta: { [key: string]: number } } | null> {
    const cliente = this.clientes.find(c => c.codigo === codigo);
    return of(cliente ? cliente : null);
  }

  actCliente(codigo: string, clienteActualizado: { tipo: string, venta: { [key: string]: number } }): Observable<boolean> {
    const clienteIndex = this.clientes.findIndex(c => c.codigo === codigo);
    if (clienteIndex !== -1) {
      this.clientes[clienteIndex].tipo = clienteActualizado.tipo;
      this.clientes[clienteIndex].venta = clienteActualizado.venta;
      return of(true);
    }
    return of(false);
  }
}
