export default new class ProductsCalculatorComponent {
    get addToEstimateButton() { return $('//span[contains(text(), "Add to estimate")]') }
    get computeEngineButton() { return $("//h2[contains(text(), 'Compute Engine')]") }

    // open the tested page - in case you want to skip opening it from the search results
    async open() {
        await browser.url('https://cloud.google.com/products/calculator');
    }

    async clickAddToEstimateButton() {
        await this.addToEstimateButton.scrollIntoView({ block: 'center', inline: 'center' });
        await this.addToEstimateButton.click();
    }

    // this should be in a seperate Element file?
    async clickComputeEngineButton() {
        await this.computeEngineButton.waitForDisplayed({ timeout: 2000 });
        await this.computeEngineButton.click();
    }
}
