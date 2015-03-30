/**
 * Created by jcabresos on 3/27/15.
 */
import app = require('./app');
import models = require('./models');

export function getNewGreeting(payload: {greeting: models.Greeting}, kontext: app.Kontext): void {
    var greeter = <models.Greeter>kontext.getInstance('greeter');
    var nextIndex = Math.round(Math.random() * (greeter.greetings.length - 1));
    payload.greeting = greeter.greetings[nextIndex];

    if(!payload.greeting)
        console.log(nextIndex);
}

export function setGreeting(payload: {greeting: models.Greeting}, kontext: app.Kontext): void {
    var greeter = <models.Greeter>kontext.getInstance('greeter');
    greeter.setCurrentGreeting(payload.greeting);
}
