(function(){

	angular.module('startApp')
	.controller('articleCtrl',[
		'$scope',
		'$http',
		'ArticleFactory',
		'ArticleUserFactory',
		'$localStorage',
		'$state',
		'multipartForm',
		'$stateParams',
		'AuthFactory',
		'commentFactory',
		'TagFactory',
		function($scope,
			$http,
		    ArticleFactory,
		    ArticleUserFactory,
		    $localStorage,
		    $state,
		    multipartForm,
		    $stateParams,
		    AuthFactory,
		    commentFactory,
		    TagFactory){


			$scope.toTopDisplay = function() {
				window.parent.$("body").animate({scrollTop:500}, 'slow'); 
			}

			/*RESTFUL articles */
			$scope.currentArticles = null;
			$scope.editArticle = null;
			
			var isAuth = AuthFactory.isAuthenticated();
			var isAdmin = AuthFactory.isAdmin();
			$scope.isAuth = AuthFactory.isAuthenticated();
			$scope.isAdmin = AuthFactory.isAdmin();
			$scope.listArticles = function(){
				$scope.articles = ArticleFactory.query(function(){
					//pagination
					PaginationCtrl($scope.articles);
				});
			}

			$scope.createArticle = function(article){
				new ArticleFactory(article).$create()
				.then(function(newArticle) {
					$scope.articles.push(newArticle);
				});
				$scope.currentArticles = '';
				$state.go('app.articles');
			}

			$scope.updateArticle = function(article) {
				article.$save({articleId:article._id})
				.then(function(UpArticle) {
					$scope.articles.splice(
						$scope.articles.indexOf(UpArticle),1,UpArticle);
					$scope.editArticle = null;
				});
				$scope.editArticle = '';
				$state.go('app.articles');
			}

			$scope.deleteArticle = function(article) {
				article.$delete({articleId:article._id})
				.then(function(){
					$scope.articles.splice($scope.articles.indexOf(article),1);
					$state.go('app.articles');
				});
			}

			$scope.cancelArticle = function() {
				$scope.editArticle = null;
				$state.go('app.articles');
			}

			$scope.createArticleByKey = function(article) {
				if(event.which == 13 && $scope.currentArticles != ""){
					new ArticleFactory(article).$create()
						.then(function(newArticle) {
						$scope.articles.push(newArticle);
					});
					$scope.currentArticles = '';

				}
			}

			//toArticle function
			$scope.toArticle = function(articleId) {
				$state.go('app.article',{articleId: articleId});
				window.parent.$("body").animate({scrollTop:500}, 'slow'); 

			}	
			var articleId = $stateParams.articleId;
			showArticle = function() {
				ArticleFactory.get({articleId:articleId}, 
					function(article){
						$scope.articleDetail = article;
				});
			}
			if(articleId){
				showArticle();
			}

			//Article edit
			$scope.editArticlefn = function(articleEidtId) {
				$state.go('app.articleEdit',{articleId: articleEidtId});
				window.location.reload();
			}
			var articleEidtId = $stateParams.articleId;
			editArticle = function() {
				ArticleFactory.get({articleId:articleEidtId}, 
					function(article){
						$scope.editArticle = article;
				});
			}
			if(articleEidtId){
				editArticle();
			}

			//set popular

			$scope.setPopular = function(article) {
				$http.put('articles/'+ article._id, {popular:"true"})
				.then(function(r){
					console.log(r);
					$state.go($state.current, {}, {reload: true});
				},function(e){
					console.log(e);
				});
			}

			$scope.setoffPopular = function(article) {
				$http.put('articles/'+ article._id, {popular:"false"})
				.then(function(r){
					console.log(r);
					$state.go($state.current, {}, {reload: true});
				},function(e){
					console.log(e);
				});
			}


			/*home article pages*/
			$scope.listHomeArticles = function() {
				$scope.homeArticles = ArticleUserFactory.query(function(){
					//pagination
					PaginationCtrl($scope.homeArticles);
				});
			}

			/*article User views*/
			$scope.listArticlesUser = function(){
				$scope.articlesUser = ArticleUserFactory.query(function(){
					//pagination
					PaginationCtrl($scope.articlesUser);
				});
			}



			$scope.toArticleUser = function(articleCurrentId) {
				if(isAuth&&isAdmin){
					$state.go('app.article',{articleId: articleCurrentId});
					window.parent.$("body").animate({scrollTop:500}, 'slow'); 
				}else{
					$state.go('app.articleUser',{articleUserId: articleCurrentId});
					window.parent.$("body").animate({scrollTop:500}, 'slow'); 
				};
			}	
			var articleUserId = $stateParams.articleUserId;
			showArticle = function() {
				ArticleUserFactory.get({articleUserId:articleUserId}, 
					function(article){
						$scope.articleUserDetail = article;
				});
			}
			if(articleUserId){
				showArticle();
			}

			//article comments
			$scope.mycomment = {
        		comment: ""
    		};

		    $scope.submitComment = function () {
		        commentFactory.save({articleId: $stateParams.articleId}, $scope.mycomment);
		        $state.go($state.current, {}, {reload: true});
		        /*$scope.commentForm.$setPristine();*/
		        $scope.mycomment = {
		            comment: ""
		        };
		    }
		    //tag list in createarticles
		    $scope.listTagsArticles = function() {
				$scope.articleTags = TagFactory.query();
			}
			
			//paginationctrl
			var PaginationCtrl = function(pageArticle) {
				$scope.viewby = 10;
				  	$scope.totalItems = pageArticle.length;
				  	$scope.currentPage = 1;
				  	$scope.itemsPerPage = $scope.viewby;
				  	$scope.maxSize = 5; //Number of pager buttons to show

				  	$scope.setPage = function (pageNo) {
				    	$scope.currentPage = pageNo;
				 	};

				  	$scope.pageChanged = function() {
				    	console.log('Page changed to: ' + $scope.currentPage);
				  	};

					$scope.setItemsPerPage = function(num) {
				  		$scope.itemsPerPage = num;
				  		$scope.currentPage = 1; //reset to first paghe

					};
			}

			//uploadImage
 			$scope.uploadImage = function(pageImage) {
 				$http.post('uploadImage', pageImage)
 				.then(function(r){
 					console.log(r);
 				});
 			}
 			/*settime*/
 			/*$scope.setTime = function() {
				var currentTime = new Date().toLocaleString();
				document.getElementById("jiaweitime").innerHTML = currentTime;
			}
			setInterval($scope.setTime,1000);*/
			
			/*pageImage*/
			$scope.customer = {}
			$scope.Submit = function() {
				var pageImage = $scope.customer;
				var uploadUrl = '/uploadImage';
				multipartForm.post(uploadUrl, pageImage)
				.success(function(r){
				if($scope.currentArticles){
					$scope.currentArticles.pageImage = r.filename;
				}
				if($scope.editArticle){
					$scope.editArticle.pageImage = r.filename;
				}
			});
			}
			

			if(!isAuth){
				$scope.listArticlesUser();
			}
			if(isAuth&&(!isAdmin)){
				$scope.listArticlesUser();
			}
			if(isAuth&&isAdmin) {
				$scope.listArticles();
			}
			$scope.listTagsArticles();
			$scope.listHomeArticles();
	}])
	.filter('trustHtml', function ($sce) {
    	return function (input) {
        	return $sce.trustAsHtml(input);
    	};
    });
})();