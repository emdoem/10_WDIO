import Page from './Page.js';

export default new class CloudGooglePage extends Page {
    get searchIcon() { return $("div > input[placeholder='Search']") }
    get searchInputField() { return $("input[placeholder='Search']") }

    // open the tested page
    async open() {
        await super.open('https://cloud.google.com/');
    }
};
