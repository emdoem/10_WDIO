export default new class CostEstimateSummaryPage {
    get title() { return $('//*[contains(text(), "Cost Estimate Summary")]') }

    // open a mock summary - in case there's an issue accessing it from the form
    async open() {
        await browser.url('https://cloud.google.com/products/calculator/estimate-preview/0998dfb1-2456-4270-9103-d79529dbd2b3?hl=pl');
    }

    // get value of specific section in the summary   
    getValue(sectionName) {
        return $(`//span[text()="${sectionName}"]/following-sibling::span[1]`);
    }
}