describe('https://pastebin.com', () => {
    it('creates /"New Paste/" by following the script', async () => {
        await browser.url('https://pastebin.com');
    });
});