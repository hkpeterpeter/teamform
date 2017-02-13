export default class Alert {
    constructor() {
        this.template = require('../views/alert.html');
        this.restrict = 'E';
        this.scope = {message: '@', type: '@'};
    }

    link(scope, element, attributes) {

    }

    static instance(...args) {
        return new Alert(...args);
    }
}
