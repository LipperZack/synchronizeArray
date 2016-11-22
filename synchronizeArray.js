//mock data
oList=[{
	"id": "1",
	"property": "origin1",
	"config": {
		"configProperty": "origin1"
	},
	"innerArray": [{
		"innerProperty": "origin1-1",
	},{
		"innerProperty": "origin1-2",
	}]
},{
	"id": "2",
	"property": "origin2",
	"config": {
		"configProperty": "origin2"
	},
	"innerArray": [{
		"innerProperty": "origin2-1",
	},{
		"innerProperty": "origin2-2",
	}]
},{
	"id": "3",
	"property": "origin3",
	"config": {
		"configProperty": "origin3"
	},
	"innerArray": [{
		"innerProperty": "origin3-1",
	},{
		"innerProperty": "origin3-2",
	}]
},{
	"id": "4",
	"property": "origin4",
	"config": {
		"configProperty": "origin4"
	},
	"innerArray": [{
		"innerProperty": "origin4-1",
	},{
		"innerProperty": "origin4-2",
	}]
},{
	"id": "5",
	"property": "origin5",
	"config": {
		"configProperty": "origin5"
	},
	"innerArray": [{
		"innerProperty": "origin5-1",
	},{
		"innerProperty": "origin5-2",
	}]
}]

nList=[{
	"id": "2",
	"property": "changed2",
	"config": {
		"configProperty": "changed2"
	},
	"innerArray": [{
		"innerProperty": "changed2-deleted-2",
	}]
},{
	"id": "4",
	"property": "changed4",
	"config": {
		"configProperty": "changed4"
	},
	"innerArray": [{
		"innerProperty": "changed4-1",
	},{
		"innerProperty": "changed4-2",
	},{
		"innerProperty": "changed-added-4-3",
	}]
},{
	"id": "6",
	"property": "added6",
	"config": {
		"configProperty": "added6"
	},
	"innerArray": [{
		"innerProperty": "added6-1",
	},{
		"innerProperty": "added6-2",
	}]
}]


function mapFromArray(array, prop) {
    var map = {};
    for (var i=0; i < array.length; i++) {
    	array[i].__indexForMapFromArray = i;
        map[ array[i][prop] ] = array[i];
    }
    return map;
}

function getDelta(o, n)  {
    var delta = {
        added: [],
        deleted: [],
        changed: []
    };
    var mapO = mapFromArray(o, 'id');
    var mapN = mapFromArray(n, 'id');    
    for (var id in mapO) {
        if (!mapN.hasOwnProperty(id)) {
            delta.deleted.push(mapO[id]);
        } else{
            delta.changed.push({
            	o: mapO[id],
            	n: mapN[id]
            });
        }
    }

    for (var id in mapN) {
        if (!mapO.hasOwnProperty(id)) {
        	delete mapN[id].__indexForMapFromArray;
            delta.added.push( mapN[id] )
        }
    }
    return delta;
}

//added 1 
//deleted 2
//changed 2

function syncArray(oList, nList){
	var delta = getDelta(oList,nList);
	delta.changed.forEach(function(c){
		oList[c.o.__indexForMapFromArray] = nList[c.n.__indexForMapFromArray]
	})

	delta.deleted.sort(function(a,b){
		return b.__indexForMapFromArray - a.__indexForMapFromArray
	})
	delta.deleted.forEach(function(d){
		oList.splice(d.__indexForMapFromArray, 1)
	})
	oList.push.apply(oList, delta.added);
}

syncArray(oList, nList);

oList;









