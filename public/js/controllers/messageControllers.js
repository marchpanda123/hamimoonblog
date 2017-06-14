(function() {
	angular.module('startApp').controller('messageCtrl',[
		'$scope',
		'MessageFactory',
		'AuthFactory',
		function($scope,
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
				console.log(message);
				new MessageFactory(message).$create()
				.then(function(newMessage) {
					$scope.messages.push(newMessage);
					window.location.reload();
				});
			}
			$scope.listMessages();
		}]);	
})();