(function(){

	angular.module('startApp')
	.factory('MessageFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get tags
		return $resource(baseUrl + 
			"message/:messageId", {messageId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}]);
	
})();