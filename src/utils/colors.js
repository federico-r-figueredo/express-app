// process.browser is set when browserify'd via the `process` npm module
const isBrowser = process.browser;

const colors = {
   red: isBrowser ? 'crimson' : 1,
   yellow: isBrowser ? 'gold' : 3,
   cyan: isBrowser ? 'darkturquoise' : 6,
   green: isBrowser ? 'forestgreen' : 2,
   blue: isBrowser ? 'steelblue' : 4,
   magenta: isBrowser ? 'palevioletred' : 5
};

module.exports = colors;
