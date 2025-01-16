import { Routes } from '@angular/router';
import { MonsterHunterComponent } from './monster-hunter/monster-hunter.component';
import { ApiStuffComponent } from './api-stuff/api-stuff.component';
import { MessageFeedComponent } from './message-feed/message-feed.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';

export const routes: Routes = [
  { path: '', redirectTo: '/monster-hunter', pathMatch: 'full' },
  { path: 'monster-hunter', component: MonsterHunterComponent },
  { path: 'api-stuff', component: ApiStuffComponent },
  { path: 'message-feed', component: MessageFeedComponent },
  { path: 'data-visualization', component: DataVisualizationComponent },
  { path: '**', component: MonsterHunterComponent },
];
