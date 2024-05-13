import {
    cloudGooglePage,
    computeEngineCalculatorPage,
    costEstimateSummaryPage,
    productsCalculatorPage,
    searchResultsPage
} from "../../po/pages/index.js";

describe('Google Cloud Platform Pricing Calculator - following script from Task 3', () => {
    // it('1. Open https://cloud.google.com/.', async () => {
    //     await cloudGooglePage.open();
    // });

    // it('2. Click on the icon at the top of the portal page and enter "Google Cloud Platform Pricing Calculator" into the search field.', async () => {
    //     await cloudGooglePage.headerComponent.searchIcon.click();
    //     await cloudGooglePage.headerComponent.searchInputField.setValue('Google Cloud Platform Pricing Calculator');
    // });

    // it('3. Perform the search.', async () => {
    //     // there apparently is no visible 'search' button, which is weird
    //     await browser.keys(['Enter']);
    // });

    // it('4. Click "Google Cloud Platform Pricing Calculator" in the search results and go to the calculator page.', async () => {
    //     // omitting "Platform" because the naming has changed
    //     await searchResultsPage.getFirstResultContaining("Google Cloud Pricing Calculator").click();
    // });

    it('5. Click COMPUTE ENGINE at the top of the page.', async () => {
        // open the calculator directly if you want to skip the searching part of the script
        // await productsCalculatorPage.open()

        // COMPUTE ENGINE now appears in the pop-up, after clicking 'Add to estimate'
        await productsCalculatorPage.clickAddToEstimateButton();
        // button is often outside of displayed layout, so need to scroll to find it

        // locate COMPUTE ENGINE product and click it (displays in a pop-up window, so requires additional logic):
        await productsCalculatorPage.clickComputeEngineButton();
    });

    it('6.1 Fill out the form * Number of instances: 4', async () => {
        //    * Number of instances: 4
        await computeEngineCalculatorPage.setNumberOfInstances('4');
    });

    //    * What are these instances for?: leave blank
    // [this isn't part of the form anymore]

    it('6.2 Fill out the form * Operating System / Software: Free: Debian, CentOS...', async () => {
        //    * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        await computeEngineCalculatorPage.setSelectField('Operating System / Software', 'free-debian-centos');
    });

    it('6.3 Fill out the form * Provisioning model', async () => {
        //    * Provisioning model: Regular
        await computeEngineCalculatorPage.clickButton('Regular');
    });

    it('6.4 Fill out the form * Machine Family', async () => {
        //    * Machine Family: General purpose 
        // await computeEngineCalculatorPage.setSelectField('Machine Family', 'general-purpose');
    });

    it('6.5 Fill out the form * Series', async () => {
        //    * Series: N1 
        await computeEngineCalculatorPage.setSelectField('Series', 'n1');
    });

    it('6.6 Fill out the form * Machine type', async () => {
        //    * Machine type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
        await computeEngineCalculatorPage.setSelectField('Machine type', 'n1-standard-8');
    });

    it('6.7 Fill out the form * “Add GPUs“?', async () => {
        //    * Select “Add GPUs“
        await computeEngineCalculatorPage.clickButton('Add GPUs');
    });

    it('6.8 Fill out the form * GPU type', async () => {
        //            * GPU type: NVIDIA Tesla V100
        await computeEngineCalculatorPage.setSelectField('GPU Model', 'nvidia-tesla-v100');
    });

    it('6.9 Fill out the form * Number of GPUs', async () => {
        //            * Number of GPUs: 1
        await computeEngineCalculatorPage.setSelectField('Number of GPUs', '1');
    });

    it('6.10 Fill out the form * Local SSD', async () => {
        //    * Local SSD: 2x375 Gb
        await computeEngineCalculatorPage.setSelectField('Local SSD', '2');
    });

    it('6.11 Fill out the form * Datacenter location', async () => {
        //    * Datacenter location: Frankfurt (europe-west3)
        await computeEngineCalculatorPage.setSelectField('Region', 'europe-west4');
    });

    it('6.12 Fill out the form * Committed usage', async () => {
        //    * Committed usage: 1 Year
        await computeEngineCalculatorPage.clickButton('1 Year');

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
        await computeEngineCalculatorPage.serviceCostUpdatedStatus.waitForDisplayed();
        await computeEngineCalculatorPage.clickButton("Share");
        await expect(computeEngineCalculatorPage.shareEstimateDialogComponent.totalEstimatedCostLabel).toBeDisplayed();
    });

    // maybe this step should be divided into 2 separate test cases? It's testing 2 different pages?...
    it('10. click "Open estimate summary" to see Cost Estimate Summary, will be opened in separate tab browser.', async () => {
        const currentWindowHandle = await browser.getWindowHandle();

        await computeEngineCalculatorPage.shareEstimateDialogComponent.openEstimateSummaryButton.click();

        const windowHandles = await browser.getWindowHandles();
        // Check if a new tab has been opened
        expect(windowHandles.length > 1).toBe(true);
        // Iterate through handles to find the new handle
        let newWindowHandle;
        windowHandles.forEach(handle => {
            if (handle !== currentWindowHandle) {
                newWindowHandle = handle;
            }
        });
        // Switch to the new tab
        await browser.switchToWindow(newWindowHandle);

        // Check if new tab actually is a Cost Estimate Summary
        await expect(costEstimateSummaryPage.title).toBeDisplayed();
    });

    it("11. verify that the 'Cost Estimate Summary' matches with filled values in Step 6.", async () => {
        // open a mock summary - switch off for final verification
        // await costEstimateSummaryPage.open();

        const newSummaryUrl = await browser.getUrl();
        console.log(newSummaryUrl);

        // verify Number of Instances (4)
        const numberOfInstances = await costEstimateSummaryPage.getValue("Number of Instances");
        await expect(numberOfInstances).toHaveText("4");
        // this doesn't work on the generated Summary either either 

        // verify operating system
        const operatingSystem = await costEstimateSummaryPage.getValue("Operating System / Software");
        await expect(operatingSystem).toHaveText(expect.stringContaining("Free: Debian, CentOS, CoreOS, Ubuntu"));

        // verify provisioning model (Regular)
        const provisioningModel = await costEstimateSummaryPage.getValue("Provisioning Model");
        await expect(provisioningModel).toHaveText("Regular");

        // verify machine type (n1-standard-8)
        const machineType = await costEstimateSummaryPage.getValue("Machine type");
        await expect(machineType).toHaveText(expect.stringContaining("n1-standard-8"));

        // verify GPU type (NVIDIA Tesla V100)
        const gpuType = await costEstimateSummaryPage.getValue("GPU Model");
        await expect(gpuType).toHaveText("NVIDIA Tesla V100");

        // verify "Number of GPUs" (1)
        const numberOfGPUs = await costEstimateSummaryPage.getValue("Number of GPUs");
        await expect(numberOfGPUs).toHaveText("1");

        // verify Local SSD (2x375 GB)
        const localSSD = await costEstimateSummaryPage.getValue("Local SSD");
        await expect(localSSD).toHaveText("2x375 GB");

        // verify datacenter location (europe-west4)
        const region = await costEstimateSummaryPage.getValue("Region");
        await expect(region).toHaveText(expect.stringContaining("europe-west4"));

        // verify commited usage (1 year)
        const commitedUsage = await costEstimateSummaryPage.getValue("Committed use discount options");
        await expect(commitedUsage).toHaveText("1 year");
    });
});

