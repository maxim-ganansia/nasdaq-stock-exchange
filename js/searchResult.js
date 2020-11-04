class SearchResult {
    constructor(parent) {
        this.parent = parent
    }

    async getStockValue(symbol, callback) {
        fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`)
            .then(response => response.json())
            .then(data => {
                this.dataCompany = data
                callback(data[0])
            })
    }

    renderResults(companies) {
        companies.map(company => {
            // this.getStockValue(company.symbol, (companyInfo) => {
            let { image, companyName, changes } = company[0];
            let companyLogo = this.getCompanyLogo(image)
            let companyLink = this.setCompanyLink(company[0].symbol, companyName)
            let companySymbol = this.setCompanySymbol(company[0].symbol)
            let companyChangePercentage = this.setPercentage(changes)

            let compareButton = document.createElement("button");
            compareButton.classList.add("btn", "btn-primary", "compare-button");
            compareButton.textContent = "Compare";
            compareButton.addEventListener("click", () => {
                // this.compareResult(company)
                console.log(company[0])
            });

            let listCompanies = document.createElement("LI")
            listCompanies.className = "list-style";
            listCompanies.append(companyLogo);
            listCompanies.append(companyLink)
            listCompanies.append(companySymbol)
            listCompanies.append(companyChangePercentage)
            listCompanies.append(compareButton)
            this.parent.append(listCompanies)

            this.createHighlightResultInput(companyLink, companySymbol);
            // })
            loader.classList.add("hidden");
        })
    }



    getCompanyLogo(image) {
        let companyLogo = document.createElement("img");
        companyLogo.setAttribute("src", image);
        companyLogo.classList = "company-logo";
        return companyLogo;
    }

    setCompanyLink(symbol, companyName) {
        let link = document.createElement("a");
        link.href = `./company.html?symbol=${symbol}`;
        link.classList = "company-link"
        link.innerHTML = companyName;
        link.target = "_blank";
        return link;
    }

    setCompanySymbol(symbol) {
        let symbolCompany = document.createElement('span');
        symbolCompany.innerHTML = `(${symbol})`;
        symbolCompany.classList = "company-symbol";
        return symbolCompany;
    }

    setPercentage(changes) {
        let percentage = document.createElement("span");
        percentage.innerHTML = `(${changes}$)`;
        percentage.classList = "company-changes";
        this.setPercentageColor(changes, percentage);
        return percentage;
    }

    setPercentageColor(changes, percentage) {
        if (changes !== null && changes < 0) {
            percentage.classList = "negative-percentage";
        } else {
            percentage.classList = "positive-percentage";
        }
    }

    createHighlightResultInput(companyLink, companySymbol) {
        let inputUser = document.querySelector(".form-control");
        let textLink = companyLink.innerHTML;
        let textSymbol = companySymbol.innerHTML;
        let regex = new RegExp(inputUser.value, 'gi')
        let responseLink = textLink.replace(regex, function (str) {
            return "<mark>" + str + "</mark>"
        })
        let responseSymbol = textSymbol.replace(regex, function (str) {
            return "<mark>" + str + "</mark>"
        })
        companyLink.innerHTML = responseLink
        companySymbol.innerHTML = responseSymbol
    }


    async compareResult(company) {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`)
        const dataCompany = await response.json();
        console.log(dataCompany[0]);
    }
}

