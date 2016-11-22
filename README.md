Main to synchronize onw array from another
But not to loss the reference with simple "="

suppose we have
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

syncArray(oList, nList);

and you will get a new list and not to lose old reference