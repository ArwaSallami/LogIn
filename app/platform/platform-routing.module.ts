import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlateformLayoutComponent} from '../layout/plateform-layout/plateform-layout.component';
import {PackageHistoryComponent} from './package-history/package-history.component';
import {TrackingComponent} from './tracking/tracking.component';
import {NewCommandComponent} from './new-command/new-command.component';
import {AuthGuardService} from '../shared/ApiServices/auth-guard.service';
import {SettingsComponent} from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';
import {PackageHistoryReceivedComponent} from './package-history-received/package-history-received.component';
import {TrackingReceivedComponent} from './tracking-received/tracking-received.component';
import {SuiviPlComponent} from './suivi-pl/suivi-pl.component';
import {ReclamationComponent} from './reclamation/reclamation.component';
import {NewReclamationComponent} from './new-reclamation/new-reclamation.component';




const landing: Routes = [
    {
        path: 'dashboard',
        component: PlateformLayoutComponent, canActivate: [AuthGuardService],
        children: [
            { path: 'historique', component: PackageHistoryComponent , canActivate: [AuthGuardService]},
            { path: 'historique-recu', component: PackageHistoryReceivedComponent, canActivate: [ AuthGuardService]},
            { path: 'nouvelle-commande', component: NewCommandComponent , canActivate: [AuthGuardService]},
            { path: 'suivi-commande', component: TrackingComponent , canActivate: [AuthGuardService]},
            { path: 'suivi-commande-reçu', component: TrackingReceivedComponent, canActivate: [AuthGuardService]},
            { path: 'suivicolis', component: SuiviPlComponent, canActivate: [AuthGuardService]},
            { path: 'settings', component: SettingsComponent , canActivate: [AuthGuardService]},
            { path: 'stats', component: StatsComponent , canActivate: [AuthGuardService]},
            { path: 'reclamation', component: ReclamationComponent, canActivate: [AuthGuardService]},
            { path: 'reclamation/add', component: NewReclamationComponent, canActivate: [AuthGuardService]}
        ]
    },
    {
        path: '',
        redirectTo: '/homepage',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(landing)],
    exports: [RouterModule]
})
export class PlatformRoutingModule { }
