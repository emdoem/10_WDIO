import headerComponent from "../components/common/header.component.js";

export default class BasePage {
    constructor(url) {
        this.url = url;
        this.headerComponent = headerComponent;
    }

    async open() {
        await browser.url(this.url);
    }
}