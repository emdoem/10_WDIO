import headerComponent from "../components/common/headerComponent.js";

export default new class CloudGooglePage {
    get headerComponent() { return headerComponent }
    
    // open the tested page
    async open() {
        await browser.url('https://cloud.google.com/');
    }
};
