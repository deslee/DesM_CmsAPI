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