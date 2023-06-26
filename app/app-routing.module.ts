import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/homepage',
        pathMatch: 'full'
    },
    {path: '**', component: NotFoundComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
