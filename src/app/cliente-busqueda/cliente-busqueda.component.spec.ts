import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBusquedaComponent } from './cliente-busqueda.component';

describe('ClienteBusquedaComponent', () => {
  let component: ClienteBusquedaComponent;
  let fixture: ComponentFixture<ClienteBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteBusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
