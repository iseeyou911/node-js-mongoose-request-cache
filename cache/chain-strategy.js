/**
 * Created by Timofey Novitskiy on 04.02.2016.
 */

var CacheEntry = require('./cache-entry');
var makeHash = require('./make-hash');
var _ = require('lodash');
var AbstractStrategy = require('./abstract-strategy');

const MAX_SIZE = 100;


class ChainStrategy extends AbstractStrategy{
    constructor(maxSize){
        super();
        this.maxSize = maxSize || MAX_SIZE;
        this.entries = {};
    }

    _add(hash, items){
        delete this.entries[hash[0]];

        if (_.size(this.entries) === this.maxSize) {
            delete this.entries[_.minBy(_.values(this.entries), (i)=>{
                var value = this.getValue(i);
                return value ? value.count : 0;
                }).hash];
        }

        _.set(this.entries, hash, new CacheEntry(hash[0], items));

        console.info('Items added to cache', _.size(this.entries));
        return items;
    }

    getValue(entry){
        if (!entry || entry instanceof CacheEntry) {
            return entry;
        }
        this.getValue(_.keys(entry)[0]);
    }

    clean(){
        this.entries = {};
    }

    _get(hash){
        var entry = _.get(this.entries, hash);

        if (entry && entry instanceof CacheEntry) {
            entry.inc();
            return entry.items;
        }
    }

    makeHash(keys){
        return keys.map(makeHash);
    }
}

module.exports = ChainStrategy;