export default new class CostEstimateSummaryComponent {
    // open a mock summary - in case there's an issue accessing it from the form
    async open() {
        await browser.url('https://cloud.google.com/products/calculator/estimate-preview/87d0baf0-a8bb-4ab6-94d4-8bfb2ba6522d?hl=pl');
    }
}