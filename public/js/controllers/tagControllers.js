(function() {
	angular.module('startApp').controller('tagCtrl',[
		'$scope',
		'$http',
		'TagFactory',
		function($scope,
			$http,
			TagFactory) {
			$scope.currentTags = null;

			$scope.listTags = function() {
				$scope.tags = TagFactory.query();
			}

			$scope.createTag = function(tag) {
				new TagFactory(tag).$create()
				.then(function(newTag) {
					$scope.tags.push(newTag);
				});
			}

			$scope.updateTag = function(tag) {
				tag.$save({tagId:tag._id})
				.then(function(UpTag) {
					$scope.tags.splice(
						$scope.tags.indexOf(UpTag),1,UpTag);
				});
			}

			$scope.deleteTag = function(tag) {
				tag.$delete({tagId:tag._id})
				.then(function(){
					$scope.articles.splice($scope.articles.indexOf(article),1);
				});
			}


			$scope.listTags();
		}]);
})();