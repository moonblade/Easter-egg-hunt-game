angular.module("gunt")
    .factory("mainFactory", ["$http", "$location", function($http, $location) {
        var factory = {};
        serverUrl = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;

        factory.login = function(player, idToken) {
            console.log(player,idToken);
            return $http({
                method: "GET",
                url: serverUrl + "/player",
                params: {
                    id: player.id,
                    idToken: idToken
                }
            });
        }

        factory.checkAnswer = function(player, answer) {
            return $http({
                method: "POST",
                url: serverUrl + "/player/checkAnswer",
                data: {
                    "player": player,
                    "answer": answer
                }
            });
        }

        factory.scoreBoard = function(player) {
            return $http.get(serverUrl + "/scoreBoard");
        }

        factory.addPlayer = function(player) {
            console.log(player);
            return $http({
                method: "PUT",
                url: serverUrl + "/player",
                data: {
                    "player": player
                }
            })
        }

        return factory;
    }]);
