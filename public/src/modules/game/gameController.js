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
    }]).controller("finalController", ["$scope", "mainFactory", "$localStorage", "$rootScope", "$window", "$anchorScroll", "$location", function($scope, mainFactory, $localStorage, $rootScope, $window, $anchorScroll, $location) {
        $scope.level = "";
        $location.hash('bottom');
        $scope.gameText = [];
        $rootScope.title = "Final Level";
        var unlocked = false;
        var unlockedDoors = [];
        var killedEnemy = "";
        var character = { 'inventory': [], 'location': 'west room' };
        var boxes = {
            'silver box': {
                'contents': 'gold key',
                'opens_with': 'silver key',
                'heavy': true
            },

            'copper box': {
                'contents': 'silver key',
                'opens_with': 'copper key',
                'heavy': true
            },

            'gold box': {
                'contents': 'wooden key',
                'opens_with': 'gold key',
                'heavy': true
            },

            'platinum box': {
                'contents': 'sword',
                'opens_with': 'platinum key',
                'heavy': true
            },

            'ivory box': {
                'contents': 'stone key',
                'opens_with': 'ivory key',
                'heavy': true
            },

            'decaying box': {
                'contents': 'stick',
                'opens_with': 'decaying key',
                'heavy': true
            }
        }
        var dungeon = {
            'north room': {
                'short_description': 'north room',
                'long_description': 'a dimly room littered with skulls. It has an eerie quiteness about it, the sound of death',
                'contents': ['silver box', 'bottle'],
                'lockedDoors': { 'east': 'wooden', 'west': 'iron' },
                'exits': { 'east': 'treasure room', 'south': 'centre room', 'west': 'cell' }
            },
            'cell': {
                'short_description': 'cell',
                'long_description': 'a cell block filled with the pungent smell of decay and rot. there is moss growing on one corner of the cell',
                'exits': { 'east': 'north room' },
                'contents': [],
                'enemies': {
                    'snake': {
                        'desc': 'a nasty looking cobra with its hood raised poised to strike, It looks like it had a recent meal',
                        'weakness': 'sword',
                        'death': 'You tried to attack the snake by going around it and grabbing its tail, but in one swift move, it bit you, and you\'re dead',
                        'defeat': 'With a mighty swing of the sword you cut off the head of the snake, killing it instantly'
                    }
                }
            },
            'south room': {
                'short_description': 'south room',
                'long_description': 'a damp musty smelling room. A small window overlooks a cliff where faint sounds of waves crashing can be heard',
                'contents': ['gold box', 'ivory key'],
                'lockedDoors': { 'west': 'granite' },
                'exits': { 'north': 'centre room', 'west': 'burning room' }
            },
            'west room': {
                'short_description': 'west room',
                'long_description': 'the west end of a sloping east-west passage of barren rock',
                'contents': ['platinum key', 'water'],
                'exits': { 'east': 'centre room' }
            },
            'east room': {
                'short_description': 'east room',
                'long_description': 'a room of finished stone with high arched ceiling and soaring columns',
                'contents': ['copper box'],
                'lockedDoors': { 'south': 'stone' },
                'exits': { 'west': 'centre room', 'south': 'cavern' },
                'enemies': {
                    'scorpion': {
                        'desc': 'a poisonous scorpion rearing its tail',
                        'weakness': 'sword',
                        'reward': 'granite key',
                        'death': 'You tried to attack the scorpion with your bare hands, but it was faster than you anticipated and struck you with its poisonous tail',
                        'defeat': 'You quickly sidestep the scorpion and swing your sword, it takes off its tail, You swing again and split the scorpion in two.'
                    }
                }
            },
            'centre room': {
                'short_description': 'centre room',
                'long_description': 'the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
                'contents': ['copper key'],
                'exits': { 'east': 'east room', 'west': 'west room', 'north': 'north room', 'south': 'south room' }
            },
            'treasure room': {
                'short_description': 'treasure room',
                'long_description': 'a room filled with treasures of all kinds imaginable, there are mounds of glittering gold and shining diamonds in a huge pile',
                'contents': ['platinum box', 'decaying box'],
                'exits': { 'west': 'north room' }
            },
            'cavern': {
                'short_description': 'cavern',
                'long_description': 'a small cavern, theres barely enough room to stand, on the wall there is a drawing of a man hunting a dear and another roasting it',
                'contents': [],
                'exits': { 'north': 'east room' },
                'enemies': {
                    'spider': {
                        'desc': 'a monstrous hairy spider',
                        'weakness': 'fire',
                        'reward': 'iron key',
                        'death': 'You tried to attack the spider with the sword, but it jumped up, and grabbed you in its web, it cocooned you in and is having you for dinner, you are dead',
                        'defeat': 'The spider shoots its web at you, but you burn the webs, you set fire to the spiders hairy body, it goes up in flames'
                    }
                }
            },
            'burning room': {
                'short_description': 'burning room',
                'long_description': 'a room with granite slabs for floors and ceiling, the room is really hot, you can barely stand on the floor',
                'contents': ['decaying key'],
                'enemies': {
                    'fire': {
                        'desc': 'a roaring fire in the middle of the room, its flame nearly licking the surface',
                        'weakness': 'water',
                        'death': 'You tried to stomp out a seven feet tall fire, it quickly consumes you in fiery agony, you scream and die',
                        'defeat': 'You take your bottle, and with the luck of the gods, it had enough water to just stop the fire'
                    }
                },
                'exits': { 'east': 'south room' }

            }
        };
        var room, command, verb, obj, savedText = [];
        $scope.doCommand = function(command) {
            print(command);
            $scope.command = "";



            function print(line) {
                savedText = savedText.concat(line.split("$"));
                if (line == '.') {
                    $scope.gameText = savedText.concat($scope.gameText);
                    savedText = [];
                }
            }

            function addInventory(item) {
                if (has(item)) {
                    print(item + ' already in inventory');
                    return;
                }
                character.inventory.push(item);
                print(item + ' added to inventory');
            }

            function removeInventory(item) {
                remove(character.inventory, item);
            }

            function command_split(str) {
                var parts = str.split(/\s+/); // splits string into an array of words, taking out all whitespace
                var command = parts.shift(); // command is the first word in the array, which is removed from the array
                var object = parts.join(' '); // the rest of the words joined together.  If there are no other words, this will be an empty string
                return [command, object];
            }


            function has(item) {
                for (var i = 0; i < character.inventory.length; i++) {
                    var itemFullName = character.inventory[i];
                    // console.log(itemFullName)
                    // console.log(item)
                    // console.log(itemFullName.indexOf(item))
                    if (itemFullName.indexOf(item) > -1) {
                        // console.log("returning", true)
                        return true;
                    }
                }
                return false;
            }

            function remove(array, item) {
                var idx = array.indexOf(item);
                if (idx > -1) {
                    array.splice(idx, 1);
                }
            }

            function unlock(room) {
                // check if empyt
                hasLockedDoors = !(JSON.stringify(room.lockedDoors) == JSON.stringify({}));
                if (room.lockedDoors && hasLockedDoors) {
                    unlocked = false;
                    unlockedDoors = [];
                    for (var key in room.lockedDoors) {
                        if (has(room.lockedDoors[key] + ' key')) {
                            print('Unlocked ' + room.lockedDoors[key] + ' door');
                            unlocked = true;
                            unlockedDoors.push(key);
                            remove(character.inventory, room.lockedDoors[key] + ' key')
                        }
                    }
                    if (!unlocked)
                        print('Could not unlock any doors');
                    else {
                        unlockedDoors.forEach(function(x) {
                            delete(room.lockedDoors[x]);
                        });
                    }
                } else {
                    print("No locked doors in room")
                }
            }

            function attack(room, enemy) {
                killedEnemy = "";
                if (room.enemies && (room.enemies[enemy] || (enemy == 'box' && room.enemies['red glowing box']))) {
                    if ((enemy == 'box' && room.enemies['red glowing box']))
                        enemy = 'red glowing box';
                    if (has(room.enemies[enemy].weakness)) {
                        killedEnemy = enemy;
                        print(room.enemies[enemy].defeat);
                        if (room.enemies[enemy].reward) {
                            print('The ' + enemy + ' dropped ' + room.enemies[enemy].reward);
                            addInventory(room.enemies[enemy].reward);
                        }

                        if (enemy == 'fire') {
                            print('The fire is out you see a red glowing box inside the embers')
                            removeInventory('water');
                            room.enemies['red glowing box'] = {
                                'desc': 'sitting in the embers',
                                'weakness': 'water',
                                'death': 'Ignoring the crackle from the box, you tried to open the box, but forgot that it was inside a roaring fire, it sizzled your palms off, you can do nothing but scream in agony. you die',
                                'defeat': 'you pour water on top of the box, it sizzles and fries and finally cools down'
                            }
                        } else if (enemy == 'red glowing box') {
                            removeInventory('water');
                            room.contents.push('ivory box');
                        } else {
                            room.contents.push(enemy + ' carcass');
                        }
                    } else {
                        print(room.enemies[enemy].death);
                        print('Restarting game');
                        $window.location.reload();
                    }
                } else {
                    print('No ' + (enemy || 'enemy') + ' in room (try different name)');
                }
                if (killedEnemy != "")
                    delete(room.enemies[killedEnemy]);
            }

            function tryToMove(room, direction) {
                if (room.exits[direction]) {
                    if (room.lockedDoors && room.lockedDoors[direction]) {
                        print('The door is locked');
                    } else {
                        character.location = room.exits[direction];
                        room = dungeon[character.location];
                        describe(room);
                    }
                } else {
                    print('You cannot go that way');
                }
            }

            function printInventory() {
                // console.log(character.inventory)
                print('You are carrying:');
                character['inventory'].forEach(function(item) {
                    print(item);
                    print("\n");
                });
            }

            function describe(room) {
                print(room.short_description);
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
                if (room.lockedDoors) {
                    var lockedDoors = Object.keys(room.lockedDoors);
                    lockedDoors.forEach(function(key) {
                        print('The ' + key + ' exit is blocked by a ' + room.lockedDoors[key] + ' door');
                    })
                }
                if (room.enemies) {
                    for (var key in room.enemies) {
                        print('There is a ' + key + ' here. ' + room.enemies[key].desc);
                    }
                }
                room['contents'].forEach(function(item) {
                    print('There is a ' + item + ' here');
                });
            }

            function isItA(item, smallItem) {
                return item.indexOf(smallItem) > -1;
            }

            function take(room, obj) {
                if (room.enemies && room.enemies[obj] && obj == 'fire') {
                    if (has('stick')) {
                        print('You light your stick on fire, and keep it with you');
                        removeInventory('stick');
                        addInventory('fire');
                    } else {
                        print('You tried to cup the fire in your hands, severely burned, you writhe in agony for a few minutes before dying');
                        $window.location.reload();
                    }
                } else if (obj == 'box' && room.enemies && room.enemies['red glowing box']) {
                    attack(room, 'red glowing box');
                }
                room['contents'].slice().forEach(function(item) {
                    if (isItA(item, obj)) { // does the word in obj match any part of the text of item?
                        // console.log(isItA(item, 'carcass'));
                        if (isItA(item, 'carcass')) {
                            print('You cannot pick up ' + item);
                        } else if (isItA(item, 'box')) {
                            if (boxes[item] && boxes[item].heavy) {
                                print('The box is too heavy');
                            } else {
                                addInventory(item);
                            }
                        } else if (isItA(item, 'water')) {
                            if (has('bottle')) {
                                print('You fill your bottle with ' + item)
                                addInventory(item);
                            } else
                                print('You have no container to take water with');
                        } else {
                            print('You pick up the ' + item)
                            addInventory(item);
                            remove(room['contents'], item);
                        }
                    }
                });
            }

            function tryToOpen(box, room) {
                switch (box) {
                    case 'box':
                        if (room.enemies && room.enemies['red glowing box']) {
                            attack(room, 'red glowing box');
                        } else if (room['contents']) {
                            room['contents'].slice().forEach(function(item) {
                                if (item.indexOf(box) > -1) { // does the word in obj match any part of the text of item?
                                    if (boxes[item]) {
                                        // console.log(boxes[item]);
                                        // console.log(has(boxes[item]));
                                        if (has(boxes[item]['opens_with'])) {
                                            print('The box contains : ');
                                            print(boxes[item]['contents']);
                                            addInventory(boxes[item]['contents'])
                                            removeInventory(boxes[item]['opens_with']);
                                            remove(room['contents'], item);
                                            delete boxes[item]['contents'];
                                        } else {
                                            print('The box is locked, you do not have the key');
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
                        break;
                    case 'door':
                        unlock(room);
                        break;
                    case 'snake':
                    case 'cobra':
                    case 'snake carcass':
                        if (room.contents.indexOf('snake carcass') > -1) {
                            if (has('sword')) {
                                {
                                    if (has('trophy')) {
                                        print('The snake is already cut open');
                                    } else {
                                        print('You carefully cut open the snake with your sword, and in its belly you find a trophy');
                                        addInventory('trophy');
                                    }
                                }
                            } else {
                                print('You got poisoned by the ' + box);
                            }
                        } else {
                            'cannot open' + box;
                        }
                        break;
                    default:
                        print('cannot open ' + (box || 'nothing, specify what should be opened'))
                }
            }

            function put(room, obj) {
                if (has(obj)) {
                    switch (obj) {
                        case 'trophy':
                            if (character.location == 'centre room') {
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
                            } else
                                print('There is nowhere to put the trophy');
                            break;
                        case 'water':
                            if (room.enemies && room.enemies['fire'])
                                attack(room, 'fire');
                            else if (room.enemies && room.enemies['red glowing box'])
                                attack(room, 'red glowing box');
                            break;
                        default:
                            print('You cannot put ' + (obj || 'nothing'));
                    }
                } else {
                    print('You do not have ' + obj);
                }
            }
            room = dungeon[character['location']];
            command = command_split(command);
            verb = command[0];
            verb = verb.toLowerCase();
            obj = command[1];
            switch (verb) {
                case 'east':
                case 'west':
                case 'north':
                case 'south':
                    tryToMove(room, verb);
                    break;
                case 'unlock':
                case 'open':
                    tryToOpen(obj, room);
                    break;
                case 'attack':
                case 'kill':
                    attack(room, obj);
                    break;
                case 'put':
                case 'place':
                case 'pour':
                    put(room, obj);
                    break;
                case 'inventory':
                case 'inv':
                    printInventory();
                    break;
                case 'take':
                case 'pick':
                case 'fill':
                    take(room, obj);
                    break;
                case 'look':
                case 'info':
                    describe(dungeon[character.location]);
                    break;
                case 'clear':
                    $scope.gameText = [];
                    break;
                default:
                    print('Unknown command');
            }
            $anchorScroll();
            print('.');
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