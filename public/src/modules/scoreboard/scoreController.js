angular.module("gunt")
.controller("scoreController", ["$scope", "mainFactory", function($scope, mainFactory) {
	mainFactory.scoreBoard().then(function(data){
		if(data.data.code==0)
		{
			// console.log(data.data.scoreBoard);
			$scope.scoreBoard = data.data.scoreBoard;
		}
	}).catch(function(error){
		$scope.showError(error);
	})
}]);
