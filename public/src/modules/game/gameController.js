angular.module("gunt")
    .controller("gameController", ["$scope", "mainFactory", "$localStorage", "$state", "$mdDialog", function($scope, mainFactory, $localStorage, $state, $mdDialog) {
        $scope.userLevel = 0;
        $scope.levels = [{
            name: "dummy",
            state: "app.game.dummy",
            number: 0
        }, {
            name: "copperKey",
            state: "app.game.copperKey",
            number: 1
        }, {
            name: "firstGate",
            state: "app.game.firstGate",
            number: 2
        }, {
            name: "jadeKey",
            state: "app.game.jadeKey",
            number: 3
        }, {
            name: "secondGate",
            state: "app.game.secondGate",
            number: 4
        }, {
            name: "crystalKey",
            state: "app.game.crystalKey",
            number: 5
        }, {
            name: "crystalKey",
            state: "app.game.crystalKey",
            number: 6
        }, {
            name: "crystalKey",
            state: "app.game.crystalKey",
            number: 7
        }, {
            name: "crystalKey",
            state: "app.game.crystalKey",
            number: 8
        }, {
            name: "thirdGate",
            state: "app.game.thirdGate",
            number: 9
        }, {
            name: "credits",
            state: "app.game.credits",
            number: 10
        }, {
            name: "credits",
            state: "app.game.credits",
            number: 11
        }];

        $scope.gotoLevelPlayer = function(player) {
            mainFactory.login(player)
                .then(function(data, error) {
                    $scope.userLevel = data.data.level;
                    $state.go($scope.levels[$scope.userLevel].state);
                }).catch(function(error) {
                    $scope.showMessage("Login", "Please login to continue");
                    console.log(error); // 
                    $scope.showError(error);
                });
        }

        $scope.gotoLevel = function(level) {
            if ($localStorage.guntUser && ((!level || level != $scope.userLevel) && $scope.userLevel < 10)) {
                $scope.gotoLevelPlayer($localStorage.guntUser);
            }
        }

        $scope.gotoLevel();
    }])
    .controller("dummyController", ["$scope", "mainFactory", "$localStorage", "$mdDialog", function($scope, mainFactory, $localStorage, $mdDialog) {
        if ('showDummy' in $localStorage && $localStorage.showDummy != null)
            $scope.showDummy = $localStorage.showDummy;
        else
            $scope.showDummy = true;
        $scope.gotoLevel(0);
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have proved your worth");
                        $localStorage.showDummy = false;
                        $scope.gotoLevel();
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Error")
                        .textContent(error.data.error.message + ", Please login with a valid account")
                        .ok('Okay')
                    );
                });
        }
    }])
    .controller("copperKeyController", ["$scope", "mainFactory", "$localStorage", function($scope, mainFactory, $localStorage) {
        $scope.gotoLevel(1);
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have unlocked the first gate");
                        $scope.gotoLevel();
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }

    }])
    .controller("firstGateController", ["$scope", "mainFactory", "$localStorage", "GameLogic", "AiLogic", "$timeout", function($scope, mainFactory, $localStorage, GameLogic, AiLogic, $timeout) {
        $scope.gotoLevel(2);
        $scope.digit = '';
        $scope.flipBoard = $localStorage.flipBoardState ? $localStorage.flipBoardState : true;
        $scope.opponent = 'AI';
        $scope.goesFirst = 'Me';
        $scope.opponentMark = 'x';
        $scope.playerMark = 'o';
        $scope.announcement = '';
        $scope.flipCommand = 'f';
        $scope.restartCommand = 'r';

        $scope.newGame = function() {
            $scope.announcement = '';
            $scope.gameEnded = false;
            $scope.board = GameLogic.newBoard();


            $scope.playerMark = ($scope.opponentMark === 'x') ? 'o' : 'x';

            if (($scope.goesFirst === 'Them') && ($scope.opponent === 'human')) {
                var cache = $scope.playerMark;
                $scope.playerMark = $scope.opponentMark;
                $scope.opponentMark = cache;
            }

            if ($scope.opponent === 'AI') {
                AiLogic.me = $scope.opponentMark;
                AiLogic.them = $scope.playerMark;
            }
            if (($scope.goesFirst === 'Them') && ($scope.opponent === 'AI')) {
                var openingMove = AiLogic.decideMove($scope.board);
                $scope.aiMove(openingMove);
            }
        };
        $scope.gameEnded = false;

        $scope.gameEnd = function(winner) {
            if (winner) {
                $scope.gameEnded = true;
                $scope.announcement = 'You Lose!';
            } else {
                $scope.gameEnded = true;
                $scope.announcement = 'Draw!';
            }

            $timeout(function() {
                $scope.newGame();
            }, 2000);
        };

        $scope.changeCursor = function() {
            $timeout(function() {
                $scope.cursor = $scope.cursor == '_' ? '' : '_';
                $scope.changeCursor();
            }, 500);
        }
        $scope.changeCursor();

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

            if ((space === ' ') && (!$scope.gameEnded)) {
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

        $scope.move = function(digit) {
            mainFactory.checkAnswer($localStorage.guntUser, digit)
                .then(function(data) {
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have cleared the first gate");
                        $scope.gotoLevel();
                    } else {
                        if (digit != ' ' && !isNaN(digit) && digit <= 9 && digit >= 1) {
                            digit -= 1;
                            if ($scope.flipBoard)
                                $scope.userMove($scope.board[2 - Math.floor(digit / 3)][digit % 3].position);
                            else
                                $scope.userMove($scope.board[Math.floor(digit / 3)][digit % 3].position);
                            $scope.digit = '';
                        } else if (digit == $scope.flipCommand) {
                            $scope.flipBoard = !$scope.flipBoard;
                            $scope.digit = '';
                            $localStorage.flipBoardState = $scope.flipBoard;
                        } else if (digit == $scope.restartCommand) {
                            $scope.newGame();
                        } else {
                            $scope.announcement = "Please use valid controls";
                            $timeout(function() {
                                $scope.announcement = '';
                                $scope.digit = '';
                            }, 1000);
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }

        $scope.keydown = function($event) {
            // console.log($event);
            if ($event.keyCode == 8) {
                $scope.digit = $scope.digit.substr(0, $scope.digit.length - 1);
            }
        }
        $scope.keypress = function($event) {
            // console.log($event)
            if ($event.keyCode == 13) {
                // Enter pressed
                $scope.move($scope.digit);
            } else if ($event.charCode != 0) {
                $scope.digit = $scope.digit + $event.key;
            }
            // else
            // console.log($event)
        }

        $scope.isLast = function(check) {
            return check ? 'last' : null;
        };
        $scope.newGame();

        // TODO hack for opening keyboard in android
    }])
    .controller("jadeKeyController", ["$scope", "mainFactory", "$localStorage", function($scope, mainFactory, $localStorage) {
        $scope.gotoLevel(3);
        donothing = function(text) {

        }
        $scope.clue = "Seriously? you even check the js part of this for a clue? Man you're good, All right Here you go, I'll give you a pointer to more clues, there are many clues in the almanac, one from the first letters of the bullet points, one in its metadata, another can be obtained by reading the pdf as a text file, yet another is hidden in white text as morse code.";
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have unlocked the second gate");
                        $scope.gotoLevel();
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }
    }])
    .controller("secondGateController", ["$scope", "mainFactory", "$localStorage", function($scope, mainFactory, $localStorage) {
        $scope.gotoLevel(4);
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have completed the second gate");
                        $scope.gotoLevel();
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }
    }])
    .controller("crystalKeyController", ["$scope", "mainFactory", "$localStorage", function($scope, mainFactory, $localStorage) {
        $scope.answers = [null, null, null];
        $scope.answerCodes = [false, false, false];
        $scope.crystalKeyOne = {
            top: "PFEESESNRETMPFHA",
            right: "IRWEOOIGMEENNRMA",
            bottom: "AAIISNCDSAHSTENE", //reversed
            left: "IDOLELBFKNRBREEI", //reversed
        }
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.gotoLevel();
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }

        $scope.isRight = function(answerCode, number) {
            return (answerCode & number) != 0;
        }
        $scope.checkAnswerThree = function(answers) {
            mainFactory.checkAnswer($localStorage.guntUser, answers)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 7) {
                        $scope.showMessage("Excellent", "You have unlocked the third gate");
                        $scope.gotoLevel();
                    } else if (data.data.code == 0) {
                        $scope.showMessage("I'm sorry", "Please try again");
                    } else {
                        $scope.answerCodes[0] = ((data.data.code & 1) != 0);
                        $scope.answerCodes[1] = ((data.data.code & 2) != 0);
                        $scope.answerCodes[2] = ((data.data.code & 4) != 0);
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }
    }]).controller("thirdGateController", ["$scope", "mainFactory", "$localStorage", function($scope, mainFactory, $localStorage) {
        $scope.gotoLevel(9);
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have completed the third gate");
                        $scope.gotoLevel();
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }
    }]).controller("creditsController", ["$scope", "mainFactory", "$localStorage", "md5", function($scope, mainFactory, $localStorage, md5) {
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Of course you do", "but you have completed the Game");
                        $scope.gotoLevel();
                        $scope.userLevel = 11;
                        $scope.bonusMode = null;
                    } else {
                        if (md5.createHash(answer) == "8a30d24f059c3104d4e79c1d4e039997")
                            $scope.showMessage("Who", "Remember puns?");
                        else
                            $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }
        $scope.flipCredit = function() {
            if ($scope.userLevel && $scope.userLevel >= 11)
                return;
            $scope.bonusMode = true;
            $scope.showMessage("All right", "One last round before the end");
        }
    }]);
