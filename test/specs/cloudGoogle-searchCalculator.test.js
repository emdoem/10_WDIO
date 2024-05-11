import { pages } from "../../po/pages/index.js";

describe('Google Cloud Platform Pricing Calculator - following script from Task 3', () => {
    it('1. Open https://cloud.google.com/.', async () => {
        await pages('cloud_google').open();
    });

    it('2. Click on the icon at the top of the portal page and enter "Google Cloud Platform Pricing Calculator" into the search field.', async () => {
        await pages('cloud_google').headerComponent.searchIcon.click();
        await pages('cloud_google').headerComponent.searchInputField.setValue(TEST_DATA.SEARCH_INPUT);
    });

    it('3. Perform the search.', async () => {
        // there apparently is no visible 'search' button, which is weird
        await browser.keys(['Enter']);
    });

    it('4. Click "Google Cloud Platform Pricing Calculator" in the search results and go to the calculator page.', async () => {
        // omitting "Platform" because the naming has changed
        await pages('search_results').getFirstResultContaining(TEST_DATA.SEARCH_RESULT).click();

        // add a check, to see if the calculator was opened
    });
});
