import CloudGooglePage from "./cloudGoogle.page.js";
import ComputeEngineCalculatorPage from "./computeEngineCalculator.page.js";
import CostEstimateSummaryPage from "./costEstimateSummary.page.js";
import ProductsCalculatorPage from "./productsCalculator.page.js";
import SearchResultsPage from "./searchResults.page.js";

/* 
@param name: { cloud_google | compute_engine_calculator | cost_estimate_summary | products_calculator | search_results }
@returns { CloudGooglePage | ComputeEngineCalculatorPage | CostEstimateSummaryPage | ProductsCalculatorPage | }
*/
function pages(name) {
    const items = {
        cloud_google: new CloudGooglePage(),
        compute_engine_calculator: new ComputeEngineCalculatorPage(),
        cost_estimate_summary: new CostEstimateSummaryPage(),
        products_calculator: new ProductsCalculatorPage(),
        search_results: new SearchResultsPage()
    };

    return items[name.toLowerCase()]
}

export {
    CloudGooglePage,
    ComputeEngineCalculatorPage,
    CostEstimateSummaryPage,
    ProductsCalculatorPage,
    SearchResultsPage,
    pages
}