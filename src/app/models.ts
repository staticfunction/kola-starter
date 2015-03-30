/**
 * Created by jcabresos on 3/27/15.
 */
import signals = require('kola-signals');

export interface Greeting {
    message: string;
    locale: string;
}

export class Greeter {

    greetings: Greeting[];
    onGreeting: signals.Dispatcher<Greeting>;

    private currentGreeting: Greeting;

    constructor() {

        this.greetings = [
            {"locale": "en", "message": "Hello Kola!"},
            {"locale": "es", "message": "Hola Kola!"},
            {"locale": "fr", "message": "Bonjour Kola!"},
            {"locale": "cn", "message": "您好科拉"},
            {"locale": "kr", "message": "안녕하세요 콜라!"},
            {"locale": "jp", "message": "こんにちはコラ"},
            {"locale": "ph", "message": "Mabuhay Kola!"}
        ]

        this.onGreeting = new signals.Dispatcher();

    }

    setCurrentGreeting(value: Greeting): void {
        this.currentGreeting = value;
        this.onGreeting.dispatch(value);
    }

    getCurrentGreeting(): Greeting {
        return this.currentGreeting;
    }
}