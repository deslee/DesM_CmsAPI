var cmsServices = angular.module('cmsServices', [
	'cmsConstants',
]);

cmsServices.service('API', ['$http', '$window', 'cmsConfig',
	function($http, $window, cmsConfig) {
		var self = this;

		var request = function(method, path, data, callback, require_login) {
			var config = {
				method: method,
				url: (require_login ? cmsConfig.api.secure : cmsConfig.api.user) + path,
				data: data,
			}
			console.log('sending:');
			console.log(config);
			var promise = $http(config);
			promise.success(function(data, status, headers, config) {
				console.log('server response:');
				if (data.api_status) {
					console.log(data);
					callback(data);
				}
				else {
					console.log('\tgot unpredicted response:');
					console.log(data);
				}
			}).error(function(data, status, headers, config) {
				console.log('server error:');
				console.log(data);
				callback({api_status: 'error', data: data}); 
			});
		}

		self.get = function(path, callback, require_login) {
			request('GET', path, null, callback, require_login);			
		}
		self.post = function(path, data, callback, require_login) {
			request('POST', path, data, callback, require_login);
		}
		self.delete = function(path, callback, require_login) {
			self.post(path, {_method: "delete"}, callback, require_login);
		}


		self.login = function(user, pass, callback) {
			self.post('/login', {username: user, password: pass}, function(response) {
				// save this to the session.
				$window.sessionStorage.token = response.data;
				callback(response);
			});
		}

		self.logout = function(callback) {
			delete $window.sessionStorage.token
			callback({api_status: 'success'});
		}

		self.logged_in = function() {
			if($window.sessionStorage.token) {
				return true;
			}
			else {
				return false;
			}
		}
	}
]);

cmsServices.run(['$rootScope', '$location', '$window', 'API', 'cmsConfig',
	function($rootScope, $location, $window, API, config) {
		$rootScope.$on('$routeChangeStart', function(event) {
			if($location.path().substring(0,config.routes.admin.length) == config.routes.admin) {
				if (!$window.sessionStorage.token) {
					event.preventDefault();
					$location.path(config.routes.login)
				}
			}
			
			$rootScope.logged_in = API.logged_in();
		});
	}
]);