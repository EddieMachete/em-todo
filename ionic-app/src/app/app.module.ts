import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppStoreProvider, TodoProvider } from '../providers';
import { Todo } from 'em-todo-core/domain';

import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/app-store';
import { UIStateActions } from '../store/actions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),

    //store
    StoreModule.forRoot(reducers, {
      initialState: {
        lastErrorMessage: '',
        todos:{todos:[], filter:'all', sortingMechanism:'date-created', sortAscending: true},
        status: ''
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    AppStoreProvider,
    TodoProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    // Actions
    UIStateActions
  ],
  schemas:  [CUSTOM_ELEMENTS_SCHEMA], // Required for using web components
})
export class AppModule {}
