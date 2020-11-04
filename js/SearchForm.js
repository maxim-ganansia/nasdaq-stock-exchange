const inputSearch = document.createElement("input");
const searchButton = document.createElement("button");
class SearchForm {
    constructor(parent, companies) {
        this.parent = parent
        this.companies = companies
        this.createSearchForm()
    }

    createSearchForm() {
        inputSearch.setAttribute("type", "text");
        inputSearch.setAttribute("placeholder", 'Search');
        inputSearch.setAttribute("aria-label", "Search");
        inputSearch.classList.add("form-control");
        inputSearch.id = "input-search";

        searchButton.classList.add("btn", "btn-primary");
        searchButton.id = "searchButton";
        searchButton.textContent = "Search";
        inputSearch.appendChild(searchButton);

        const loader = document.createElement("loader");
        loader.classList.add("spinner-border", "hidden");
        loader.setAttribute("role", "status");
        loader.id = "loader";

        const loadingText = document.createElement("span");
        loadingText.classList.add("sr-only");
        loadingText.textContent = "loading ...";
        loader.appendChild(loadingText);

        this.parent.append(inputSearch, searchButton, loader);
    }

    onSearch() {
        searchButton.addEventListener('click', () => {
            loader.classList.remove("hidden");
            document.getElementById("list-result").innerText = "";
            fetch(`http://localhost:3000/search?query=${inputSearch.value}`)
                .then(response => response.json())
                .then(companiesData => {
                    this.companies = companiesData
                    this.handleSearchInput(companiesData)
                })
        });
    }

    handleSearchInput(companies) {
        const result = new SearchResult(document.getElementById('list-result'));
        result.renderResults(companies);
    }
}
