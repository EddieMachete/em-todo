# Clean Architecture Implementation on a TypeScript Project

Last year, after watching a presentation on Clean Architecture and Design, by Robert C. Martin, I became very interested in Clean Architecture, in particular on how it attempts to answer Robert’s following question:

“Why is an application, at its highest level, not telling me what it does?  Why is it telling me how it is made?”

This document contains my attempt of explaining how to build a TypeScript app, following Clean Architecture principles, in a way that we can tell what the app does by just having a look at the files it is made of.  Although my main purpose with this text is to disseminate these concepts amongst my colleagues, I hope that other developers can also find it useful.  At work we currently do most of our development using AngularJS and Ionic, and that is why the code in this document targets those frameworks.

Requirements
I will continue the latest trend of writing an example that implements a Todo list.  In my case, I decided to use Redux’s Todo list example as a starting point.  Our application, therefore, will provide functionality to:
* Display a todo list. 
* Add a new item. 
* Toggle a list item.
* Apply filters to the list.


# Getting Started
1. `nvm use v6.11.3`
2. `git clone https://github.com/EddieMachete/em-todo.git`
3. `npm install`

# Build and Test
To build, run `tsc`
To test run `npm test`

# Demo

# Contribute