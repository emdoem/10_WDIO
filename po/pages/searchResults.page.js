export default class SearchResultsPage {
    get searchTitle() { return $('h1.devsite-search-title') }

    getFirstResultContaining(searchInput) {
        return $(`//b[contains(text(), "${searchInput}")]`)
    }
}