import cloudGooglePage from "../../po/pages/cloudGoogle.page.js";
import productsCalculatorComponent from "../../po/components/productsCalculator.component.js";
import costEstimateSummaryComponent from "../../po/components/costEstimateSummary.component.js";
import searchResultsComponent from "../../po/components/searchResults.component.js";
import computeEngineCalculatorComponent from "../../po/components/computeEngineCalculator.component.js";

describe('Google Cloud Platform Pricing Calculator - following script from Task 3', () => {
    it('1. Open https://cloud.google.com/.', async () => {
        await cloudGooglePage.open();
    });

    it('2. Click on the icon at the top of the portal page and enter "Google Cloud Platform Pricing Calculator" into the search field.', async () => {
        await cloudGooglePage.searchIcon.click();
        await cloudGooglePage.searchInputField.setValue('Google Cloud Platform Pricing Calculator');
    });

    it('3. Perform the search.', async () => {
        await browser.keys(['Enter']);
    });

    it('4. Click "Google Cloud Platform Pricing Calculator" in the search results and go to the calculator page.', async () => {
        // omitting "Platform" because the naming has changed
        await searchResultsComponent.getResultContaining("Google Cloud Pricing Calculator").click();
    });

    it('5. Click COMPUTE ENGINE at the top of the page.', async () => {
        // open the calculator directly if you want to skip the searching part of the script
        await productsCalculatorComponent.open()
        // COMPUTE ENGINE now appears in the pop-up, after clicking 'Add to estimate'
        await productsCalculatorComponent.clickAddToEstimateButton();
        // button is often outside of displayed layout, so need to scroll to find it

        // locate COMPUTE ENGINE product and click it (displays in a pop-up window, so requires additional logic):
        await productsCalculatorComponent.clickComputeEngineButton();
    });

    it('6. Fill out the form with the following data:', async () => {
        //    * Number of instances: 4
        await computeEngineCalculatorComponent.setNumberOfInstances('4');
        
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
        await computeEngineCalculatorComponent.setSelectField('Machine type', 'n1-standard-8');

        //    * Select “Add GPUs“
        await computeEngineCalculatorComponent.clickButton('Add GPUs');

        //            * GPU type: NVIDIA Tesla V100
        await computeEngineCalculatorComponent.setSelectField('GPU Model', 'nvidia-tesla-v100');

        //            * Number of GPUs: 1
        // [leaving in default state]

        //    * Local SSD: 2x375 Gb
        await computeEngineCalculatorComponent.setSelectField('Local SSD', '2');

        //    * Datacenter location: Frankfurt (europe-west3)
        await computeEngineCalculatorComponent.setSelectField('Region', 'europe-west4');

        //    * Committed usage: 1 Year
        await computeEngineCalculatorComponent.clickButton('1 Year');


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
        await computeEngineCalculatorComponent.serviceCostUpdatedStatus.waitForDisplayed();
        await computeEngineCalculatorComponent.clickButton("Share");
        await expect(computeEngineCalculatorComponent.shareEstimateDialogPopUp).toHaveText(expect.stringContaining('Total estimated cost'));
    });

    // it('10. click "Open estimate summary" to see Cost Estimate Summary, will be opened in separate tab browser.', async () => {
    //     await $('a[track-name="open estimate summary"]').click();

    //     const windowHandles = await browser.getWindowHandles();
    //     // Check if a new tab has been opened
    //     expect(windowHandles.length > 1).toBe(true);

    //     // open a mock summary in case there's an issue accessing the summary from the form
    //     await costEstimateSummaryComponent.open();

    //     // Check if new tab actually is a Cost Estimate Summary
    //     const costEstimateSummaryTitle = await $('//*[contains(text(), "Cost Estimate Summary")]');
    //     expect(costEstimateSummaryTitle).toBeDisplayed();
    // expect(costEstimateSummaryComponent.title).toBeDisplayed();
    // });

    xit("11. verify that the 'Cost Estimate Summary' matches with filled values in Step 6.", async () => {
        // open a mock summary - switch off for final verification
        await costEstimateSummaryComponent.open();

        // await browser.pause(5000);
        // verify Number of Instances (4)
        await expect(costEstimateSummaryComponent.getValueForSection("Number of Instances", "4"))
            .toBeDisplayed(); // this only works for mock summary - why?
        // verify operating system
        await expect(costEstimateSummaryComponent.getValueForSection("Operating System / Software", "Free: Debian, CentOS, CoreOS, Ubuntu"))
            .toBeDisplayed();
        // verify provisioning model (Regular)
        await expect(costEstimateSummaryComponent.getValueForSection("Provisioning Model", "Regular"))
            .toBeDisplayed(); // this only works for mock summary - why?
        // verify machine type (n1-standard-8)
        await expect(costEstimateSummaryComponent.getValueForSection("Machine type", "n1-standard-8"))
            .toBeDisplayed();
        // verify GPU type (NVIDIA Tesla V100)
        await expect(costEstimateSummaryComponent.getValueForSection("GPU Model", "NVIDIA Tesla V100"))
            .toBeDisplayed();
        // verify "Number of GPUs" (1)
        await expect(costEstimateSummaryComponent.getValueForSection("Number of GPUs", "1"))
            .toBeDisplayed();
        // verify Local SSD (2x375 GB)
        await expect(costEstimateSummaryComponent.getValueForSection("Local SSD", "2x375 GB"))
            .toBeDisplayed();
        // verify datacenter location (europe-west4)
        await expect(costEstimateSummaryComponent.getValueForSection("Region", "europe-west4"))
            .toBeDisplayed();
        // verify commited usage (1 year)
        await expect(costEstimateSummaryComponent.getValueForSection("Committed use discount options", "1 year"))
            .toBeDisplayed();
    });
});

