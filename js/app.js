var app = angular.module("app",[]);

app.controller("appCtrl",appCtrl);


app.service("appService",function($http){
	
	var self = this;
	
	
	self.getJsonIndObject = function(){
		
		var urlPath = "data/75823.json";
		
		//this is sample commit to local
		
		var xheaders = {};
		
		xheaders["user_name"] = 'hpasunuri'; // header for username
		xheaders["passcode"] = 'hpasunuri'; //header for passsword
		
		return $http({
			url : urlPath,
			method: "GET",
			headers:{ 'Authorization':  'Basic ' + btoa('hpasunuri' + ":" + 'hpasunuri')}

		}).then(function(response){
			
			return response.data;
		});
		
		
	}
	
	
	//This is the generic Get method call which gets data if it exists.
	self.getJsonObject = function(agencyId,requestId){
		
		
		
		
		self.agency_id = agencyId == '' ? undefined:agencyId;
		
		
		self.request_id = requestId == '' ? undefined:requestId ;
		
		var urlPath = "data/sampleData.json"; //comment this out and uncomment below line.
		
		//var urlPath = "http://usawsclxd00039.nix.us.kworld.kpmg.com:9200/sewp/proposal/"+requestId;
		//var urlPath = "http://10.4.216.169:9200/sewp/proposal/"+requestId;
//		/http://10.4.216.169:9200/sewp/proposal/16
		
		console.log(urlPath);
		
		var xheaders = {};
		
		xheaders["user_name"] = 'hpasunuri'; // header for username
		xheaders["passcode"] = 'hpasunuri'; //header for passsword
		
		return $http({
			url : urlPath,
			method: "GET",
			params: {agencyId: self.agency_id},
			//withCredentials: true,
			headers:{ 'Authorization':  'Basic ' + btoa('hpasunuri' + ":" + 'hpasunuri')}

		}).then(function(response){
			console.log(response.status);
			console.log(response.headers)
			console.log(response.config);
			return response.data;
		}, function errorCallback(response) {
			console.log(response.status);
			console.log(response.headers)
			console.log(response.config);
		}
		);
		
		

		
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
	self.init = function() 
	  {
	    
		appService.getJsonIndObject()
  		.then(function (data){
  			
  			self.jsonIndData = data;
  			
  			console.log(self.jsonIndData);
  		});
	   
	  };
	  
	
	self.sortType     = "Request_Date"; // set the default sort type
	self.sortReverse  = false;  // set the default sort order
		

	  //This allows us to get Json Object when an event occurs like a button click.
     self.retrieveJsonData = function () {
    	  	
    	  		
    	  
    	  		appService.getJsonObject(self.agencyId,self.requestId) // The agencyId and reqeustId come from the ng-model
    	  		.then(function (data){
    	  		
    	  			
    	  			self.jsonData = data;
        	  		
    	  			console.log(self.jsonData);
    	  		});	    	   	
      
      };

     
      
      
	
}
