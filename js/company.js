document.addEventListener("DOMContentLoaded", function () {
    let url = new URLSearchParams(window.location.search);
    let symbol = url.get("symbol");
    let resultBox = document.getElementById("result-link");
    const loaderCompanyDetails = document.getElementById("loader-company-details");

    loaderCompanyDetails.classList.remove("hidden");
    fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                /* Logo Company */
                let resultImage = document.createElement("div");
                resultImage.classList = "result-image";
                let companyLogo = document.createElement("img");
                companyLogo.setAttribute("src", `${data[i].image}`);
                companyLogo.classList = "company-logo";
                resultImage.append(companyLogo);

                /* Name Company */
                let resultName = document.createElement("div");
                resultName.classList = "result-name";
                let companyName = document.createElement("span")
                companyName.innerHTML = `${data[i].companyName}`
                let companySector = document.createElement("span")
                companySector.innerHTML = `(${data[i].sector})`
                resultName.append(companyName);
                resultName.append(companySector);


                /* Stock Price */
                let stockPrice = document.createElement("div");
                stockPrice.classList = "stock-price";

                let stockPriceTitle = document.createElement("span");
                stockPriceTitle.innerHTML = "Stock Price : ";
                stockPriceTitle.classList = "stock-price-title";

                let companyStockPriceValue = document.createElement("span");
                companyStockPriceValue.innerHTML = `$${data[i].price}`;

                let percentageChangePrice = document.createElement("span");
                let changePercentage = `(${data[i].changes}$)`;
                changePercentage.classList = "change-percentage"
                let changeColor;
                if ((changeColor = changePercentage.includes("-"))) {
                    percentageChangePrice.innerHTML = `${data[i].changes}`;
                    percentageChangePrice.classList = "negative-percentage";
                } else {
                    percentageChangePrice.innerHTML = `${data[i].changes}`;
                    percentageChangePrice.classList = "positive-percentage";
                }
                percentageChangePrice.innerHTML = changePercentage;

                stockPrice.append(stockPriceTitle)
                stockPrice.append(companyStockPriceValue);
                stockPrice.append(percentageChangePrice);

                /*Company Website link */
                let companyWebsiteDiv = document.createElement("div");
                companyWebsiteDiv.classList = "company-website";
                let companyWebsiteLink = document.createElement("a");
                companyWebsiteLink.href = `${data[i].website}`;
                companyWebsiteLink.innerHTML = `${data[i].website}`;
                companyWebsiteLink.target = "_blank";
                companyWebsiteDiv.append(companyWebsiteLink);


                /* Company Description */
                let companyDescription = document.createElement("div");
                companyDescription.classList = "company-description";
                companyDescription.innerHTML = `${data[i].description}`;



                /* APPEND Results to ResultBox */
                resultBox.append(resultImage)
                resultBox.append(resultName)
                resultBox.append(stockPrice)
                resultBox.append(companyWebsiteDiv)
                resultBox.append(companyDescription)

            }
        })

    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=ed93f3e229380c530b7a0e7663f86b99`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let ctx = document.getElementById('myChart');

            let dates = [];
            let prices = [];
            for (let i = 0; i < data.historical.length; i = i + 180) {
                dates.push(data.historical[i].date);
                prices.push(data.historical[i].close);
            }
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates.reverse(),
                    datasets: [{
                        label: 'Stock Price History',
                        data: prices,
                        backgroundColor: [
                            "rgb(250, 91, 117)"
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                }
            });
            loaderCompanyDetails.classList.add("hidden");
        })
})