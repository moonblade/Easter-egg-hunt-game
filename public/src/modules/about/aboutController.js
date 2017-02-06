angular.module("gunt")
.controller("aboutController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
	$rootScope.title = "Almanac";
}]);
