var app = angular.module("app",[]);

app.controller("appCtrl",appCtrl);


app.service("appService",function($http){

	var self = this;

	//This is the generic Get method call which gets data if it exists.
	self.getJsonObject = function(agencyId,requestId){

		var urlPath = "data/sampleData.json"; //comment this out and uncomment below line.

		//var urlPath = "http://usawsclxd00039.nix.us.kworld.kpmg.com:9200/sewp/proposal/16";

		self.agency_id = agencyId == '' ? undefined:agencyId;


		self.request_id = requestId == '' ? undefined:requestId ;


		var xheaders = {};

		xheaders["username"] = 'hpasunuri'; // header for username
		xheaders["password"] = 'hpasunuri'; //header for passsword

		return $http({
			url : urlPath,
			method: "GET",
			params: {agencyId: self.agency_id,requestId: self.request_id},
			withCredentials: true,
			headers:{ 'Authorization':  'Basic ' + btoa('hapsunuri' + ":" + 'hapsunuri')}

		}).then(function(response){

			return response.data;
		});

		/*return $http.get('data/sampleData.json')
		.then(function(response){

			 return response.data;
		});*/

	}


});

//This Controller is in LoadForm JSP.
function appCtrl(appService){ 

	var self = this;



	//This allows us to get the Json object when the page loads.
	/*self.init = function() 
	  {

		appService.getJsonObject()
  		.then(function (data){

  			self.jsonData = data;
  		});

	  };*/




	//This allows us to get Json Object when an event occurs like a button click.
	self.retrieveJsonData = function () {



		appService.getJsonObject(self.agencyId,self.requestId) // The agencyId and reqeustId come from the ng-model
		.then(function (data){


			self.jsonData = data;

			console.log(self.jsonData);
		});	    	   	

	};





}




