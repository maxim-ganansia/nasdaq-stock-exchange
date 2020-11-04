(() => {
    let searchNasdaqResult = document.getElementById("searchButton");
    searchNasdaqResult.addEventListener("click", getNasdaqResults);
    let inputSearch = document.getElementById("input-search");
    let listOfResult = document.getElementById("list-result");

    function getNasdaqResults() {
        grabSpinner()
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputSearch.value}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`)
            .then(response => response.json())
            .then(firstData => {
                document.getElementById("list-result").innerText = "";
                firstData.map(firstData => {
                    fetch(`https://financialmodelingprep.com/api/v3/profile/${firstData.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`)
                        .then(response => {
                            return response.json();
                        })
                        .then(secondData => {
                            let listCompanies = document.createElement("li");
                            listCompanies.className = "list-style";
                            let companyLogo = setCompanyLogo(secondData);
                            let companyLink = setLink(firstData);
                            let companySymbol = setSymbol(firstData);
                            let companyPercentage = setPercentages(secondData);

                            listCompanies.append(companyLogo)
                            listCompanies.append(companyLink)
                            listCompanies.append(companySymbol)
                            listCompanies.append(companyPercentage)

                            listOfResult.append(listCompanies)
                        })
                    hideSpinner()
                })
            })
    }

    function grabSpinner() {
        document.getElementById("loader").classList.remove("hidden")
    }

    function hideSpinner() {
        document.getElementById("loader").classList.add("hidden")
    }


    function setCompanyLogo(secondData) {
        let companyLogo = document.createElement("img");
        companyLogo.setAttribute("src", `${secondData[0].image}`);
        companyLogo.classList = "company-logo";
        return companyLogo;
    }

    function setLink(firstData) {
        let companyLink = document.createElement("a");
        companyLink.href = `./company.html?symbol=${firstData.symbol}`;
        companyLink.innerHTML = `${firstData.name}`;
        companyLink.target = "_blank";
        companyLink.classList = "company-link";
        return companyLink;
    }

    function setSymbol(firstData) {
        let companySymbol = document.createElement("span");
        companySymbol.innerHTML = `(${firstData.symbol})`;
        companySymbol.classList = "company-symbol";
        return companySymbol;
    }

    function setPercentages(secondData) {
        let percentage = document.createElement("span");
        companyPercentageChange = `(${secondData[0].changes}$)`;
        percentage.innerHTML = companyPercentageChange
        percentage.classList = "company-percentage";
        changePercentageColor(companyPercentageChange, percentage)
        return percentage;
    }

    function changePercentageColor(companyPercentageChange, percentage) {
        if (companyPercentageChange.includes("-")) {
            percentage.classList = "negative-percentage";
        } else {
            percentage.classList = "positive-percentage";
        }
    }
})();
