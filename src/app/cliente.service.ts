import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private generarVentas() {
    const ventas: { [key: string]: number } = {};
    const fechaActual = new Date();
    for (let i = 0; i < 15; i++) {
      const periodo = `${fechaActual.getFullYear()}${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}`;
      ventas[periodo] = Math.floor(Math.random() * 10000); 
      fechaActual.setMonth(fechaActual.getMonth() - 1);
    }
    return ventas;
  }

  private clientes = [ 
    { codigo: '123', nombre: 'John Doe' , tipo: 'Recurrente', venta: this.generarVentas()},
    { codigo: '456', nombre: 'Jane Smith', tipo: 'Nuevo', venta: this.generarVentas() }
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
