import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { App } from './app.component';

import { Header } from './header';
import { Home } from './home/home';
import { Recommender } from './recommender/recommender';
import { RecommenderList } from './recommender/recommender-list/recommender-list';
import { RecommenderDetail } from './recommender/recommender-detail/recommender-detail';
import { RecommenderItem } from './recommender/recommender-item/recommender-item';
import { Watchlist } from './watchlist/watchlist';
import { WatchlistList } from './watchlist/watchlist-list/watchlist-list';
import { WatchlistItem } from './watchlist/watchlist-item/watchlist-item';
import { WatchlistDetail } from './watchlist/watchlist-detail/watchlist-detail';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecommenderService } from './recommender/recommender.service';
import { WatchlistService } from './watchlist/watchlist.service';
import { AppRoutingModule } from './app-routing.module';
import { WatchlistEdit } from './watchlist/watchlist-edit/watchlist-edit';
import { WatchlistStart } from './watchlist/watchlist-start/watchlist-start';
import { RecommenderStart } from './recommender/recommender-start/recommender-start';
import { RecommenderEdit } from './recommender/recommender-edit/recommender-edit';
import { WatchlistFilterPipe } from './watchlist/watchlist-filter-pipe';


@NgModule({
  declarations: [
    App,
    Header,
    Home,
    Recommender,
    WatchlistFilterPipe,
    RecommenderList,
    RecommenderDetail,
    RecommenderItem,
    RecommenderStart,
    RecommenderEdit,
    Watchlist,
    WatchlistList,
    WatchlistItem,
    WatchlistDetail,
    WatchlistEdit,
    WatchlistStart,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    DropdownDirective,
    AppRoutingModule,
    CdkDropList,
    CdkDrag,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    RecommenderService,
    WatchlistService
  ],
  bootstrap: [App]
})
export class AppModule { }
