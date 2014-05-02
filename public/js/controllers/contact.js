// get the data for the contact view
ims.controller('getContact', function ($scope, $routeParams, $http, $location) {
	// get the contact information
    $http.get('http://localhost:9000/contacts/' + $routeParams.contactId).
        success(function(data) {
            $scope.contact = data;
        });
    
    // get all the incidents associated with the contact
    $http.get('http://localhost:9000/contacts/' + $routeParams.contactId + '/incidents').
    success(function(data) {
        $scope.contactIncidents = data;
    });
    
    // get all the companies associated with the contact
    $http.get('http://localhost:9000/contacts/' + $routeParams.contactId + '/companies').
    success(function(data) {
        $scope.contactCompanies = data;
    });  

   // remove the contact (de-activate)
    $scope.remove = function() {
    	console.log("remove contact");
    	
    	 // get all the open incidents associated with the contact
        $http.get('http://localhost:9000/contacts/' + $routeParams.contactId + '/incidents?status=Open').
        success(function(data) {
            var openIncidents = data;
            
            // remove the contact if they are not associated with any open incidents
            if (openIncidents.length == 0) {
            
	            // post the json object to the restful api
	            
	        	$http.delete( 'http://localhost:9000/contacts/' + $scope.contact.id)
	        		.success(function(data) {
	        			console.log(data);
	        			
	        			// show notification
	        			$(function(){
	        				new PNotify({
	        					title: 'Success',
	        					text: 'Contact successfully removed.',
	        					type: 'success',
	        					styling: 'bootstrap3',
	        					delay: 3000
	        				});
	        			});
	        			
	        			// go back to contacts listing
	        			$location.path('/contacts');
	        		}).
	        		error(function(data,status,headers,config) {
	        			console.log(status);
	        			$(function(){
	        				new PNotify({
	    					    title: 'Error',
	    					    text: 'Unable to remove contact.',
	    					    type: 'error',
	    					    styling: 'bootstrap3',
	    					    delay:3000
	    					});
	        			})
	        		});
	        		
        		
            } else {
            	// report that the contact is associated with open incidents
            	$(function(){
    				new PNotify({
					    title: 'Warning',
					    text: 'The contact is associated with open incidents and cannot be removed.',
					    type: 'error',
					    styling: 'bootstrap3',
					    delay:5000
					});
    			})
            };
            
        });
    	
    };
    
   // update the system using the contact form values
   $scope.update = function() {
    	
	   console.log("update contact");
	   
	    // create an object to hold the form values 
    	var dataObj = { "email" : $scope.contact.email,
    					"fullname" : $scope.contact.fullname,
    					"phone" : $scope.contact.phone };
    	
    	console.log(dataObj);
    	
    	// post the json object to the restful api
    	$http.post( 'http://localhost:9000/contacts/' + $scope.contact.id, dataObj)
    		.success(function(data) {
    			console.log(data);
    			
    			// show notification
    			$(function(){
    				new PNotify({
    					title: 'Success',
    					text: 'Contact successfully updated.',
    					type: 'success',
    					styling: 'bootstrap3',
    					delay: 3000
    				});
    			});
    		}).
    		error(function(data,status,headers,config) {
    			console.log(status);
    			$(function(){
    				new PNotify({
					    title: 'Error',
					    text: 'Unable to update contact.',
					    type: 'error',
					    styling: 'bootstrap3',
					    delay:3000
					});
    			})
    		});
    
   };
   
   
});