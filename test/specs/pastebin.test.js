import PasteBinPage from '../../po/pages/pastebin.page.js';

describe('https://pastebin.com', () => {
    let page;
    beforeEach(async () => {
        PasteBinPage.open();

        // // add cookies to prevent a pop-up window
        // await browser.addCookie({name: '_cc_dc', value: '1'});
        // await browser.addCookie({name: '_cc_id', value: '4a03f9d0af1def51d660c035cd475b46'});

        // // handle cookies pop-up window
        // await browser.pause(2000);
        // const cookiesPopupIsDisplayed = await $('div#qc-cmp-ui').isDisplayed();
        // if (cookiesPopupIsDisplayed) {
        //     // Find and click the agree button
        //     await $('button.css-47sehv').click();
        // }

    });

    // it('displays a cookies pop-up window', async () => {
    //     const cookiesPopup = await $('div#qc-cmp-ui');
    //     expect(cookiesPopup).toBeDisplayed();
    // });

    it('creates "New Paste" by following the script', async () => {
        await PasteBinPage.newPasteInputField.click();
        await PasteBinPage.newPasteInputField.setValue('Hello from WebDriver');
        await PasteBinPage.setPasteExpiration('10 Minutes');
        await PasteBinPage.pasteNameInputField.setValue('helloweb');
        await PasteBinPage.createNewPasteButton.click();
    });
});