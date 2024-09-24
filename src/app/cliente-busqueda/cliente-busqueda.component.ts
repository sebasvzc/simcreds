import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-busqueda', 
  templateUrl: './cliente-busqueda.component.html',
  styleUrl: './cliente-busqueda.component.css'
})
export class ClienteBusquedaComponent {
  codigo: string = '';
  nombre: string = '';
  clienteTipo: string = '';
  alertGuardado: string = '';

  constructor(private clienteService: ClienteService) {}

  buscarCliente() {
    this.clienteService.buscarCliente(this.codigo).subscribe(cliente => {
      if (cliente) {
        this.nombre = cliente.nombre;
        this.clienteTipo = cliente.tipo;
        this.alertGuardado = '';
      } else {
        this.nombre = ''; 
        this.clienteTipo = '';
        this.alertGuardado = '';
      }
    });
  }

  guardarCliente() {
    const actCliente = {
      nombre: this.nombre,
      tipo: this.clienteTipo
    };
    
    this.clienteService.actCliente(this.codigo, actCliente).subscribe(exito => {
      if (exito) {
        this.alertGuardado = 'Guardado exitoso!';
      } else {
        this.alertGuardado = 'Cliente no encontrado.';
      }
    });
  }
}
