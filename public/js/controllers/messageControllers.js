(function() {
	angular.module('startApp').controller('messageCtrl',[
		'$scope',
		'$http',
		'MessageFactory',
		'AuthFactory',
		function($scope,
			$http,
			MessageFactory,
			AuthFactory
			) {
			$scope.isAuth = AuthFactory.isAuthenticated();
			$scope.isAdmin = AuthFactory.isAdmin();

			$scope.currentMessages = null;

			$scope.listMessages = function() {
				$scope.messages = MessageFactory.query();
			}

			$scope.createMessage = function(message) {
				new MessageFactory(message).$create()
				.then(function(newMessage) {
					$scope.messages.push(newMessage);
					window.location.reload();
				});
			}

			

			$scope.listMessages();
		}]);	
})();