(function(){

	angular.module('startApp')
	.factory('TagFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get tags
		return $resource(baseUrl + 
			"tag/:tagId", {tagId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}]);
	
})();