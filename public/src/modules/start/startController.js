angular.module("gunt")
    .controller("startController", ["$scope", "mainFactory", "$localStorage", "$mdDialog", "GooglePlus", "$firebaseAuth", function($scope, mainFactory, $localStorage, $mdDialog, GooglePlus, $firebaseAuth) {

        $scope.guntUser = $localStorage.guntUser;
        $scope.showMessage = function(title, message) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .textContent(message)
                .ok('Okay')
            );
        }

        $scope.gotoLevelPlayer = function(player) {
            mainFactory.login(player)
                .then(function(data, error) {
                    $scope.userLevel = data.data.level;
                    $state.go($scope.levels[$scope.userLevel].state);
                }).catch(function(error) {
                    $scope.showMessage("Login", "Please login to continue");
                    // $scope.showError(error);
                });
        }

        $scope.gotoLevel = function(level) {
            if ($localStorage.guntUser && ((!level || level != $scope.userLevel) && $scope.userLevel < 10)) {
                $scope.gotoLevelPlayer($localStorage.guntUser);
            }
        }

        $scope.showError = function(err) {
            if (err) {
                if (err.error) {
                    switch (err.error.code) {
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
            } else {
                $scope.showMessage('Error', 'There was an error : ' + (err ? JSON.stringify(err) : "Unknown Error"));
            }
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
                $localStorage.showDummy = null;
                $scope.guntUser = $localStorage.guntUser;
                $scope.loginAction = "Login";
                // GooglePlus.logout();
            } else {
                // login
                var auth = $firebaseAuth();
                auth.$signInWithPopup("google").then(function(firebaseUser) {
                    console.log("Signed in as:", firebaseUser.user);

                    // Legacy code backwards compatibility
                    $scope.player = {};
                    $scope.player.id = firebaseUser.user.uid;
                    mainFactory.login($scope.player)
                        .success(function(result) {
                            console.log(result);
                            if (!result) {
                                $scope.player.name = firebaseUser.user.displayName;
                                firebaseUser.user.getToken().then(function(idToken) {
                                    console.log(idToken);
                                    mainFactory.addPlayer($scope.player, idToken)
                                        .then(function(result) {
                                            $scope.loginAction = "Logout";
                                            $localStorage.guntUser = {
                                                id: $scope.player.id,
                                                name: $scope.player.name
                                            };
                                            $scope.guntUser = $localStorage.guntUser;
                                            $scope.gotoLevel();
                                        }).catch(function(error) {
                                            throw error;
                                        });
                                }).catch(function(error) {
                                    throw error;
                                })
                            } else {
                                $scope.loginAction = "Logout";
                                $localStorage.guntUser = {
                                    id: $scope.player.id,
                                    name: result.name
                                };
                                $scope.guntUser = $localStorage.guntUser;
                                $scope.gotoLevel();

                            }

                        }).error(function(error) {
                            throw error;
                        });
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                    $scope.showError(error);
                });
            }
        }

        $scope.openMenu = function($mdOpenMenu) {
            $mdOpenMenu();
        }
    }]);
