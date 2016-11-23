//mock data
oList = [{
    "id": "1",
    "property": "origin1",
    "config": {
        "configProperty": "origin1"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "origin1-1",
    }, {
        "innerId": 2,
        "innerProperty": "origin1-2",
    }]
}, {
    "id": "2",
    "property": "origin2",
    "config": {
        "configProperty": "origin2"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "origin2-1",
    }, {
        "innerId": 2,
        "innerProperty": "origin2-2",
    }]
}, {
    "id": "3",
    "property": "origin3",
    "config": {
        "configProperty": "origin3"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "origin3-1",
    }, {
        "innerId": 2,
        "innerProperty": "origin3-2",
    }]
}, {
    "id": "4",
    "property": "origin4",
    "config": {
        "configProperty": "origin4"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "origin4-1",
    }, {
        "innerId": 2,
        "innerProperty": "origin4-2",
    }]
}, {
    "id": "5",
    "property": "origin5",
    "config": {
        "configProperty": "origin5"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "origin5-1",
    }, {
        "innerId": 2,
        "innerProperty": "origin5-2",
    }]
}]

nList = [{
    "id": "2",
    "property": "changed2",
    "config": {
        "configProperty": "changed2"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "changed2-deleted-2",
    }]
}, {
    "id": "4",
    "property": "changed4",
    "config": {
        "configProperty": "changed4"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "changed4-1",
    }, {
        "innerId": 2,
        "innerProperty": "changed4-2",
    }, {
        "innerId": 3,
        "innerProperty": "changed-added-4-3",
    }]
}, {
    "id": "6",
    "property": "added6",
    "config": {
        "configProperty": "added6"
    },
    "innerArray": [{
        "innerId": 1,
        "innerProperty": "added6-1",
    }, {
        "innerId": 2,
        "innerProperty": "added6-2",
    }]
}]

! function(exp) {
    var $ = $ || {};
    $.extend = $.extend || function() {

        function isFunction(fn) {
            return typeof(fn) === "function" && fn.constructor === Function }

        function isArray(ar) {
            return ar instanceof Array }

        function isPlainObject(obj) {
            return typeof obj == 'object' && obj.constructor == Object }

        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !isFunction(target)) target = {};
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) continue;

                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (!copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else clone = src && isPlainObject(src) ? src : {};

                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) target[name] = copy;
                }
            }
        }

        return target;
    };



    function mapFromArray(array, idProp) {
        var map = {};
        for (var i = 0; i < array.length; i++) {
            array[i].__indexForMapFromArray = i;
            map[array[i][idProp]] = array[i];
        }
        return map;
    }

    function getDelta(o, n, idProp) {
        var delta = {
            added: [],
            deleted: [],
            changed: []
        };
        var mapO = mapFromArray(o, idProp);
        var mapN = mapFromArray(n, idProp);
        for (var id in mapO) {
            if (!mapN.hasOwnProperty(id)) {
                delta.deleted.push(mapO[id]);
            } else {
                delta.changed.push({
                    o: mapO[id],
                    n: mapN[id]
                });
            }
        }

        for (var id in mapN) {
            if (!mapO.hasOwnProperty(id)) {
                delete mapN[id].__indexForMapFromArray;
                delta.added.push(mapN[id])
            }
        }
        return delta;
    }

    //added 1 
    //deleted 2
    //changed 2

    function syncArray(oList, nList, idProp, changedCallBack) {
        var idProp = idProp || 'id';
        var delta = getDelta(oList, nList, idProp);
        delta.changed.forEach(function(c) {
            var cb = changedCallBack || function(o, n) {
                // default just extend
                // complated option will do in custom changedCallBack (like isEqual then not to do)
                delete o.__indexForMapFromArray;
                delete n.__indexForMapFromArray;
                $.extend(o, n);
            }
            cb(oList[c.o.__indexForMapFromArray], nList[c.n.__indexForMapFromArray])

        })

        delta.deleted.sort(function(a, b) {
            return b.__indexForMapFromArray - a.__indexForMapFromArray
        })
        delta.deleted.forEach(function(d) {
            oList.splice(d.__indexForMapFromArray, 1)
        })
        oList.push.apply(oList, delta.added);
    }

    exp.syncArray = syncArray
}(window)

syncArray(oList, nList);
// custom callback
// syncArray(oList, nList, 'id', function(o, n){
//  delete o.__indexForMapFromArray;
//  delete n.__indexForMapFromArray;
//      syncArray(o.innerArray, n.innerArray, 'innerId');
// });

oList;