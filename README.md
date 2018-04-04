# Clean Architecture Implementation on a TypeScript Project

Last year, after watching a presentation on Clean Architecture and Design, by Robert C. Martin, I became very interested in Clean Architecture, in particular on how it attempts to answer Robert's following question:

*"Why is an application, at its highest level, not telling me what it does?  Why is it telling me how it is made?"*

This document contains my attempt of explaining how to build a TypeScript app, following Clean Architecture principles, in a way that we can tell what the app does by just having a look at the files it is made of.  Although my main purpose with this text is to disseminate these concepts amongst my colleagues, I hope that other developers can also find it useful.  At work we currently do most of our development using AngularJS and Ionic, and that is why the code in this document targets those frameworks.

Requirements
I will continue the latest trend of writing an example that implements a Todo list.  In my case, I decided to use Redux’s Todo list example as a starting point.  Our application, therefore, will provide functionality to:
* Display a todo list. 
* Add a new item. 
* Toggle a list item.
* Apply filters to the list.


## Getting Started
1. `nvm use v6.11.3`
2. `git clone https://github.com/EddieMachete/em-todo.git`
3. `npm install`

## Build and Test
To build, run `tsc`
To test run `npm test`

## web-console-app demo
To start the web console demo app run:
1. `nvm use v6.11.3`
2. `npm install`
3. `tsc`
4. `npm start`
5. Once the app is running, open `http://localhost:9000/web-console-app/index.html` on Google Chrome.
6. Open the developer console.

You can type the following methods into the console:
* `app.createTodo(description:string)`
* `app.showTodos()`
* `app.showPendingTodos()`
* `app.toggleTodoAtPosition(position:number)`

## ionic-app demo
1. `cd ionic-app`. Navigate to the ionic-app folder to build and serve.
2. `nvm use v6.11.3`. This is the version I was on when writting the example.
3. `npm install`
3. `tsc --p tsconfig.em-todo-core.json`. The em-todo-core was exported as an npm package but needs to be compiled for Ionic to use.
4. `npm install -g ionic@latest`
6. `ionic serve`

## Contribute