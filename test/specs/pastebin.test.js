import pasteBinPage from '../../po/pages/pastebin.page.js';
import cookiesPopUp from '../../po/elements/cookiesPopUp.element.js';
import newPastePage from '../../po/pages/newpaste.page.js';

// testing a mock-up Paste page to verify testing logic
describe('mock-up Paste page', async () => {
    beforeEach(async () => {
        await newPastePage.open();
    });

    it('has a title matching with the input', async () => {
        const pageTitle = await browser.getTitle();
        expect(pageTitle).toEqual(expect.stringContaining('how to gain dominance among developers'));
    });

    it('displays Syntax Highlighting matching with the input', async () => {
        await expect(newPastePage.topButtons).toHaveText(expect.stringContaining('Bash'));
    });

    it('has content matching with the input', async () => {
        const expectedString = 'git config --global user.name  "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force';
        const pasteContent = await newPastePage.pasteContent.getText();
        expect(pasteContent).toEqual(expect.stringContaining(expectedString));
    })
})

// describe('https://pastebin.com', () => {
//     beforeEach(async () => {
//         await pasteBinPage.open();

//         await cookiesPopUp.handleCookiesPopUp();
//     });

//     it('creates "New Paste" by following the script from Task 1', async () => {
//         await pasteBinPage.newPasteInputField.setValue('Hello from WebDriver');
//         await pasteBinPage.setPasteExpiration('10 Minutes');
//         await pasteBinPage.pasteNameInputField.setValue('helloweb');
//         // await PasteBinPage.createNewPasteButton.click(); // switch off to avoid exceeding free Pastes limit
//     });

//     it('follows script from Task 2', async () => {
//         await pasteBinPage.newPasteInputField.click();
//         await pasteBinPage.newPasteInputField.setValue('git config --global user.name "New Sheriff in Town" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code") \ngit push origin master --force');
//         await pasteBinPage.setSyntaxHighlighting('Bash');
//         await pasteBinPage.setPasteExpiration('10 Minutes');
//         await pasteBinPage.pasteNameInputField.setValue('how to gain dominance among developers');
        
//         // await PasteBinPage.createNewPasteButton.click(); // switch off to avoid exceeding free Pastes limit
//         await newPastePage.open(); // switch on to mock-up creating a new paste

//         await expect(browser.getWindowHandle()).toEqual('how to gain dominance among developers');

//     });
// });
