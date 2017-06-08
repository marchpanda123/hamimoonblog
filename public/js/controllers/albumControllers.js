(function(){
	angular.module('startApp').controller('albumCtrl', [
		'$scope',
		'AlbumFactory',
		'AlbumPicFactory',
		'ngDialog',
		'$state',
		'multipartForm',
		'$stateParams',
		'AuthFactory',
		function($scope,
			AlbumFactory,
			AlbumPicFactory,
			ngDialog,
			$state,
			multipartForm,
			$stateParams,
			AuthFactory){
			$scope.$on('$stateChangeSuccess', function() { 
				window.parent.$("body").animate({scrollTop:500}, 'slow'); 
			});

			$scope.isAuth = AuthFactory.isAuthenticated();
			$scope.isAdmin = AuthFactory.isAdmin();
			
 			$scope.currentAlbumbox = '';

 			$scope.listAlbumBox = function() {
				$scope.albumboxes = AlbumFactory.query();
			}

 			$scope.createAlbumbox = function(album) {
 				new AlbumFactory(album).$create()
 				.then(function(newAlbumbox) {
 					$scope.albumboxes.push(newAlbumbox)
 				});
 				ngDialog.close();
 				window.location.reload();
 			}

			$scope.openCreateAlbum = function() {
			ngDialog.open({ template: 'views/album/createAlbum.html',
			 scope:$scope,
			 className:'ngdialog-theme-default',
			 controller:"albumCtrl"})
		}

			//uploadImage
 			$scope.uploadImage = function(pageImage) {
 				$http.post('uploadImage', pageImage)
 				.then(function(r){
 					console.log(r);
 				});
 			}
			
			/*pageImage*/
			$scope.customer = {}
			$scope.Submit = function() {
				var pageImage = $scope.customer;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, pageImage)
				.success(function(r){
					$scope.currentAlbumbox.albumPage = r.filename;
				});
			}
			//To Albumbox
			$scope.toAlbumbox = function(albumboxId) {
				$state.go('app.albumpic',{albumboxId: albumboxId});
			}

			var albumboxId = $stateParams.albumboxId;
			showAlbumpic = function() {
				AlbumFactory.get({albumboxId:albumboxId},
					function(albumpic) {
						$scope.albumpicDetail = albumpic;
						console.log($scope.albumpicDetail);
					})
			}

			if(albumboxId){
				showAlbumpic();
			}

			//add pic
			$scope.currentAlbumpic = '';

			$scope.openCreateAlbumpic = function() {
			ngDialog.open({ template: 'views/album/createAlbumpic.html',
			    scope:$scope,
			    className:'ngdialog-theme-default',
			    controller:"albumCtrl"})
			}

 			$scope.createAlbumpic = function () {
		        AlbumPicFactory.save({albumboxId: $stateParams.albumboxId}, $scope.currentAlbumpic);
		        $state.go($state.current, {}, {reload: true});
		        ngDialog.close();
		        /*$scope.commentForm.$setPristine();*/
		        $scope.currentAlbumpic = '';
		    }
		    //delete pic
		    $scope.deleteAlbumpic = function(albumpic) {
				AlbumPicFactory.delete
				({albumboxId:$stateParams.albumboxId,albumpicId:albumpic._id})
				$state.go($state.current, {}, {reload: true});
			}

			$scope.customerpic = {}
			$scope.Submitpic = function() {
				var pageImage = $scope.customerpic;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, pageImage)
				.success(function(r){
					$scope.currentAlbumpic.albumImage = r.filename;
				});
			}

			$scope.openAlbumpic = function(pic) {
				$scope.picInfo = pic.albumImage
			ngDialog.open({ template: 'views/album/BigAlbumpic.html',
			    scope:$scope,
			    className:'ngdialog-theme-default',
			    controller:"albumCtrl"})
			}
			
			

			$scope.listAlbumBox();
		}]);
})();
