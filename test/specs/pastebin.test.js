import pasteBinPage from '../../po/pages/pastebin.page.js';
import cookiesPopUp from '../../po/elements/cookiesPopUp.element.js';
import newPastePage from '../../po/pages/newpaste.page.js';

let newPasteUrl;

describe('https://pastebin.com', () => {
    beforeEach(async () => {
        await pasteBinPage.open();

        await cookiesPopUp.handleCookiesPopUp();
    });

    it('follows script from Task 2', async () => {
        await pasteBinPage.newPasteInputField.click();
        await pasteBinPage.newPasteInputField.setValue('git config --global user.name "New Sheriff in Town" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code") \ngit push origin master --force');
        await pasteBinPage.setSyntaxHighlighting('Bash');
        await pasteBinPage.setPasteExpiration('1 Day'); // longer expiration than in the task description - due to daily free Pastes limit
        await pasteBinPage.pasteNameInputField.setValue('how to gain dominance among developers');

        await pasteBinPage.createNewPasteButton.click(); // switch off to avoid exceeding free Pastes limit
        // wait to load New Paste page
        await browser.pause(2000);
        newPasteUrl = await browser.getUrl();

        console.log('url of created Paste: ', newPasteUrl);
    });
});

describe('new Paste page', async () => {
    beforeEach(async () => {
        await newPastePage.open(newPasteUrl); // make sure createNewPasteButton.click() is on before switching this on
        // await newPastePage.open('https://pastebin.com/ZSEcaX6K'); // opening a mock-up Paste page; url expires on 8.05.2024
    });

    it('has a title matching with the input', async () => {
        const pageTitle = await browser.getTitle();
        expect(pageTitle).toEqual(expect.stringContaining('how to gain dominance among developers'));
    });

    it('displays Syntax Highlighting matching with the input', async () => {
        await expect(newPastePage.topButtons).toHaveText(expect.stringContaining('Bash'));
    });

    it('has content matching with the input', async () => {
        const expectedString = 'git config --global user.name "New Sheriff in Town" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code") \ngit push origin master --force';
        const pasteContent = await newPastePage.pasteContent.getText();
        expect(pasteContent).toEqual(expectedString);
    })
})
