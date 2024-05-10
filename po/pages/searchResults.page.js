export default class SearchResultsPage {
    getFirstResultContaining (searchInput) {
        return $(`//b[contains(text(), "${searchInput}")]`)
    }
}