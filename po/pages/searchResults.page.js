export default new class SearchResultsPage {
    getFirstResultContaining (searchInput) {
        return $(`//b[contains(text(), "${searchInput}")]`)
    }
}