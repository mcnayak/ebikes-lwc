import { LightningElement, track } from 'lwc';
    export default class HelloWorld extends LightningElement {
        @track greeting = 'World Is Beautful';
        changeHandler(event) {
            this.greeting = event.target.value;
        }
    }