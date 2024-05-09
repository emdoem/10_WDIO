export default new class CostEstimateSummaryComponent {
    // open a mock summary - in case there's an issue accessing it from the form
    async open() {
        await browser.url('https://cloud.google.com/products/calculator/estimate-preview/0998dfb1-2456-4270-9103-d79529dbd2b3?hl=pl');
    }
}