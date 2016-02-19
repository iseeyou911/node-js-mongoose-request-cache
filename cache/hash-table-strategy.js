/**
 * Created by Timofey Novitskiy on 04.02.2016.
 */

var CacheEntry = require('./cache-entry');
var makeHash = require('./make-hash');
var _ = require('lodash');
var AbstractStrategy = require('./abstract-strategy');

const MAX_SIZE = 50;


class HashTableStrategy extends AbstractStrategy{
    constructor(maxSize){
        super();
        this.maxSize = maxSize || MAX_SIZE;
        this.entries = {};
    }

    _add(hash, items){
        if (_.size(this.entries) === this.maxSize) {
            delete this.entries[_.minBy(_.values(this.entries), (i)=>i.count).hash];
        }

        this.entries[hash] = new CacheEntry(hash, items);

        console.info('Items added to cache', _.size(this.entries));
        return items;
    }

    clean(){
        this.entries = {};
    }

    _get(hash){
        var entry = this.entries[hash];

        if (entry) {
            entry.inc();
            return entry.items;
        }
    }

    makeHash(keys){
        return makeHash(keys);
    }
}

module.exports = HashTableStrategy;