export const filterProducts = (arr, filter) => {
    switch(filter) {
        case 10: return filterFeatured(arr);
        case 20: return filterPopularity(arr);
        case 30: return filterDate(arr);
        case 40: return filterPriceLow(arr);
        case 50: return filterPriceHigh(arr);
    }
}

const filterFeatured = (arr) => {
    return arr.sort((a, b) => b.featuredRating - a.featuredRating);
}

const filterPopularity = (arr) => {
    return arr.sort((a, b) => b.sales - a.sales);
}

const filterDate = (arr) => {
    return arr.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
}

const filterPriceLow = (arr) => {
    return arr.sort((a, b) => a.price - b.price);
}

const filterPriceHigh = (arr) => {
    return arr.sort((a, b) => b.price - a.price);
}