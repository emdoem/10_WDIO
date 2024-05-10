import BaseComponent from "./common/base.component.js"

export default new class ShareEstimateDialogComponent extends BaseComponent {
    constructor() {
        super('div[aria-label="Share Estimate Dialog"]')
    }

    get totalEstimatedCostLabel() { return $('//span[text()="Total estimated cost"]') }
    get openEstimateSummaryButton() { return $('a[track-name="open estimate summary"]') }
}