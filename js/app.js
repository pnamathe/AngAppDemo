
Attachment angularProj.war successfully uploaded and added.Conversation opened. 4 messages. 1 message unread.

Skip to content
Using Gmail with screen readers
Search



Gmail
COMPOSE
Labels
Inbox
Important
Chats
Sent Mail
Drafts
Trash
[Gmail]
Notes
More 
Hangouts

 
 
 
  More 
1 of 5,742  
 
Expand all Print all In new window
snippet 
Inbox
x 

Harsha Pasunuri		12:00 PM (43 minutes ago)
Prashanth : For the below line of code : <span ng-if="key == 'Request_ID'"><a...

Prashanth		12:10 PM (33 minutes ago)
Yeah, If I understand you correctly we can make the href call a service which...

Prashanth Namatheertham		12:14 PM (29 minutes ago)
We can have ng-click directive on the a tag and also have a pop up with the d...

Harsha Pasunuri
Attachments12:43 PM (0 minutes ago)

to me 
yep.. you are right prashanth..the only reason i prefer to call a new service method is to get the actual json object from the server(potentially we will pull attachments ..later in the game).
call a new service(getDetailedJsonObject) ??

I am attaching both files for you.. or send me your github details...

3 Attachments 
 
	
Click here to Reply or Forward
1.86 GB (12%) of 15 GB used
Manage
Terms - Privacy
Last account activity: 29 minutes ago
Details


var app = angular.module("app",[]);

app.controller("appCtrl",appCtrl);


app.service("appService",function($http){
	
	var self = this;
	
	
	self.getJsonIndObject = function(){
		
		var urlPath = "data/75823.json";
		
		
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
