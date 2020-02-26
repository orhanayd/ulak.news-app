var moment = require('moment-timezone');
require('moment/locale/tr');


class Funcs {
    timeSince(date) {
        date = date*1000;
        return moment(date).locale("tr").fromNow();
    }
    
    decodeHtmlEntity = function(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    };
}

export default Funcs;