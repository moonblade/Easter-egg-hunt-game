var serverUrl = "dummy";
angular.module("gunt", ["ngMaterial", "ui.router", 'googleplus', 'ngStorage', 'md.data.table', 'angular-md5', 'firebase'])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/app/game");
        $stateProvider
            .state("app", {
                url: "/app",
                templateUrl: "modules/start/start.html",
                controller: "startController",
                abstract: true,
            })
            .state("app.scoreboard", {
                url: "/scoreboard",
                templateUrl: "modules/scoreboard/scoreboard.html",
                controller: "scoreController",
            })
            .state("app.about", {
                url: "/almanac",
                templateUrl: "modules/about/about.html",
                controller: "aboutController",
            })
            .state("app.game", {
                url: "/game",
                templateUrl: "modules/game/game.html",
                controller: "gameController",
                abstract: true,
            })
            .state("app.game.dummy", {
                url: "",
                templateUrl: "modules/game/dummy.html",
                controller: "dummyController"
            })
            .state("app.game.copperKey", {
                url: "",
                templateUrl: "modules/game/copperKey.html",
                controller: "copperKeyController"
            })
            .state("app.game.firstGate", {
                url: "",
                templateUrl: "modules/game/firstGate.html",
                controller: "firstGateController"
            })
            .state("app.game.jadeKey", {
                url: "",
                templateUrl: "modules/game/jadeKey.html",
                controller: "jadeKeyController"
            })
            .state("app.game.secondGate", {
                url: "",
                templateUrl: "modules/game/secondGate.html",
                controller: "secondGateController"
            })
            .state("app.game.crystalKey", {
                url: "",
                templateUrl: "modules/game/crystalKey.html",
                controller: "crystalKeyController"
            })
            .state("app.game.thirdGate", {
                url: "",
                templateUrl: "modules/game/thirdGate.html",
                controller: "thirdGateController"
            })
            .state("app.game.credits", {
                url: "",
                templateUrl: "modules/game/credits.html",
                controller: "creditsController"
            })
            .state("app.game.bonusRoom", {
                url: "",
                templateUrl: "modules/game/credits.html",
                controller: "bonusRoomController"
            })
            .state("app.game.allRooms", {
                url: "fml",
                templateUrl: "modules/game/allRoom.html",
                controller: "allRoomController"
            });

    }]).directive('autofocus', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                });
            }
        }
    }]);
