import PasteBinPage from '../../po/pages/pastebin.page.js';

describe('https://pastebin.com', () => {
    beforeEach(async () => {
        PasteBinPage.open();
    });

    it('creates "New Paste" by following the script', async () => {
        await PasteBinPage.newPasteInputField.setValue('Hello from WebDriver');
        await PasteBinPage.setPasteExpiration('10 Minutes');
        await PasteBinPage.pasteNameInputField.setValue('helloweb');
        await PasteBinPage.createNewPasteButton.click();
    });
});
