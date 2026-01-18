import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { ClasificacionesComponent } from './clasificaciones/clasificaciones.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { ArbitrosComponent } from './arbitros/arbitros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { NoticiasComponent } from './noticias/noticias.component';

export const routes: Routes = [
  { path: '', redirectTo: '/noticias', pathMatch: 'full' }, // Página principal redirige a noticias
  { path: 'noticias', component: NoticiasComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'clasificaciones', component: ClasificacionesComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'arbitros', component: ArbitrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'inscripciones', component: InscripcionesComponent },
  { path: '**', redirectTo: '/noticias' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }