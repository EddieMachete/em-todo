/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the license found at LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AlertController/*, NavController*/ } from 'ionic-angular';
import { Todo } from 'em-todo-core/domain';
import { AddTodoUseCase, ToggleTodoUseCase, ViewTodoListUseCase } from 'em-todo-core/usecases'
import { AppStoreProvider, TodoProvider } from '../../providers';
import { AppStore, iTodosStateModel } from '../../store/app-store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private todos:Todo[] = []

  constructor(/*public navCtrl: NavController*/
    private alertController: AlertController,
    private appStoreProvider: AppStoreProvider,
    private todoProvider: TodoProvider) { }

  ngOnInit() {
    this.appStoreProvider.getStore().then((store: Store<AppStore>) => {
      // Subscribe to create purchase status
      store.select('todos')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((state: iTodosStateModel) => {
        this.todos = state.todos;
        //this.sortingMechanism = state.sortingMechanism;
        //this.sortAscending = state.sortAscending;
      });
    });

    this.viewTodoList();
  }

  private viewTodoList() {
    new ViewTodoListUseCase(this.appStoreProvider, this.todoProvider)
    .execute('all', 'date-created', true);
  }
  
  private beginCreateTodo():void {
    let alert = this.alertController.create(
      {
        title: 'Add ToDo',
        inputs: [
          {
            name: 'description',
            placeholder: 'Description'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Create',
            handler: data => this.createTodo(data.description)
          }
        ]
      }
    );
    
    alert.present();
  }

  private createTodo(description:string):void {
    new AddTodoUseCase(this.appStoreProvider, this.todoProvider)
    .execute(description);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCreateTodo():void {
    this.beginCreateTodo();
  }

  onToggleTodo(todo:Todo):void {
    new ToggleTodoUseCase(this.appStoreProvider, this.todoProvider)
    .execute(todo);
  }
}