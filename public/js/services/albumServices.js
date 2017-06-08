(function(){
	angular.module('startApp')
	.factory('AlbumFactory',[
		'$resource',
		'baseUrl',
		function($resource,baseUrl) {
			return $resource(baseUrl +
				"albumboxes/:albumboxId", {albumboxId: "@id"},
				{ create: {method:"POST"}, save: {method:"PUT"}});
		}])
	.factory('AlbumPicFactory', [
		'$resource', 
		'baseUrl', 
		function ($resource, baseUrl) {
	        return $resource(baseUrl + "albumbox/:albumboxId/albumpics/:albumpicId", {albumboxId:"@Id", albumpicId: "@albumpicId"}, {
	            'update': {
	                method: 'PUT'
	            }
	        });
    	}])
	.service('multipartForm', ['$http', function($http) {
		this.post = function(uploadUrl, data) {
			var fd = new FormData();
			for(var key in data)
				fd.append(key, data[key]);
			return $http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
			
		}
	}]);
})();