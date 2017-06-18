(function() {
	angular.module('startApp').controller('daigouCtrl',[
		'$scope',
		'DaigouFactory',
		'DaigoutagFactory',
		'DaigouproFactory',
		'ngDialog',
		'multipartForm',
		'$stateParams',
		'$state',
		'$log',
		'AuthFactory',
		function($scope,
			DaigouFactory,
			DaigoutagFactory,
			DaigouproFactory,
			ngDialog,
			multipartForm,
			$stateParams,
			$state,
			$log,
			AuthFactory) {
			/*$scope.$on('$stateChangeSuccess', function() { 
				window.parent.$("body").animate({scrollTop:500}, 'slow'); 
			});*/
			$scope.isAuth = AuthFactory.isAuthenticated();
			$scope.isAdmin = AuthFactory.isAdmin();

			$scope.toTopDisplay = function() {
				window.parent.$("body").animate({scrollTop:500}, 'slow'); 
			}

			$scope.currentDaigou = {};

			$scope.listDaigou = function() {
				$scope.daigoues = DaigouFactory.query();
			}

			$scope.listDaigou();


			$scope.OpenDaigouCreate = function() {
				ngDialog.open({ template: 'views/daigou/createDaigou.html',
			 	scope:$scope,
			 	className:'ngdialog-theme-default',
			 	controller:"daigouCtrl"})
			}

			$scope.createDaigou = function(daigou) {
				new DaigouFactory(daigou).$create()
 				.then(function(newDaigou) {
 					$scope.daigoues.push(newDaigou)
 				});
 				ngDialog.close();
 				window.location.reload();
			}

			$scope.deleteDaigou = function(daigou) {
				DaigouFactory.delete
				({"daigouId":daigou._id});
				$state.go($state.current, {}, {reload: true});
			}

			//to daigou
			$scope.toDaigou = function(daigouId) {
				$state.go('app.daigouDetail',{daigouId: daigouId});
				window.parent.$("body").animate({scrollTop:500}, 'slow');
			}

			var daigouId = $stateParams.daigouId;
			showDaigou = function() {
				DaigouFactory.get({daigouId:daigouId},
					function(daigou) {
						$scope.daigouDetail = daigou;
						console.log($scope.daigouDetail);
					})
			}

			if(daigouId){
				showDaigou();
			}

			//daigoutag
			$scope.currentDaigouTag = {};
			$scope.openDaigouCreateTag = function() {
				ngDialog.open({ template: 'views/daigou/createDaigouTag.html',
			 	scope:$scope,
			 	className:'ngdialog-theme-default',
			 	controller:"daigouCtrl"})
			}

			$scope.createDaigouTag = function(daigoutag) {
				DaigoutagFactory.save({daigouId: $stateParams.daigouId}, $scope.currentDaigouTag);
		        $state.go($state.current, {}, {reload: true});
		        ngDialog.close();
		        /*$scope.commentForm.$setPristine();*/
		        $scope.currentDaigouTag = '';
			}
			$scope.deleteDaigouTag = function(daigoutag) {
				DaigoutagFactory.delete
				({"daigouId":daigouId,"daigoutagId":daigoutag._id});
				$state.go($state.current, {}, {reload: true});
			}

			//daigoupro


			//to daigoupro
			$scope.toDaigouPro = function(daigoutagId) {
				$state.go('app.daigouDetail.pro',{daigouId: daigouId, daigoutagId: daigoutagId});
				window.parent.$("body").animate({scrollTop:500}, 'slow');
			}

			var daigoutagId = $stateParams.daigoutagId;
			showDaigouPro = function() {
				DaigouproFactory.query({"daigouId":daigouId,"daigoutagId":daigoutagId},
					function(daigoupros) {
						$scope.daigouPros = daigoupros;
					},function(err){
						console.log(err);
					});
			}

			if(daigoutagId){
				showDaigouPro();
			}

			//daigoucreatepro
			$scope.currentDaigouPro = {};
			$scope.openDaigouCreatePro = function() {
				ngDialog.open({ template: 'views/daigou/createDaigouPro.html',
			 	scope:$scope,
			 	className:'ngdialog-theme-default',
			 	controller:"daigouCtrl"})
			}

			$scope.createDaigouPro = function(currentDaigouPro) {
				DaigouproFactory.save({"daigouId":daigouId,"daigoutagId":daigoutagId}, $scope.currentDaigouPro);
		        $state.go($state.current, {}, {reload: true});
		        ngDialog.close();
		        /*$scope.commentForm.$setPristine();*/
		        $scope.createDaigouPro = '';
			}

			//daigoudeletePro
			$scope.deleteDaigouPro = function(daigoupro) {
				DaigouproFactory.delete
				({"daigouId":daigouId,"daigoutagId":daigoutagId,"daigouproId":daigoupro._id})
				$state.go($state.current, {}, {reload: true});
			}


		    //uploadImage
 			$scope.uploadImage = function(classPage) {
 				$http.post('uploadImage', classPage)
 				.then(function(r){
 					console.log(r);
 				});
 			}
			
			/*classPage*/
			$scope.customer = {}
			$scope.Submit = function() {
				var classPage = $scope.customer;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, classPage)
				.success(function(r){
					$scope.currentDaigou.classPage = r.filename;
				});
			}

			/*daigouPage*/
			$scope.customerp = {}
			$scope.Submitp = function() {
				var daigouPage = $scope.customerp;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, daigouPage)
				.success(function(r){
					$scope.currentDaigouPro.daigouPage = r.filename;
					console.log(r);
				});
			}


		}]);
})();