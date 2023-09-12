function absolute(number) {
    return number >= 0 ? number : -number;
}

function greet(name) {
    return `Welcome ${name} !`;
}

function getCurrencies() {
    return ['USD', 'AUD', 'EUR'];
}

function getProduct(productID) {
    return { id: productID, price: 10, category: 'hardware' };
}

function registerUser(userName) {
    if (!userName) throw new Error('Username is required.');

    return { id: new Date().getTime(), userName: userName };
}

module.exports.absolute = absolute;
module.exports.greet = greet;
module.exports.getCurrencies = getCurrencies;
module.exports.getProduct = getProduct;
module.exports.registerUser = registerUser;
