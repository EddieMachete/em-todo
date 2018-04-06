/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

/**
 * Implementation of the observable design pattern.
 */
export class Observable {
    constructor() {
        this.events =[];
    }

    /**
     * Notifies all the observers associated to a particular event.
     * @param {e} Event to be broadcasted.
     */
    updateObservers(e) {
        let items = this.events["e_" + e.type];

        if (items) {
            let item;
            e.sender = this;

            for (let i = 0; i < items.length; i++) {
                items[i](e);
            }
        }
    };

    /**
     * Adds a function as a listener of the event specified by the string eventName.
     * @param {string} eventName
     * @param {Function} observer
     */
    addObserver(eventName, observer) {
        let key = "e_" + eventName;

        if (!this.events[key]) {
            this.events[key] = [observer];
            return;
        }

        let isObserver = false;
        let observers = this.events[key];
        let index = 0;

        while (index < observers.length && !isObserver) {
            if (observers[index].observer == observer) {
                isObserver = true;
            }

            index++;
        }

        if (!isObserver) {
            this.events[key].push(observer);
        }
    }

    /**
     * Removes an object as an observer of the event specified by the string eventName.
     * @param {string} name of the event the object will stop observing.
     * @param {object} observer.
    */
    removeObserver(eventName, observer) {
        let key = "e_" + eventName;
        let observers = this.events[key]

        if (!observers) {
            return;
        }

        let found = false;
        let index = 0;

        while (index < observers.length && !found) {
            if (observers[index] == observer) {
                observers.splice(index, 1);
                found = true;
            }

            index++;
        }
    };

    /**
     * Clears all the observers of the object.
     */
    resetObservers() {
        delete this.events;
        this.events = [];
    }

    toString() {
        let s = "Object type: Observable\n";

        for (let index in this.events) {
            s += `${index} - ${this.events[index].length} observers`;
        }

        return (s);
    }
}
