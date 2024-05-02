describe("Test suite", () => {

    it('first test', async () => {
        await browser.url('https://github.com/emdoem/09_UTF');
        const pageTitle = await browser.getTitle();

        expect(pageTitle).toEqual('GitHub - emdoem/09_UTF');
    });

});