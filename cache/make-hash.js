/**
 * Created by Timofey Novitskiy on 04.02.2016.
 */

var crypto = require('crypto');
var _ = require('lodash');

module.exports = function makeHash(keys){
    return crypto
        .createHash('md5')
        .update(_.map(keys, JSON.stringify).join('&;&'))
        .digest('hex');

};