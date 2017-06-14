(function(){
	angular.module('startApp',['ui.router','ngResource','ngDialog','ui.bootstrap','ngMaterial'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
		//route for the home page we called app.
			.state('app',{
				url:'/',
				views: {
					/*'begin':{
						templateUrl:'views/begin.html',
						controller:'commenCtrl'
					},*/
					/*'header':{
						templateUrl: 'views/navbar.html',
						controller:'userCtrl'
					},*/
					'content':{
						templateUrl: 'views/home.html',
						controller: 'articleCtrl'
					},
					'footer':{
						templateUrl: 'views/footer.html'
					}
				}
			})

			//route for the content page
			.state('app.articles', {
				url:'articles',
				views: {
					'content@': {
						abstract:true,
						templateUrl: 'views/blog/articles.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.article', {
				url:'articles/:articleId',
				views: {
					'content@': {
						templateUrl: 'views/blog/article.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articlesUser', {
				url:'articlesUser',
				views: {
					'content@': {
						templateUrl: 'views/blog/articlesUser.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articleUser', {
				url:'articleUser/:articleUserId',
				views: {
					'content@': {
						templateUrl: 'views/blog/articleUser.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articleCreate', {
				url:'articlecreate',
				views: {
					'content@': {
						templateUrl: 'views/blog/articlecreate.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articleEdit', {
				url:'articleedit/:articleId',
				views: {
					'content@': {
						templateUrl: 'views/blog/articleedit.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.articlePopular', {
				url:'articlepopular',
				views:{
					'content@': {
						templateUrl: 'views/blog/articlePopular.html',
						controller: 'articleCtrl'
					}
				}
			})
			.state('app.carousel', {
				url:'carousel',
				views: {
					'content@': {
						templateUrl: 'views/carousel.html',
						controller: 'carouselCtrl'
					}
				}
			})
			.state('app.tags', {
				url:'tags',
				views: {
					'content@': {
						templateUrl:'views/tags.html',
						controller: 'tagCtrl'
					}
				}
			})
			.state('app.users', {
				url:'users',
				views:{
					'content@': {
						templateUrl: 'views/user.html',
						controller: 'userCtrl'
					}
				}
			})
			.state('app.albumbox', {
				url:'albumbox',
				views:{
					'content@': {
						abstract:true,
						templateUrl: 'views/album/albumbox.html',
						controller: 'albumCtrl'
					}
				}
			})
			.state('app.albumpic', {
				url:'albumbox/:albumboxId',
				views: {
					'content@': {
						templateUrl: 'views/album/albumpic.html',
						controller: 'albumCtrl'
					}
				}
			})
			/*.state('app.checkin', {
				url:'checkin',
				views:{
					'content@': {
						templateUrl: 'views/checkin.html',
						controller:'articleCtrl'
					}
				}
			})*/
			/*.state('app.articlesDetail', {
				url:'checkin/:articleId',
				views: {
					'content@': {
						params:{"message":null},
						templateUrl: 'views/articlesDetail.html',
						controller: 'articleCtrl'
					}
				}
			})*/
			.state('app.users.user', {
				url:'/user',
				views:{
					'': {
						templateUrl:'views/userinfo.html',
						controller:'userCtrl'
					}
				}
			})
			.state('app.daigou', {
				url:'daigou',
				views:{
					'content@': {
						templateUrl:'views/daigou/daigou.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.hufupin', {
				url:'hufupin',
				views:{
					'content@': {
						templateUrl:'views/daigou/hufupin.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.yingyouer', {
				url:'yingyouer',
				views:{
					'content@': {
						templateUrl:'views/daigou/yingyouer.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.caizhuang', {
				url:'caizhuang',
				views:{
					'content@': {
						templateUrl:'views/daigou/caizhuang.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.xiangshui', {
				url:'xiangshui',
				views:{
					'content@': {
						templateUrl:'views/daigou/xiangshui.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.baojianpin', {
				url:'baojianpin',
				views:{
					'content@': {
						templateUrl:'views/daigou/baojianpin.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.dazhecun', {
				url:'dazhecun',
				views:{
					'content@': {
						templateUrl:'views/daigou/dazhecun.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.hongjiu', {
				url:'hongjiu',
				views:{
					'content@': {
						templateUrl:'views/daigou/hongjiu.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.shechipin', {
				url:'shechipin',
				views:{
					'content@': {
						templateUrl:'views/daigou/shechipin.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.richang', {
				url:'richang',
				views:{
					'content@': {
						templateUrl:'views/daigou/richang.html',
						controller:'daigouCtrl'
					}
				}
			})
			.state('app.message',{
				url:'message',
				views:{
					'content@': {
						templateUrl:'views/message.html',
						controller:'messageCtrl'
					}
				}
			})
			.state('app.aboutme', {
				url:'aboutme',
				views:{
					'content@': {
						templateUrl:'views/aboutme.html',
						controller:'daigouCtrl'
					}
				}
			});
		// router for the other page.
		$urlRouterProvider.otherwise('/');
	})
	//ckeditor editorOptions

	.directive('ckeditor', function($timeout) {
    return {
        require : '?ngModel',
        link : function(scope, element, attrs, ngModel) {
            var ckeditor = CKEDITOR.replace(element[0], {
                
            });
            if (!ngModel) {
                return;
            }
            ckeditor.on('instanceReady', function() {
                ckeditor.setData(ngModel.$viewValue);
            });
            function updateModel() {
            	 $timeout(function() {
            		ngModel.$setViewValue(ckeditor.getData());
            	});
            }

            ckeditor.on('change', updateModel);
            ckeditor.on('key', updateModel);
            ckeditor.on('dataReady', updateModel);

            ngModel.$render = function(value) {
                ckeditor.setData(ngModel.$viewValue);
            };
        }
    };
})

.directive('fileModel', ['$parse', function($parse) {
    	return {
    		restrict: 'A',
    		link: function(scope, element, attrs){
    			var model = $parse(attrs.fileModel);
    			var modelSetter = model.assign;

    			element.bind('change', function() {
    				scope.$apply(function(){
    					modelSetter(scope, element[0].files[0]);
    				});
    			});
    		}
    	};
    }]);

})(); 
