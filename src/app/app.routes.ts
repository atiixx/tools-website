import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { MonsterHunterComponent } from './monster-hunter/monster-hunter.component';
import { ApiStuffComponent } from './api-stuff/api-stuff.component';

export const routes: Routes = [
  { path: '', redirectTo: '/monster-hunter', pathMatch: 'full' },
  { path: 'monster-hunter', component: MonsterHunterComponent },
  { path: 'api-stuff', component: ApiStuffComponent },
  { path: '**', component: MonsterHunterComponent },
];
