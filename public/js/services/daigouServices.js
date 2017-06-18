(function(){

	angular.module('startApp')
	.factory('DaigouFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl) {
			return $resource(baseUrl +
				"daigou/:daigouId", {daigouId: "@daigouId"},
				{ create: {method:"POST"}, save: {method:"PUT"}});
		}])
	.factory('DaigoutagFactory', [
		'$resource', 
		'baseUrl', 
		function ($resource, baseUrl) {
	        return $resource(baseUrl + "daigou/:daigouId/daigoutag/:daigoutagId", {daigouId:"@daigouId", daigoutagId: "@daigoutagId"}, {
	            'update': {
	                method: 'PUT'
	            }
	        });
    	}])
	.factory('DaigouproFactory', [
		'$resource', 
		'baseUrl', 
		function ($resource, baseUrl) {
	        return $resource(baseUrl + "daigou/:daigouId/daigoutag/:daigoutagId/daigoupro/:daigouproId", 
	        	{daigouId:"@daigouId", daigoutagId: "@daigoutagId", daigouproId: "@daigouproId"}, {
	            'update': {
	                method: 'PUT'
	            }
	        });
    	}]);
	
})();