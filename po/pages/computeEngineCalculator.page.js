import shareEstimateDialogComponent from "../components/shareEstimateDialog.component.js"

export default class ComputeEngineCalculatorPage {
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
        if (label === 'Local SSD' || label === 'Number of GPUs') { return $(`//ul[@aria-label='${label}']/parent::*/parent::*//div[@role='combobox']`) }
        return $(`//ul[@aria-label='${label}']/parent::*/parent::*`);
    }

    getListItem(label, value) {
        // because value='2' is not very unique
        if (label === 'Local SSD' || label === 'Number of GPUs') {
            return $(`//ul[@aria-label='${label}']//li[@data-value='${value}']`);
        }

        return this.getSelectField(label).$(`//li[contains(@data-value, '${value}')]`);
    }

    getButton(name) {
        const buttons = {
            "Add GPUs": 'button[aria-label = "Add GPUs"]',
            "1 Year": '//label[@for="1-year"]/parent::*',
            "3 Years": '//label[@for="3-years"]/parent::*',
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
        await this.getListItem(label, value).click();
    }
};
