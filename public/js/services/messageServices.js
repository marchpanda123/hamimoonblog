(function(){

	angular.module('startApp')
	.factory('MessagebFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl){
			//get tags
		return $resource(baseUrl + 
			"messageb/:messagebId", {messagebId: "@id"},
			{ create: {method:"POST"}, save: {method:"PUT"}});
	}]);
	
})();