import { pages } from "../../po/pages/index.js";

const task3TestData = {
    numberOfInstances: '4',
    
}

describe('Google Cloud Platform Pricing Calculator - following script from Task 3', () => {
    it('1. Open https://cloud.google.com/.', async () => {
        await pages('cloud_google').open();
    });

    it('2. Click on the icon at the top of the portal page and enter "Google Cloud Platform Pricing Calculator" into the search field.', async () => {
        await pages('cloud_google').headerComponent.searchIcon.click();
        await pages('cloud_google').headerComponent.searchInputField.setValue('Google Cloud Platform Pricing Calculator');
    });

    it('3. Perform the search.', async () => {
        // there apparently is no visible 'search' button, which is weird
        await browser.keys(['Enter']);
    });

    it('4. Click "Google Cloud Platform Pricing Calculator" in the search results and go to the calculator page.', async () => {
        // omitting "Platform" because the naming has changed
        await pages('search_results').getFirstResultContaining("Google Cloud Pricing Calculator").click();
    });

    it('5. Click COMPUTE ENGINE at the top of the page.', async () => {
        // open the calculator directly if you want to skip the searching part of the script
        // await productsCalculatorComponent.open()

        // COMPUTE ENGINE now appears in the pop-up, after clicking 'Add to estimate'
        await pages('products_calculator').clickAddToEstimateButton();
        // button is often outside of displayed layout, so need to scroll to find it

        // locate COMPUTE ENGINE product and click it (displays in a pop-up window, so requires additional logic):
        await pages('products_calculator').clickComputeEngineButton();
    });

    it('6. Fill out the form with the following data:', async () => {
        //    * Number of instances: 4
        await pages('compute_engine_calculator').setNumberOfInstances('4');

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
        await pages('compute_engine_calculator').setSelectField('Machine type', 'n1-standard-8');

        //    * Select “Add GPUs“
        await pages('compute_engine_calculator').clickButton('Add GPUs');

        //            * GPU type: NVIDIA Tesla V100
        await pages('compute_engine_calculator').setSelectField('GPU Model', 'nvidia-tesla-v100');

        //            * Number of GPUs: 1
        // [leaving in default state]

        //    * Local SSD: 2x375 Gb
        await pages('compute_engine_calculator').setSelectField('Local SSD', '2');

        //    * Datacenter location: Frankfurt (europe-west3)
        await pages('compute_engine_calculator').setSelectField('Region', 'europe-west4');

        //    * Committed usage: 1 Year
        await pages('compute_engine_calculator').clickButton('1 Year');

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
        await pages('compute_engine_calculator').serviceCostUpdatedStatus.waitForDisplayed();
        await pages('compute_engine_calculator').clickButton("Share");
        await expect(pages('compute_engine_calculator').shareEstimateDialogComponent.totalEstimatedCostLabel).toBeDisplayed();
    });

    // maybe this step should be divided into 2 separate test cases? It's testing 2 different pages?...
    it('10. click "Open estimate summary" to see Cost Estimate Summary, will be opened in separate tab browser.', async () => {
        await pages('compute_engine_calculator').shareEstimateDialogComponent.openEstimateSummaryButton.click();

        const windowHandles = await browser.getWindowHandles();
        // Check if a new tab has been opened
        expect(windowHandles.length > 1).toBe(true);

        // Check if new tab actually is a Cost Estimate Summary
        expect(pages('cost_estimate_summary').title).toBeDisplayed();
    });

    it("11. verify that the 'Cost Estimate Summary' matches with filled values in Step 6.", async () => {
        // open a mock summary - switch off for final verification
        // await costEstimateSummaryComponent.open();

        // verify Number of Instances (4)
        const numberOfInstances = await pages('cost_estimate_summary').getValue("Number of Instances");
        expect(numberOfInstances).toHaveText("4");
        // this doesn't work on the generated Summary either either 

        // verify operating system
        const operatingSystem = await pages('cost_estimate_summary').getValue("Operating System / Software");
        expect(operatingSystem).toHaveText(expect.stringContaining("Free: Debian, CentOS, CoreOS, Ubuntu"));

        // verify provisioning model (Regular)
        const provisioningModel = await pages('cost_estimate_summary').getValue("Provisioning Model");
        expect(provisioningModel).toHaveText("Regular");

        // verify machine type (n1-standard-8)
        const machineType = await pages('cost_estimate_summary').getValue("Machine type");
        expect(machineType).toHaveText("n1-standard-8");

        // verify GPU type (NVIDIA Tesla V100)
        const gpuType = await pages('cost_estimate_summary').getValue("GPU Model");
        expect(gpuType).toHaveText("NVIDIA Tesla V100");

        // verify "Number of GPUs" (1)
        const numberOfGPUs = await pages('cost_estimate_summary').getValue("Number of GPUs");
        expect(numberOfGPUs).toHaveText("1");

        // verify Local SSD (2x375 GB)
        const localSSD = await pages('cost_estimate_summary').getValue("Local SSD");
        expect(localSSD).toHaveText("2x375 GB");

        // verify datacenter location (europe-west4)
        const region = await pages('cost_estimate_summary').getValue("Region");
        expect(region).toHaveText(expect.stringContaining("europe-west4"));

        // verify commited usage (1 year)
        const commitedUsage = await pages('cost_estimate_summary').getValue("Committed use discount options");
        expect(commitedUsage).toHaveText("1 year");
    });
});

