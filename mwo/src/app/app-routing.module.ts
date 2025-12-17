import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './home/home';
import { Watchlist } from './watchlist/watchlist';
import { WatchlistStart } from './watchlist/watchlist-start/watchlist-start';
import { WatchlistDetail } from './watchlist/watchlist-detail/watchlist-detail';
import { WatchlistEdit } from './watchlist/watchlist-edit/watchlist-edit';
import { Recommender } from './recommender/recommender';
import { RecommenderStart } from './recommender/recommender-start/recommender-start';
import { RecommenderDetail } from './recommender/recommender-detail/recommender-detail';
import { RecommenderEdit } from './recommender/recommender-edit/recommender-edit';


const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'watchlist', component: Watchlist, children: [
      {path: '', component: WatchlistStart},
      {path: 'new', component: WatchlistEdit},
      {path: ':id', component: WatchlistDetail},
      {path: ':id/edit', component: WatchlistEdit}
    ]},
    {path: 'recommender', component: Recommender, children: [
      {path: '', component: RecommenderStart},
      {path: 'new', component: RecommenderEdit},
      {path: ':id', component: RecommenderDetail},
      {path: ':id/edit', component: RecommenderEdit}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
