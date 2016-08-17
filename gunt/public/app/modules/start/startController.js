angular.module("gunt")
    .controller("startController", ["$scope", "mainFactory", "$localStorage", "$mdDialog" , "GooglePlus" , function($scope, mainFactory, $localStorage, $mdDialog, GooglePlus) {

        $scope.showMessage = function(title, message) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .textContent(message)
                .ok('Okay')
            );
        }

        $scope.loginAction = $localStorage.guntUser ? "Logout" : "Login";
        $scope.login = function() {
            if ($localStorage.guntUser) {
                // logout
                $localStorage.guntUser = null
                $scope.loginAction = "Login"
                GooglePlus.logout();
            } else {
                // login
                GooglePlus.login().then(function(authResult) {
                    GooglePlus.getUser().then(function(user) {
                        console.log(user);
                        // mainFactory.login({
                        //         user: user
                        //     })
                        //     .success(function(result) {
                        //         // console.log(result)
                        //         $scope.loginAction = "Logout"
                        //         $localStorage.guntUser = user;
                        //     }).error(function(err) {
                        //         console.log(err)
                        //         $scope.showMessage('Failed', 'There was an error during login : ' + (err ? err : "Unknown Error"))
                        //     })
                    });
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }]);
