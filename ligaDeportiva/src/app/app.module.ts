import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { EquiposComponent } from './equipos/equipos.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { ClasificacionesComponent } from './clasificaciones/clasificaciones.component';
import { ArbitrosComponent } from './arbitros/arbitros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NoticiasComponent,
    EquiposComponent,
    JugadoresComponent,
    ClasificacionesComponent,
    ArbitrosComponent,
    ContactoComponent,
    HomeComponent,
    ResultadosComponent,
    InscripcionesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
