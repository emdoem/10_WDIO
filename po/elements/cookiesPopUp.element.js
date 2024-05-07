export default new class CookiesPopUp {
    get header() { return $('//*[contains(text(), "We value your privacy")]') }
    get agreeButton() { return $('//*[contains(text(), "AGREE")]') }

    async handleCookiesPopUp() {
        // Wait for the cookies pop-up to be displayed
        try {
            await this.header.waitForDisplayed({ timeout: 2000 });
        } catch (error) {
            console.log('Pop-up did not appear', error.message);
        } 

        // Check if the cookies pop-up is displayed
        const cookiesPopupIsDisplayed = await this.header.isDisplayed();
        if (cookiesPopupIsDisplayed) {
            // Find and click the agree button
            await this.agreeButton.click();
        }
    };
}