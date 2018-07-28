// verify param is a string + trimming leading and trailing spaces
let isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};

