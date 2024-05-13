import shareEstimateDialogComponent from "../components/shareEstimateDialog.component.js"

export default new class ComputeEngineCalculatorPage {
    get shareEstimateDialogComponent() { return shareEstimateDialogComponent }
    get numberOfInstancesInputField() { return $("div.QiFlid label input") }
    // this is a terrible selector, but neither <label> or <input> have any distinguishable properties

    get serviceCostUpdatedStatus() { return $('//*[contains(text(), "Service cost updated")]') }

    getFormField(label) {
        // if (label === 'Machine type') {
        //     return this.getSelectField(label);
        // }
        return $(`//span[contains(text(), "${label}")]`); 
    }

    getSelectField(label) {
        return $(`//ul[@aria-label='${label}']/parent::*/parent::*`);
    }

    getListItem(value) {
        // because value='2' is not very unique
        if (value === '2') {
            return $("//ul[@aria-label='Local SSD']/parent::*/parent::*//li[@data-value='2']");
        }

        return $(`//li[contains(@data-value, '${value}')]`);
    }

    getButton(name) {
        const buttons = {
            "Add GPUs": 'button[aria-label = "Add GPUs"]',
            "1 Year": '//label[@for="1-year"]/parent::*',
            "Share": 'button[aria-label="Open Share Estimate dialog"]',
            "Regular": '//label[contains(text(), "Regular")]'
        };

        return $(buttons[name]);
    }

    async clickButton(name) {
        await this.getButton(name).scrollIntoView({ block: 'center', inline: 'center' });
        await this.getButton(name).click()
    }

    async setNumberOfInstances(value) {
        await this.numberOfInstancesInputField.setValue(`${value}`);
    }

    async setSelectField(label, value) {
        await this.getFormField(label).scrollIntoView({ block: 'center', inline: 'center' });
        await this.getSelectField(label).click();
        await this.getListItem(value).click();
    }
}