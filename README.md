# Easter egg hunt - Inspired by Ready Player One

A [live version](https://dry-reaches-67526.herokuapp.com/) of the game is uploaded to heroku. Sign in and create an avatar to start playing.

---

This project marks some firsts. The first time I added test cases to any of my projects, and used any build pipelines to automate workflows. Its one of the few projects that I completed all the way. 

Years later, looking back on it. I can't help but be blown away by how much creativity is crammed into this project.

## Conception
Back in college, a friend, V, introduced me to the book Ready Player One by Earnest Cline. It deals with Easter eggs, creators of a game or software hiding little features for the end users to find. It tells the story of the protagonist finding a series of increasingly harder easter eggs, solving the puzzles it gives and finally ending victorious.

The true genius of the book was that, there was an easter egg hidden in it (I found this out much later), which led to a series of increasingly challenging games, setup by the author, the winner of which would receive an original Delorean. By the time I got to it, only the [first level](http://anoraksalmanac.com/gate1/stacks/) was still up. I played it till I eventually found the easter egg in that game, directing players to the second gate, which was no longer active. Here's a [hand drawn map](https://imgur.com/a/STRSH#9hsHyBh) I used when playing the game.

The book hooked me immediately, I was inspired by it to try and create something along the same vein. So I started brainstorming.  In the book, the hero had to find three keys, copper, jade and crystal, each of which opened a gate. A challenge awaiting the ones who opened the gate. So I decided the game would have three parts, each of which would be further divided into two, a key and a gate. The key level would helping to solve the gate level.

Before I'd even gotten as far as designing the levels, I got another friend, B, to photoshop some awesome looking gates for the game. Something that I never used in the end. Then again they were made by modifying the gate images Earnie Cline had commissioned of the easter egg hunt he'd made, so meh.

I had a few ideas floating around in my head on how to design the levels, initially I wanted the first level to be a sort of find the object game, where a picture of a room would be presented and user could click any objects on the image and if they were interactible, it would be picked up. But I quickly gave up on it due to lack of technical skills needed to implement it. I also wanted to add an almanac, a sort of guide, here originally functioning as the rule list, and eventually gaining more and more importance.

Fast forward a couple months later I had a semi coherent game fully envisioned in my mind but noone to play it. I thought I'd give it for the college festival as a challenge and front a ton of money to the winner. But I chickened out from that plan. Not having any other incentive to get this game from my mind into code, it stayed in a lull for more than a year.

I randomly ran across the r/readyplayerone subreddit at this point, Since I knew I'd get some players here, I created [a post](https://www.reddit.com/r/readyplayerone/comments/4xpqsg/thank_you/) saying that I was making the game based on the book.

Lacking the technical skills, the levels had to be designed to take input as text without fanciful ui. But I still wanted it to feel like a game with nonetheless.

when the game was completed, I [put it up on reddit](https://www.reddit.com/r/readyplayerone/comments/4zu9hv/easter_egg_hunt_game_based_on_ready_player_one/). The reception was pretty good. But me being impatient ended up giving a lot of clues and hastening the end of the game, instead of letting it run for a longer duration.

The game came around with a second lease on its life when the college fest was fast approaching, and a typical treasure hunt was still not available. So I figured I'd dust off this project and use it a second time. The treasure hunts typically last for two three weeks. Again, due to my impatience, I ended up giving a ton of clues and someone cleared the final level in three days. This was unacceptable to the big wigs, So I ended up writing some extra uninspired levels, which was a bunch of text, which when solved would give a text to input. Since this was easy to implement, I could crank out new levels without having to update the code.

But this felt extremely uninspiring to me, and I couldn't let this stand. So to break it up, while the game was active, and the top player was four or so levels from the new final level, I conceived of a better ending to the game. A text adventure (the improved version of which can be [seen here](https://moonblade.github.io/textAdventure)). In this a player would experience his surrounding as a text description. Could move around by typing commands like 'go north', 'go east' etc. The game created with mostly spaggetti code featured dungeon exploring, monster killing, puzzle solving and item crafting. Cramming all of that into a short game within a couple days took some doing. But I got it up just in time.

This iteration of the game received a lot of praise since the players were expecting a typical treasure hunt type game, getting something different was refreshing.

---

*SPOILER ALERT*: If you plan to play the game, reading further will spoil elements from the game.

---

## The levels

### Level 0

The players are greeted with a simple question. To prove their worth. This level was added at the end of the process so that the no of people in the scoreboard would be thinned out from the outset.

![Level 0](https://i.ibb.co/XypkqbF/image.png)

In the book, the hero finds the first clue by noticing that in the thick almanac volume, a few letters had notches cut out of them, almost unnoticable, he initially dismisses it as a printer issue, before finally understanding that it was indeed a clue.

![Sample notched letter in almanac](https://i.ibb.co/hVQRFQP/image.png)

The [almanac](https://github.com/moonblade/gunt/blob/master/public/Almanac.pdf) provides has a bunch of such letters, which together spelt the word `ignition` which is the answer to the level.

![Completed level 0](https://i.ibb.co/RyP4dJg/image.png)

### Level 1 - The Copper Key

![Copper key](https://i.postimg.cc/h4pq5cBQ/image.png)

In the book, preceding the first key, the hero had to sovle a rhyme to get the location of the first key. I liked this idea and kept playing with it. Tweaking the initial rhyme a lot, finally hitting upon the final version.

`Beneath these words the copper key awaits`

Taking the words literally, an observant player might notice that there is a little bit more space between the first and second lines than the second and third. But its easily missed. On selecting the text however, Its much clearer.

![image.png](https://i.postimg.cc/cH18d05t/image.png)

Another line hidden in tiny white letters. Pasting this into a notepad gives the following.

```
Beneath these words the copper key awaits
22 00 61 48 01 12 40 62
An invincible foe beyond the gates
A Roman general known for his might
An eight bit word to help win the fight
```

`An eight bit word to help win the fight`

So `22 00 61 48 01 12 40 62` would be the key, once decoded, and would possibly be an eight letter word. So how does one go about decoding it? This doesn't seem to be letters, since there are numbers above 26 here.

`A roman general known for his might`

Julius Caeser, arguably the most famous roman general, has a couple of encryption techniques associated with him. The caeser shift cipher and the caeser box cipher.

In the box cipher, the letters are written in a square box left to and then read top to bottom. The key in a box would become

```
2200
6148
0112
4062
```

And when read top down `26 04 21 10 04 16 08 22`, These are definitely letters, namely `ZDUJDPHV`. Okay that doesn't seem to make much sense. But wait, caeser had one more cipher attributed to him. The shift cipher, in which the each letter was shifted by some amount to get a new letter.

Shifting the letters thrice to the left gives the copper key.

`WARGAMES`

A 1983 Sci-Fi movie that was referenced in the book. Entering this, solves the level.

But what about `An invincible foe beyond the gates`?

### Level 2 - The Copper Gate

A terminal window is shown where a game of tic tac toe has been started.

![image.png](https://i.postimg.cc/028x4yj7/image.png)

I didn't want all the levels to be boring text entry, so coming up with this level was fun. A playable version of tic tac toe, where the user inputs the numbers 1-9 to pick a cell, and the computer picks a different one. The objective is to win the game. Any input other than f, r or 0-9 gives an invalid input message and the game continues.

Remember the warning from the copper key, `An invincible foe beyond the gates`. The game has a perfect AI, ie the game is unwinnable, you can draw or you can lose. There is no way to win against this. The player is stuck.

![image.png](https://i.postimg.cc/JzvfRrr6/image.png)

The key is supposed to help with the gates, not hinder it. In the climax of the movie WarGames, an AI is set to destroy the world by starting a nuclear attack. The protagonist averts this fate, by making the computer play tic tac toe against itself, by setting the number of players to 0. The computer eventually realizes the concept of futility and no win scenarios, and says "The only winning move is not to play".

In this particular instance, the number of players is set at 1, and cannout be changed. But if the player enters `theonlywinningmoveisnottoplay` the game is won and the gate is cleared.

![image.png](https://i.postimg.cc/T2jQwR97/image.png)

An easter egg here, the original computer used by the protagonist in the movie, is an IMSAI 8080 machine, which appears as the device name in this terminal. The username MB stands for moonblade.

### Level 3 - The Jade Key

![image.png](https://i.postimg.cc/RFShLQkn/image.png)

Looking back, I feel this was the weakest link in the game. I couldn't find anything to put as the jade key, that satisfied the constraints of the answer starting with a particular letter and it being helpful for the jade gate. So this is what I ended up with.

Its a straight up treasure hunt style google answer hunting from the text provided.

In the Lord of the Rings series, there is a creature known as the "watcher in the water". The heros encounter this monster when they are making their way to Moria. The west gate of Moria also known as the "Doors of Durin" stand in the way of the heros while they are attacked by the creature from behind. The door has inscription in elven that says "Speak friend and enter", but not giving a clue on what to speak. Realizing it literally meant to speak the word "friend" in elven, They speak "mellon" granting them entry and saving them from the monster.

In the lore of the Lord of the Rings, The Doors of Durin were created by a dwarf named `Narvi`. The watcher in the water could see from its position that the door was closed.

Entering `Narvi` unlocked the level.

### Level 4 - The Jade Gate

![image.png](https://i.postimg.cc/C564gKGm/image.png)

The doors of during stand in your way, and mellon isn't the answer.

Googling for a reference image to the doors of durin, the bottom inscription is noticeably different.

![image.png](https://i.postimg.cc/9XSTCs38/image.png)

In the elven script of "Tengwar", The inscription says 8121. Tengwar is written left to right, but Tengwar letters, curiously, are written right to left. So the numbers actually say 1218.

Googling for 1218 and the doors of durin leads you to an [xkcd comic](https://m.xkcd.com/1218/).

![doors of durin](https://imgs.xkcd.com/comics/doors_of_durin.png)

The solution to the level was `Mellogoth`

Ever since I read the comic, I knew that this would definitely be a level in the game I was making. But I had no clue how to get people there. Learning about the tengwar script, and some noob level photoshopping later, I had an image that I was proud of that isn't immediately noticeable to have been photoshopped.


## Almanac

In the book, the easter egg hunters are given a manual by the designer of the game, and the clue to the first key is hidden inside the Almanac. So to create a similar aesthetic, I added an Almanac for the game as well. 

Ostensibly a rule book, I crammed the almanac chock-full of easter eggs and the answer to the 0<sup>th</sup> level.

### Secrets of the almanac

[Here is a link to the almanac](https://github.com/moonblade/gunt/blob/master/public/Almanac.pdf)

