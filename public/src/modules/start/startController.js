angular.module("gunt")
    .controller("startController", ["$scope", "mainFactory", "$localStorage", "$mdDialog", "GooglePlus", function($scope, mainFactory, $localStorage, $mdDialog, GooglePlus) {

        $scope.showMessage = function(title, message) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .textContent(message)
                .ok('Okay')
            );
        }

        $scope.showError = function(err) {
            if (err) {
                if (err.error) {
                	switch(err.error.code)
                	{
                		case 11000:
	                        $scope.showMessage('Error', 'Sorry, the avatar name is not available');
	                        break;
	                    case 10: 
	                    // banned
	                    case 20:
	                    // player not found
	                        $scope.showMessage('Error', err.error.errmsg);
	                        break;
	                    default:
				            $scope.showMessage('Error', 'There was an error : ' + (err ? JSON.stringify(err) : "Unknown Error"));
                	}
                    if (err.error.code == 11000) {
                        // Duplicate entry
                    } else if (err.error.code == 10) {
                        $scope.showMessage('Error', err.error.errmsg);
                    }

                }
            }
            $scope.showMessage('Error', 'There was an error : ' + (err ? JSON.stringify(err) : "Unknown Error"));
        }

        $scope.showPrompt = function(title, message, placeholder) {
            var confirm = $mdDialog.prompt()
                .title(title)
                .textContent(message)
                .placeholder(placeholder)
                .ariaLabel(placeholder)
                // .initialValue('')
                // .targetEvent(ev)
                .ok('Okay')
                .cancel('Cancel');
            return $mdDialog.show(confirm);
        };
        $scope.loginAction = $localStorage.guntUser ? "Logout" : "Login";
        $scope.login = function() {
            if ($localStorage.guntUser) {
                // logout
                $localStorage.guntUser = null;
                $scope.loginAction = "Login";
                GooglePlus.logout();
            } else {
                // login
                GooglePlus.login().then(function(authResult) {
                        GooglePlus.getUser().then(function(player) {
                            // console.log(player);
                            mainFactory.login(player)
                                .success(function(result) {
                                    if (!result) {
                                        $scope.showPrompt("Create Avatar", "Please enter a name for your character", "avatar name").then(function(name) {
                                            player.name = name;
                                            mainFactory.addPlayer(player)
                                                .success(function(result) {
                                                    $scope.loginAction = "Logout";
                                                    $localStorage.guntUser = {
                                                        id: player.id,
                                                        name: player.name
                                                    };
                                                }).error(function(err) {
                                                    console.log(err);
                                                    $scope.showError(err);
                                                })
                                        }, function() {});
                                    } else {
                                        $scope.loginAction = "Logout";
                                        $localStorage.guntUser = {
                                            id: player.id,
                                            name: result.name
                                        };
                                    }
                                }).error(function(err) {
                                    console.log(err)
                                })
                        });
                    },
                    function(err) {
                        console.log(err);
                        $scope.showError(err);
                    });
            }
        }
    }]);