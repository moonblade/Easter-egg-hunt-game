angular.module("gunt")
    .factory("mainFactory", ["$http", "$location", function($http, $location) {
        var factory = {};
        serverUrl = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;

        factory.login = function(player) {
            return $http({
                method: "GET",
                url: serverUrl + "/player",
                params: {
                    id: player.id
                }
            });
        }

        factory.getLevel = function(player) {
            return $http({
                method: "GET",
                url: serverUrl + "/player/getLevel/"+player.id
            })
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

        factory.addPlayer = function(player, idToken) {
            return $http({
                method: "PUT",
                url: serverUrl + "/player",
                data: {
                    "player": player,
                    "idToken": idToken
                }
            })
        }

        return factory;
    }]);
