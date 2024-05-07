import Page from './Page.js';

export default new class NewPastePage extends Page {
    get topButtons () {return $('div.top-buttons')}
    get pasteContent () {return $('ol.bash')}

    // open the url with a mock Paste to avoid generating new Paste on every test run
    async open() {
        await super.open('https://pastebin.com/saS5vxZZ'); // this url expires on 8.05.2024
    }
}