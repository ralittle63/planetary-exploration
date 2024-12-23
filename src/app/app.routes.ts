import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlanetListComponent } from './components/planets/planet-list/planet-list.component';
import { PlanetFormComponent } from './components/planets/planet-form/planet-form.component';
import { MissionListComponent } from './components/missions/mission-list/mission-list.component';
import { MissionFormComponent } from './components/missions/mission-form/mission-form.component';
import { DiscoveryListComponent } from './components/discoveries/discovery-list/discovery-list.component';
import { DiscoveryFormComponent } from './components/discoveries/discovery-form/discovery-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planets', component: PlanetListComponent },
  { path: 'planets/new', component: PlanetFormComponent },
  { path: 'planets/edit/:id', component: PlanetFormComponent },
  { path: 'missions', component: MissionListComponent },
  { path: 'missions/new', component: MissionFormComponent },
  { path: 'missions/edit/:id', component: MissionFormComponent },
  { path: 'discoveries', component: DiscoveryListComponent },
  { path: 'discoveries/:missionid', component: DiscoveryListComponent }, 
  { path: 'discoveries/new/:missionid', component: DiscoveryFormComponent },
  { path: 'discoveries/edit/:id/:missionid', component: DiscoveryFormComponent },
];
