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
  ventas: { [key: string]: number } = {};
  ventaKeys: string[] = [];
  muestraVentas: string[] = [];
  promedio: number = 0;
  alertGuardado: string = '';

  constructor(private clienteService: ClienteService) { }

  buscarCliente() {
    this.clienteService.buscarCliente(this.codigo).subscribe(cliente => {
      if (cliente) {
        this.nombre = cliente.nombre;
        this.clienteTipo = cliente.tipo;
        this.ventas = cliente.venta;
        this.ventaKeys = Object.keys(cliente.venta).sort().reverse();
        this.muestraVentas = this.getVentaKeys();
        this.actPromedio();
        this.alertGuardado = '';
      } else {
        this.nombre = '';
        this.clienteTipo = '';
        this.ventas = {};
        this.ventaKeys = [];
        this.muestraVentas = [];
        this.promedio = 0;
        this.alertGuardado = '';
      }
    });
  }


  getVentaKeys(): string[] {
    if (this.clienteTipo === 'Recurrente') {
      return this.ventaKeys.slice(0, 6);
    } else if (this.clienteTipo === 'Nuevo') {
      const anioPasado = new Date().getFullYear() - 1;
      const ult3Meses = [
        `${anioPasado}12`,
        `${anioPasado}11`,
        `${anioPasado}10`
      ];
      return ult3Meses.filter(mes => this.ventaKeys.includes(mes)); 
    }
    return [];
  }

  handleChange() {
    if (this.clienteTipo === 'Recurrente') {
      this.muestraVentas = this.getVentaKeys();
      this.actPromedio();
    }
  }

  actPromedio() {
    const i_venta = this.muestraVentas.map(key => this.ventas[key]).filter(val => val != null);
    console.log(i_venta);
    if (this.clienteTipo === 'Recurrente' && i_venta.length === 6) {
      const ventasOrd = [...i_venta].sort((a, b) => a - b);
      const ventasMin = ventasOrd.slice(1, 5);
      this.promedio = ventasMin.reduce((acum, suma) => parseFloat(acum.toString()) + parseFloat(suma.toString()), 0) / (ventasMin.length * 1.0);
    } else if (this.clienteTipo === 'Nuevo' && i_venta.length === 3) {
      this.promedio = i_venta.reduce((acum, suma) => parseFloat(acum.toString()) + parseFloat(suma.toString()), 0) / (i_venta.length * 1.0);
    } else {
      this.promedio = 0;
    }
  }

  guardarCliente() {
    const clienteActualizado = {
      tipo: this.clienteTipo,
      venta: this.ventas
    };

    this.clienteService.actCliente(this.codigo, clienteActualizado).subscribe(exito => {
      if (exito) {
        this.alertGuardado = 'Guardado exitoso!';
      } else {
        this.alertGuardado = 'Cliente no encontrado.';
      }
    });
  }
}
