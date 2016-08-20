var serverUrl = "dummy";
angular.module("gunt", ["ngMaterial", "ui.router", 'googleplus', 'ngStorage'])
    .config(["$stateProvider", "$urlRouterProvider", "GooglePlusProvider", function($stateProvider, $urlRouterProvider, GooglePlusProvider) {
            $urlRouterProvider.otherwise("/app/game/one");
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
                    url: "/dummy",
                    templateUrl: "modules/game/dummy.html",
                    controller: "dummyController"
                })
                .state("app.game.one", {
                    url: "/one",
                    templateUrl: "modules/game/one.html",
                    controller: "oneController"
                });
    
            GooglePlusProvider.init({
                clientId: '244830570730-3e20m76uc4q9pnkkusljpmq6qnur472d.apps.googleusercontent.com',
                apiKey: 'AIzaSyD98IUTYTnag2GoQsINaujL7kfLQxh76H4'
            });
        }]);
