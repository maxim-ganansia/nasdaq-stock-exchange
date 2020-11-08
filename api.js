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

async function searchNasdaqWithProfile(inputSearch){
    const companies = await searchNasdaq(inputSearch);
    const fetchCompaniesProfile = companies.map(company =>{
        return getCompanyProfile(company.symbol)
    }) 
    const companyProfile = await Promise.all(fetchCompaniesProfile);
    return companyProfile;
}


export async function searchInInternalServer (searchTerm) {
    const response = await fetch (`http://localhost:3000/search?query=${searchTerm}`);
    const data = response.json();
    return data
}