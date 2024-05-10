import BasePage from "./base.page.js";

export default class CostEstimateSummaryPage extends BasePage {
    constructor() {
        // a mock-up Cost Estimate Summary for testing UI
        super('/products/calculator/estimate-preview/0998dfb1-2456-4270-9103-d79529dbd2b3?hl=pl');
    }

    get title() { return $('//*[contains(text(), "Cost Estimate Summary")]') }

    // get value of specific section in the summary   
    getValue(sectionName) {
        return $(`//span[text()="${sectionName}"]/following-sibling::span[1]`);
    }
}