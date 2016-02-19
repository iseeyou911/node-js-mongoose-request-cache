# node-js-mongoose-request-cache
Very basic hit-count-concurrency cache for mongoose

# Usage

`
var cacheFactory = require('./cache/cache-factory');
var HashTableStrategy = require('./cache/hash-table-strategy');

var schema = new mongoose.Schema({
    'url' : 'string',
    'text' : 'string',
    'link' : mongoose.Schema.Types.Mixed,
    'order' : 'number'
});

var cache = cacheFactory(schema);

schema.statics.fetchAll = cache.wrap(function fetchAll(){
    var self = this;
    return co(function*(){
        return yield self.find().lean().exec();
    });
}, new HashTableStrategy());
`
