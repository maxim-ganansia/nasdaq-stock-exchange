class Marquee {
    constructor(element) {
        this.element = element;
    }

    getMarqueeElements() {
        const allMarqueeContent = document.createElement("marquee");
        allMarqueeContent.classList = "all-values";
        allMarqueeContent.loop = 1;
        fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=ed93f3e229380c530b7a0e7663f86b99`)
            .then(response => {
                return response.json()
            })
            .then(marqueeData => {
                for (let i = 0; i < 300; i++) {
                    /* Create span for symbol and price */
                    let stockSymbolElement = document.createElement("span")
                    stockSymbolElement.classList = "stock-symbol-element"
                    let stockPriceElement = document.createElement("span")
                    stockPriceElement.classList = "stock-price-element"

                    /* get company Symbol from marqueeData */
                    let marqueeSymbol = document.createElement("p");
                    marqueeSymbol = marqueeData[i].symbol;

                    /* get company Price from marqueeData */
                    let marqueePrice = document.createElement("p");
                    marqueePrice = `$${marqueeData[i].price}`;

                    /* append symbol and price to span */
                    stockSymbolElement.append(marqueeSymbol);
                    stockPriceElement.append(marqueePrice);

                    /* append Span to marquee */
                    allMarqueeContent.append(stockSymbolElement);
                    allMarqueeContent.append(stockPriceElement);

                }
                document.getElementById("marquee-display").appendChild(allMarqueeContent);
            })
    }
}

