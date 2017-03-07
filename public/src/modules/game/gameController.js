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
            name: "allRooms",
            state: "app.game.allRooms",
            number: 11
        }];

        $scope.gotoLevelPlayer = function(player) {
            mainFactory.login(player)
                .then(function(data, error) {
                    $scope.userLevel = data.data.level;
                    if ($scope.userLevel < 11)
                        $state.go($scope.levels[$scope.userLevel].state);
                    else
                        $state.go("app.game.allRooms");
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
    .controller("dummyController", ["$scope", "mainFactory", "$localStorage", "$mdDialog", "$rootScope", function($scope, mainFactory, $localStorage, $mdDialog, $rootScope) {
        $rootScope.title = "Level 0";
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
    .controller("copperKeyController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
        $rootScope.title = "Copper Key";
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
    .controller("firstGateController", ["$scope", "mainFactory", "$localStorage", "GameLogic", "AiLogic", "$timeout", "$rootScope", function($scope, mainFactory, $localStorage, GameLogic, AiLogic, $timeout, $rootScope) {
        $scope.gotoLevel(2);
        $rootScope.title = "First Gate"
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
    .controller("jadeKeyController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
        $rootScope.title = "Jade Key";
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
    .controller("secondGateController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
        $rootScope.title = "Second Gate";
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
    .controller("crystalKeyController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
        $rootScope.title = "Crystal Key";
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
    }]).controller("thirdGateController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
        $rootScope.title = "Third Gate";
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
    }]).controller("allRoomController", ["$scope", "mainFactory", "$localStorage", "$rootScope", "$state", function($scope, mainFactory, $localStorage, $rootScope, $state) {
        $scope.level = "";
        $rootScope.title = "Obscura " + $scope.level;
        $scope.lines = [];
        $scope.image = null;
        $scope.return = {};
        $scope.getLevel = function() {
            mainFactory.getLevel($localStorage.guntUser)
                .then(function(data) {
                    $scope.isEndMarker = data.data.isEndMarker;
                    $scope.level = data.data.level;
                    $rootScope.title = "Obscura " + $scope.level;
                    if ($scope.level == 14) {
                        $scope.lines = [];
                        $scope.showMessage("Err0r", data.data.text);
                    } else if (data.data.final) {
                        $state.go("app.game.final");
                    } else
                        $scope.lines = data.data.text.split('$');
                    if (data.data.image)
                        $scope.image = data.data.image;
                    else
                        $scope.image = null;
                    console.log($scope.lines);
                }).catch(function(error) {
                    $scope.showMessage("Error", "This level does not exist yet");
                });
        }
        $scope.getLevel();
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    if (data.data.code == 0) {
                        $scope.showMessage("Excellent", "You have completed the level");
                        $scope.getLevel();
                        $scope.answer = "";
                    } else {
                        $scope.showMessage("I'm sorry", "Please try again");
                    }
                }).catch(function(error) {
                    console.log(error);
                    $scope.showError(error);
                });
        }
    }]).controller("finalController", ["$scope", "mainFactory", "$localStorage", "$rootScope", function($scope, mainFactory, $localStorage, $rootScope) {
        $scope.level = "";
        $scope.gameText = [];
        $rootScope.title = "Final Level";
        // $scope.character = { 'inventory': ['trophy'], 'location': 'centre room' };
        $scope.character = { 'inventory': [], 'location': 'west room' };
        var boxes = {
            'silver box': {
                'contents': 'gold key',
                'opens_with': 'silver key'
            },

            'copper box': {
                'contents': 'silver key',
                'opens_with': 'copper key'
            },

            'gold box': {
                'contents': 'wooden key',
                'opens_with': 'gold key'
            },

            'platinum box': {
                'contents': 'trophy',
                'opens_with': 'platinum key'
            }
        }
        var dungeon = {
            'north room': {
                'short_description': 'north room',
                'long_description': 'a dimly room littered with skulls, there is a wooden door to the east, looks sturdy.',
                'contents': ['silver box'],
                'exits': { 'east': 'treasure room', 'south': 'centre room' }
            },
            'south room': {
                'short_description': 'south room',
                'long_description': 'a damp musty smelling room. A small window overlooks a cliff',
                'contents': ['gold box'],
                'exits': { 'north': 'centre room' }
            },
            'west room': {
                'short_description': 'west room',
                'long_description': 'the west end of a sloping east-west passage of barren rock',
                'contents': ['platinum key'],
                'exits': { 'east': 'centre room' }
            },
            'east room': {
                'short_description': 'east room',
                'long_description': 'a room of finished stone with high arched ceiling and soaring columns',
                'contents': ['copper box'],
                'exits': { 'west': 'centre room' }
            },
            'centre room': {
                'short_description': 'centre room',
                'long_description': 'the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
                'contents': ['copper key'],
                'exits': { 'east': 'east room', 'west': 'west room', 'north': 'north room', 'south': 'south room' }
            },
            'treasure room': {
                'short_description': 'treasure room',
                'long_description': 'a room filled with treasures of all kinds imaginable',
                'contents': ['platinum box'],
                'exits': { 'west': 'north room' }
            }
        };
        var room, command, verb, obj;
        $scope.doCommand = function(command) {
            $scope.gameText.push(".");
            $scope.command = "";


            function print(line) {
                if (line)
                    $scope.gameText = $scope.gameText.concat(line.split('$'));
            }

            function command_split(str) {
                var parts = str.split(/\s+/); // splits string into an array of words, taking out all whitespace
                var command = parts.shift(); // command is the first word in the array, which is removed from the array
                var object = parts.join(' '); // the rest of the words joined together.  If there are no other words, this will be an empty string
                return [command, object];
            }


            function has(item) {
                return $scope.character.inventory.indexOf(item) > -1;
            }

            function remove(array, item) {
                var idx = array.indexOf(item);
                if (idx > -1) {
                    array.splice(idx, 1);
                }
            }

            function tryToMove(room, direction) {
                if (room.exits[direction]) {
                    if (room.short_description == 'north room' && direction == 'east' && !has('wooden key')) {
                        print('The door is locked');
                    } else {
                        $scope.character.location = room.exits[direction];
                        room = dungeon[$scope.character.location];
                        describe(room);
                    }
                } else {
                    print('You cannot go that way');
                }
            }

            function printInventory() {
                print('You are carrying:');
                $scope.character['inventory'].forEach(function(item) {
                    print(item);
                    print("\n");
                });
            }

            function describe(room) {
                if (!room.visited) {
                    print('you are in ' + room.long_description);
                } else {
                    room.visited = true;
                    print(room.short_description);
                }
                var exits = Object.keys(room.exits);
                if (exits.length > 1) {
                    var last_exit = exits.pop();
                    print('there are exits to the ' + exits.join(', ') + ' and ' + last_exit);
                } else {
                    print('there is an exit to the ' + exits[0]);
                }
                room['contents'].forEach(function(item) {
                    print('There is a ' + item + ' here');
                });
            }

            function tryToOpen(box) {
                if (room['contents']) {
                    room['contents'].slice().forEach(function(item) {
                        if (item.indexOf(box) > -1) { // does the word in obj match any part of the text of item?
                            if (boxes[item]) {
                                if (has(boxes[item]['opens_with'])) {
                                    print('The box contains : ');
                                    print(boxes[item]['contents']);
                                    $scope.character['inventory'].push(boxes[item]['contents']);
                                    remove($scope.character['inventory'], boxes[item]['opens_with']);
                                    remove(room['contents'], item);
                                    console.log(room);
                                    delete boxes[item]['contents'];
                                    print('Added to inventory');

                                } else {
                                    print('The box is locked');
                                }
                            } else
                                print('You can only open boxes');
                        } else {
                            print('There is no such item in the room');
                        }
                    });
                } else {
                    print('There is nothing to take!');
                }
            }

            room = dungeon[$scope.character['location']];
            command = command_split(command);
            verb = command[0];
            obj = command[1];
            if (['east', 'west', 'north', 'south', 'up', 'down', 'in', 'out	'].indexOf(verb) > -1) {
                tryToMove(room, verb);
            } else if (verb == 'open') {
                tryToOpen(obj);
            } else if (verb == 'put') {
                if (obj == 'trophy') {
                    if (has('trophy')) {
                        if ($scope.character.location == 'centre room') {
                            print('Thank you, you have completed the game');
                            mainFactory.checkAnswer($localStorage.guntUser, "f054bbd2f5ebab9cb5571000b2c50c02")
                                .then(function(data) {
                                    if (data.data.code == 0) {
                                        $scope.showMessage("Excellent", "You have completed the level");
                                        $scope.gotoLevel();
                                        $scope.answer = "";
                                    } else {}
                                }).catch(function(error) {
                                    console.log(error);
                                    $scope.showError(error);
                                });
                        } else {
                            print('There is nowhere to put the trophy');
                        }
                    } else {
                        print('You are not carrying a trophy');
                    }
                } else {
                    print('You can only put trophies');
                }
            } else if (verb == 'inventory') {
                console.log($scope.character);
                printInventory();
            } else if (verb == 'take') {
                room['contents'].slice().forEach(function(item) {
                    if (item.indexOf(obj) > -1) { // does the word in obj match any part of the text of item?
                        if (item.indexOf('box') == -1) {
                            print('You pick up the ' + item)
                            console.log($scope.character)
                            $scope.character['inventory'].push(item);
                            console.log($scope.character)
                            remove(room['contents'], item);
                        } else {
                            print('The box is too heavy');
                        }
                    }
                });
            } else if (verb == 'look') {
                describe(dungeon[$scope.character.location]);
            }
        }
        $scope.doCommand('look');
    }]).controller("creditsController", ["$scope", "mainFactory", "$localStorage", "md5", "$rootScope", function($scope, mainFactory, $localStorage, md5, $rootScope) {
        $rootScope.title = "Credits";
        $scope.checkAnswer = function(answer) {
            mainFactory.checkAnswer($localStorage.guntUser, answer)
                .then(function(data) {
                    // console.log(data.data);
                    if (data.data.code == 0) {
                        $scope.showMessage("Of course you do", "but you have completed the Game<- this was supposed to be the message, but apparently I don't have a say in it anymore, so the game continues");
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
            $rootScope.title = "Bonus Key";
            $scope.bonusMode = true;
            $scope.showMessage("All right", "One last round before the end");
        }
    }]);