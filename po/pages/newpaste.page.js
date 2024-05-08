import Page from './Page.js';

export default new class NewPastePage extends Page {
    get topButtons () {return $('div.top-buttons')}
    get pasteContent () {return $('ol.bash')}
}
