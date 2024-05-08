import cloudGooglePage from "../../po/pages/cloudGoogle.page.js";
import productsCalculatorComponent from "../../po/components/productsCalculator.component.js";

describe('Google Cloud Platform Pricing Calculator - following script from Task 3', () => {
    // it('1. Open https://cloud.google.com/.', async () => {
    //     await cloudGooglePage.open();
    // });

    // it('2. Click on the icon at the top of the portal page and enter "Google Cloud Platform Pricing Calculator" into the search field.', async () => {
    //     await $("div > input[placeholder='Search']").click();
    //     await $("input[placeholder='Search']").setValue('Google Cloud Platform Pricing Calculator');
    // });

    // it('3. Perform the search.', async () => {
    //     await browser.keys(['Enter']);
    // });

    // it('4. Click "Google Cloud Platform Pricing Calculator" in the search results and go to the calculator page.', async () => {
    //     // await $("div.gs-title").waitForDisplayed({ timeout: 5000 }); // this doesn't help

    //     // click the first search result to disregard it's not matching the search criteria perfectly:
    //     await $("div.gs-title").click(); // nothing happens on this click...
    // });

    it('5. Click COMPUTE ENGINE at the top of the page.', async () => {
        // opening the component should be replaced with 'waitForDisplayed'?
        await productsCalculatorComponent.open('https://cloud.google.com/products/calculator/');
        // COMPUTE ENGINE now appears in the pop-up, after clicking 'Add to estimate'
        await $('//*[contains(text(), "Add to estimate")]').scrollIntoView({ block: 'center', inline: 'center' }); // this is a suboptimal selector, looking for a better one
        await $('//*[contains(text(), "Add to estimate")]').click();
        // locate COMPUTE ENGINE product and click it:
        await $("//h2[contains(text(), 'Compute Engine')]").waitForDisplayed({ timeout: 2000 });
        await $("//h2[contains(text(), 'Compute Engine')]").click();
    });

    it('6. Fill out the form with the following data:', async () => {
        //    * Number of instances: 4
        await $("div.QiFlid label input").setValue(4); // what a terrible selector
        //    * What are these instances for?: leave blank
        // [this isn't part of the form anymore]

        //    * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        // [leaving in default state]

        //    * Provisioning model: Regular
        // [leaving in default state]

        //    * Machine Family: General purpose 
        // [leaving in default state]

        //    * Series: N1 
        // [leaving in default state]

        //    * Machine type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
        await $("//ul[@aria-label='Machine type']/parent::*/parent::*").scrollIntoView({ block: 'center', inline: 'center' });
        await $("//ul[@aria-label='Machine type']/parent::*/parent::*").click();
        await $("//li[@data-value='n1-standard-8']").click();

        //    * Select “Add GPUs“
        await $('button[aria-label = "Add GPUs"]').scrollIntoView({ block: 'center', inline: 'center' });
        await $('button[aria-label = "Add GPUs"]').click();

        //            * GPU type: NVIDIA Tesla V100
        await $("//ul[@aria-label='GPU Model']/parent::*/parent::*").scrollIntoView({ block: 'center', inline: 'center' });
        await $("//ul[@aria-label='GPU Model']/parent::*/parent::*").click();
        await $("//li[@data-value='nvidia-tesla-v100']").click();

        //            * Number of GPUs: 1
        // [leaving in default state]

        //    * Local SSD: 2x375 Gb
        await $("//ul[@aria-label='Local SSD']/parent::*/parent::*").scrollIntoView({ block: 'center', inline: 'center' });
        await $("//ul[@aria-label='Local SSD']/parent::*/parent::*").click();
        await $("//ul[@aria-label='Local SSD']/parent::*/parent::*//li[@data-value='2']").click();

        //    * Datacenter location: Frankfurt (europe-west3)
        await $("//ul[@aria-label='Region']/parent::*/parent::*").scrollIntoView({ block: 'center', inline: 'center' });
        await $("//ul[@aria-label='Region']/parent::*/parent::*").click();
        await $("//li[@data-value='europe-west4']").scrollIntoView({ block: 'center', inline: 'center' }); // 'europe-west3' is unavailable for these settings
        await $("//li[@data-value='europe-west4']").click();

        //    * Committed usage: 1 Year
        await $('//label[@for="1-year"]/parent::*').scrollIntoView({ block: 'center', inline: 'center' });
        await $('//label[@for="1-year"]/parent::*').click();

        // Other options leave in the default state.
    });

    xit("7. Click 'Add to Estimate'.", () => {
        // [Price is already calculated in the new version of app]
    });

    xit('8. Check the price is calculated in the right section of the calculator. There is a line “Total Estimated Cost: USD ${amount} per 1 month”', () => {
        // [The way total estimated cost is displayed has changed]
    });

    it('9. click "Share" to see Total estimated cost', async () => {
        // wait for the cost to be updated so that "Share" is clickable
        await $('//*[contains(text(), "Service cost updated")]').waitForDisplayed();
        await $('button[aria-label="Open Share Estimate dialog"]').click();
        await expect($('div[aria-label="Share Estimate Dialog"]')).toHaveText(expect.stringContaining('Total estimated cost'));
    });

    it('10. click "Open estimate summary" to see Cost Estimate Summary, will be opened in separate tab browser.', async () => {
        await $('a[track-name="open estimate summary"]').click();

        const windowHandles = await browser.getWindowHandles();
        // Check if a new tab has been opened
        expect(windowHandles.length > 1).toBe(true);

        // Check if new tab actually is a Cost Estimate Summary
        const costEstimateSummaryTitle = await $('//*[contains(text(), "Cost Estimate Summary")]');
        expect(costEstimateSummaryTitle).toExist();
    });

    // it("11. verify that the 'Cost Estimate Summary' matches with filled values in Step 6.", async => {

    // });
});

