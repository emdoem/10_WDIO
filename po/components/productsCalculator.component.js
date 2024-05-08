// import Page from './Page.js';

export default new class ProductsCalculatorComponent {
    // open the tested page - in case there's an issue opening it from the search results
    async open() {
        await browser.url('https://cloud.google.com/products/calculator');
    }
}