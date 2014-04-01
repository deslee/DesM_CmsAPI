var cmsCtrls = angular.module('cmsControllers', [
	'cmsServices',
	'cmsConstants',
]);

cmsCtrls.run(['$rootScope', 'API', function($rootScope, API) {
	API.get('/setting/main', function(response) {
		if (response.api_status === 'success') {
			$rootScope.main_settings = response.data;
		}
		if (!$rootScope.main_settings) {
			$rootScope.main_settings = {};
		}
		if (!$rootScope.main_settings.slug) {
			$rootScope.main_settings.slug = 'main'
		}
	});
}])

cmsCtrls.controller('Home', ['$scope', 'API', '$sce', function($scope, API, $sce) {
	API.get('/entry?html=true', function(response) {
		if (response.api_status === 'success') {
			$scope.entries = response.data.map(function(entry) {
				var e = entry;
				e.text = $sce.trustAsHtml(entry.text);
				return e;
			});
		}
	});
}]);

cmsCtrls.controller('Admin', ['$scope', 'API', '$sce', '$location', 'cmsConfig',
	function($scope, API, $sce, $location, cmsConfig) {
		$scope.origin = window.location.origin;
		API.get('/entry', function(response) {
			if (response.api_status === 'success') {
				$scope.entries = response.data;
			}
		});

		$scope.new_entry = function() {
			var slug = $scope.slug;
			if (!slug) {
				return;
			}
			$location.path(cmsConfig.routes.admin + '/update/' + slug);
		}

		$scope.save_settings = function(setting) {
			API.post('/setting/' + setting.slug, setting, function(response) {
				if (response.api_status === 'success') {
					alert('settings saved!');
				}
			}, true);
		}
	}
]);

cmsCtrls.controller('Entry', ['$scope', '$routeParams', 'API', '$sce', function($scope, $routeParams ,API, $sce) {
	var slug = $routeParams.slug;
	API.get('/entry/' + slug + '?html=true', function(response) {
		if (response.api_status === 'success') {
			$scope.entry = response.data;
			$scope.logged_in = API.logged_in();
			$scope.entry.text = $sce.trustAsHtml(response.data.text);
		}
		else {
		}
	});
}])

cmsCtrls.controller('Login', ['$scope', '$location', 'API', function($scope, $location, API) {
	$scope.submit = function() {
		API.login($scope.user.username, $scope.user.password, function(data) {
			if (data.api_status === 'success') {
				$location.path('/admin');
			} else {
				$scope.failure = true;
			}
		});
	}		
}]);

cmsCtrls.controller('Logout', ['$scope', '$location', 'API', function($scope, $location, API) {
	API.logout(function() {
		$location.path('/');
	});
}]);

cmsCtrls.controller('UpdateEntry', ['$scope', '$location', '$routeParams', 'API', function($scope, $location, $routeParams, API) {
	var slug = $routeParams.slug;
	var model = '/entry';
	$scope.entry = {};

	API.get(model+'/'+slug, function(response) {
		if (response.api_status === 'success') {
			$scope.entry = response.data;
			if (response.data.isPost) {
				$('.ui.checkbox').checkbox('enable');
			}
		}
	})

	$scope.submit = function() {
		var entry = $scope.entry;
		entry.slug = slug;
		if (!entry.isPost) {
			entry.isPost = false;
		}
		API.post(model + '/' + slug, entry, function(response) {
			if (response.api_status === 'success') {
				$location.path('/' + slug);
			}
			else {
			}
		}, true);
	}

	$scope.toggle = function() {
		$scope.entry.isPost = !$scope.entry.isPost;
	}

	$scope.delete = function() {
		if (!$scope.entry || !confirm("Are you sure you want to delete this?")) {
			return;
		}

		API.delete(model + '/' + slug, function(response) {
			if (response.api_status === 'success') {
				$location.path('/');
			}
			else {
			}
		}, true);
	}

	$scope.update_date = function() {
		$scope.entry.date = new Date();
	}
}])

var cmsConstants = angular.module('cmsConstants', []);
cmsConstants.provider('cmsConfig', function() {
	var self = this;
	self.config = {};

	self.setConfig = function(config) {
		self.config = config;
	};

	self.$get = function() {
		return self.config;
	}
});