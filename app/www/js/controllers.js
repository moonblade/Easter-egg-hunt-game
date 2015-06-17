angular.module('Gunt.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionic.material.ink.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();
})

.controller('TicTacToeCtrl', function($scope, GameLogic, AiLogic, $timeout) {
    $scope.board = null;
    $scope.announcement = null;

    $scope.opponent = 'AI';
    $scope.goesFirst = 'Me';
    $scope.opponentMark = 'o';
    $scope.playerMark = 'x';

    $scope.newGame = function() {
        $scope.announcement = null;
        $scope.gameEnded = false;
        $scope.board = GameLogic.newBoard();
        $scope.playerMark = ($scope.opponentMark === 'x') ? 'o' : 'x';
        if (($scope.goesFirst === 'Them') &&
            ($scope.opponent === 'human')) {
            var cache = $scope.playerMark;
            $scope.playerMark = $scope.opponentMark;
            $scope.opponentMark = cache;
        }
        if ($scope.opponent === 'AI') {
            AiLogic.me = $scope.opponentMark;
            AiLogic.them = $scope.playerMark;
        }
        if (($scope.goesFirst === 'Them') &&
            ($scope.opponent === 'AI')) {
            var openingMove = AiLogic.decideMove($scope.board);

            $scope.aiMove(openingMove);
        }
    };
    $scope.newGame();
    $scope.gameEnded = false;

    $scope.gameEnd = function(winner) {
        if (winner) {
            $scope.gameEnded = true;
            $scope.announcement = winner + ' wins!';
        } else {
            $scope.gameEnded = true;
            $scope.announcement = 'Nobody wins!';
        }

        $timeout(function() {
            $scope.board = null;
            $scope.newGame();
        }, 1000);
    };

    $scope.aiMove = function(where) {

        var row = where.row,
            col = where.column;

        $scope.board[row][col].space = $scope.opponentMark;
    };

    $scope.userMove = function(where) {
        var rowIndex = where.row,
            colIndex = where.column,
            winner,
            space = $scope.board[rowIndex][colIndex].space;

        if ((space === '') && (!$scope.gameEnded)) {
            $scope.board[rowIndex][colIndex].space = $scope.playerMark;
            winner = GameLogic.won($scope.board);
            if (winner) {
                $scope.gameEnd(winner);
            } else {
                if (GameLogic.draw($scope.board)) {
                    $scope.gameEnd();
                } else {
                    if ($scope.opponent === 'AI') {
                        var response = AiLogic.decideMove($scope.board);
                        $scope.aiMove(response);
                        winner = GameLogic.won($scope.board);
                        if (winner) {
                            $scope.gameEnd(winner);
                        } else {
                            if (GameLogic.draw($scope.board)) {
                                $scope.gameEnd();
                            }
                        }
                    } else {
                        var cache = $scope.playerMark;
                        $scope.playerMark = $scope.opponentMark;
                        $scope.opponentMark = cache;
                    }
                }
            }
        }
    };

    $scope.isLast = function(check) {
        return check ? 'last' : null;
    };
});
