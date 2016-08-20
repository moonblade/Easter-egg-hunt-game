angular.module("gunt")
.controller("gameController", ["$scope", "mainFactory", "$localStorage", "$state", function($scope, mainFactory, $localStorage, $state) {
	levelToState = ["app.game.dummy","app.game.one"];
	$scope.userLevel = 0;
	$scope.gotoLevel = function(player) {
		mainFactory.login(player)
		.then(function(data){
			$scope.userLevel = data.data.level;
			$state.go(levelToState[$scope.userLevel]);
		}).catch(function(error){
			console.log(error);
		});
	}

	if($localStorage.guntUser)
	{
		$scope.gotoLevel($localStorage.guntUser);
	}
}])
.controller("dummyController", ["$scope", "mainFactory", function($scope, mainFactory) {
	
}])
.controller("oneController", ["$scope", "mainFactory", function($scope, mainFactory) {
}]);
