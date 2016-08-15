angular.module("gunt", ["ngMaterial", "ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/start");
        $stateProvider
            .state("start", {
                url: "/start",
                abstract:true,
                templateUrl: "modules/start/start.html",
                controller: "startController"
            });
    });
