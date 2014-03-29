var cms = angular.module('cms', [
	'cmsConstants',
	'ngRoute',
	'cmsControllers',
	'ngAnimate',
]);

cms.factory('authInterceptor', ['$rootScope', '$q', '$window',
	function ($rootScope, $q, $window) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.sessionStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
				}
				return config;
			},
			response: function (response) {
				if (response.status === 401) {
				// handle the case where the user is not authenticated
				}
				return response || $q.when(response);
			}
		};
	}
]);

cms.config(['$routeProvider', '$locationProvider', '$httpProvider', 'cmsConfigProvider',
	function($routeProvider, $locationProvider, $httpProvider, cmsConfigProvider) {

		cmsConfigProvider.setConfig(GLOBAL_CONSTANTS);
		var config = GLOBAL_CONSTANTS;

		$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'Home',
		})
		.when(config.routes.login, {
			templateUrl: 'partials/mixins/login.html',
			controller: 'Login',
		})
		.when(config.routes.logout, {
			templateUrl: 'partials/mixins/logout.html',
			controller: 'Logout',
		})
		.when(config.routes.admin, {
			templateUrl: 'partials/admin.html',
			controller: 'Admin',
		})
		.when(config.routes.admin + '/update/:slug', {
			templateUrl: 'partials/mixins/entry_form.html',
			controller: 'UpdateEntry',
		})
		.when('/:slug', {
			templateUrl: 'partials/entry.html',
			controller: 'Entry',
		})
		;
		$locationProvider.html5Mode(true);

		$httpProvider.interceptors.push('authInterceptor');
	}
]);

cms.run(['$rootScope', '$location', '$window', 'cmsConfig', 
	function($rootScope, $location, $window, config) {
		$rootScope.$on('$routeChangeStart', function(event) {
			if($location.path().substring(0,config.routes.admin.length) == config.routes.admin) {
				if (!$window.sessionStorage.token) {
					event.preventDefault();
					$location.path(config.routes.login)
				}
			}
		});
	}
]);