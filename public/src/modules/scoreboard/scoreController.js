angular.module("gunt")
.controller("scoreController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
	$rootScope.title="Scoreboard";
	mainFactory.scoreBoard().then(function(data){
		if(data.data.code==0)
		{
			// console.log(data.data);
			$scope.scoreBoard = data.data.scoreBoard;
		}
	}).catch(function(error){
		$scope.showError(error);
	})
}]);
