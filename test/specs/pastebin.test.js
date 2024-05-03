import PasteBinPage from '../../po/pages/pastebin.page';

describe('https://pastebin.com', () => {
    
    it('creates "New Paste" by following the script', async () => {
        await PasteBinPage.open();
        const selectFieldCheck = await $('span#select2-postform-expiration-container').isExisting();

        expect(selectFieldCheck).toEqual(true);
    });
});