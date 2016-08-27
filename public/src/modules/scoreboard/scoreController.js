angular.module("gunt")
.controller("scoreController", ["$scope", "mainFactory", "$localStorage", function($scope, mainFactory, $localStorage) {
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
