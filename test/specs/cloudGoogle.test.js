import { pages } from "../../po/pages/index.js";

describe('Google Cloud Platform Pricing Calculator - following script from Task 3', () => {
    it('5. Click COMPUTE ENGINE at the top of the page.', async () => {
        // open the calculator directly if you want to skip the searching part of the script
        await pages('products_calculator').open()

        // COMPUTE ENGINE now appears in the pop-up, after clicking 'Add to estimate'
        await pages('products_calculator').clickAddToEstimateButton();
        // button is often outside of displayed layout, so need to scroll to find it

        // locate COMPUTE ENGINE product and click it (displays in a pop-up window, so requires additional logic):
        await pages('products_calculator').clickComputeEngineButton();
    });

    it('6. Fill out the form with the following data:', async () => {
        const {
            numberOfInstances,
            machineType,
            addGPUs,
            gpuType,
            localSSD,
            region,
            commitedUsage,
            operatingSystem
        } = TEST_DATA.COMPUTE_ENGINE;

        await pages('compute_engine_calculator').setNumberOfInstances(numberOfInstances.value);

        //    * What are these instances for?: leave blank
        // [this isn't part of the form anymore]
        //    * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        // await pages('compute_engine_calculator').setSelectField(operatingSystem.title, operatingSystem.value)
        //    * Provisioning model: Regular
        // [leaving in default state]
        //    * Machine Family: General purpose 
        // [leaving in default state]
        //    * Series: N1 
        // [leaving in default state]

        await pages('compute_engine_calculator').setSelectField(machineType.title, machineType.value);
        if (addGPUs.value) {
            await pages('compute_engine_calculator').clickButton(addGPUs.title);
            await pages('compute_engine_calculator').setSelectField(gpuType.title, 'nvidia-tesla-v100'); // fix selector to avoid hard-coding here
        }

        //            * Number of GPUs: 1
        // [leaving in default state]

        //    * Local SSD: 2x375 Gb
        await pages('compute_engine_calculator').setSelectField(localSSD.title, '2'); // fix selector to avoid hard-coding here

        await pages('compute_engine_calculator').setSelectField(region.title, region.value); // europe-west3 is unavailable for this set-up
        await pages('compute_engine_calculator').clickButton(commitedUsage.value);
    });

    xit("7. Click 'Add to Estimate'. - skipped: app UI changed", () => {
        // [Price is already calculated in the new version of app]
    });

    xit('8. Check the price is calculated in the right section of the calculator. There is a line “Total Estimated Cost: USD ${amount} per 1 month” - skipped: app UI changed', () => {
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
        const currentWindowHandle = await browser.getWindowHandle();

        await pages('compute_engine_calculator').shareEstimateDialogComponent.openEstimateSummaryButton.click();

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
        await expect(pages('cost_estimate_summary').title).toBeDisplayed();
    });

    it("11. verify that the 'Cost Estimate Summary' matches with filled values in Step 6.", async () => {
        const {
            numberOfInstances,
            operatingSystem,
            provisioningModel,
            machineType,
            gpuType,
            numberOfGPUs,
            localSSD,
            region,
            commitedUsage
        } = TEST_DATA.COMPUTE_ENGINE;

        // open a mock summary - switch off for final verification
        // await costEstimateSummaryComponent.open();

        const numberOfInstancesRow = await pages('cost_estimate_summary').getValue(numberOfInstances.title);
        await expect(numberOfInstancesRow).toHaveText(numberOfInstances.value);

        const operatingSystemRow = await pages('cost_estimate_summary').getValue(operatingSystem.title);
        await expect(operatingSystemRow).toHaveText(expect.stringContaining(operatingSystem.value));

        const provisioningModelRow = await pages('cost_estimate_summary').getValue(provisioningModel.title);
        await expect(provisioningModelRow).toHaveText(provisioningModel.value);

        const machineTypeRow = await pages('cost_estimate_summary').getValue(machineType.title);
        await expect(machineTypeRow).toHaveText(expect.stringContaining(machineType.value));

        const gpuTypeRow = await pages('cost_estimate_summary').getValue(gpuType.title);
        await expect(gpuTypeRow).toHaveText(gpuType.value);

        const numberOfGPUsRow = await pages('cost_estimate_summary').getValue(numberOfGPUs.title);
        await expect(numberOfGPUsRow).toHaveText(numberOfGPUs.value);

        const localSSDRow = await pages('cost_estimate_summary').getValue(localSSD.title);
        await expect(localSSDRow).toHaveText(localSSD.value);

        const regionRow = await pages('cost_estimate_summary').getValue(region.title);
        await expect(regionRow).toHaveText(expect.stringContaining(region.value));

        const commitedUsageRow = await pages('cost_estimate_summary').getValue(commitedUsage.title);
        await expect(commitedUsageRow).toHaveText(commitedUsage.value.toLowerCase());
    });
});

