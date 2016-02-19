/**
 * Created by Timofey Novitskiy on 03.02.2016.
 */
const EventEmitter = require('events');
const util = require('util');
var _ = require('lodash');
var co = require('co');


class Cache extends EventEmitter {
    constructor(schema){
        super();

        schema.post('update', (doc)=>{
            this.emit('updated', doc);
        });

        schema.post('save', (doc)=>{
            this.emit('save', doc);
        });

        schema.post('remove', (doc)=>{
            this.emit('remove', doc);
        });
    }

    wrap(func, strategy) {
        this.on('updated', (data)=>{
            strategy.clean(data);
        });

        this.on('save', (data)=>{
            strategy.clean(data);
        });

        this.on('remove', (data)=>{
            strategy.clean(data);
        });

        return function proxy() {
            var self = this,
                _args = arguments;

            return co(function*() {
                var cachedItems = strategy.get.apply(strategy, _args);

                if (cachedItems.items) {
                    return cachedItems.items;
                }

                return cachedItems.add(yield func.apply(self, _args));
            });
        }
    }
}

module.exports = function cacheFactory (schema) {
    return new Cache(schema);
};