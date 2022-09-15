angular.module("gunt")
  .factory("mainFactory", ["$http", "$location", "$localStorage", function($http, $location, $localStorage) {
    var answers = {
      0: "ignition",
      1: "wargames",
      2: "theonlywinningmoveisnottoplay",
      3: "narvi",
      4: "mellogoth",
      5: "three",
      6: "minusworld",
      7: "olivertwist",
      8: "readyplayerone",
      9: "gregariousgames",
      10: "iwantmore",
    }
        var factory = {};
        serverUrl = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port;

        factory.login = function(player) {
          return Promise.resolve({data: $localStorage.guntUser});
            return $http({
                method: "GET",
                url: serverUrl + "/player",
                params: {
                    id: player.id
                }
            });
        }

        factory.getLevel = function(player) {
          return Promise.resolve(player.id)
            return $http({
                method: "GET",
                url: serverUrl + "/player/getLevel/"+player.id
            })
        }

        factory.checkAnswer = function(player, answer) {
          if (player.level == 6) {
            var returncode = 0;
            if (answer[0] == answers[player.level]) {
              returncode = returncode | 1
            }
            if (answer[1] == answers[player.level + 1]) {
              returncode = returncode | 2
            }
            if (answer[2] == answers[player.level + 2]) {
              returncode = returncode | 4
            }
            if (returncode == 7) {
                $localStorage.guntUser = {
                ...$localStorage.guntUser,
                level: player.level + 3
              }
            }
            return Promise.resolve({ data: { code: returncode } })
          } else {
            if (answers[player.level] == answer) {
              $localStorage.guntUser = {
                ...$localStorage.guntUser,
                level: player.level + 1 
              }
              return Promise.resolve({data: { code: 0 }})
            } else {
              return Promise.resolve({ data: { code: -1 }})
            }
          }
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
