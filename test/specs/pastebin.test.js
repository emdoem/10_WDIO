import PasteBinPage from '../../po/pages/pastebin.page.js';

describe('https://pastebin.com', () => {
    beforeEach(async () => {
        await PasteBinPage.open();

        await handleCookiesPopUp();
    });

    it('creates "New Paste" by following the script from Task 1', async () => {
        await PasteBinPage.newPasteInputField.setValue('Hello from WebDriver');
        await PasteBinPage.setPasteExpiration('10 Minutes');
        await PasteBinPage.pasteNameInputField.setValue('helloweb');
        await PasteBinPage.createNewPasteButton.click();
    });

    it('follows script from Task 2', async () => {
        await PasteBinPage.newPasteInputField.click();
        await PasteBinPage.newPasteInputField.setValue(`git config --global user.name  "New Sheriff in Town"
            git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
            git push origin master --force
        `);
        await PasteBinPage.setSyntaxHighlighting('Bash');
        await PasteBinPage.setPasteExpiration('10 Minutes');
        await PasteBinPage.pasteNameInputField.setValue('how to gain dominance among developers');
        await PasteBinPage.createNewPasteButton.click();

        // await browser.pause(2000);
        // const newPasteUrl = await browser.getUrl();
        // console.log(newPasteUrl);
    });

    async function handleCookiesPopUp() {
        // Wait for the cookies pop-up to be displayed
        await $('//*[contains(text(), "We value your privacy")]').waitForDisplayed({ timeout: 5000 });

        // Check if the cookies pop-up is displayed
        const cookiesPopupIsDisplayed = await $('//*[contains(text(), "We value your privacy")]').isDisplayed(); // move selector into po/components
        if (cookiesPopupIsDisplayed) {
            // Find and click the agree button
            await $('//*[contains(text(), "AGREE")]').click(); // move selector into po/elements
        }
    };

});
