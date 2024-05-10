import BaseComponent from "./BaseComponent.js";

export default new class HeaderComponent extends BaseComponent {
    constructor() {
        super('devsite-header')
    }

    get searchIcon() { return $("div > input[placeholder='Search']") }
    get searchInputField() { return $("input[placeholder='Search']") }
}