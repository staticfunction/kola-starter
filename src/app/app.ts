/**
 * Created by jcabresos on 3/27/15.
 */
import kola = require('kola');
import signals = require('kola-signals');
import hooks = require('kola-hooks');

import models = require('./models');
import commands = require('./commands');

import GreeterView = require('./views/GreeterView');

export interface Kontext extends kola.Kontext {
    setSignal<T>(name: string, hook?: kola.Hook<T>): kola.SignalHook<T>;
    getSignal<T>(name: string): signals.Dispatcher<T>;
    setInstance<T>(name: string, factory: () => T): kola.KontextFactory<T>;
    getInstance<T>(name: string): T;

    getSignal(name: 'greet.next'): signals.Dispatcher<{greeting: models.Greeting}>;
    getInstance(name: 'greeter'): models.Greeter;
}


export class App extends kola.App<HTMLElement> {

    view: GreeterView;
    greetingChange: signals.Listener<models.Greeting>;

    initialize(kontext: Kontext, opts?: HTMLElement): void {
        kontext.setSignal<{greeting: models.Greeting}>('greet.next', hooks.executes([
            commands.getNewGreeting, commands.setGreeting
        ]))

        kontext.setInstance('greeter', () => {
            return new models.Greeter();
        }).asSingleton();
    }

    onStart(): void {
        this.view = new GreeterView();
        this.view.appendTo(this.opts);
        this.opts.addEventListener('click', this.greetBtnClickHandler.bind(this));

        var greeter = <models.Greeter>this.kontext.getInstance('greeter');
        this.greetingChange = greeter.onGreeting.listen(this.onGreetingChange, this)
    }

    onGreetingChange(greeting: models.Greeting): void {
        this.view.msg.textContent = greeting.message;
        this.opts.className = greeting.locale;
    }

    greetBtnClickHandler(event: MouseEvent): void {
        this.kontext.getSignal('greet.next').dispatch({});
    }

    onStop(): void {
        this.view.remove();
        this.greetingChange.unlisten();
    }
}