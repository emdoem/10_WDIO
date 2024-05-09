export default new class SearchResultsComponent {
    getResultContaining (searchInput) {
        return $(`//b[contains(text(), "${searchInput}")]`)
    }
}