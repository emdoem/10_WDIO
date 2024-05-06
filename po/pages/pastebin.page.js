import Page from './Page.js';

export default new class PasteBinPage extends Page {
    get newPasteInputField () { return $('textarea#postform-text') }
    get syntaxHighlightingInputField () { return $('span#select2-postform-format-container')}
    get pasteExpirationSelectField () { return $('span#select2-postform-expiration-container') }
    get pasteNameInputField () { return $('input#postform-name') }
    get createNewPasteButton () { return $('button.btn[type="submit"]')}

    // open the tested page
    async open() {
        await super.open('https://pastebin.com');
    }

    // set 'Syntax Highlighting':
    async setSyntaxHighlighting (language) {
        await this.syntaxHighlightingInputField.click();
        await $(`//li[text()='${language}']`).click();
    }

    // set 'Paste Expiration':
    async setPasteExpiration (period) {
        await this.pasteExpirationSelectField.click();
        await $(`//li[text()='${period}']`).click();
    }
};
