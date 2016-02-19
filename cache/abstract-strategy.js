/**
 * Created by Timofey Novitskiy on 04.02.2016.
 */

class AbstractStrategy {
    add(items, ...keys){
        return this._add(this.makeHash(keys), items);
    }

    _add(hash, items){}

    clean(){
        this.entries = {};
    }

    _get(hash){}

    makeHash(keys){}

    get(...keys){
        var hash = this.makeHash(keys);
        return {
            items: this._get(hash),
            add: this._add.bind(this, hash)
        };
    }
}

module.exports = AbstractStrategy;