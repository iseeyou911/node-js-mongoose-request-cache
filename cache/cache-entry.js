/**
 * Created by Timofey Novitskiy on 04.02.2016.
 */

module.exports = class CacheEntry {
    constructor(hash, items){
        this.count = 0;
        this.hash = hash;
        this.items = items;
        this.stamp = new Date();
    }

    inc() {
        this.stamp = new Date();
        this.count++;
    }
};