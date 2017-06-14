(function() {
	angular.module('startApp').controller('messagebCtrl',[
		'$scope',
		'MessagebFactory',
		'AuthFactory',
		function($scope,
			MessagebFactory,
			AuthFactory
			) {
			$scope.isAuth = AuthFactory.isAuthenticated();
			$scope.isAdmin = AuthFactory.isAdmin();
			$scope.currentMessages = null;

			$scope.listMessagesb = function() {
				$scope.messagesb = MessagebFactory.query();
			}

			$scope.createMessageb = function(messageb) {
				new MessagebFactory(messageb).$create()
				.then(function(newMessageb) {
					$scope.messagesb.push(newMessageb);
					window.location.reload();
				});
			}
			$scope.listMessagesb();
		}]);	
})();