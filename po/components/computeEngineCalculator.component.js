export default new class ComputeEngineCalculator {
    get numberOfInstancesInputField() { return $("div.QiFlid label input") } 
    // this is a terrible selector, but neither <label> or <input> have any distinguishable properties

    get serviceCostUpdatedStatus() { return $('//*[contains(text(), "Service cost updated")]') }
    get shareEstimateDialogPopUp() { return $('div[aria-label="Share Estimate Dialog"]') }

    getSelectField(label) {
        return $(`//ul[@aria-label='${label}']/parent::*/parent::*`);
    }

    getListItem(value) {
        // because value='2' is not very unique
        if (value === '2') {
            return $("//ul[@aria-label='Local SSD']/parent::*/parent::*//li[@data-value='2']");
        }

        return $(`//li[@data-value='${value}']`);
    }

    getButton(name) {
        const buttons = {
            "Add GPUs": 'button[aria-label = "Add GPUs"]',
            "1 Year": '//label[@for="1-year"]/parent::*',
            "Share": 'button[aria-label="Open Share Estimate dialog"]'
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
        await this.getSelectField(label).scrollIntoView({ block: 'center', inline: 'center' });
        await this.getSelectField(label).click();
        await this.getListItem(value).click();
    }
}