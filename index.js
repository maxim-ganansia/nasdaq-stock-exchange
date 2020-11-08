const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors")

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

async function searchNasdaq(inputSearch) {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputSearch}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`)
    const data = await response.json();
    return data
}

async function getCompanyProfile(symbol) {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`)
    const data = await response.json();
    return data
}

async function searchNasdaqWithProfile(inputSearch) {
    const companies = await searchNasdaq(inputSearch);
    const fetchCompaniesProfile = companies.map(company => {
        return getCompanyProfile(company.symbol)
    })
    const companyProfile = await Promise.all(fetchCompaniesProfile);
    return companyProfile;
}


app.get('/search', (req, res) => {
    const searchQuery = req.query.query;
    searchNasdaqWithProfile(searchQuery).then((companyProfile) => {
        res.send(companyProfile);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

