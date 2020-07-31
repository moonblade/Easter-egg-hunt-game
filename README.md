# Easter egg hunt - Inspired by Ready Player One

A [live version](https://dry-reaches-67526.herokuapp.com/) of the game is uploaded to heroku. Sign in and create an avatar to start playing.

---

This project marks some firsts. The first time I added test cases to any of my projects, and used any build pipelines to automate workflows. Its one of the few projects that I completed all the way. 

Years later, looking back on it. I can't help but be blown away by how much creativity is crammed into this project.

## Conception
Back in college, a friend, V, introduced me to the book Ready Player One by Earnest Cline. It deals with Easter eggs, creators of a game or software hiding little features for the end users to find. It tells the story of the protagonist finding a series of increasingly harder easter eggs, solving the puzzles it gives and finally ending victorious.

The true genius of the book was that, there was an easter egg hidden in it (I found this out much later), which led to a series of increasingly challenging games, setup by the author, the winner of which would receive an original Delorean. By the time I got to it, only the [first level](http://anoraksalmanac.com/gate1/stacks/) was still up. I played it till I eventually found the easter egg in that game, directing players to the second gate, which was no longer active. Here's a [hand drawn map](https://imgur.com/a/STRSH#9hsHyBh) I used when playing the game.

The book hooked me immediately, I was inspired by it to try and create something along the same vein. So I started brainstorming.  In the book, the hero had to find three keys, copper, jade and crystal, each of which opened a door. A challenge awaiting the ones who opened the door. So I decided the game would have three parts, each of which would be further divided into two, a key and a door. The key level would helping to solve the door level.

Before I'd even gotten as far as designing the levels, I got another friend, B, to photoshop some awesome looking doors for the game. Something that I never used in the end. Then again they were made by modifying the gate images Earnie Cline had commissioned of the easter egg hunt he'd made, so meh.

I had a few ideas floating around in my head on how to design the levels, initially I wanted the first level to be a sort of find the object game, where a picture of a room would be presented and user could click any objects on the image and if they were interactible, it would be picked up. But I quickly gave up on it due to lack of technical skills needed to implement it. I also wanted to add an almanac, a sort of guide, here originally functioning as the rule list, and eventually gaining more and more importance.

Fast forward a couple months later I had a semi coherent game fully envisioned in my mind but noone to play it. I thought I'd give it for the college festival as a challenge and front a ton of money to the winner. But I chickened out from that plan. Not having any other incentive to get this game from my mind into code, it stayed in a lull for more than a year.

I randomly ran across the r/readyplayerone subreddit at this point, Since I knew I'd get some players here, I created [a post](https://www.reddit.com/r/readyplayerone/comments/4xpqsg/thank_you/) saying that I was making the game based on the book.

Lacking the technical skills, the levels had to be designed to take input as text without fanciful ui. But I still wanted it to feel like a game with nonetheless.

when the game was completed, I [put it up on reddit](https://www.reddit.com/r/readyplayerone/comments/4zu9hv/easter_egg_hunt_game_based_on_ready_player_one/). The reception was pretty good. But me being impatient ended up giving a lot of clues and hastening the end of the game, instead of letting it run for a longer duration.

The game came around with a second lease on its life when the college fest was fast approaching, and a typical treasure hunt was still not availble. So I figured I'd dust off this project and use it a second time. The treasure hunts typically last for two three weeks. Again, due to my impatience, I ended up giving a ton of clues and someone cleared the final level in three days. This was unacceptable to the big wigs, So I ended up writing some extra uninspired levels, which was a bunch of text, which when solved would give a text to input. Since this was easy to implement, I could crank out new levels without having to update the code.

But this felt extremely uninspiring to me, and I couldn't let this stand. So to break it up, while the game was active, and the top player was four or so levels from the new final level, I conceived of a better ending to the game. A text adventure (the improved version of which can be [seen here](https://moonblade.github.io/textAdventure)). In this a player would experience his surrounding as a text description. Could move around by typing commands like 'go north', 'go east' etc. The game created with mostly spaggetti code featured dungeon exploring, monster killing, puzzle solving and item crafting. Cramming all of that into a short game within a couple days took some doing. But I got it up just in time.

This iteration of the game received a ton of praise since the players were expecting a typical treasure hunt type game, getting something different was refreshing.

---

*SPOILER ALERT*: If you plan to play the game, reading further will spoil elements from the game.


## The levels

### level 0

The players are greeted with a simple question. To prove their worth. This level was added at the end of the process so that the no of people in the scoreboard would be thinned out from the outset.

![Level 0](https://i.ibb.co/XypkqbF/image.png)

In the book, the hero finds the first clue by noticing that in the thick almanac volume, a few letters had notches cut out of them, almost unnoticable, he initially dismisses it as a printer issue, before finally understanding that it was indeed a clue.

![Sample notched letter in almanac](https://i.ibb.co/hVQRFQP/image.png)

The [almanac provided](https://github.com/moonblade/gunt/blob/master/public/Almanac.pdf) has a bunch of such letters, which together spelt the word "ignition" which is the answer to the level.

![Completed level 0](https://i.ibb.co/RyP4dJg/image.png)

### level 1

In the book, preceding the first key, the hero had to sovle a rhyme to get the location of the first key. I liked this idea and kept playing with it. I ended up tweaking the rhyme endless times finally hitting upon the final version. This ended up being level one. 

The rhyme went

> 

## Almanac

In the book, the easter egg hunters are given a manual by the designer of the game, and the clue to the first key is hidden inside the Almanac. So to create a similar aesthetic, I added an Almanac for the game as well. 

Ostensibly a rule book, I crammed the almanac chock-full of easter eggs and the answer to the 0<sup>th</sup> level.

### Secrets of the almanac

[Here is a link to the almanac](https://github.com/moonblade/gunt/blob/master/public/Almanac.pdf)

