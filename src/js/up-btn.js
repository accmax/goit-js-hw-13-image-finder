export default class UpBtn {
    constructor({selector, hidden = false}) {
        this.link = document.querySelector(selector);

        hidden && this.hide();
    }

    show() {
        this.link.classList.remove('is-hidden');
    }

    hide() {
        this.link.classList.add('is-hidden');
    }
}