config = { _id: "m101", members:[
	   	//{ _id : 0, host : "sulianaabbay.local:27017", priority:0, slaveDelay:5 },
        { _id : 0, host :"Sulianas-MacBook-Pro.local:27017"},
        { _id : 1, host :"Sulianas-MacBook-Pro.local:27018"},
        { _id : 2, host :"Sulianas-MacBook-Pro.local:27019"} ]
};
/*rs.initiate({_id:"m101", members: [
		{ _id : 0, host : "sulianaabbay.local:27017"},
        { _id : 1, host : "sulianaabbay.local:27018"},
        { _id : 2, host : "sulianaabbay.local:27019"}
	]})*/

rs.initiate(config);
rs.status();


