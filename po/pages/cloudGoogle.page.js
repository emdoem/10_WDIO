import Page from './Page.js';

export default new class CloudGooglePage extends Page {
    // open the tested page
    async open() {
        await super.open('https://cloud.google.com/');
    }
}