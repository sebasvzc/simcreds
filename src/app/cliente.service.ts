import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes = [ 
    { codigo: '123', nombre: 'John Doe' , tipo: 'Recurrente'},
    { codigo: '456', nombre: 'Jane Smith', tipo: 'Nuevo' }
  ];

  constructor() { }

  buscarCliente(codigo: string): Observable<{ codigo: string, nombre: string, tipo: string } | null> {
    const cliente = this.clientes.find(c => c.codigo === codigo);
    return of(cliente ? cliente : null);
  }

  actCliente(codigo: string, actCliente: { nombre: string, tipo: string }): Observable<boolean> {
    const clienteIndex = this.clientes.findIndex(c => c.codigo === codigo);
    if (clienteIndex !== -1) {
      this.clientes[clienteIndex].nombre = actCliente.nombre;
      this.clientes[clienteIndex].tipo = actCliente.tipo;
      return of(true);
    }
    return of(false);
  }
}
