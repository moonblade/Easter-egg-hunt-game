angular.module('Gunt.alpha', [])

.state('app.gateone', {
    url: '/gateone',
    views: {
        'menuContent': {
            templateUrl: 'modules/alpha/views/tictactoe.html',
            controller: 'TicTacToeCtrl'
        },
        'fabContent': {
            template: ''
        }
    }
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
})

;