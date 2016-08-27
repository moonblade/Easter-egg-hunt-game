var serverUrl = "dummy";
angular.module("gunt", ["ngMaterial", "ui.router", 'googleplus', 'ngStorage', 'md.data.table', 'angular-md5'])
    .config(["$stateProvider", "$urlRouterProvider", "GooglePlusProvider", function($stateProvider, $urlRouterProvider, GooglePlusProvider) {
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
            });

        GooglePlusProvider.init({
            clientId: '244830570730-3e20m76uc4q9pnkkusljpmq6qnur472d.apps.googleusercontent.com',
            apiKey: 'AIzaSyD98IUTYTnag2GoQsINaujL7kfLQxh76H4'
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
