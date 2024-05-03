import Page from './Page';

export default class PasteBinPage extends Page {
    // open the tested page
    async open () {
        await super.open('https://pastebin.com');
    }

    // set 'New Paste'
    async setNewPaste (input) {
        // find 'New Paste' input field & set its value
        await $('textarea#postform-text').setValue(input);
    }

    // set 'Paste Expiration'
    async setExpiration (period) {
        // in case the previous selector fails: 'span#select2-postform-expiration-container'
        await $('select#postform-expiration').click();
        await $(`//li[text()='${period}']`).click();
    }

    // set Paste Name / Title
    async setPasteName (input) {
        // find 'Paste Name / Title' input field & set its value
        await $('input#postform-name').setValue(input);
    }
};
